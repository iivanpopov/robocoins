# Feedback

Shared feedback trigger and form. It owns the Valibot schema, the TanStack Start `POST` server function, the Neon/Drizzle tables, the database-backed rate limiter, and the Ukrainian copy. Do not create a second form, schema, server function, or locale catalog.

## Public import

```tsx
import { Feedback, type FeedbackProps, type FeedbackSource } from '#/feedback'
```

## Props

| Prop               | Type                             | Default    | Notes                                                     |
| ------------------ | -------------------------------- | ---------- | --------------------------------------------------------- |
| `source`           | `FeedbackSource`                 | required   | Selects kind rules, copy, and source.                     |
| `className`        | `string`                         | —          | Applied to the trigger button, not the drawer.            |
| `contentClassName` | `string`                         | —          | Applied to the drawer popup, for route-scoped tokens.     |
| `triggerLabel`     | `string`                         | source key | Already translated text, when a page has its own wording. |
| `triggerVariant`   | `'contain' \| 'ghost' \| 'link'` | `'link'`   | Trigger is always rendered as `type="button"`.            |
| `triggerSize`      | `'sm' \| 'md' \| 'lg'`           | `'md'`     | Trigger size.                                             |

`FeedbackSource` is one of `student_home`, `registration_avatar`, `profile_avatar`, `shop`. The component resolves the kind automatically:

- `student_home` lets the student choose `idea`, `problem`, or `other`.
- `registration_avatar` and `profile_avatar` send `avatar_suggestion`.
- `shop` sends `reward_suggestion`.

## Scenario wiring

```tsx
<Feedback source="student_home" />
```

```tsx
<Feedback
  source="registration_avatar"
  className={styles['suggest-avatar']}
  triggerLabel={t('step.avatar.suggest')}
/>
```

```tsx
<Feedback source="shop" className={styles['suggest-reward']} contentClassName="galaxy" />
```

```tsx
<Feedback source="profile_avatar" />
```

Only render `profile_avatar` on the student's own read-only profile (`!state.isTeacher`). The module does not edit the avatar and does not navigate.

## Runtime guarantees

- The server resolves the author from `getSession()`. The client never sends a student id.
- `registration_avatar` may be anonymous. Every other source requires an authenticated student.
- The message is trimmed and must contain 3–2000 characters.
- The client keeps one UUID per unchanged draft, so retrying after a network error cannot duplicate a saved request. A retry with a different payload or author returns a conflict, and the next submit then uses a fresh UUID.
- Anonymous submissions are rate limited in the database per IP hash and source, so the limit is shared across application instances.
- The component provides its own `TranslationProvider` for `virtual:messages/uk/feedback`; routes only loading `common` or `auth` work without extra wiring.
- The drawer is portaled to the document body, so it cannot inherit route tokens. Pass `contentClassName="galaxy"` on the shop route. Do not pass a module class with layout rules, because it would also style the drawer popup.
- The form calls `preventDefault()` and `stopPropagation()` on submit, so it is safe inside the registration form. The trigger is `type="button"`.
- Errors keep the text in the form and leave the submit action available.
