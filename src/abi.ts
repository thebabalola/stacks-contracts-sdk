export interface ContractFunction {
  name: string;
  access: "public" | "read_only" | "private";
  args: { name: string; type: string }[];
  outputs: { type: string };
}

export interface ContractABI {
  functions: ContractFunction[];
}

export function getPublicFunctions(abi: ContractABI): ContractFunction[] {
  return abi.functions.filter((f) => f.access === "public");
}

export function getReadOnlyFunctions(abi: ContractABI): ContractFunction[] {
  return abi.functions.filter((f) => f.access === "read_only");
}

export function findFunction(abi: ContractABI, name: string): ContractFunction | undefined {
  return abi.functions.find((f) => f.name === name);
}
