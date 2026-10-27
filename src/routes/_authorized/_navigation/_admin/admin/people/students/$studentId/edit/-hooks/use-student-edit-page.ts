import { useForm, useSelector } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef } from 'react'

import { useEditStudentAvatarStudentStudentIdAvatarPatch } from '#/api/hooks/useEditStudentAvatarStudentStudentIdAvatarPatch'
import { useEditStudentNicknameStudentStudentIdNicknamePatch } from '#/api/hooks/useEditStudentNicknameStudentStudentIdNicknamePatch'
import {
  getStudentByIdStudentStudentIdGetQueryKey,
  useGetStudentByIdStudentStudentIdGet,
} from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { AVATARS, type Avatar } from '#/routes/-constants'

import { EditStudentAvatarStateSchema, EditStudentNicknameStateSchema } from '../../-schemas'
import { getRequestErrorStatus, invalidateStudentProfileCaches } from '../../-utils'

export function useStudentEditPage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/edit/',
  })
  const queryClient = useQueryClient()

  const studentId = Number(params.studentId)
  const syncedStudentIdReference = useRef<number | null>(null)

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })

  const nicknameMutation = useEditStudentNicknameStudentStudentIdNicknamePatch({
    mutation: {
      retry: false,
      meta: { expectedErrorStatuses: [403, 422] },
      onSuccess: async (data, variables) => {
        queryClient.setQueryData(
          getStudentByIdStudentStudentIdGetQueryKey({ path: variables.path }),
          data,
        )
        await invalidateStudentProfileCaches(queryClient, variables.path.student_id)
      },
    },
  })

  const avatarMutation = useEditStudentAvatarStudentStudentIdAvatarPatch({
    mutation: {
      retry: false,
      meta: { expectedErrorStatuses: [403, 422] },
      onSuccess: async (data, variables) => {
        queryClient.setQueryData(
          getStudentByIdStudentStudentIdGetQueryKey({ path: variables.path }),
          data,
        )
        await invalidateStudentProfileCaches(queryClient, variables.path.student_id)
      },
    },
  })

  const nicknameForm = useForm({
    defaultValues: { nickname: '' },
    validators: { onChange: EditStudentNicknameStateSchema },
    listeners: {
      onChange: () => {
        if (!nicknameMutation.isPending) nicknameMutation.reset()
      },
    },
    onSubmit: async ({ value }) => {
      if (nicknameMutation.isPending) return
      const student = studentQuery.data
      if (!student) return

      const nickname = value.nickname.trim()
      if (nickname === student.name) return

      try {
        await nicknameMutation.mutateAsync({
          path: { student_id: studentId },
          body: { new_nickname: nickname },
        })
      } catch {
        return
      }
    },
  })

  const avatarForm = useForm({
    defaultValues: { avatar: AVATARS[0] as Avatar },
    validators: { onChange: EditStudentAvatarStateSchema },
    listeners: {
      onChange: () => {
        if (!avatarMutation.isPending) avatarMutation.reset()
      },
    },
    onSubmit: async ({ value }) => {
      if (avatarMutation.isPending) return
      const student = studentQuery.data
      if (!student) return
      if (value.avatar === currentAvatar) return

      try {
        await avatarMutation.mutateAsync({
          path: { student_id: studentId },
          body: { new_avatar: value.avatar },
        })
      } catch {
        return
      }
    },
  })

  const nickname = useSelector(nicknameForm.store, (state) => state.values.nickname)
  const avatar = useSelector(avatarForm.store, (state) => state.values.avatar)

  useEffect(() => {
    const student = studentQuery.data
    if (!student) return
    if (syncedStudentIdReference.current === student.id) return
    syncedStudentIdReference.current = student.id
    nicknameForm.setFieldValue('nickname', student.name)
    avatarForm.setFieldValue(
      'avatar',
      AVATARS.find((candidate) => candidate === student.avatar) ?? AVATARS[0],
    )
  }, [studentQuery.data, nicknameForm, avatarForm])

  function handleSubmitNickname(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (nicknameMutation.isPending) return
    void nicknameForm.handleSubmit()
  }

  function handleSubmitAvatar(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (avatarMutation.isPending) return
    void avatarForm.handleSubmit()
  }

  function handleRetryNickname() {
    if (nicknameMutation.isPending) return
    nicknameMutation.reset()
    void nicknameForm.handleSubmit()
  }

  function handleRetryAvatar() {
    if (avatarMutation.isPending) return
    avatarMutation.reset()
    void avatarForm.handleSubmit()
  }

  function handleRetry() {
    if (studentQuery.isFetching) return
    void studentQuery.refetch()
  }

  function handleBack() {
    void navigate({
      to: '/admin/people/students/$studentId',
      params: { studentId },
    })
  }

  const student = studentQuery.data ?? null
  const currentAvatar = student
    ? (AVATARS.find((candidate) => candidate === student.avatar) ?? AVATARS[0])
    : AVATARS[0]
  const isNicknameUnchanged = !!student && nickname.trim() === student.name
  const canSaveNickname = !!student && !!nickname.trim() && !isNicknameUnchanged
  const isAvatarUnchanged = avatar === currentAvatar

  return {
    state: {
      studentId,
      student,
      nickname,
      avatar,
      currentAvatar,
      isNicknameUnchanged,
      canSaveNickname,
      isAvatarUnchanged,
      isPending: studentQuery.isPending,
      isError: studentQuery.isError,
      isFetching: studentQuery.isFetching,
      errorStatus: getRequestErrorStatus(studentQuery.error),
      nicknameErrorStatus: getRequestErrorStatus(nicknameMutation.error),
      avatarErrorStatus: getRequestErrorStatus(avatarMutation.error),
    },
    queries: { student: studentQuery },
    mutations: { nickname: nicknameMutation, avatar: avatarMutation },
    functions: {
      handleSubmitNickname,
      handleSubmitAvatar,
      handleRetryNickname,
      handleRetryAvatar,
      handleRetry,
      handleBack,
    },
    features: { nicknameForm, avatarForm },
  }
}
