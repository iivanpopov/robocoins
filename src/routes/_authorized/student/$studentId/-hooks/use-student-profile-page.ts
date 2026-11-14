import { useQueryClient } from '@tanstack/react-query'
import {
  useBlocker,
  useNavigate,
  useParams,
  useRouteContext,
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import * as v from 'valibot'

import { useEditStudentAvatarRingStudentStudentIdAvatarRingPatch } from '#/api/hooks/useEditStudentAvatarRingStudentStudentIdAvatarRingPatch'
import { useEditStudentAvatarStudentStudentIdAvatarPatch } from '#/api/hooks/useEditStudentAvatarStudentStudentIdAvatarPatch'
import { useEditStudentNicknameStudentStudentIdNicknamePatch } from '#/api/hooks/useEditStudentNicknameStudentStudentIdNicknamePatch'
import { getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey } from '#/api/hooks/useGetBalanceLeaderboardStudentLeaderboardBalanceGet'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { getCurrentUserAuthMeGetQueryKey } from '#/api/hooks/useGetCurrentUserAuthMeGet'
import {
  getStudentByIdStudentStudentIdGetQueryKey,
  useGetStudentByIdStudentStudentIdGet,
} from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { useGetTeacherGroupsTeacherGroupsGet } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import type { StudentProfileResponse } from '#/api/types'
import {
  AVATARS,
  isAvatarRing,
  isAvatarRingAvailable,
  type AvailableAvatarRing,
  type Avatar,
  type AvatarRing,
} from '#/routes/-constants'
import { StudentNicknameSchema } from '#/routes/-schemas'
import { parseGroupSchedule } from '#/routes/-utils'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'

import {
  PROFILE_FIELDS,
  type ProfileEditorTab,
  type ProfileField,
  type ProfileFieldSaveState,
  type ProfileSaveOutcome,
} from '../-types'
import { useKeyboardInset } from './use-keyboard-inset'

const INITIAL_FIELD_SAVE_STATES: Record<ProfileField, ProfileFieldSaveState> = {
  nickname: 'idle',
  avatar: 'idle',
  ring: 'idle',
}

function getPersistedAvatar(profile: StudentProfileResponse | null): Avatar {
  return AVATARS.find((candidate) => candidate === profile?.avatar) ?? AVATARS[0]
}

function getPersistedRing(profile: StudentProfileResponse | null): AvatarRing {
  const ring = profile?.avatar_ring
  return isAvatarRing(ring) ? ring : 'none'
}

function hasProfileChanges(
  profile: StudentProfileResponse | null,
  isEditing: boolean,
  nicknameDraft: string,
  avatarDraft: Avatar,
  ringDraft: AvatarRing,
) {
  return (
    isEditing &&
    (nicknameDraft.trim() !== (profile?.name ?? '') ||
      avatarDraft !== getPersistedAvatar(profile) ||
      ringDraft !== getPersistedRing(profile))
  )
}

export function useStudentProfilePage() {
  const navigate = useNavigate()
  const params = useParams({ from: '/_authorized/student/$studentId/' })
  const search = useSearch({ from: '/_authorized/student/$studentId/' })
  const context = useRouteContext({ from: '/_authorized' })
  const router = useRouter()
  const queryClient = useQueryClient()

  const dirtyReference = useRef(false)
  const saveLockReference = useRef(false)

  const blocker = useBlocker({
    shouldBlockFn: () => dirtyReference.current,
    enableBeforeUnload: () => dirtyReference.current,
    withResolver: true,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<ProfileEditorTab>('avatar')
  const [nicknameDraft, setNicknameDraft] = useState('')
  const [avatarDraft, setAvatarDraft] = useState<Avatar>(AVATARS[0])
  const [ringDraft, setRingDraft] = useState<AvatarRing>('none')
  const [fieldSaveStates, setFieldSaveStates] =
    useState<Record<ProfileField, ProfileFieldSaveState>>(INITIAL_FIELD_SAVE_STATES)

  const user = context.user
  const isTeacher = user?.role !== 'student'
  const studentId = params.studentId
  const fromGroupId = search.fromGroupId ?? null

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })
  const profile = studentQuery.data ?? null
  const coursesQuery = useGetCoursesCourseGet({
    query: { enabled: isTeacher },
  })
  const teacherGroupsQuery = useGetTeacherGroupsTeacherGroupsGet({
    query: { enabled: isTeacher },
  })

  const nicknameMutation = useEditStudentNicknameStudentStudentIdNicknamePatch({
    mutation: { retry: false },
  })
  const avatarMutation = useEditStudentAvatarStudentStudentIdAvatarPatch({
    mutation: { retry: false },
  })
  const ringMutation = useEditStudentAvatarRingStudentStudentIdAvatarRingPatch({
    mutation: { retry: false },
  })

  const keyboardInset = useKeyboardInset()

  useEffect(() => {
    dirtyReference.current = hasProfileChanges(
      profile,
      isEditing,
      nicknameDraft,
      avatarDraft,
      ringDraft,
    )
  }, [isEditing, nicknameDraft, avatarDraft, ringDraft, profile])

  function handleBack() {
    if (!isTeacher) {
      void navigate({ to: '/' })
      return
    }
    if (fromGroupId) {
      void navigate({ to: '/group/$groupId', params: { groupId: String(fromGroupId) } })
      return
    }
    void navigate({ to: '/group' })
  }

  function handleEdit() {
    void navigate({
      to: '/student/$studentId/edit',
      params: { studentId: studentId },
      search: { fromGroupId: fromGroupId ?? undefined },
    })
  }

  function handleRetry() {
    if (studentQuery.isError && !studentQuery.isFetching) void studentQuery.refetch()
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
    if (teacherGroupsQuery.isError && !teacherGroupsQuery.isFetching)
      void teacherGroupsQuery.refetch()
  }

  function handleStartEditing() {
    if (!profile || isSaving) return
    setNicknameDraft(profile.name)
    setAvatarDraft(persistedAvatar)
    setRingDraft(persistedRing)
    setActiveTab('avatar')
    setFieldSaveStates(INITIAL_FIELD_SAVE_STATES)
    setIsEditing(true)
  }

  function handleCancelEditing() {
    if (isSaving) return
    setNicknameDraft(persistedNickname)
    setAvatarDraft(persistedAvatar)
    setRingDraft(persistedRing)
    setActiveTab('avatar')
    setFieldSaveStates(INITIAL_FIELD_SAVE_STATES)
    setIsEditing(false)
  }

  function handleNicknameChange(value: string) {
    if (isSaving) return
    setNicknameDraft(value)
    resetFieldSaveState('nickname')
  }

  function handleAvatarSelect(avatar: Avatar) {
    if (isSaving) return
    setAvatarDraft(avatar)
    resetFieldSaveState('avatar')
  }

  function handleRingSelect(ring: AvailableAvatarRing) {
    if (isSaving || !isAvatarRingAvailable(ring)) return
    setRingDraft(ring)
    resetFieldSaveState('ring')
  }

  function handleTabChange(tab: ProfileEditorTab) {
    if (isSaving) return
    setActiveTab(tab)
  }

  function handleSave() {
    if (saveLockReference.current || !profile) return
    const nickname = nicknameDraft.trim()
    const changedFields = PROFILE_FIELDS.filter((field) => {
      if (field === 'nickname') return nickname !== persistedNickname
      if (field === 'avatar') return avatarDraft !== persistedAvatar
      return ringDraft !== persistedRing
    })
    if (!changedFields.length) {
      setIsEditing(false)
      return
    }
    const isNicknameChanged = changedFields.includes('nickname')
    const hasNicknameValidationError =
      isNicknameChanged && !v.safeParse(StudentNicknameSchema, nicknameDraft).success
    const fieldsToSave = hasNicknameValidationError
      ? changedFields.filter((field) => field !== 'nickname')
      : changedFields
    setFieldSaveStates((current) => {
      const next = { ...current }
      for (const field of PROFILE_FIELDS) {
        if (fieldsToSave.includes(field)) continue
        if (field === 'nickname' && hasNicknameValidationError) {
          next[field] = 'error'
          continue
        }
        if (next[field] === 'error') next[field] = 'idle'
      }
      return next
    })
    if (!fieldsToSave.length) {
      return
    }
    void saveFields(fieldsToSave, nickname, hasNicknameValidationError)
  }

  async function saveFields(
    fields: ProfileField[],
    nickname: string,
    hasValidationFailure: boolean,
  ) {
    saveLockReference.current = true
    setFieldSaveStates((current) => {
      const next = { ...current }
      for (const field of fields) next[field] = 'pending'
      return next
    })
    try {
      const results: { field: ProfileField; isSuccess: boolean }[] = []
      for (const field of fields) {
        try {
          const data = await saveField(field, nickname)
          queryClient.setQueryData(
            getStudentByIdStudentStudentIdGetQueryKey({ path: { student_id: studentId } }),
            data,
          )
          results.push({ field, isSuccess: true })
        } catch {
          results.push({ field, isSuccess: false })
        }
      }
      const savedFields = results.filter((result) => result.isSuccess).map((result) => result.field)
      const failedFields = results
        .filter((result) => !result.isSuccess)
        .map((result) => result.field)
      setFieldSaveStates((current) => {
        const next = { ...current }
        for (const field of savedFields) next[field] = 'saved'
        for (const field of failedFields) next[field] = 'error'
        return next
      })
      await syncProfileCaches()
      if (failedFields.length || hasValidationFailure) return
      setIsEditing(false)
    } finally {
      saveLockReference.current = false
    }
  }

  function saveField(field: ProfileField, nickname: string) {
    const path = { student_id: studentId }
    if (field === 'nickname') {
      return nicknameMutation.mutateAsync({ path, body: { new_nickname: nickname } })
    }
    if (field === 'avatar') {
      return avatarMutation.mutateAsync({ path, body: { new_avatar: avatarDraft } })
    }
    return ringMutation.mutateAsync({ path, body: { new_avatar: ringDraft } })
  }

  async function syncProfileCaches() {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: getStudentByIdStudentStudentIdGetQueryKey({ path: { student_id: studentId } }),
      }),
      queryClient.invalidateQueries({ queryKey: getCurrentUserAuthMeGetQueryKey() }),
      queryClient.invalidateQueries({ queryKey: ['session'] }),
      queryClient.invalidateQueries({ queryKey: [{ url: '/student' }] }),
      queryClient.invalidateQueries({ queryKey: [{ url: '/group/id/:group_id' }] }),
      queryClient.invalidateQueries({
        queryKey: getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey(),
      }),
    ]).catch(() => undefined)
    await router.invalidate().catch(() => undefined)
  }

  function resetFieldSaveState(field: ProfileField) {
    setFieldSaveStates((current) =>
      current[field] === 'idle' ? current : { ...current, [field]: 'idle' },
    )
  }

  function handleNavigationDialogOpenChange(isOpen: boolean) {
    if (isOpen || blocker.status !== 'blocked') return
    blocker.reset()
  }

  function handleConfirmNavigation() {
    if (blocker.status !== 'blocked') return
    blocker.proceed()
  }

  const persistedNickname = profile?.name ?? ''
  const persistedAvatar = getPersistedAvatar(profile)
  const persistedRing = getPersistedRing(profile)
  const avatarRing = profile?.avatar_ring ?? null
  const isOwnProfile = user?.role === 'student' && studentId === user.id && profile?.id === user.id
  const groupCards = isTeacher
    ? (profile?.group_ids ?? []).flatMap((groupId) => {
        const group = teacherGroupsQuery.data?.find((candidate) => candidate.id === groupId)
        const course = coursesQuery.data?.find((candidate) => candidate.id === group?.course_id)
        if (!group || !course) return []
        return [
          {
            id: group.id,
            name: group.name,
            courseName: course.name,
            category: course.category,
            schedule: parseGroupSchedule(group.name),
            studentsCount: group.students_count ?? 0,
          } satisfies GroupCardData,
        ]
      })
    : []
  const isSaving = PROFILE_FIELDS.some((field) => fieldSaveStates[field] === 'pending')
  const hasSavedFields = PROFILE_FIELDS.some((field) => fieldSaveStates[field] === 'saved')
  const hasErrorFields = PROFILE_FIELDS.some((field) => fieldSaveStates[field] === 'error')
  const saveOutcome: ProfileSaveOutcome = !hasErrorFields
    ? 'idle'
    : hasSavedFields
      ? 'partial'
      : 'error'
  const isNicknameEmpty = !nicknameDraft.trim()
  const hasUnsavedChanges = hasProfileChanges(
    profile,
    isEditing,
    nicknameDraft,
    avatarDraft,
    ringDraft,
  )
  const isNavigationBlocked = blocker.status === 'blocked'

  return {
    state: {
      isTeacher,
      isOwnProfile,
      profile,
      avatar: persistedAvatar,
      avatarRing,
      groupCards,
      isGroupsPending: coursesQuery.isPending || teacherGroupsQuery.isPending,
      isGroupsError: coursesQuery.isError || teacherGroupsQuery.isError,
      isGroupsFetching: coursesQuery.isFetching || teacherGroupsQuery.isFetching,
      isEditing,
      activeTab,
      nicknameDraft,
      avatarDraft,
      ringDraft,
      persistedRing,
      fieldSaveStates,
      saveOutcome,
      isSaving,
      isNicknameEmpty,
      hasUnsavedChanges,
      isNavigationBlocked,
      keyboardInset,
    },
    queries: { student: studentQuery },
    functions: {
      handleBack,
      handleEdit,
      handleRetry,
      handleStartEditing,
      handleCancelEditing,
      handleNicknameChange,
      handleAvatarSelect,
      handleRingSelect,
      handleTabChange,
      handleSave,
      handleNavigationDialogOpenChange,
      handleConfirmNavigation,
    },
  }
}
