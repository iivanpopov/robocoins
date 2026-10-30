# Kanjou message splitting and route namespaces

Investigated 2026-10-27 against the installed `@kanjou/react` 0.4.4 distribution and its installed core, plugin and generator. The original investigation is preserved below; the subsequently authorized implementation is described first.

## Implemented architecture

- Source dictionaries live under `src/assets/locales/uk/`, with six namespaces and smaller admin fragments. The complete `uk.ts` entry composes all of them for CLI validation and global ID/argument generation.
- `plugins/translation-namespaces.ts` is a small Vite adapter over Kanjou's existing generator. `virtual:messages/uk/common`, `auth`, `settings`, `student`, `teacher`, and `admin` each emit only that namespace's MF2 ASTs. This is an application extension, not a built-in Kanjou import syntax. `src/types/translation-messages.d.ts` types those imports as actual runtime `Message` values.
- The root supplies common messages. Auth, settings, and role layout routes supply their namespace before descendants render. Teacher navigation and non-navigation layouts are separate siblings, so neither inherits the other's teacher dictionary.
- `src/lib/translations/translation-provider.tsx` composes inherited messages with local messages using memoized, immutable dictionaries. There is no registration effect, global mutable registry, loader race, or unregister cleanup.
- The wrapper uses Kanjou's public `createTranslate`, `createTranslateCache`, `enrich`, and `TranslateContext` rather than nesting the published provider unchanged. A fresh formatter cache accompanies each changed effective catalog; this avoids the published provider's stale-text bug without remounting children. Rich components and MF2 functions retain the application's existing configuration.
- Locale inherits from the parent and defaults to `uk`. The root still supplies it explicitly. The redundant runtime locale guards were removed as requested.
- `mergeMessages` rejects duplicate IDs instead of silently overwriting them. All consumers still use the ordinary Kanjou translation hooks and retain generated ID/argument checking.
- Virtual modules watch namespace source files, including nested admin fragments. The ordinary Kanjou plugin still generates the complete catalog declaration.

The namespace Vite adapter and its ambient declaration are only necessary for independently precompiled namespace modules. Directly importing source dictionaries is a simpler supported alternative, but moves MF2 parsing to first use. This is a deliberate implementation tradeoff, not a claim that all file splitting needs an additional plugin.

### Persistent dependency fixes

Two one-line fixes are stored through Bun `patchedDependencies`, not untracked edits to installed packages:

1. `patches/@kanjou%2Fplugin@0.4.4.patch` changes virtual-module values from argument-schema `Messages` to `Record<string, Message>`. No casts or generated-registration changes are used.
2. `patches/@kanjou%2Fgenerator@0.4.4.patch` adds `tryNative: false` alongside `moduleCache: false`. Jiti enables native loading under Bun by default; a same-process composed-entry load/edit/reload probe reproduced stale transitive imports with native loading and fresh results with the patched generator. Direct fragment loading alone does not reproduce this particular transitive-import failure.

Published npm artifact comparison confirmed that 0.4.3 already declared the virtual payload as `Partial<Messages>` and 0.4.4 changed it to `Messages`; both use the wrong value type. The provider's `Record<string, Message>` contract and core argument-schema meaning of `Messages` are the same in both versions. This does not establish a new 0.4.4-only regression.

A running development process must be restarted once after applying dependency patches; a Vite config reload is not guaranteed to replace an already evaluated dependency module. Final browser verification uses a fresh process.

The requested upstream work is recorded in [kanjou#13](https://github.com/iivanpopov/kanjou/issues/13), in English and without labels: built-in namespaces, correct virtual payload types, reliable transitive dictionary reloads, declarative provider composition, cache invalidation, and acceptance criteria.

### Verification

`bun check`, `bunx kanjou compile`, `bunx kanjou generate`, `bun install --frozen-lockfile`, and `bun run build --mode development` pass. Existing unrelated effect warnings remain unchanged.

An actual browser probe of the application provider passed inherited messages, rich rendering, immutable updates, parent updates, cache refresh, preservation of an edited descendant input and its DOM identity, duplicate rejection, and React Strict Mode. A same-process loader probe passed fragment updates, full declaration regeneration, and clean restoration. Original active messages and their argument schemas were compared against all canonical replacements. Authenticated API checks use read-only endpoints and do not persist access codes or raw personal response data in the repository.

A live Vite HMR probe changed a common translation and temporarily added an ID to the fragment: the open login page displayed the new compiled text, generated types included the new ID, and an edited input retained its value without a restart. Restoring the source restored both runtime text and generated types. A separate fresh-process browser run covered 53 route visits across admin, teacher, student, and anonymous pages, including nested details and management forms; it found no raw catalog IDs, JavaScript errors, or detected hydration errors.

## Original research conclusion

**Split source files for maintainability if useful; do not introduce runtime route registration yet.** A custom provider holding messages in React state and passing a new messages object to `TranslateProvider` can add namespaces. However, Kanjou 0.4.4 has no namespace registry, automatic merging, readiness handling or eviction. Its retained formatter cache also makes replacing previously formatted keys unsafe without a fresh cache/provider. These responsibilities would belong to our wrapper, not Kanjou. [R1, C1–C3]

For static splitting, keep `uk.ts` as the single locale entry and compose flat feature dictionaries there. Keep existing fully qualified IDs, for example `admin.groups.title`; dots have no special runtime meaning. Put fragment files in a subdirectory, not beside `uk.ts`, because the generator treats every supported top-level file as a locale. This preserves the current provider and generated typing, but **does not reduce the downloaded catalogue**. [G1–G3, A1]

Actual lazy loading should be a separate, measured optimization. Prefer explicit route/layout message boundaries with messages ready before rendering over mount/unmount registration into a global mutable catalogue. [R1, C1, H1]

## Current repository

- The root imports the entire compiled Ukrainian catalogue through `virtual:kanjou/uk`, fixes the locale to `uk`, and supplies stable rich-text components and MF2 functions to the provider surrounding the toaster and route children. [A1]
- The configuration selects `uk` as the base locale; the generator's default directory is `src/assets/locales`. That directory currently contains one locale entry, `uk.ts`. [A2, G1]
- A read-only measurement using `new Generator(getConfig()).virtual('uk')`, `Object.keys(messages)` and Node zlib found **1,126 keys**, **107,468 source bytes**, and **252,616 pretty-printed AST module bytes**; that AST module compresses to **22,742 gzip bytes** or **17,210 Brotli bytes**. These are standalone module measurements, not production bundle/network measurements, and will change when the concurrent unused-key audit lands. [G2, M1]
- There is no demonstrated translation-loading problem in this investigation. Roughly 22 KiB gzip alone does not justify a registration lifecycle, cache-reset strategy and SSR loading protocol. First finish the unused-key audit, then use the existing `analyze` script if initial payload is a concern. This is an engineering recommendation, not a measured performance conclusion. [A3, M1]

## What the provider actually does

### Reactive, but only on locale/messages identity

`TranslateProvider` creates one cache with `useState`, then memoizes a new enriched translator with dependencies `[locale, messages]`. `useTranslate()` reads that translator through React `use(TranslateContext)`. Therefore a new messages object causes a new context value, and subscribed consumers receive it; it is not an initial-props-only provider. [R1, H2]

Implications for the proposed wrapper:

- Update state immutably, merging into the latest state rather than a stale captured object. Mutating the same dictionary does not trigger this memo/context update. Although the translator closes over the mutable dictionary, incidental visibility on later renders is not a reactive registration mechanism. [R1, C3]
- Memoize a merged dictionary rather than rebuilding it on unrelated renders. Every new messages identity rebuilds the translator and updates its context consumers, even if the contents are unchanged. [R1, H2]
- `options`, `functions` and `components` are captured but omitted from the memo dependencies. Changing only those props does not refresh the translator. Keep them stable, as the root currently does; do not assume a wrapper can dynamically replace configuration independently. [R1, A1]

### Replacement, not merge or fallback

The provider passes exactly its `messages` prop to `createTranslate`; core looks up `messages[id]`. There is no parent-provider read, dictionary merge, prefix selection, fallback locale or async loading in this path. A wrapper must construct the complete intended dictionary itself. Missing/falsy messages return the ID for string translation, `[]` for parts, and consequently `null` for rich translation. Missing keys do not suspend or trigger loading. [R1, C1, C3, R3]

For example, passing only an admin dictionary to a nested provider does not leave common keys available from the root provider. A `common` plus `admin` dictionary must be explicitly composed. Decide collision policy up front; ordinary object spread makes the last dictionary win, whereas duplicate-key rejection is safer for namespaces. [R1, C1, H2]

### Important cache limitation: changing the object is not enough

Both plain and parts formatting use the persistent cache's `message` map with the key `${locale}:${id}`. The key excludes message contents and formatter options; no invalidation runs when messages change. [R1, C1, C2]

| Change within a mounted provider                    | Result                                                                                   |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Add a previously absent ID                          | Works once consumers re-render with the new dictionary. Missing lookups were not cached. |
| Replace an ID already formatted at this locale      | The old `MessageFormat` is reused, so old text/structure can persist.                    |
| Remove an ID                                        | Lookup returns missing before consulting the cache.                                      |
| Remove, then re-add the same ID with different text | Its old cached formatter can return.                                                     |
| Switch locale                                       | Uses a distinct cache key, but switching back can reuse that locale's earlier formatter. |

All rows follow from the lookup-before-cache order in both formatting functions. A read-only core probe confirmed: formatting `probe = old`, creating a new translator with the same cache and `probe = new`, then formatting again prints `old`; a fresh `added` ID prints `added`. [C1, M2]

Append-only loading of immutable, disjoint namespace keys avoids that particular replacement problem. It does not solve rendering readiness or races. To replace live message contents reliably, use a fresh cache, for example by remounting a suitably scoped provider with a new catalogue revision key. The public `TranslateProvider` props do not expose cache injection/invalidation; remounting a root provider also remounts its descendants and can discard UI state. Alternatively, a custom translation provider could own `createTranslate` and cache policy, but that is more than a small registration wrapper. [R1, R2, C1–C3, H3]

## Nested providers

Nested `TranslateProvider`s work as normal React context boundaries: the nearest provider supplies the entire translator. Each instance owns its own cache. There is no automatic inheritance of messages, locale, custom functions or rich components. Locale and messages are required props. [R1, R2, H2]

A route/layout provider can explicitly receive `common + route` and the same application functions/components. This limits context updates and avoids unregister races between unrelated routes. It also means shared UI rendered below that boundary must have its keys included; UI above it, such as a root-owned toaster, still uses the root catalogue. Provider placement must follow the component tree, not just the URL. Keep a route boundary's catalogue stable or give it a fresh scoped lifetime when its message definitions change, because nested providers have the same retained-cache limitation. [R1, C1, A1, H2]

## Typing is global, not proof of namespace readiness

- Core defines `Message = string | Model.Message`; provider messages are `Record<string, Message>`. Runtime dictionaries are not required to contain every registered key. [R2, C4]
- `Register` supplies the application-wide locale and message/value types; `MessageId = keyof Messages`. `useTranslate()` returns one globally typed translator, not a namespace-parameterized translator. The generated declaration augments `@kanjou/react` with all base-locale IDs, and TypeScript includes `generated`. A call can therefore type-check even when its runtime provider lacks that namespace. [C4, R2, A4]
- The generator derives its declaration from the loaded base-locale object's entries. Static composition through `uk.ts` keeps that complete inventory. Separate runtime chunks must still be represented in a complete generation-time base catalogue; shrinking the base entry to common keys would also shrink generated IDs. [G2, G3]
- There is a declaration/runtime mismatch worth preserving explicitly in any chunk helper: `virtual:kanjou/*` is declared as `Messages` (the key-to-argument-schema type), while actual virtual modules contain message AST values. The special `virtual:kanjou/locales` declaration correctly describes asynchronous dictionaries of `Message`. Do not use `Messages` as the runtime namespace payload type; use `Record<string, Message>` or an appropriately keyed equivalent. [P2, G2, C4]

### Existing TS2322 at the root import boundary

This mismatch can already make `messages={messages}` in `__root.tsx` fail TS2322: the generated `Register.messages` maps IDs to parameter schemas such as `{}`, and those values are not `string | Model.Message`. It is a library declaration mismatch, not evidence that the virtual module emits the wrong runtime object. Removing unused keys does not change that structural incompatibility. The wildcard declaration uses `Messages` regardless of the number of generated keys. [P2, C4, G2, A1, A4]

Minimal application workaround, if fixing this separately: import the `Message` type from `@kanjou/react`, then normalize the virtual import once at its boundary:

```ts
const compiledMessages = messages as unknown as Record<string, Message>
```

Pass `compiledMessages` to the provider. This assertion is justified specifically by the installed generator's `parseMessage` plus serialized-AST output, not by the misleading wildcard declaration. It does not change the global `Register`, so translation-ID/value checking remains intact. `satisfies` alone cannot fix the incorrect imported type, and casting to `Messages` repeats the error. [G2, C4, R2, P2]

The upstream fix is to declare the wildcard virtual module's payload as `Record<string, import('@kanjou/react').Message>` (or a correctly keyed runtime equivalent), not `Messages`. Avoid editing generated registrations or `node_modules` as the durable application fix; the special `locales` declaration already demonstrates the intended runtime value type. No source workaround was applied in this investigation. [P2]

## Raw messages versus compiled messages

The current plugin asks the generator for a virtual module. For a locale target the generator loads that top-level locale file, runs `parseMessage` on every entry and exports serialized AST data. “Compiled” here means **MF2 data-model objects**, not prebuilt formatter functions or JavaScript executable translations. Core still constructs `MessageFormat` lazily on first use. [P1, G2, C1]

Importing a raw feature dictionary directly in a lazy route is accepted by the runtime because raw strings are valid `Message`s. However, it bypasses the current virtual-module preparse path: `MessageFormat` parses strings during construction, while AST input skips parsing but is still validated. Choose deliberately; raw chunks are not equivalent to the current precompiled catalogue in parse timing or build-time validation. [C4, F1, G2]

The installed plugin supports locale virtual modules and `virtual:kanjou/locales`, not route namespace selectors. `virtual:kanjou/uk/admin` is not a built-in way to select an `admin` subset: the generator matches the entire target against a top-level locale filename. The generated `locales` module lazy-imports **whole locales**, not prefixes. [P1, G2, G3]

For static source splitting, fragments under `src/assets/locales/uk/` can be imported and spread by `src/assets/locales/uk.ts`; keep each fragment flat. The locale loader lists only immediate directory entries and identifies locale names from filenames. Adding `admin.ts` alongside `uk.ts` would instead make `admin` look like another locale. There is no built-in recursive namespace discovery or nested-object flattening. [G1–G3]

Development caveat: `virtual('uk')` lists only the top-level `uk.ts` as its watch file, and the plugin's locale-directory change handler regenerates declarations but does not explicitly invalidate that composed virtual module. Splitting into imported fragments should include a manual check that editing a fragment refreshes translations during Vite development; do not promise transitive HMR from this implementation alone. [P1, G2]

## SSR, hydration and lifecycle risks

The provider is synchronous and owns no loader, effect, serialization or hydration protocol. Its `"use client"` directive does not implement namespace transfer. The existing static import supplies the same catalogue to the root render in both environments. React requires the first client output to match server-rendered output. [R1, A1, H1]

If runtime splitting is introduced, these are application-level requirements inferred from that synchronous provider and React's rendering rules, not Kanjou features:

1. **Load before consumers render.** Registration in `useEffect` is too late for SSR: effects do not run on the server, and the first render can show IDs or empty rich text. Gate the subtree on ready messages using route loading or an intentional Suspense boundary; include common translations for pending/error UI. [R1, C1, R3, H1, H4]
2. **Hydrate with the same effective catalogue.** Preload/import the initial route's messages before hydration or restore a serializable initial snapshot through the framework. Loading only on the client after the server rendered full translations creates different initial output. Serialize messages, not translator functions or formatter cache instances. Kanjou does not perform this transfer. [R1, C3, H1]
3. **Keep request state isolated.** Do not mutate a process-global registry as routes render on the server. Use request-local assembled messages; immutable public module data can be shared. The optional server `defineTranslate` helper caches translators by locale only for the lifetime of its factory/cache, so it is appropriate for fixed resources, not request-dependent route catalogues sharing that cache. [S1, C2, C3]
4. **Deduplicate loads and reject stale results.** Cache pending namespace loads by locale and namespace; use functional state updates for concurrent merges. A slow completion from an old locale/navigation must not overwrite the current dictionary or mark another namespace ready. Treat namespace IDs and catalogue revisions explicitly. Kanjou has none of these checks. [R1, C1]
5. **Do not unregister solely on route unmount.** A parent layout, sibling, toast or overlapping transition may still use those keys. Strict Mode also repeats effect setup/cleanup in development. Prefer keeping immutable loaded namespaces for the session; if eviction is genuinely necessary, track ownership, outstanding loads and transition lifetimes. Removing the dictionary entries does not evict retained formatters anyway. [C1, C2, H4]
6. **Do not register by mutating global state during render.** Rendering can be retried or abandoned. Prefer deriving messages from already-resolved route data, with no render-time registry writes. Handle rejected loads and retry explicitly, since missing translations themselves do not throw a loading promise. [R1, C1, H5]

## Recommended progression

1. Finish the separate unused-key audit; do not couple it to a namespace-loader rewrite.
2. If navigating the locale source is painful, split it into flat feature dictionaries and statically compose them in `uk.ts`. Preserve existing keys, one provider, generated declarations and precompiled virtual import. Check fragment-edit HMR. This solves organization, not payload. [A1, G1–G3, P1]
3. Measure the production entry chunk after cleanup. Only pursue lazy catalogues if meaningful user-facing savings justify additional loading boundaries. The installed whole-locale lazy import is unnecessary while the application only has one locale. [A1, G3, M1]
4. If needed later, use common messages plus coarse route/layout dictionaries, explicit pre-render loading, and scoped provider composition. Ensure compiled chunks and complete global type generation have a defined build path; the current plugin does not supply namespace chunk generation. [P1, G2, R1, R2]
5. Use a global runtime registry only if independent features truly need to contribute messages outside their own subtree. Keep registrations append-only and collision-free unless cache invalidation is intentionally implemented. Budget for SSR snapshots, stale-load handling, readiness/errors and lifetime management. [R1, C1–C3, H1]

## Primary-source citations

Verification: `bun check` was run after writing this note. Formatting completed; lint stopped on the root-provider TS2322 described above, with six unrelated existing `react(set-state-in-effect)` warnings. The command therefore did not reach CSS lint or its final `bun --check` stage. This investigation changed only this research document; concurrent locale/generated edits belong to the separate unused-key audit.

Installed-source ranges refer to the files present during this investigation, not an assumed match to upstream `main`.

- **R1:** `node_modules/@kanjou/react/dist/index.mjs:1–26` — complete provider, cache lifetime, memo dependencies and context reader.
- **R2:** `node_modules/@kanjou/react/dist/index.d.mts:6–16` — provider and hook public types.
- **R3:** `node_modules/@kanjou/react/dist/enrich-W4SqlCTO.mjs:54–65` — rich translation and empty-parts behavior.
- **C1:** `node_modules/@kanjou/core/dist/index.mjs:21–42` — message lookup, missing fallback and formatter caching for strings/parts.
- **C2:** `node_modules/@kanjou/core/dist/index.mjs:3–15` — cache maps.
- **C3:** `node_modules/@kanjou/core/dist/index.mjs:108–122` — translator closures and exposed locale/messages.
- **C4:** `node_modules/@kanjou/core/dist/index.d.mts:22–25,69–82,109–133` — message representation, global registration and translator signatures.
- **G1:** `node_modules/@kanjou/generator/dist/index.mjs:9–25,29–64` — configuration and nonrecursive locale loading.
- **G2:** `node_modules/@kanjou/generator/dist/index.mjs:86–132` — declaration input, virtual targets, AST generation and watch files.
- **G3:** `node_modules/@kanjou/generator/dist/index.mjs:134–193` — declaration generation and whole-locale dynamic imports.
- **P1:** `node_modules/@kanjou/plugin/dist/index.mjs:5–37` — virtual-module resolution/loading and change handling.
- **P2:** `node_modules/@kanjou/plugin/client.d.ts:1–12` — virtual module declarations.
- **F1:** `node_modules/messageformat/lib/messageformat.js:28–41` — string parsing versus data-model input, validation and function binding.
- **S1:** `node_modules/@kanjou/react/dist/server.mjs:4–19` — server factory's locale-only translator cache.
- **A1:** `src/routes/__root.tsx:14,27–40,77–103` — current imports, locale, provider and root UI placement.
- **A2:** `kanjou.config.json:1–7` — current base locale configuration.
- **A3:** `package.json:9–15` — development, analysis and verification scripts.
- **A4:** `generated/locales.kanjou.d.ts:1–20`; `tsconfig.app.json:16` — generated registration and inclusion.
- **M1:** Read-only local measurement on 2026-10-27 of `src/assets/locales/uk.ts` and the result of `Generator.virtual('uk')`, using `Buffer.byteLength`, `gzipSync` and `brotliCompressSync` with default options. No generated files were written.
- **M2:** Read-only local probe on 2026-10-27 using `createTranslateCache()` and two calls to `createTranslate()` sharing that cache; output: `first: old`, `replacement: old addition: added missing: missing missing parts: []`. No test files were added.
- **H1:** React official [`hydrateRoot` caveats and hydration usage](https://react.dev/reference/react-dom/client/hydrateRoot#caveats) — matching initial output.
- **H2:** React official [`use(context)`](https://react.dev/reference/react/use#use-context) and [`useContext` caveats](https://react.dev/reference/react/useContext#caveats) — nearest provider and context updates.
- **H3:** React official [preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state#resetting-state-with-a-key) — key-based lifetime/reset consequences.
- **H4:** React official [`useEffect` caveats](https://react.dev/reference/react/useEffect#caveats) — client-only effects and Strict Mode setup/cleanup.
- **H5:** React official [components and hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure#side-effects-must-run-outside-of-render) — render purity and repeated rendering.

Upstream provenance: the installed `node_modules/@kanjou/react/package.json:2–9,31–33` identifies version 0.4.4, the exact core dependency and the [official repository](https://github.com/iivanpopov/kanjou). The [official documentation](https://iivanpopov.github.io/kanjou/) describes AST precompilation and links to that source. Its current [README](https://github.com/iivanpopov/kanjou/blob/main/README.md) uses `KanjouProvider`/`useKanjou`, unlike the installed `TranslateProvider`/`useTranslate`; do not copy current upstream API names into this version without checking the installed exports.
