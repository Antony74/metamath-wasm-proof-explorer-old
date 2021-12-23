import WasmTerminal from '@wasmer/wasm-terminal/lib/optimized/wasm-terminal.esm';

interface WasmTerminalInterface {
    open: (element: HTMLElement) => void;
    runCommand: (cmd: string) => void;
}

export interface Terminal {
    runCommand: (cmd: string) => void;
}

export const createTerminal = (element: HTMLElement): Terminal => {
    const wasmTerminal: WasmTerminalInterface = new WasmTerminal({
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

    wasmTerminal.open(element);

    return {
        runCommand: (cmd: string) => {
            wasmTerminal.runCommand(cmd);
        },
    };
};
