export const PROFILE_FIELDS = ['nickname', 'avatar', 'ring'] as const
export type ProfileField = (typeof PROFILE_FIELDS)[number]

export type ProfileFieldSaveState = 'idle' | 'pending' | 'saved' | 'error'

export type ProfileSaveOutcome = 'idle' | 'partial' | 'error'

export type ProfileEditorTab = 'avatar' | 'ring'
