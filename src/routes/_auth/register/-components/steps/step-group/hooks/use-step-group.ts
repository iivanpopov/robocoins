import { useForm, useSelector } from '@tanstack/react-form'
import type { SyntheticEvent } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks'

import { StepGroupSchema } from '../-schemas'
import { RegisterStep } from '../../../../-schemas'
import { useRegisterContext } from '../../../register-provider'

export function useStepGroup() {
  const register = useRegisterContext()

  const coursesQuery = useGetCoursesCourseGet()

  const form = useForm({
    defaultValues: {
      courseName: register.state.courseName ?? '',
      groupId: register.state.group?.id?.toString() ?? '',
    },
    validators: { onChange: StepGroupSchema },
    onSubmit: ({ value }) => {
      register.setState({
        step: RegisterStep.Avatar,
        group: {
          id: +value.groupId,
          name: groups!.find((group) => +group.value === +value.groupId)?.label!,
        },
        courseName: value.courseName,
      })
    },
  })

  const courseName = useSelector(form.store, (state) => state.values.courseName)

  const courses = coursesQuery.data?.map((course) => ({
    label: course.name,
    value: course.name,
  }))
  const groups = coursesQuery.data
    ?.find((course) => course.name === courseName)
    ?.groups?.map((group) => ({
      label: group.name,
      value: String(group.id),
    }))

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    void form.handleSubmit()
  }

  const handleResetGroup = () => {
    form.setFieldValue('groupId', '')
  }

  return {
    state: {
      courseName,
      courses,
      groups,
    },
    queries: {
      courses: coursesQuery,
    },
    mutations: {},
    functions: {
      handleSubmit,
    },
    features: {
      form,
      fields: {
        courseName: {
          listeners: {
            onChange: handleResetGroup,
          },
        },
      },
    },
  }
}
