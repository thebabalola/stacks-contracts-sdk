import {
  makeContractCall,
  broadcastTransaction,
  PostConditionMode,
  type ClarityValue,
} from "@stacks/transactions";
import type { ContractCallOptions, BatchResult } from "richiey1-stacks-helpers-types";

export async function callContract(
  options: ContractCallOptions
): Promise<BatchResult> {
  try {
    const tx = await makeContractCall({
      contractAddress: options.contractAddress,
      contractName: options.contractName,
      functionName: options.functionName,
      functionArgs: options.functionArgs,
      senderKey: options.senderKey,
      network: options.network,
      nonce: options.nonce,
      fee: options.fee,
      postConditionMode: options.postConditionMode ?? PostConditionMode.Allow,
    });

    const result = await broadcastTransaction({ transaction: tx, network: options.network });
    const txid = typeof result === "string" ? result : (result as any)?.txid;

    if (txid && !(result as any).error) {
      return { txid, success: true };
    } else {
      return { txid: "", success: false, error: JSON.stringify(result) };
    }
  } catch (err: any) {
    return { txid: "", success: false, error: err.message };
  }
}
