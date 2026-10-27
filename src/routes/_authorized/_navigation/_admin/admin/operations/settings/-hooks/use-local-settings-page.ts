import { useForm, useSelector } from '@tanstack/react-form'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { useGetAllStudentsStudentGet } from '#/api/hooks/useGetAllStudentsStudentGet'
import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'
import { getApiErrorKind } from '#/routes/_authorized/_navigation/_admin/admin/-utils'

import { CorrectionStateSchema, TariffStateSchema } from '../-schemas'
import type { LocalCorrectionDraft, LocalTariffDraft } from '../../-types'

interface CorrectionValues {
  studentId: string
  amount: string
  explanation: string
}

interface TariffValues {
  tariffs: Record<string, string>
}

export function useLocalSettingsPage() {
  const [correctionDraft, setCorrectionDraft] = useState<LocalCorrectionDraft | null>(null)
  const [tariffDraft, setTariffDraft] = useState<LocalTariffDraft | null>(null)

  const studentsQuery = useGetAllStudentsStudentGet()
  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet()

  const correctionForm = useForm({
    defaultValues: {
      studentId: '',
      amount: '',
      explanation: '',
    } as CorrectionValues,
    validators: { onChange: CorrectionStateSchema },
    listeners: {
      onChange: () => setCorrectionDraft(null),
    },
    onSubmit: ({ value }) => {
      const student = (studentsQuery.data ?? []).find(
        (candidate) => String(candidate.id) === value.studentId,
      )
      if (!student) return

      setCorrectionDraft({
        studentName: student.name,
        amount: Number(value.amount.replace(',', '.')),
        explanation: value.explanation.trim(),
      })
    },
  })

  const tariffForm = useForm({
    defaultValues: {
      tariffs: {},
    } as TariffValues,
    validators: { onChange: TariffStateSchema },
    listeners: {
      onChange: () => setTariffDraft(null),
    },
    onSubmit: ({ value }) => {
      const reasonCount = Object.values(value.tariffs).filter((tariff) => !!tariff).length
      setTariffDraft({ reasonCount })
    },
  })

  const correctionValues = useSelector(correctionForm.store, (state) => state.values)
  const tariffValues = useSelector(tariffForm.store, (state) => state.values.tariffs)

  function handleCorrectionSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    void correctionForm.handleSubmit()
  }

  function handleCorrectionReset() {
    setCorrectionDraft(null)
    correctionForm.reset()
  }

  function handleTariffSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    void tariffForm.handleSubmit()
  }

  function handleTariffReset() {
    setTariffDraft(null)
    tariffForm.reset()
  }

  function handleRetryStudents() {
    if (studentsQuery.isFetching) return
    void studentsQuery.refetch()
  }

  function handleRetryReasons() {
    if (reasonsQuery.isFetching) return
    void reasonsQuery.refetch()
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  const students = (studentsQuery.data ?? []).toSorted((first, second) =>
    first.name.localeCompare(second.name, UKRAINIAN_LOCALE),
  )
  const selectedStudent =
    students.find((student) => String(student.id) === correctionValues.studentId) ?? null
  const reasons = reasonsQuery.data?.reasons ?? []
  const configuredTariffCount = Object.values(tariffValues).filter((tariff) => !!tariff).length
  const studentsErrorKind = studentsQuery.error ? getApiErrorKind(studentsQuery.error) : null
  const reasonsErrorKind = reasonsQuery.error ? getApiErrorKind(reasonsQuery.error) : null

  return {
    state: {
      students,
      selectedStudent,
      correctionDraft,
      tariffDraft,
      reasons,
      configuredTariffCount,
      studentsIsPending: studentsQuery.isPending,
      studentsIsError: studentsQuery.isError,
      studentsErrorKind,
      studentsIsFetching: studentsQuery.isFetching,
      reasonsIsPending: reasonsQuery.isPending,
      reasonsIsError: reasonsQuery.isError,
      reasonsErrorKind,
      reasonsIsFetching: reasonsQuery.isFetching,
    },
    queries: { students: studentsQuery, reasons: reasonsQuery },
    functions: {
      handleCorrectionSubmit,
      handleCorrectionReset,
      handleTariffSubmit,
      handleTariffReset,
      handleRetryStudents,
      handleRetryReasons,
      handleLogin,
    },
    features: { correctionForm, tariffForm },
  }
}
