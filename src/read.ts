import { API_URLS } from "richiey1-stacks-helpers-types";

export async function callReadOnly(
  contractAddress: string,
  contractName: string,
  functionName: string,
  functionArgs: string[],
  senderAddress: string,
  networkUrl: string = API_URLS.mainnet
): Promise<any> {
  const url = `${networkUrl}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: senderAddress, arguments: functionArgs }),
  });

  if (!response.ok) {
    throw new Error(`Read-only call failed: ${response.status}`);
  }

  const data = await response.json();
  if (!data.okay) {
    throw new Error(`Contract error: ${data.cause}`);
  }

  return data.result;
}
