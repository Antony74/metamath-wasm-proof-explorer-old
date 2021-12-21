import WasmTerminal from '@wasmer/wasm-terminal/lib/optimized/wasm-terminal.esm';

export const createTerminal = () => {
    const wasmTerminal = new WasmTerminal({
        fetchCommand: (command: { args: string[] }) => {
            const program = command.args[0];
            throw new Error(`Program '${program}' is not part of this project`);
        },
        processWorkerUrl: './node_modules/@wasmer/wasm-terminal/lib/workers/process.worker.js'
    });

    return wasmTerminal;
};
