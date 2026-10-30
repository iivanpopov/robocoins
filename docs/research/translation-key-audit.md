# Translation key audit

## Implemented follow-up

The initial audit below was followed by an authorized consolidation and namespace implementation. The catalog now contains **928 keys**: 37 unused entries were removed and 161 redundant entries were consolidated, for a total reduction of 198 from the original 1126.

Active call sites, label constants, validation keys, error-key unions, and error-mapping helpers were updated together. Shared actions, filters, field labels, registration results, group counts, coin units, and coin amounts now have shared owners. Session-expiry messages were normalized to one existing sentence; interpolation arguments were preserved.

All 1089 previously active messages were checked against their replacement keys: message text and generated argument schemas are unchanged, except for the explicitly normalized session-expiry wording. The backend/template families for reasons, operation directions, reward types, weekdays, and sorting retain their existing identifiers and translations.

Four identical-text pairs remain intentionally:

- `reason.discipline` and `reason.discipline_breakdown`: distinct backend/historical identifiers.
- `shop.reward.type.privilege` and `admin.catalog.type.privilege`: parallel API-derived type families; reward wording differs between the two contexts, so both complete families remain intact.
- `admin.groups.create.title` and `admin.students.groups.transfer.target-label`: creating a new entity versus selecting a new membership destination.
- `admin.catalog.details.title` and `admin.catalog.type.reward`: generic entity-page heading versus an enum value label.

The physical namespace inventory is `common` (153), `auth` (23), `settings` (9), `student` (74), `teacher` (59), and `admin` (610). Admin is further split into groups, courses, people, catalog, operations, and shared dictionaries. `src/assets/locales/uk.ts` remains the complete generation-time catalog.

After consolidation, `kanjou unused` reports 119 candidates. Each is accounted for by literal references outside direct translation calls or the preserved dynamic families; no unexplained candidates remain.

Authenticated read-only API checks for admin, teacher, and student returned all six current reason identifiers and both reward types. Every returned translation-bearing identifier had a message. Existing historical reason aliases were retained even when not returned in the current reason list. No backend data-changing requests were used.

Browser verification covered 53 route visits across all three roles and anonymous authentication pages, including detail/edit/delete-form views, filter toggling, reward-type chips, and client-side people-tab navigation. Final fresh-process verification found no raw catalog IDs, JavaScript errors, or detected hydration errors. Delete and other mutation forms were only opened, never submitted.

See [Kanjou namespace research](./kanjou-namespaces.md) for the implemented provider, dependency fixes, and upstream issue.

## Initial audit scope and outcome

Audited the Ukrainian catalog against application source using the installed Kanjou 0.4.4 CLI, then checked its candidates against literal references, key-producing constants and helpers, and template-based calls to `t`, `t.unsafe`, and `t.rich`.

| Measurement                                  | Count |
| -------------------------------------------- | ----: |
| Original catalog                             |  1126 |
| `bunx kanjou unused` candidates              |   173 |
| Confirmed unused keys removed                |    37 |
| False positives retained                     |   136 |
| Remaining catalog                            |  1089 |
| Exact duplicate message groups after cleanup |   109 |
| Additional entries within those groups       |   163 |

The initial duplicate count compares complete message strings, including MF2 declarations and whitespace. It was an opportunity inventory, not a safe deletion count. Active-key consolidation was implemented in the follow-up described above.

## Why the unused output is not a deletion list

The installed CLI recognizes translators initialized directly with `useTranslate()` and calls with literal first arguments. It explicitly recognizes `.rich`, but not `.unsafe`, and does not resolve template expressions, constants, object properties, or expressions such as `errorKey ?? 'fallback.key'`. See `node_modules/@kanjou/cli/dist/cli.mjs:56–106`.

Of the 136 retained candidates, 102 have complete literal references elsewhere in application source. These include navigation labels, greeting variants, error keys, validation results, earn-way descriptions, and teacher-access action definitions. The remaining 34 are reached through these template families:

| Family                         | Keys | Example consumer                                                                                      |
| ------------------------------ | ---: | ----------------------------------------------------------------------------------------------------- |
| `admin.catalog.type.*`         |    2 | `src/routes/_authorized/_navigation/_admin/admin/catalog/-components/reward-fields/reward-fields.tsx` |
| `admin.operations.direction.*` |    2 | `src/routes/_authorized/_navigation/_admin/admin/operations/settings/index.tsx`                       |
| `reason.*`                     |   17 | `src/routes/_authorized/-components/reward-history/reward-history.tsx`                                |
| `shop.reward.type.*`           |    2 | `src/routes/_authorized/_navigation/_student/shop/index.tsx`                                          |
| `sort.*`                       |    4 | `src/routes/_authorized/_teacher/group/-components/student-search-bar/student-search-bar.tsx`         |
| `weekday.*`                    |    7 | `src/routes/_authorized/-components/group-card/group-card.tsx`                                        |

Reasons can arrive from backend transaction data. An absence of individual literal references is not evidence that a reason translation is dead. The same applies to enum-derived weekday, reward-type, and sort keys.

Literal rich messages, including `leaderboard.own.points` and authentication captions, remain intact. After cleanup, `kanjou unused` still reports the 136 false positives; zero output is not the correct target with this analyzer.

## Removed keys

- `admin.catalog.details.category`
- `admin.catalog.details.image`
- `admin.catalog.details.image.none`
- `admin.catalog.details.manage.description`
- `admin.catalog.details.no-description`
- `admin.catalog.details.type`
- `admin.catalog.image.file.choose`
- `admin.courses.categories.create`
- `admin.courses.courses-count`
- `admin.courses.link`
- `admin.courses.teachers-count`
- `admin.groups.actions.more`
- `admin.groups.create`
- `admin.groups.description`
- `admin.groups.teachers-count`
- `admin.people.description`
- `admin.people.students.description`
- `admin.people.teachers.description`
- `admin.streak.update.title`
- `admin.teachers.back`
- `admin.teachers.description`
- `admin.teachers.profile.manage-note`
- `admin.teachers.register.description`
- `leaderboard.more`
- `leaderboard.rules`
- `navbar.profile`
- `profile.courses`
- `profile.goal.target`
- `role.admin`
- `settings.password.description`
- `settings.section.admin`
- `student.edit.groups.partial-retry`
- `student.edit.section.profile`
- `student.edit.title`
- `students.profile.metrics.courses`
- `students.profile.metrics.groups`
- `students.register.description`

## Reuse recommendations

Use semantic ownership rather than the first screen that happened to need a message. The current source of truth for the examples below is `src/assets/locales/uk.ts`; call sites are spread across the admin, teacher, and student routes.

### First pass: shared actions and filters

These are low-risk candidates because they represent the same interaction, not merely identical Ukrainian text:

| Existing keys or family                                                       | Proposed owner                                                                                |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `students.search.clear`, `action.clear-search.title`                          | Reuse `action.clear-search.title`                                                             |
| `admin.balance.cancel.action`, `action.cancel`                                | Reuse `action.cancel`                                                                         |
| `admin.groups.error.login`, `admin.courses.error.login`, `action.enter.title` | Reuse `action.enter.title`                                                                    |
| Group, student, and practice `*-all` filter labels                            | `filters.all-courses`, `filters.all-categories`, `filters.all-groups`, `filters.all-teachers` |
| Group/student filter toggle labels                                            | `filters.toggle`                                                                              |
| `admin.groups.filters.clear`, `admin.catalog.empty.reset`                     | `filters.clear`                                                                               |
| Group/course/category `create.another`                                        | `action.create-another`                                                                       |
| Group/course/category rename submits                                          | `action.rename`                                                                               |
| Generic confirmation submits                                                  | `action.confirm`                                                                              |
| Generic local-result headings, currently 10 identical messages                | `admin.shared.local-result`                                                                   |

This should not turn entity-specific actions such as “Видалити групу” into a bare “Видалити”. Preserve useful context and accessibility labels.

### Second pass: shared domain messages

- Group counts: `students.group-count`, `admin.teachers.profile.groups-count`, and `admin.courses.groups-count` have identical MF2 messages and `count` arguments. Move to a shared `groups.count` message.
- Coin unit plurals: `admin.balance.coins` and `profile.balance.caption` can share `coins.unit`, retaining the existing plural logic.
- Admin/teacher student editing: share nickname/avatar labels, save actions, and placeholders between `students.edit.*` and `student.edit.*`. Keep role-specific descriptions and permissions separate.
- Registration results: share access-code labels, copied feedback, and “Відкрити профіль” between student and teacher registration.
- Session/permission messages: choose one canonical message per actual failure meaning. There are already different session-expiry phrasings; unifying them is an editorial change, not just key deletion. Preserve operation-specific recovery instructions.
- Repeated titles and actions inside a feature can use a feature-level key instead of separate `.detail.*`, `.submit`, and `.title` copies when they truly have the same meaning.

### Do not consolidate blindly

- `admin.catalog.type.reward` is “Нагорода”, while `shop.reward.type.reward` is “Приз”. Decide whether the role-specific wording is intentional before sharing a type label. Matching privilege labels alone do not settle the whole enum's ownership.
- `reason.discipline` and `reason.discipline_breakdown` have identical text but represent different backend identifiers. Preserve coverage for both unless an explicit adapter normalizes the API contract.
- `action.cancel` and transaction cancellation can share a short label, but their confirmations and consequences must remain distinct.
- “Нова група” is both a creation-page title and a transfer target label. They are different concepts and may diverge in other languages.
- Number-only messages such as balance, price, and ranking points currently have identical formatting. They may need different precision or units later; identical formatting is not enough to merge every one into a generic `number` key.
- Do not replace full sentences with concatenated translated fragments or a universal “entity” argument: Ukrainian grammatical cases and plurals make this fragile.

## Namespace and naming direction

Separate two concerns: physical files make authoring manageable; runtime loading changes the bundle and provider lifecycle. A large source file only requires the former.

Suggested ownership boundaries:

- `common`: actions, shared filters, navigation, application error pages, roles, weekdays, categories, reasons, coin formatting, shared membership labels.
- `auth`: login and registration steps.
- `settings`: account settings.
- `student`: dashboard, greetings, goals, earn ways, rules, history, shop, leaderboard.
- `teacher`: groups, student drawer, student editing, awarding.
- `admin`: groups, courses/categories, people, catalog, operations, balance/streak management; split into subfiles as needed.

Shared components determine the boundary: a message rendered by both teacher and admin flows belongs in their shared catalog, not whichever role originally introduced it. Prefixes such as `profile.*`, `student.*`, and `students.*` currently cross these boundaries; classify by actual consumer rather than prefix alone.

First split source files without renaming active keys. This keeps call sites stable and separates structural changes from semantic consolidation. In a later migration, prefer domain keys such as `filters.all-courses` over page-specific repetitions. Shortening `admin.groups.create.submit` to a context-free `submit` is not an improvement unless a real namespace-aware API preserves the full identity and typing.

The provider behavior, source-loading constraints, and runtime approach are investigated separately in [Kanjou namespace research](./kanjou-namespaces.md).

## Initial verification and type incompatibility

`bunx kanjou compile` and `bunx kanjou generate` succeeded. A second `bunx kanjou unused` produced exactly the 136 retained candidates. CSS lint and `git diff --check` passed.

`bun check` stops at `src/routes/__root.tsx:96`: `virtual:kanjou/uk` is declared by the installed plugin as the parameter-schema type `Messages`, while `TranslateProvider` expects actual `Message` values. This structural mismatch is independent of which keys the catalog contains. The generated declarations only lost the 37 removed keys; their shape did not change. No casts, provider rewrites, dependency edits, or generated-type workarounds were introduced to hide the error. See the namespace research for the exact library declarations and a possible boundary workaround. The check also reports six existing effect warnings.

That was the initial result, not the final state: the declaration has since been fixed with a persistent Bun dependency patch. `bun check` now passes, with the same six unrelated existing effect warnings. Compilation, type generation, a development-mode production build, frozen-lockfile installation, and provider regression probes also pass. No `.test` files were added.
