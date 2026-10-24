import assert from 'node:assert/strict'
import { test } from 'node:test'

import { useForm } from '@tanstack/react-form'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

function FormProbe() {
  const form = useForm({ defaultValues: { password: 'ssr-ready' } })

  return createElement('span', null, form.state.values.password)
}

test('TanStack Form uses the same React instance as the server renderer', () => {
  assert.equal(renderToString(createElement(FormProbe)), '<span>ssr-ready</span>')
})
