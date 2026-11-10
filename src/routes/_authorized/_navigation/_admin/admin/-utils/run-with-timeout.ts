const MUTATION_TIMEOUT_IN_MILLISECONDS = 20_000

export function runWithTimeout<Result>(
  request: (signal: AbortSignal) => Promise<Result>,
): Promise<Result> {
  return request(AbortSignal.timeout(MUTATION_TIMEOUT_IN_MILLISECONDS))
}
