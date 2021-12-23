import WasmTerminal from '@wasmer/wasm-terminal/lib/optimized/wasm-terminal.esm';

export const createTerminal = () => {
    const wasmTerminal = new WasmTerminal({
        fetchCommand: async (command: { args: string[] }): Promise<Uint8Array> => {
            const program = command.args[0];
            const url = `./wapm_packages/${program}/${program}.wasm`;

            const response = await fetch(url);
            switch (response.status) {
                case 200: {
                    const arrayBuffer = await response.arrayBuffer();
                    return new Uint8Array(arrayBuffer);
                }
                case 404:
                    throw new Error(`Program '${program}' is not part of this project`);
                default:
                    throw new Error(`Failed to fetch '${program}', ${response.status} ${response.statusText}`);
            }
        },
        processWorkerUrl: './node_modules/@wasmer/wasm-terminal/lib/workers/process.worker.js',
    });

    return wasmTerminal;
};
