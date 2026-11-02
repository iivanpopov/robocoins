import { createServerFn } from '@tanstack/react-start'

import { FeedbackSubmissionSchema } from '../-schemas'
import type { FeedbackSubmissionResult } from '../-types'

export const submitFeedback = createServerFn({ method: 'POST' })
  .validator(FeedbackSubmissionSchema)
  .handler(async ({ data }): Promise<FeedbackSubmissionResult> => {
    const { saveFeedback } = await import('./save-feedback.server')
    return saveFeedback(data)
  })
