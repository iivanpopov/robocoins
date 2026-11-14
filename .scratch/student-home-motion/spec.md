# Motion on the student home page

Discussion date: 2026-11-11.

## Status

This document records the agreed design direction. Implementation has not been requested; behavioral details still need to be worked out.

## Goal and principles

Give the home page character through unobtrusive motion. A typical visit is short: a student opens the app during class to check their balance or complete the daily mission. Animations should have a chance to be seen during such a visit.

- Do not block actions or delay navigation to finish animations.
- Do not cover the balance, buttons, or other useful content; do not shift the layout.
- Content is available immediately. Do not use generic slide-in/fade-in section entrances.
- Animate specific objects and their reactions, rather than the entire page.
- Avoid constant bouncing, intrusive movement, and lengthy ceremonies.

## Agreed directions

### Mascot greeting

A greeting version of the mascot appears, makes one calm greeting gesture, and leaves without excessive effects. The regular small mascot remains on the page, including for interactions and Easter eggs.

The greeting requires no response and does not interfere with immediately checking the balance or opening the mission. The exact gesture, placement, duration, and repetition frequency need to be defined separately.

### Podium assembly on scroll

When the podium first enters the viewport, its platforms rise slightly and assemble to their final heights, then the avatars take their places. First place receives a brief glint.

This is a short object-assembly animation, not a generic section entrance. Do not repeat the ceremony when scrolling back.

### Comets in the daily mission portal

Small comets occasionally cross the space background. These are individual background events, not a constant stream of particles.

Frequency must account for short visits: show the first comet shortly after the portal enters the viewport, followed by irregular pauses. The effect should not be so rare that students usually leave before it appears. Exact intervals have not been selected yet.

Do not add a press animation to the portal: it navigates directly to another page.

### Press feedback

This direction is interesting but needs separate exploration for specific elements. Consider a brief depression, compression, and release as tactile visual feedback. The action happens immediately, without waiting for the effect to finish.

The portal is excluded from these reactions. Specific effects for other elements have not yet been approved.

### Easter eggs and achievements

Provide two achievement scenarios:

1. Click every mascot.
2. Click one mascot 10 times in a row.

Integrate with the achievement system being implemented in another chat; its materials are in the neighboring `../achievements/` directory. Do not design a separate reward system for these interactions.

Before implementation, clarify the scope of “every mascot,” the rules for the 10-click sequence, and progress persistence. Achievement names and visual presentation have not been defined yet.

## Rejected proposals

- Generic fade-in/slide-in block entrances.
- Animating the portal on click or waiting for a visual transition before navigating.
- Light following the finger: perceived as a distraction.
- Constant bouncing and lengthy ceremonies.

## Boundaries of the agreement

Other initial ideas—parallax, data-driven mascot moods, a coordinated coin-award and goal-progress sequence, and other effects—are not included in the agreed scope. They should not be treated as approved for implementation.

## Comments

## Detailed context and interpretation of the feedback

### Motion is wanted, but should not become a separate activity

The user's key comment, translated: “I'd like to have animations, but not make them blocking or disruptive.”

This is not a request to remove expressive effects or make them almost invisible. The user is interested in a lively page, a greeting, podium assembly, and comets. The constraint concerns how these coexist with the student's primary task: the interface remains usable while a decorative event happens alongside it.

The visit pattern was stated explicitly: “open it during class to check the balance or do the daily mission.” Do not design effects around prolonged browsing of the home page. The balance must be readable immediately, and the daily mission link must work immediately. A student may leave before the greeting finishes; that is a normal scenario, not a reason to hold them on the page.

### Greeting: a separate short event, not the character disappearing

The user's wording, translated: “make it appear, greet somehow, and leave without a fuss.”

Subsequent clarification: “only the greeting version leaves.”

The intended behavioral sequence:

1. The home page is already usable, with its regular elements in place.
2. The greeting version of the character appears.
3. The character performs a short greeting.
4. The greeting version leaves on its own.
5. The regular mascot remains part of the page and available for Easter eggs.

The greeting requires no confirmation or manual dismissal. It must not become a modal, a tutorial with mandatory steps, or a splash screen before access to the balance. “Without a fuss” means a calm, small episode rather than a series of jumps, flashes, and celebratory particles.

The entrance and exit treatment has not been selected yet. Rejecting standard block entrances does not prohibit the mascot from moving during its greeting: the user explicitly wants it to appear and leave. The ban on section slide-ins must not automatically extend to every movement of the character.

Still unapproved: whether the greeting version appears next to the regular one, temporarily replaces it, or visually returns to its position; whether it waves, nods, or makes another gesture. Do not present any specific gesture as already chosen by the user.

### Portal: the background can be lively; clicking goes straight to the mission

The user's comment, translated: “the portal shouldn't animate on clicks, because it takes you to another page.”

The previously proposed portal depression, light wave on press, and camera zoom before navigation are excluded. This is not a suitable place to demonstrate local interaction feedback: the user clicked to enter the daily mission.

The space background remains a place for comets. Distinguish an independent background event from a press reaction: a comet is not triggered by a click, does not acknowledge it, and does not need to finish before navigation.

### Section entrances: the user specifically rejected the generic treatment

The user's comment, translated: “for block entrances, I don't want generic appearances like slide-ins, fade-ins, and so on.”

Do not adopt the initially proposed staggered entrance of the greeting, balance, and goal, upward fades of lower sections, or staggered reveals of earning-method items as the page's general motion style.

This is not a ban on all scroll-triggered events. Podium assembly explicitly interested the user: it has an object-specific meaning—the podium is being built. Entering the viewport can be the trigger, but the result should not reduce to a generic container animation.

### Podium: preserve the object-specific assembly

The user highlighted the initial proposal: “The platforms rise slightly from below, then the avatars appear. First place gets a brief glint. No lengthy ceremony,” and responded that the podium was indeed worth doing.

Preserve this sequence during further design:

1. The student scrolls to the leaderboard.
2. The platforms briefly assemble to their final heights.
3. The avatars take their places above them.
4. First place receives a single brief glint.
5. The podium remains in its regular static state.

Do not turn this into a separate awards screen or delay access to the leaderboard. Do not replace assembly with a general fade-in of the entire block. The order of individual places, exact movement distances, and durations were not discussed.

A single run on first entering the viewport, without replaying on reverse scroll, was proposed by the assistant when confirming understanding. This is a working interpretation, not a separately stated user requirement about persisting state across visits.

### Comets: “rare” does not mean “almost never seen”

The user liked the idea of a single shooting star but corrected its frequency: “some occasional comets, but they should be frequent,” explaining the short visits during class.

The meaning of this correction: individual passes separated by pauses, rather than a continuous meteor shower, while still being regularly noticeable during an ordinary short visit. The assistant's initial suggestion of an exceptionally rare event must not be carried into implementation without this correction.

The assistant's working interpretation: the first pass occurs shortly after the portal enters the viewport, followed by irregular pauses. It makes sense to measure the wait relative to portal visibility; otherwise, the first comet could pass before the student sees it. The user did not specify exact seconds or probabilities.

Comets support the space theme, do not announce a reward, and do not require clicking. They should not overshadow today's star or make it harder to understand how to open the mission.

### Presses: interest confirmed, design not yet chosen

The user's comment, translated: “press interactions are interesting; we need to think them through.”

This is agreement to explore the direction, not approval of the entire original table of effects. Button depression, avatar compression, coin rotation, and flame enlargement remain candidates, not finalized requirements.

Topics for the next design pass:

- Which elements genuinely benefit from tactile feedback.
- What pressing and releasing look like without delaying the action itself.
- How to avoid giving every button the same bounce.
- How to distinguish a playful mascot reaction from ordinary navigation-button feedback.
- How to maintain responsiveness during rapid repeated mascot clicks.

The portal already has an explicit exception. Finger-following light should not be reintroduced as a form of press feedback either.

### Finger-following light: do not pursue

The user's comment, translated: “not sure, I think that's a distraction.”

The user did not see value in a light spot following touch. This effect is excluded from the current direction. Do not substitute a similar pointer-tracking effect without further discussion.

### Easter eggs: exploring mascots and a sequence of clicks

The user's comment, translated: “click all the mascots, and also click a mascot 10 times in a row and add an achievement for that; the achievement system was already being implemented in another chat.”

There are two distinct actions here:

- Exploration: find the mascots and interact with each one.
- Persistent interaction: click a mascot ten times in a row.

The assistant suggested treating these as two separate achievements. The user subsequently clarified only the greeting-version behavior and asked to save the discussion. The number of individual achievement entries was not discussed further; two achievements is a working interpretation, not a reason to invent additional rewards.

The regular mascot must remain after the greeting so that interaction does not depend on whether the student managed to click the temporary character in time.

Do not independently add coins for clicks, a daily obligation to click the mascot, or a mandatory hint revealing the Easter egg. The user requested achievements within the existing system.

Open questions before implementation:

- Does “every mascot” mean on the home page or throughout the application?
- Do different placements count separately when they use the same mood?
- Does the temporary greeting version count?
- What interrupts ten consecutive clicks: a pause, another action, navigation, or switching mascots?
- Does the sequence persist across visits, and how is progress toward finding every mascot stored?
- What capabilities for these events already exist in the achievement system being implemented?

These questions do not invalidate the agreed ideas, but they must not be silently resolved when implementing this document.

## Behavioral checks for the future design

These translate the discussion into observable behavior, not an instruction to start implementation or write tests.

| Situation                                                   | Expected behavior                                                                                              |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| The student opens the home page only to check their balance | The balance is immediately readable; the greeting does not cover it or require action                          |
| The student immediately clicks the daily mission            | Navigation starts immediately, without a portal click animation or waiting for the greeting                    |
| The greeting finishes                                       | The temporary version has left; the regular mascot remains                                                     |
| The student scrolls quickly                                 | There is no chain of hidden sections waiting for fade-ins or slide-ins                                         |
| The leaderboard enters the viewport                         | The podium itself assembles briefly, then remains in its final state                                           |
| The student sees the portal briefly                         | There is a realistic chance of noticing a comet; the effect is not designed only for prolonged idle viewing    |
| The student stays at the portal                             | Comets appear as separate events with pauses, not a continuous stream                                          |
| The student clicks the mascot repeatedly                    | This is a potential Easter egg scenario; playing a reaction must not interfere with counting subsequent clicks |

## Clarification history

- The user confirmed: only the greeting version of the mascot leaves; the regular mascot remains.
- The user requested only saving the discussion in `.scratch`, without code changes.
- After the first save, the user noted that the document was too vague and did not capture the comments fully enough. Original wording, decision rationale, behavioral sequences, boundaries of confirmed decisions, and open questions were added.
