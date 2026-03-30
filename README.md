# thebabalola-stacks-helpers-contracts

Contract read/write wrappers, ABI helpers, and batch call utilities for Stacks L2.

## Install

```bash
npm install thebabalola-stacks-helpers-contracts
```

## Usage

```typescript
import { callReadOnly, callContract, batchCall, getPublicFunctions } from "thebabalola-stacks-helpers-contracts";

// Read contract state
const result = await callReadOnly("SP...", "contract-name", "get-value", [], "SP...sender");

// Write to a contract
const txResult = await callContract({
  contractAddress: "SP...",
  contractName: "contract-name",
  functionName: "set-value",
  functionArgs: [uintCV(42)],
  senderKey: "your-private-key",
});

// Batch multiple calls
const results = await batchCall([call1, call2, call3], 2000);
```

## API

### `callReadOnly(address, name, functionName, args, senderAddress, networkUrl?)`
Execute a read-only contract function.

### `callContract(options)`
Broadcast a contract call transaction. Returns `{ txid, success, error }`.

### `batchCall(calls, delayMs?)`
Execute multiple contract calls sequentially with a configurable delay.

### `getPublicFunctions(abi)` / `getReadOnlyFunctions(abi)` / `findFunction(abi, name)`
ABI helper functions for parsing contract interfaces.

## License

MIT

## Author

thebabalola
