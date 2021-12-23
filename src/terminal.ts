import WasmTerminal from '@wasmer/wasm-terminal/lib/optimized/wasm-terminal.esm';

export const createTerminal = () => {
    const wasmTerminal = new WasmTerminal({
        fetchCommand: async (command: { args: string[] }): Promise<Uint8Array> => {
            const program = command.args[0];
            const url = `./wapm_packages/${program}/${program}.wasm`;

            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        },
        processWorkerUrl: './node_modules/@wasmer/wasm-terminal/lib/workers/process.worker.js'
    });

    return wasmTerminal;
};
