# Goal selection and avatar rings

## Status

Implemented. Goal selection is available from reward details, and the unified self-profile editor supports nickname, avatar, and avatar-effect changes with per-field save handling. The persisted `avatar_ring` API field is presented in the interface as an avatar effect because the available treatments sit behind or below the avatar rather than around it. The remaining dependency is leaderboard support for `avatar_ring` in [GitHub issue #19](https://github.com/iivanpopov/robocoins/issues/19#issuecomment-6725487518): leaderboard entries render without effects until the response exposes the field, without per-entry profile requests.

Use the terminology in [GLOSSARY.md](../../GLOSSARY.md) and the existing [UI directions](./ui-directions.md). Preserve the current visual direction while adding the required controls and feedback.

## Goal selection

- Add “Обрати ціллю” to the existing reward details in the shop.
- Allow selection regardless of the student's balance, using the existing course eligibility filter.
- Mark the current goal with an inactive “Поточна ціль” action.
- Allow replacing a goal even when the student has enough coins to reach it.
- Selecting a goal does not purchase or claim a reward.
- Keep reward details open after success, show confirmation, and refresh related data.
- Prevent duplicate submissions while saving; show failures and allow retry.
- Make goal selection the primary working action in reward details. Do not show the unimplemented claim action.
- Removing a goal is not supported by the current request contract.

### API and state

Use `useChangeGoalStudentStudentIdChangeGoalPatch`:

```ts
{
  path: { student_id: studentId },
  body: { new_goal_reward_id: rewardId }
}
```

The response contains `new_goal`, not the complete progress response. Read the current goal ID from `reward-progress.reward.id`; do not infer it from the undocumented `current_goal` string.

Refresh goal progress and affected profile/session data after success. The router's user context comes from `['session']`, so updating only the generated student query is insufficient. Preserve the existing goal-ID-aware progress animation behavior.

## Unified self-profile editing

- Provide a single editor for nickname, avatar, and avatar ring.
- On the main screen, show the nickname with a small up-right arrow indicating that it opens the student's profile, following the Gamerverse banner's indicator treatment. The current hero does not render the nickname as text, so this requires adding it.
- On the profile page, place a pencil action on the right that switches the profile into editing mode. The editor is a mode of the profile, rather than a separate drawer.
- Provide a preview and one “Зберегти” action.
- In editing mode, replace the nickname text with an input and use the existing avatar position as a live preview. Preserve the main layout rather than replacing the page with a different screen.
- Hide the coin balance and course list while editing, then restore them in viewing mode. Expand personalization controls below the identity block.
- Below the preview, provide “Аватар” / “Ефект” tabs with one selection grid visible at a time. The preview combines the draft avatar and effect.
- Provide “Зберегти” and “Скасувати”. After all changes save successfully, return to viewing mode. Stay in editing mode on partial failure.
- Cancel discards unsaved changes; already persisted changes remain saved. Confirm navigation away from the page when unsaved changes exist.
- On mobile, keep save/cancel actions fixed at the bottom during editing, respecting safe areas and the on-screen keyboard without covering content. The fixed actions stay flat: no surrounding card, background panel, border, or shadow.
- Show field-specific errors beside the affected settings and the overall result near the actions, without toast notifications. On partial success, identify saved and failed fields explicitly. After full success, return to viewing mode without a success badge or status message.
- Submit only changed fields through their respective API operations.
- Track each field's save result. On partial failure, keep the editor open, explain which changes failed, and retry only unsaved changes.
- Synchronize profile, session/router context, and affected lists after successful updates.
- Confirm self-edit authorization for nickname and avatar during integration; generated types do not express role permissions.

## Avatar effect catalogue

The catalogue is stored under the existing `avatar_ring` API name, while the interface presents each option by its visual effect. The initial catalogue and availability are mocked; the selected effect is persisted through the real API.

| Option         | Availability | Persisted ID | Visual direction                                |
| -------------- | ------------ | ------------ | ----------------------------------------------- |
| No effect      | Available    | `none`       | Undecorated avatar                              |
| Fire           | Available    | `outline`    | Connected three-tongued flame behind the avatar |
| Aurora         | Available    | `double`     | Two soft aurora ribbons around the avatar       |
| Orbital effect | Locked       | `orbital`    | Orbital decoration                              |
| Star effect    | Locked       | `star`       | Decorative stars                                |

The persisted identifiers remain `none`, `outline`, and `double`. The labels “Полум’я” and “Полярне сяйво” describe the accepted artwork; the legacy identifiers remain unchanged for round-trip persistence.

Locked effects are entirely non-interactive: they cannot be selected, previewed, or saved. This supersedes the earlier locked-preview proposal. Show a lock and “Незабаром”; do not invent prices or unlock requirements. Keep the artwork legible rather than heavily dimmed, and keep locked tiles flat with no dashed outline, border, or filled card surface.

All avatar selection surfaces use the shared controlled tiled picker in `src/routes/-components/avatar-picker/`: the self-profile editor, the teacher student-edit drawer, admin student editing, and admin student registration. The effect picker in `src/routes/-components/effect-picker/` is a separate controlled picker for the avatar-effect field. Both consume the shared visual grid and tile primitive in `src/routes/-components/visual-picker/`, so they share tile spacing, selection outline, focus treatment, and flat surfaces instead of maintaining two independent tile systems. The primitive carries an explicit `avatar`/`effect` layout variant: avatar tiles are compact square controls that show only the artwork with an accessible name, while effect tiles keep their visible captions and use a two-column grid on mobile so labels never collapse into narrow stacks. The avatar grid is left-aligned in row-major order, so an incomplete final row starts on the same left edge as the first row.

The avatar picker owns avatar selection through its `useAvatarPicker` hook, and the effect picker owns effect selection through `useEffectPicker`. Both hooks receive `value`, `onChange`, and `disabled`; consumers retain their own form, draft, save, and network state. The teacher drawer remains a wrapper that adds the drawer surface and save action, and the registration carousel remains a separate experience.

Use one 2px brand selection outline around the selected tile, without an additional selected border, checkmark, or filled background. Keep picker tiles flat and transparent at rest. Show a clear focus-visible outline, without rendering a second selected outline at the same time. Reserve enough padding inside the picker grid and avoid scroll clipping so the complete rounded outline stays visible on every side. Indicate the persisted effect with a small “Поточний” label and locked effects with a lock; selection must not rely on colour alone.

The two available effects are deliberately more distinctive than a plain circle. Fire is one connected flame silhouette behind the avatar with three sharp tongues branching from a common rounded base: the centre tongue is highest, the right tongue sits higher than the left, and the whole silhouette rises behind and above the upper face area. Its outer edge is warm orange with a bright amber-yellow core. Flames must not read as separate blobs under the chin. Aurora uses two soft, curved turquoise, cyan, and violet bands with feathered tapered ends behind the avatar, one above and one below the face area, plus a faint bounded cyan/violet glow, without a large opaque radial backdrop, hard rectangular cut edges, or a dark backdrop. The bands are painted with CSS gradients and feathered masks rather than SVG paint servers, so the artwork stays coloured in every rendering context. Both may animate, but only transform and opacity: no animated filters or full-surface repaint loops. Flame flicker is anchored at the bottom with no lateral travel; aurora bands drift and fade gently within the same constrained avatar envelope. Respect `prefers-reduced-motion` with a static composition.

Use warm amber and orange for fire, turquoise, cyan, and violet for aurora, a cool violet/cyan palette for the orbital effect, and gold tones for the star effect. Do not extend these decorative palettes to buttons or unrelated interface elements.

Effect geometry belongs to `UserAvatar` and uses percentage-based positions relative to the rendered avatar box, not `data-size` variants. A size-`lg` picker tile and a custom-sized large profile preview therefore show the same normalized flame and aurora proportions. Decoration must not obscure the avatar's face, nearby text, or adjacent leaderboard rows; keep the effect within the avatar envelope so it never escapes the avatar tile or profile container.

### Persistence

Use `useEditStudentAvatarRingStudentStudentIdAvatarRingPatch`:

```ts
{
  path: { student_id: studentId },
  body: { new_avatar: ringId }
}
```

The endpoint is `PATCH /student/{student_id}/avatar-ring`. Despite the field name, `new_avatar` carries the effect identifier. The response is `StudentProfileResponse`, which now includes `avatar_ring?: string | null`.

Per the user's backend clarification, identifiers are freely chosen. Use `none` for an explicit no-effect selection; keep catalogue identifiers within the generated schema's documented 1–16 character range. Verify round-trip persistence during integration. Missing/null values render without an effect; unknown identifiers should degrade to an undecorated avatar.

### Shared rendering and backend dependency

Render effects consistently on the main screen, profiles, leaderboard, and teacher/admin student representations through a shared avatar presentation. Several current consumers render `Avatar` directly, so changing only `UserAvatar` is insufficient.

`BalanceLeaderboardEntry` currently lacks `avatar_ring`. The request to add it is recorded in [GitHub issue #19](https://github.com/iivanpopov/robocoins/issues/19#issuecomment-6725487518). Complete leaderboard integration once the response exposes the field; avoid fetching a separate profile for every leaderboard entry.

## Implementation sequence

1. Resolve the open visual and interaction decisions below.
2. Prepare the effect catalogue, shared avatar rendering, shared visual grid/tile primitive, shared tiled avatar picker, and effect picker.
3. Build the unified self-profile editor and per-field save handling.
4. Connect goal selection in the existing shop details and refresh dependent state.
5. Integrate all avatar consumers, including leaderboard once its backend dependency is ready.
6. Address generated-type compatibility errors and verify the complete flows.

## Verification

- Verify goal selection below and above the reward price, replacing a reached goal, current-goal indication, and failed submissions.
- Verify profile changes survive reload and appear in all affected views.
- Verify the editor hides the coin balance and course list, while viewing mode shows both.
- Verify locked effects do not respond to pointer or keyboard interaction and no-effect selection round-trips as `none`.
- Verify partial save success and retry without resubmitting successful fields, and that full success exits editing without a success badge.
- Verify all four avatar picker surfaces use the shared tiled picker and the effect picker uses the same visual grid/tile primitive, with accessible labels on icon-only avatar tiles, visible captions on effect tiles, a single unclipped selected outline, flat tiles, disabled controls while saving, and entirely non-interactive locked effects. Verify the nine-tile avatar grid is left-aligned at 375 and 414 px, with the incomplete final row starting at the same left edge as the first row.
- Check fire and aurora at 40, 80, and 128 px: one connected flame silhouette with the centre peak highest and the left peak lower than the right, two feathered cyan-to-violet aurora bands with matching normalized positions at every size, no lateral animation drift, no decoration reaching the balance text or escaping the avatar envelope, keyboard focus, mobile layout at 320/375/414 px, and reduced-motion behaviour.
- Run `bun check` after changes. It now passes; the pre-existing effect-state warning in `use-goal-progress.ts` remains.

## Implementation details

Exact CSS dimensions and Ukrainian validation/error wording follow the approved behavior and existing interface conventions. Fire uses an inline SVG silhouette. Aurora uses CSS gradient bands with feathered masks, without SVG paint servers or generated images. No further product decisions are pending.
