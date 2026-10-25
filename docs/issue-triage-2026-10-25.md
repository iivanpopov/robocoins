# Issue triage — 2026-10-25

Repository: https://github.com/iivanpopov/robocoins

All 23 open issues were read. None had comments. Sol 6.1 low assigned exactly one priority label to each issue, preserving other labels. Astra assessed implementation scope and planned the work; Sol 6.1 medium implements each feature in its own worktree. The live backend OpenAPI endpoint list was also checked against the generated clients; the missing mutation and game APIs listed below are not merely stale client generation.

## Selection criteria

Priority describes user impact, independently of effort. A cheap implementation is a bounded frontend change supported by existing API contracts, with no new backend persistence, economic rules, content pipeline, or unresolved product dependency. The batch also includes the moderately sized, self-contained galaxy navigation and transaction-history changes.

| Issue                                  | Priority | Effort / disposition           | Reason                                                                                                            |
| -------------------------------------- | -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| #34 Wrong course-based rewards display | high     | Selected, small                | Filter existing reward categories against enrollment; also protect the home goal.                                 |
| #17 Confirmation dialogs               | high     | Selected, small                | Existing alert-dialog primitives; transaction cancellation and deductions need confirmation.                      |
| #35 Student administration             | high     | Backend-dependent              | No generated APIs for updating student groups, names, avatars, or regenerating passwords.                         |
| #5 Full reward history                 | medium   | Selected, moderate             | Existing transactions endpoint supports limit/offset; add guarded routes and infinite loading.                    |
| #1 Group suggestions                   | medium   | Selected, small                | Existing group names encode weekday/start time; rank active lessons first.                                        |
| #18 Basic shop view                    | medium   | Selected, small                | Reuse loaded rewards and detail panel in an accessible list.                                                      |
| #40 Disable animations button          | medium   | Selected, small                | Extend existing reduced-motion helper and stylesheet with a persisted preference.                                 |
| #38 Rework galaxy                      | medium   | Selected, moderate             | Bounded local geometry/gesture change; no API dependency.                                                         |
| #6 Select own goal                     | medium   | Backend-dependent              | Reward progress is read-only; no endpoint persists a selected goal.                                               |
| #16 Balance rework                     | medium   | Unspecified/backend-dependent  | Body only says “BALANCE REWORK NEEDED”; no rules or acceptance criteria.                                          |
| #20 Daily streak tasks                 | medium   | Large/backend-dependent        | Requires daily task content, completion validation, streak persistence, and fractional awards.                    |
| #21 Achievements                       | medium   | Large/backend-dependent        | Requires authoritative event history and achievement persistence.                                                 |
| #22 Challenges                         | medium   | Large/backend-dependent        | Requires task validation, bets, and atomic balance settlement.                                                    |
| #23 Leaderboard                        | medium   | Backend-dependent              | User listing exposes only id/name/role, not ranked balances, courses, or avatars.                                 |
| #25 View profile                       | medium   | Dependency-blocked             | Basic profile data exists, but the requested achievements depend on #21.                                          |
| #36 Change profile                     | medium   | Backend-dependent              | No profile mutation, name-change request, or password-regeneration endpoint.                                      |
| #37 Custom rewards                     | medium   | Backend-dependent              | Balance mutations accept enum reasons only; arbitrary amounts/reasons and per-lesson cap need server enforcement. |
| #2 Goal progress bar animation         | low      | Selected, small                | Animate increases using a per-student/per-goal seen snapshot; honor reduced motion.                               |
| #39 Cyberween banner                   | low      | Selected, small                | Decorative seasonal greeting without invented event benefits or nonfunctional actions.                            |
| #9 Review home page design             | low      | Unspecified/dependency-blocked | Card redesign is unresolved; requested badges depend on #21.                                                      |
| #19 Avatar ring API                    | low      | Backend-dependent              | Explicitly an API task; no ring contract exists.                                                                  |
| #24 Custom avatar                      | low      | Backend-dependent              | Paid personalization needs upload/storage and atomic 15-coin purchase.                                            |
| #33 Propose avatar emoji               | low      | Backend-dependent              | Once-per-user suggestions need persistent submission and availability rules.                                      |

## Implementation decisions

- #1 uses the viewer's local clock, the existing 110-minute lesson duration, and stable ordering for inactive groups. Malformed schedules are never suggested as active.
- #2 must not invent a previous balance. A previously seen snapshot supplies the baseline; first visits without reliable evidence show current progress directly.
- #34 uses existing course categories. Frontend filtering fixes display but does not replace backend reward authorization.
- #39 has no description or artwork requirements. The chosen minimal interpretation is an October-only Cyberween greeting, dismissible for the current year, with no advertised promotion.
- All feature commits remain local. The original working copy contains pre-existing edits to `AGENTS.md` and a deleted `src/lib/react-ssr.test.ts`; these are not part of the batch.

## Delivery

The integration branch is `issues/cheap-batch`, in `/tmp/opencode/robocoins-integration`. Individual branches live under `issues/<number>-<slug>` in `/tmp/opencode/robocoins-<number>-<slug>`. Every branch was created from `4ee215f`.

| Issue | Branch                       | Feature commit |
| ----- | ---------------------------- | -------------- |
| #1    | `issues/1-group-suggestions` | `a04d079`      |
| #2    | `issues/2-goal-animation`    | `7f2b449`      |
| #5    | `issues/5-reward-history`    | `a60ad8f`      |
| #17   | `issues/17-confirmations`    | `2247f29`      |
| #18   | `issues/18-basic-shop`       | `f7bc48b`      |
| #34   | `issues/34-course-rewards`   | `d7016cb`      |
| #38   | `issues/38-bounded-galaxy`   | `f99ef58`      |
| #39   | `issues/39-cyberween`        | `837393d`      |
| #40   | `issues/40-reduce-motion`    | `d4a397a`      |

The integration branch carries the nine feature commits above (with two integration touch-ups: banner dismissal reads through an external store, and conflicts between reward eligibility, goal animation, the banner and history were resolved by hand).

Verification on the integration branch: `bun check` passes with no warnings, `bun run build` succeeds, no `.test` files or code comments were introduced, and `git diff --check` is clean.

Not verified: no request ran against the live backend, so server-side permission behavior (group lookups for a student, teacher-to-student history access) and real pagination remain unconfirmed. Interactive browser checks were attempted but the machine lacks `libasound.so.2`, which keeps Chromium from launching.

## Remaining backlog

Nothing from the cheap set is left open. The remaining fourteen issues are blocked for the reasons in the table above and need decisions or backend contracts before implementation:

- Backend contracts: #35, #36, #37, #23, #24, #33, #19.
- Large features with content and persistence: #20, #21, #22.
- Dependency on #21: #25, #9.
- Underspecified: #16.
- #6 needs a persisted goal-selection endpoint.

Usage note: #39 assumes an October season; if the event has different dates or artwork, the banner needs that input.
