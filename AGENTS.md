## Agent skills

### Issue tracker

Issues live as markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles, recorded as the `Status:` line in issue files. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: root `GLOSSARY.md` plus `docs/adr/`. See `docs/agents/domain.md`.

## Code style

### Conditions and classes

- In JSX, use separate `condition && ...` and `!condition && ...` branches instead of ternary operators. This also applies to JSX prop expressions, including class and handler selection.
- Merge classes only with `cn()`, for example `cn('base', isActive && ACTIVE, !isActive && INACTIVE)`. Do not concatenate class names with template literals.
- For array emptiness checks, use `!items.length`; for non-emptiness checks, use `items.length`. Do not compare the length to zero.

### Naming and comments

- Use full descriptive names such as `event`, `value`, and `number`. The abbreviations `char`, `i`, and `j` are allowed.
- Name event handlers defined in hooks `handleX`; name callback props `onX`.
- Name schemas in PascalCase with a `Schema` suffix, for example `RegisterStateSchema`.
- Do not add code comments. The required UnoCSS directive below is an exception.
- In non-`.tsx` files containing UnoCSS icons, put `// @unocss-include` at the top so UnoCSS scans the file.

### Object access and destructuring

- Keep object-valued hook results intact: `form`, `loginMutation`, `usersQuery`, etc. Access properties through the result object, for example `form.handleSubmit`.
- Use property access for other objects too, including props and events; do not destructure them.
- Tuple hooks such as `useState` and `useReducer` may be destructured normally.
- Model hooks are the only object-destructuring exception: destructure their top-level groups as specified under **Page model hooks**. Access nested values through their group, for example `refs.swipe`. Neither nested destructuring nor subsequent destructuring of a group is allowed.
- A component-local hook returning a plain object of state and handlers is not a model hook. Keep that result intact too.

### Component and hook body order

Arrange components and custom hooks in the following order. Omit unused sections and separate non-empty sections with a blank line:

1. TanStack Router hooks: `useParams`, `useSearch`, `useNavigate`, `useRouteContext`, etc.
2. State hooks: `useState`, `useReducer`, `useRef`.
3. Queries and mutations.
4. Form hooks.
5. Effects: `useEffect` and related effect hooks, after all other hook calls.
6. Functions: handlers and helpers.
7. Derived values.
8. Return statement.

For page components, the page model hook must be called and destructured first, followed by Kanjou hooks such as `useTranslate()`. This page-specific rule takes precedence over the general order above.

## File structure and ownership

### Slices and routing

- Slice names are `constants`, `utils`, `types`, `actions`, `components`, `hooks`, `schemas`, and `lib`. Each slice must be a directory with an `index.ts` barrel file, not a standalone file such as `utils.ts`.
- Use `lib/` for third-party library setup and integration: configuration, client or instance creation, adapters, and API wrappers. Place general-purpose helper functions that are independent of a library in `utils/`.
- Use slice names without a leading `-` by default. The `-` prefix is a file-based routing exclusion marker, not part of the slice name.
- Add `-` when a directory must be excluded from route discovery, for example `-components/` or `-hooks/` alongside route files. Outside route discovery, or inside an already excluded directory, use unprefixed names.
- The paths below use unprefixed slice names; apply the routing exclusion rule where needed.
- The structure is recursive: a `components` slice may contain nested components with their own slices, at any depth.
- When two sibling branches use the same utility, component, or constant, place it in the appropriate slice at their nearest common parent or higher. Update every consumer to import from that shared location.

### Pages

- Define the page component directly in its route's `index.tsx`.
- The page consumes its model hook and renders JSX. Keep handlers and non-rendering logic in the model hook.
- Extract smaller components into the `components` slice as needed; do not move the entire page component there.

### Constants

Choose the location by scope and purpose:

- Shared technical, non-render constants: `constants/constants.ts`.
- Enums, const objects, and union types belonging to the constants slice: `constants/enum.ts`.
- Constants slice exports: `constants/index.ts`.
- Local technical values, such as delays and debounce timeouts: the component or hook file that uses them.
- Render-only constants: the component file that renders them. Extract them only when reused, following the shared-ownership rule above.

## Page model hooks

Name the hook `use<Feature>Page`, for example `useUsersPage`, and place it in the page's `hooks/use-<feature>-page.ts` file. Use `-hooks/` when routing exclusion is required.

Return and destructure the following top-level groups in this exact order, omitting unused groups:

| Group       | Contents                                                         |
| ----------- | ---------------------------------------------------------------- |
| `refs`      | DOM refs and ref-like values returned by other hooks             |
| `state`     | Reactive state and computed values                               |
| `queries`   | TanStack Query result objects                                    |
| `mutations` | Mutation result objects                                          |
| `functions` | Handlers named `handleX` and helpers                             |
| `features`  | Other hook results, such as `form` or `clipboard` from `useCopy` |

Example: `const { refs, state, functions } = useShopPage()`. Read nested values as `refs.swipe`, `state.isOpen`, and `functions.handleClose`.

## Verification

- After each change, run `bun check`.
- If CSS warnings occur, try `bun lint:css --fix`, review its changes, and rerun `bun check`.
- Do not create `.test` files inside the repository.

## UI design

- Do not display all-uppercase text in the UI.
- Use at most three cards per page; when cards are needed, aim for one to three.
