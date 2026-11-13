# Achievements integration

## Ownership

DeepSeek V4.1 Flash (OpenCode Go, low reasoning) implements all application code, translations, routing, API integration and verification. GPT-6 Astra orchestrates, reviews and hand-draws SVG artwork only. Work in the current workspace; preserve the existing generated API changes. Read applicable AGENTS.md instructions before editing.

## Product decisions from the conversation

- Admin can list, create and delete achievements. Editing and manual awarding are outside the available API. The user cannot change the backend.
- Student home shows a compact achievements preview, earned count, a few earned badges and the nearest unearned target, linking to `/achievements`. Place it after DailyMission. Entry is from home, not a new student navigation tab.
- `/achievements` displays every achievement, earned and locked, in a continuous responsive grid. “Infinite grid” means a long scrolling page: endpoints return complete arrays, with no pagination. Use normal queries.
- Server `earned` and `progress_percent` are authoritative. Coin accounting, reversals and permanence are unknown. Do not infer progress from current balance or promise permanent ownership. `earned_coins` is available separately.
- No earned timestamp exists: do not claim badges are the latest earned.
- Creation uses `type: badge`; existing trophy/certificate records remain displayable as achievements without downloads or extra mechanics.
- `icon` is a string of 1–32 characters, with unspecified semantics. Creation automatically derives a frontend-owned identifier from required_coins. Render artwork from required_coins for existing records too; never inject arbitrary SVG/HTML. Confirm errors via API feedback rather than inventing backend constraints.
- Deletion updates catalogue and cached student progress; do not promise retained student achievements after deletion.
- UI copy follows the existing Ukrainian translation setup.

## Artwork contract

Astra creates six original transparent 160×160 SVG files under `src/assets/images/achievements/`, named `coin-laurel-1.svg` through `coin-laurel-6.svg`. Their basenames are the API icon identifiers.

User rejected unrelated robo-artifacts: achievements concern earned coins, so illustrations must correlate with required_coins. Each illustration shows coin stacks flanked by Greek-style laurel branches. Higher tiers have more coins and fuller wreaths. Use presentation-only fixed boundaries: below 5, 5+, 15+, 30+, 60+, 100+. The user confirmed one lesson per week earning at most 3 coins, plus 0.7 additional coins weekly (3.7 maximum total); 100 coins takes about 27 weeks at that rate. These are design choices, not API earning rules. Always display the exact threshold alongside the illustration, including non-round values. Null thresholds get neutral first-tier art without a fabricated number. No arbitrary icon picker: admin gets an automatic preview based on threshold. Use imported SVG URLs consistently with project tooling. Agent owns registry, tier selection helper, translations and all integration. Astra owns only SVGs. Replace all old artifact imports and names with the new coin-laurel names.

## Implementation sequence and acceptance

Artwork refinement: use the student theme palette (golden coins, mint laurels #43c9a5). Coins have vivid gold faces (#ffcd38), darker amber edges (#f5a623), and one broad pale reflection on each visible top face to avoid a matte look. User rejected gradients: use solid fills with a single translucent highlight shape. No inset rings, edge hatching, small highlight strokes, stars, sparkles or diamond symbols. User rejected the blue/purple wreath ribbons: remove ribbons and clasps entirely. Higher tiers increase coin count and wreath fullness, retaining vivid mint/teal foliage rather than muted antique colors. Preserve Astra's SVGs as supplied.

1. Inspect current API types/hooks, admin catalogue/create/delete flows, student home loader/model, navigation, translations and cache invalidation. Preserve generated files. Finish when implementation follows existing routing/form/query conventions.
2. Build shared achievement artwork registry and reusable presentation at the nearest shared parent for admin and student. Select artwork automatically by required_coins and display the exact threshold. Use badges/figures within sections rather than a separate card shell around each achievement, respecting the project card limit. Finish when all views use the same threshold-based selection and earned/locked status is available as text, not color alone.
3. Add `/admin/achievements`, create and delete routes beneath `_navigation/_admin/admin/achievements/`; add an admin navigation entry. Existing `_admin.tsx` supplies role guard/translations. Creation fields: name, description, icon, required_coins; type badge. Use schema limits from API, explicit pending/error states and existing form conventions. Prevent duplicate pending submissions and confirm deletion. Finish when success refreshes catalogue and student achievement caches, with useful server-error feedback.
4. Add shared student query usage, home preview and `/achievements` page with page model hooks. Source student id from authorized context. Preload using generated query options and share query keys between preview and collection. Keep home errors local with retry. Collection must support loading, error/retry, empty catalogue, no earned achievements and all earned achievements. Order deterministically by threshold then id, handle nullable thresholds without arithmetic on null. Clamp visual progress for rendering while preserving server earned status. Finish when home links to the full responsive collection and the collection displays all records.
5. Integrate achievement progress invalidation with daily mission success and existing admin/teacher balance-changing flows. Use generated exact student query keys when student id is known; use a matching partial key for catalogue mutations affecting all students. Refresh on focus/mount through existing query conventions; cross-user changes are not live pushed. Finish when local successful mutations cannot leave mounted achievement UI stale.
6. Run `bun check` after change batches as required. For CSS warnings run `bun lint:css --fix`, review edits, then rerun check. Do not create repository .test files. Verify route generation/build/type checks as appropriate using available scripts; inspect and fix all feature-related failures. Finish by reporting changed files, commands and results, and any remaining real blocker. Do not commit.

## API reference

- `useGetAchievementsAchievementsGet`: catalogue array.
- `useCreateCoinEarningAchievementAchievementsPost`: body name (1–200), description (1–1000), icon (1–32), optional type, required_coins number.
- `useDeleteCoinEarningAchievementAchievementsAchievementIdDelete`: path achievement_id.
- `useGetStudentAchievementProgressStudentStudentIdAchievementsGet`: path student_id; response earned_coins and achievements (id/name/description/icon/type/category/required_coins nullable/earned/progress_percent).
- Generated query key/options helpers accompany GET hooks; mutations do not automatically invalidate queries.

## Starting points

- `src/routes/_authorized/_navigation/_student/index.tsx` and `-hooks/use-student-page.ts`
- `src/routes/_authorized/_navigation/_admin/admin/catalog/`
- `src/routes/_authorized/-components/app-navbar/hooks/use-app-navbar.ts`
- `src/routes/_authorized/daily-mission/-hooks/use-daily-mission-page.ts`
- `src/routes/_authorized/_navigation/_admin/admin/-actions/invalidate-student-balance-caches.ts`
- Teacher balance change and transaction cancellation hooks under `src/routes/_authorized/_teacher/`
