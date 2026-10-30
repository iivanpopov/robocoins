# Admin interface guidelines

These rules describe the admin cabinet (`/admin`) as it was shaped during the admin account work. They come from the product owner's review of the implemented screens, not from a separate design system. The original review messages contained screenshots that are not reproduced here; the rules below are the written, reusable part of that feedback.

The admin cabinet belongs to the same restrained, flat visual direction as the teacher interfaces. It is not a third style and not a variant of the child-facing hero UI. The rules below describe admin structure, content, and interaction; they do not introduce a separate visual language. See [UI directions](./ui-directions.md) for the project-level split.

## Product constraints

- Admin is a phone-first, phone-only cabinet. Design for a narrow viewport first; do not add desktop-only layout branches to solve admin UI problems.
- The audience is an adult administrator. Avoid playful decoration, oversized hero elements, mascots, and gamified surfaces that belong to the student flow.
- The interface is in Ukrainian. Use sentence case everywhere; uppercase text is forbidden in UI.
- Reuse existing components, tokens, colours, icons, radii, and backgrounds. Do not invent a new visual style, a new colour variable, a new card treatment, or a "temporary" background for one screen.
- If a category or type has no colour defined in the project, use the neutral existing style. Never add a colour that exists only in the new screen.
- At most one to three cards per page.
- Use real API mutations where they exist. Where a mutation does not exist, build the complete UI flow and skip the request honestly; never fake a successful change.

## Reuse these building blocks

| Need                | Existing building block                                  |
| ------------------- | -------------------------------------------------------- |
| Filter chip         | `ThemedChip` (`src/routes/-components/themed-chip/`)     |
| Category icon       | `CategoryIcon` (`src/routes/-components/category-icon/`) |
| Search field        | `InputGroup` + `InputGroupAddon` with the magnifier icon |
| Primary action      | `Button` with a plus icon and a direct label             |
| Icon-only action    | `IconButton`                                             |
| Overflow action     | `Popover` opened from a `⋯` `IconButton`                 |
| Learning page shell | `CoursePageLayout` / group page layout                   |
| People page shell   | `TeacherPageLayout` / `StudentPageLayout`                |

Do not duplicate these patterns with local implementations. When two sibling branches need the same chip, icon treatment, or row behaviour, move it to the nearest shared slice and update both consumers.

## Layout and spacing

- Every admin page uses the same outer padding: `--spacing-lg` vertically, `--spacing-md` horizontally, centred container, full width.
- Do not tune horizontal padding per page. If a page needs a narrower reading column, cap its width (focused forms and the reward catalog use `36rem`) instead of changing the padding.
- Use vertical spacing to separate sections. Do not add divider lines, top borders, or nested cards between sections that are already distinct.
- Do not put forms, filter groups, or list rows on a white or tinted backing card unless that exact surface is already part of the pattern being reused. Default to the page background.
- Content starts at the top. Do not vertically centre a heading against an action or a form against the viewport.

## Page headers

### List pages

List pages (groups, courses, categories, students, teachers, catalog, operations) follow one header shape:

- No back button.
- No description under the title. The title and the active tab already explain the page.
- Title on the left, primary action on the right: `justify-content: space-between`, `align-items: flex-start`.
- The title is top-aligned with the action, not vertically centred against it.
- The primary action is a standard `Button` with a plus icon: "Створити", "Зареєструвати", "Додати нагороду". Registration must not look different from other creation actions.
- The action must not shrink or wrap under the title. On a narrow viewport the title may wrap; the action stays at the top right.
- If the page has a second, rarer action, keep the primary visible and move the secondary into a `⋯` menu. Do not show two competing filled buttons.
- Do not stack a banner, description, bulk action, create action, search, and counter above the list. The list is the page; keep the path to the first row short.

### Detail pages

Detail pages (group, course, student, teacher, reward) use a split header:

- Back control on the left (`arrow-left`), heading on the right.
- The copy block is right-aligned; the title and the short subtitle sit at the right edge.
- The gap between the back control and the copy is deliberately wide; use `xl` where the page previously felt cramped.
- The subtitle carries the one piece of context that is not obvious from the page itself: the course under a group name, the category under a course name. Do not repeat the same value in a metadata row below.
- Heading actions ("Керувати складом", "Керувати викладачами") sit at the top right of their section, not in a separate row and not as competing page-level buttons.

### Create, edit, rename, delete pages

- Same split header as detail pages: back on the left, title (and result copy where needed) on the right.
- The back control is the only cancel affordance. Do not add "Скасувати" buttons; there is already a back arrow at the top left.
- Do not put a helper paragraph above the form. If a note is genuinely required, put it under the field it describes.
- Descriptions are allowed only when they explain a consequence the administrator cannot infer, such as the result of a rename or delete. They must not restate the title or the obvious purpose of the form.

## Section navigation

### Top section navbar

Sections that contain more than one list use a persistent top navbar:

- Learning: "Групи · Курси · Категорії".
- People: "Учні · Викладачі".
- The navbar is sticky, opaque, full width, and flush with the top of the content area. It is not the floating translucent bottom navbar and must not look like it.
- Active state uses the existing tab treatment: brand text plus a 2 px brand underline. Do not add a grey outline, border, or pill around the tabs.
- The navbar is visible on section list pages, detail pages, and forms, so the administrator can move between subsections from anywhere in the section.
- The page title must match the active tab, including the browser tab title. "Групи" is not "Навчання"; "Категорії" is not "Категорії курсів".
- Do not add an intermediate chooser page. People goes straight to the students list; the old choice screen is not part of the flow.
- Do not duplicate section entry points on the page body (no "Курси" card on the groups page, no "Категорії" button on the courses page). The top navbar is the only section switcher.

### Bottom navbar

- Admin order is: settings, learning, people, catalog. Settings is the leftmost item.
- Operations is temporarily hidden from the navbar. The `/admin/operations` pages remain functional and can be reached by URL; restoring the entry is a one-line change.
- The active item is derived from the committed route (resolved location), using the longest matching path prefix, not from the route that was just clicked.
- If a navbar item points at an index route that redirects, give the item a separate direct `path` (People points at `/admin/people/students`) while keeping `to` for active-state matching. A redirect drops the view transition.

## Lists, rows, and counters

- Do not show result counters: "Знайдено N", "N груп", "N курсів, N груп", "Знайдено: N". The list itself shows how much is there.
- Inline counts inside filter chips are allowed because they describe the filter option: `Робототехніка (2)`, `Усі (3)`. The count changes colour with the selected chip.
- Course names in a student or teacher row are comma-separated, not a stack of labels.
- A row shows each piece of information once. Do not repeat the category icon in the same row.
- Category icons in rows are square, sit on the left at full row height, and use only thematic colours that exist in the project.
- The selection check sits on the right. Keep the row background neutral; when a row is selected, use the existing selected treatment, not a new coloured backing.
- Do not add a separate line for the number of groups when the list already makes it obvious.
- Do not add dividers between row sections; use spacing instead.
- The courses list inside an expanded category has no separators between courses and no group counter next to a course name.
- The category accordion header shows only the category name and icon. Do not put course or group counters in the summary line.

## Filters and search

- Every search field is an `InputGroup` with the magnifier icon. The clear "x" button appears only when the field is non-empty.
- On the groups list, the three filters (course, direction, teacher) are collapsed behind a square funnel `IconButton` to the right of the search. They are not permanently visible, and they stay open while values are selected.
- On the students list, direction comes before course and group. Filters use the same `AdminSelect` triggers as the groups list, with "Усі …" placeholders; changing a parent filter resets the child selection.
- Student filters are collapsed behind the same square funnel `IconButton` as on the groups list. They are not permanently visible; the button stays pressed while the filters are open.
- In the student registration group picker, do not add a plain text search. Category and course chips are enough; the group list itself remains a multi-select.
- Filter labels must say what they filter:
  - "Усі напрямки"
  - "Усі курси"
  - "Усі групи"
  - "Усі викладачі"
  - "Усі типи"
  - "Усі категорії"
- Never use a bare "Усі" when two filters sit on the same screen.
- If "all" is meaningless for a picker, remove it. The group picker lists courses, and its label is "Курси", not "Групи".
- Chips contain only options valid under the current parent filter: selecting "Робототехніка" must not leave a Unity course visible, and changing the direction resets the course.
- Chips may scroll horizontally, but the scrollbar stays hidden. Do not clip chip text; either scroll or wrap according to the existing pattern for that block.
- Chips use the same category icons and icon sizes as other filters in the project.
- On the learning page, the three selects are stacked as full-width rows, not squeezed into one three-column row.
- Do not put the filter block on a white card or add card padding around it.

## Forms

- Course creation: choose the category first, then enter the name.
- Group name is a schedule token, not free text. Accept exactly `ПН|ВТ|СР|ЧТ|ПТ|СБ|НД` + a space + `HH:MM`, for example `НД 16:00`. Validate it and put the format requirement in the placeholder.
- Put helper text under the field it explains. Remove helper text that restates the field label.
- Keep required-format hints in the placeholder; do not write vague placeholders.
- Selects show the thematic category icon in both the trigger and the option list.
- Teacher selection uses individual cards with avatar, name, role, and a checkbox on the right. Selected cards are indicated by the checkbox and the existing selected state, without an extra blue outline. Do not wrap the picker in a white container.
- Do not put the form on a white backing card.
- The submit button uses the standard `Button`; it must not shrink or be pushed aside by other elements. Remove secondary cancel actions.

## Detail page specifics

### Group

- Header: group name with the course name as a subtitle underneath, right-aligned.
- Do not repeat the course in a metadata row. Do not show "Напрямок" at all.
- Do not show student/teacher counts.
- "Керувати складом" and "Керувати викладачами" sit to the right of their section titles and use the same quiet treatment as "Вся історія": muted text with an arrow, not a filled pill.
- Do not duplicate "Керувати викладачами" inside the "Керування групою" block.
- Keep "Керування групою" without explanatory text.

### Course

- Show the category once, as a subtitle under the course name.
- Do not repeat the category in a metadata block with group counts.
- Group rows under a course reuse the shared row pattern: thematic category icon on the left, group name, caret on the right. Do not show student or teacher counts in these rows.
- Do not add a footer explaining that some actions have no server operation.

### Student profile

- Header: back control on the left, the student's name on the right, "Учень" as the subtitle.
- Drop the identity card with group and course metrics. The membership list already shows the groups and their courses; do not repeat them in a separate "Курси" block.
- "Керування учнем" holds all actions as one row list: edit, access, balance, streak, delete. Use the shared row anatomy: square icon, title, short explanation, caret. Do not stack separate card links or divide the list with lines.
- "Членство" keeps a quiet "Керувати групами" link at the right of the section title, muted text with an arrow, not a brand-coloured link.

### Teacher profile

- Header is the same split header: back on the left, the teacher's name on the right, "Викладач" as the subtitle. Do not open with a row that contains only a back button.
- There is no bulk teacher assignment and no teacher-side group assignment. Teachers are assigned from a group page through "Керувати викладачами"; the teacher profile only lists the resulting groups.
- "Керування викладачем" has no explanatory paragraph above the rows.

### Reward detail

- Use the split detail header: back on the left, the reward name on the right, `type · category` as the subtitle, price under it. Do not turn the type into a decorative pill.
- Do not render a summary table that repeats the type and category. There is no image field in the reward response, so do not show an image placeholder row.
- Description is an optional "Опис" section below the header.
- "Керування нагородою" is a row list with icons: edit, hide, show, delete. Do not wrap the actions in a card or put an explanatory paragraph above them.

### Success screens

- A successful creation result uses the same split header as a form: back on the left (returning to the list), the result title on the right, and the created entity's name as the subtitle.
- Do not invent a separate success badge style. The explicit title "Викладача створено" is enough; if an icon is used, it must be an existing icon and an existing colour token.
- The access code stays in one neutral surface block with the copy action. The description explaining what the code is for goes below that block.
- Primary action: open the created profile. Secondary ghost action: create another. The back arrow already returns to the list, so do not add a separate underlined "До списку" link.

### Change category

- The subtitle shows only the course name, for example `Arduino Junior`. Do not add "Нова категорія для курсу…".
- The back control returns to the categories page that launched the change, not to the course detail.
- Category deletion is not part of the product. Do not add a delete action, page, or hook for categories.

## Catalog

- Header: title on the left, "Додати нагороду" at the top right. The action never drops below the title.
- The filter block has no white background and no inner card padding.
- Category chips scroll horizontally with a hidden scrollbar when there are more chips than fit.
- Reward rows reuse the existing catalog row pattern; do not introduce a new card style for one screen.

## Settings and operations

- Do not show an "Адміністрування" section in settings.
- Password visibility belongs to the student settings only. Teacher settings must not reveal a password.
- Operations pages use the same header, description, and background rules as the rest of the cabinet: back on the left, title on the right, no page description, no explanatory copy for "Масові операції" or "Результати", no white form card.
- Hiding an entry from the navbar does not remove the page or its route.

## Motion and view transitions

Motion is deliberately narrow: only navbar taps animate. Everything else changes instantly.

- Do not set `defaultViewTransition` on the router. The router must never animate a navigation on its own.
- Animate only taps on the bottom navbar and the top section navbars. Do not add `viewTransition` to in-page links, cards, rows, back buttons, or form actions.
- Direction follows tab order: moving to a tab with a higher index is `slide-forward`, moving to a lower index is `slide-backward`.
- Tapping the already active tab performs no navigation and no animation.
- Section navbars and the bottom navbar read the resolved (committed) location. The active tab must change in the same render as the new content, inside the transition, not at the moment of the tap.
- Navigate to the final route. If a navbar target would redirect, point it directly at the destination; a redirect drops the transition.
- During the transition, the navbar must stay visually stable. Page content travels as `slide-content`; the bottom navbar is the named `navbar` layer. A section navbar must not visibly switch before the content starts moving.
- Do not animate search, filter, sort, or tab changes that stay on the same route.
- The registration flow and the student shop call-to-action keep their own manual transitions. They are outside the admin navbar behaviour and should not be used as a reason to re-enable global router animation.
- Respect the existing reduced-motion preference.

## Content and language

- Ukrainian, sentence case, direct wording.
- No marketing copy and no backend/technical notes in the UI.
- Do not explain what the page already shows.
- Do not use uppercase for labels, buttons, or section titles.
- Prefer one obvious primary action per page. Put rare administrative actions behind a menu instead of competing with the primary action.
- Use "Створити" for creation entry points, "Зареєструвати" for people, "Додати нагороду" for catalog items, unless the existing screen already uses a more specific verb.

## Review checklist

Before considering an admin screen finished, check:

- [ ] No uppercase text.
- [ ] No new colours, backgrounds, shadows, or card treatments.
- [ ] No result counters, no bare "Усі", no duplicate information.
- [ ] List header: no back, no description, title left, action top right.
- [ ] Detail/create header: back left, title right, no "Скасувати", no helper paragraph above the form.
- [ ] Search fields use `InputGroup` with a magnifier; chips use `ThemedChip` and real category icons.
- [ ] Parent filters reset child filters; chips contain only valid options.
- [ ] No divider lines, no nested white cards, no clipped chips.
- [ ] Active tab and page title match; section navigation uses the top navbar only.
- [ ] Only navbar taps animate; active tab changes with the content; navbar target has no redirect.
- [ ] Outer page padding matches the shared admin layout.
- [ ] Back navigation returns to the screen that logically launched the current screen.
