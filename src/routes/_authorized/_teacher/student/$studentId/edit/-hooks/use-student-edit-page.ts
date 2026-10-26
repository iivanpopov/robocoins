import { useQueryClient, type QueryClient } from '@tanstack/react-query'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import * as v from 'valibot'

import { useEditStudentAvatarStudentStudentIdAvatarPatch } from '#/api/hooks/useEditStudentAvatarStudentStudentIdAvatarPatch'
import { useEditStudentNicknameStudentStudentIdNicknamePatch } from '#/api/hooks/useEditStudentNicknameStudentStudentIdNicknamePatch'
import {
  getStudentByIdStudentStudentIdGetQueryKey,
  useGetStudentByIdStudentStudentIdGet,
} from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import type { StudentNicknameEditRequest } from '#/api/types'
import { AVATARS, type Avatar } from '#/routes/-constants'

import { StudentNicknameSchema } from '../-schemas'

export function useStudentEditPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const params = useParams({ from: '/_authorized/_teacher/student/$studentId/edit/' })
  const search = useSearch({ from: '/_authorized/_teacher/student/$studentId/edit/' })

  const studentId = params.studentId
  const fromGroupId = search.fromGroupId ?? null

  const [nickname, setNickname] = useState('')
  const [isNicknameDirty, setIsNicknameDirty] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null)
  const [pickerAvatar, setPickerAvatar] = useState<Avatar>(AVATARS[0])
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isNicknameSyncedReference = useRef(false)
  const isAvatarSyncedReference = useRef(false)

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })

  const nicknameMutation = useEditStudentNicknameStudentStudentIdNicknamePatch({
    mutation: {
      retry: false,
      onSuccess: async (_data, variables) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getStudentByIdStudentStudentIdGetQueryKey({ path: variables.path }),
          }),
          invalidateStudentQueries(queryClient),
        ])
        setIsNicknameDirty(false)
      },
    },
  })

  const avatarMutation = useEditStudentAvatarStudentStudentIdAvatarPatch({
    mutation: {
      retry: false,
      onSuccess: async (_data, variables) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getStudentByIdStudentStudentIdGetQueryKey({ path: variables.path }),
          }),
          invalidateStudentQueries(queryClient),
        ])
        setSelectedAvatar(variables.body.new_avatar as Avatar)
        setIsAvatarPickerOpen(false)
      },
    },
  })

  useEffect(() => {
    const student = studentQuery.data
    if (!student) return
    if (!isNicknameSyncedReference.current) {
      isNicknameSyncedReference.current = true
      setNickname(student.name)
      return
    }
    if (!isNicknameDirty) setNickname(student.name)
  }, [studentQuery.data, isNicknameDirty])

  useEffect(() => {
    const student = studentQuery.data
    if (!student) return
    if (isAvatarSyncedReference.current) return
    isAvatarSyncedReference.current = true
    const avatar = AVATARS.find((candidate) => candidate === student.avatar)
    if (avatar) setSelectedAvatar(avatar)
  }, [studentQuery.data])

  function invalidateStudentQueries(client: QueryClient) {
    return Promise.all([
      client.invalidateQueries({ queryKey: [{ url: '/group/id/:group_id' }] }),
      client.invalidateQueries({ queryKey: [{ url: '/student' }] }),
    ])
  }

  function handleNicknameChange(value: string) {
    if (nicknameMutation.isPending) return
    setIsNicknameDirty(true)
    setNickname(value)
  }

  function handleSaveNickname() {
    if (nicknameMutation.isPending) return
    const result = v.safeParse(StudentNicknameSchema, nickname)
    if (!result.success) {
      setIsNicknameDirty(true)
      return
    }
    if (!studentQuery.data || studentQuery.data.name === result.output) {
      setIsNicknameDirty(false)
      setNickname(studentQuery.data?.name ?? nickname)
      return
    }
    const body: StudentNicknameEditRequest = { new_nickname: result.output }
    nicknameMutation.mutate({ path: { student_id: studentId }, body })
  }

  function handleOpenAvatarPicker() {
    if (avatarMutation.isPending) return
    setPickerAvatar(selectedAvatar ?? AVATARS[0])
    avatarMutation.reset()
    setIsAvatarPickerOpen(true)
  }

  function handleAvatarPickerOpenChange(isOpen: boolean) {
    if (avatarMutation.isPending) return
    setIsAvatarPickerOpen(isOpen)
  }

  function handlePickerAvatarSelect(avatar: Avatar) {
    if (avatarMutation.isPending) return
    setPickerAvatar(avatar)
  }

  function handleSaveAvatar() {
    if (avatarMutation.isPending || selectedAvatar === pickerAvatar) {
      setIsAvatarPickerOpen(false)
      return
    }
    avatarMutation.mutate({
      path: { student_id: studentId },
      body: { new_avatar: pickerAvatar },
    })
  }

  function handleRetryAvatar() {
    if (avatarMutation.isPending || selectedAvatar === pickerAvatar) return
    avatarMutation.reset()
    handleSaveAvatar()
  }

  function handlePasswordDialogOpenChange(isOpen: boolean) {
    setIsPasswordDialogOpen(isOpen)
  }

  function handleOpenPasswordDialog() {
    if (isPasswordDialogOpen) return
    setIsPasswordDialogOpen(true)
  }

  function handleTogglePassword() {
    setIsPasswordVisible((value) => !value)
  }

  function handleConfirmPasswordRegeneration() {
    setIsPasswordDialogOpen(false)
  }

  function handleRetryStudent() {
    void studentQuery.refetch()
  }

  function handleBack() {
    if (fromGroupId) {
      void navigate({ to: '/group/$groupId', params: { groupId: String(fromGroupId) } })
      return
    }
    void navigate({ to: '/group' })
  }

  function handleAssignmentSuccess() {
    void studentQuery.refetch()
  }

  const profile = studentQuery.data
  const avatar = AVATARS.find((candidate) => candidate === profile?.avatar) ?? AVATARS[0]

  return {
    state: {
      studentId,
      fromGroupId,
      isAvailable: !!profile,
      name: profile?.name ?? '',
      avatar,
      selectedAvatar: selectedAvatar ?? avatar,
      pickerAvatar,
      groupIds: profile?.group_ids ?? [],
      nickname,
      canSaveNickname: !!(nickname.trim() && nickname.trim() !== (profile?.name ?? '')),
      isAvatarPickerOpen,
      isPasswordDialogOpen,
      isPasswordVisible,
    },
    queries: { student: studentQuery },
    mutations: { nickname: nicknameMutation, avatar: avatarMutation },
    functions: {
      handleNicknameChange,
      handleSaveNickname,
      handleOpenAvatarPicker,
      handleAvatarPickerOpenChange,
      handlePickerAvatarSelect,
      handleSaveAvatar,
      handleRetryAvatar,
      handlePasswordDialogOpenChange,
      handleOpenPasswordDialog,
      handleTogglePassword,
      handleConfirmPasswordRegeneration,
      handleRetryStudent,
      handleBack,
      handleAssignmentSuccess,
    },
  }
}
