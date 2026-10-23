## Agent skills

### Issue tracker

Issues live as markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles, recorded as the `Status:` line in issue files. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: root `GLOSSARY.md` plus `docs/adr/`. See `docs/agents/domain.md`.

## Style Guide

1. Never use ternary operators in JSX, instead use `&&` twice. e.g. `isError && <>...</>`, `!isError && <>...</>`. The same applies to choosing a class or a handler: `cn('base', isActive && ACTIVE, !isActive && INACTIVE)`.
2. Dont check for array `length` like `arr.length === 0`, do `!arr.length` or `arr.length`.
3. Characters are free. Do not shortcut `event`, `value`, `number` and others. But `char`, `i`, `j` are allowed.
4. Event handlers created in hooks are named `handleX`. Props are named `onX`.
5. Never use comments.
6. Keep object results from form, mutation, query, and similar hooks intact (e.g. `form`, `loginMutation`, `usersQuery`); access their properties through that object. Destructure tuple hooks such as `useState` and `useReducer` normally. `model` hooks may be destructured in this order: `refs`, `state`, `queries`, `mutations`, `functions`, `features`. The destructuring order is important. Destructure model hooks at one level only and access nested values through the object, e.g. `refs.swipe`; neither `refs: { swipe: swipeRef }` nor `const { swipe } = refs` is allowed. Don't destructure other values, e.g. `{ ... } = event`.
7. Schemas are named in PascalCase with a `Schema` suffix, e.g. `RegisterStateSchema`, `StepNameSchema`.
8. `cn()` only solution for merging classes, never use template literals for concatenating classNames.
9. **Hook body order**: Arrange components and custom hooks in this order, skipping sections that are not needed. Separate each non-empty section from the next with a blank line:
   1. TanStack Router hooks (`useParams`, `useSearch`, `useNavigate`, `useRouteContext`, etc.).
   2. State hooks (`useState`, `useReducer`, `useRef`).
   3. Queries and mutations.
   4. Form hooks.
   5. Effects (`useEffect` and related effect hooks), last among hook calls.
   6. Functions (handlers and helpers).
   7. Derived values.
   8. Return statement.
10. **Page component hook order**: Call and destructure the page model hook first, then Kanjou hooks such as `useTranslate()`. Skip unused groups. This page-specific order takes precedence over rule 9. Keep handlers and non-rendering logic in the page model hook.

## Structure

1. **Page**: Define page component inline in `index.tsx`. Consumes `model hook` and only renders JSX. Never extract the full page to `-components/`.
2. **Slices**: `-constants`, `-utils`, `-types`, `-actions`, `-components`, `-hooks`, `-schemas`, `-lib` must be directories with `index.ts`.
3. **Constants slice**: Split `-constants` into `constants.ts` (shared technical, non-render constants), `enum.ts` (enums, const objects, union types), and `index.ts` (barrel file). Local technical values (delays, debounce timeouts) belong in the component FILE or hook where used. Render-only constants belong in the component file where they are rendered. Extract render constants only if they are repeating.
4. **Fractal**: `components` slice can nest however deep and contain other slices too.
5. **Shared ownership**: When a utility, component, or constant is used by two sibling branches, move it to the appropriate slice at their nearest common parent or higher. Update all consumers to use that shared location.

## Page Model Hooks

`use<Feature>Page` (e.g. `useUsersPage`) lives in `-hooks/use-<feature>-page.ts` and returns, in this order:

- `refs?`: DOM refs or ref-like values returned by other hooks.
- `state?`: reactive state, computed values.
- `queries?`: TanStack Query queries.
- `mutations?`: TanStack Query mutations.
- `functions?`: handlers (`handleX`) or helpers.
- `features?`: result of other hooks, e.g. `form` or `clipboard` (useCopy).

The destructuring order is important: `refs` first, then `state`, `queries`, `mutations`, `functions`, `features`.

Page components destructure the model hook's top-level groups in that order, for example `const { refs, state, functions } = useShopPage()`. Do not destructure nested group values.

Component-local hooks may deliberately return a bare object of their state and handlers instead of this shape. A hook that does so is not a model hook, and its return value must not be destructured.

## Need to know

1. A non .tsx file that uses Unocss icons needs `// @unocss-include` at the top.

## Verification

After each change run `bun check`.

To fix CSS warnings try `bun lint:css --fix`
