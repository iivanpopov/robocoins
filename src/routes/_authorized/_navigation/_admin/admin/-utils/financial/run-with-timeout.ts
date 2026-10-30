const MUTATION_TIMEOUT_IN_MILLISECONDS = 20_000

export async function runWithTimeout<Result>(
  request: (signal: AbortSignal) => Promise<Result>,
): Promise<Result> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), MUTATION_TIMEOUT_IN_MILLISECONDS)

  try {
    return await request(controller.signal)
  } finally {
    clearTimeout(timeout)
  }
}
