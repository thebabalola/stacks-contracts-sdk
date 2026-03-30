import { callContract } from "./write";
import type { ContractCallOptions, BatchResult } from "richiey1-stacks-helpers-types";

export async function batchCall(
  calls: ContractCallOptions[],
  delayMs: number = 2000
): Promise<BatchResult[]> {
  const results: BatchResult[] = [];

  for (const call of calls) {
    const result = await callContract(call);
    results.push(result);

    if (delayMs > 0 && calls.indexOf(call) < calls.length - 1) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  return results;
}
