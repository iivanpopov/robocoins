import { useTranslate } from '@kanjou/react'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'

import { getUsersUsersGetQueryKey } from '#/api/hooks/useGetUsersUsersGet'
import { useRegisterTeacherTeacherRegisterPost } from '#/api/hooks/useRegisterTeacherTeacherRegisterPost'
import { toast } from '#/components/ui'

import { TeacherRegistrationSchema } from '../-schemas'
import { getRequestErrorStatus } from '../-utils'

export function useTeacherRegistrationPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const t = useTranslate()

  const [isCopied, setIsCopied] = useState(false)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const registerMutation = useRegisterTeacherTeacherRegisterPost({
    mutation: {
      retry: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: getUsersUsersGetQueryKey() })
      },
    },
  })

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: TeacherRegistrationSchema, onSubmit: TeacherRegistrationSchema },
    listeners: {
      onChange: () => registerMutation.reset(),
    },
    onSubmit: async ({ value }) => {
      if (registerMutation.isPending) return
      try {
        await registerMutation.mutateAsync({ body: { name: value.name.trim() } })
      } catch {
        return
      }
    },
  })

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (registerMutation.isPending) return
    void form.handleSubmit()
  }

  function handleBack() {
    if (registerMutation.isPending) return
    void navigate({ to: '/admin/people/teachers' })
  }

  function handleRegisterAnother() {
    if (registerMutation.isPending) return
    registerMutation.reset()
    setIsCopied(false)
    form.reset()
  }

  async function copyAccessCode(accessCode: string) {
    try {
      await navigator.clipboard.writeText(accessCode)
      setIsCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000)
    } catch {
      toast.add({ title: t('admin.teachers.result.copy-error'), type: 'error' })
    }
  }

  function handleCopyCode() {
    if (!registerMutation.data) return
    void copyAccessCode(registerMutation.data.access_code)
  }

  return {
    state: {
      result: registerMutation.data ?? null,
      isCopied,
      errorStatus: getRequestErrorStatus(registerMutation.error),
    },
    mutations: { register: registerMutation },
    functions: {
      handleSubmit,
      handleBack,
      handleRegisterAnother,
      handleCopyCode,
    },
    features: { form },
  }
}
