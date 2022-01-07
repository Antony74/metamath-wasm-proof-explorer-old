//import WasmTerminal from '@wasmer/wasm-terminal/lib/optimized/wasm-terminal.esm';
import WasmTerminal from '@wasmer/wasm-terminal/lib/unoptimized/wasm-terminal.esm';
import { WasmFs } from '@wasmer/wasmfs';
//import { NoParamCallback, PathOrFileDescriptor } from 'fs';

/*
export interface FileSystem {
    writeFile: (
        path: PathOrFileDescriptor,
        data: string | NodeJS.ArrayBufferView,
        options: unknown,
        callback: NoParamCallback,
    ) => void;
    writeFileSync: (path: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView) => void;
}
*/
interface WasmTerminalInterface {
    open: (element: HTMLElement) => void;
    runCommand: (cmd: string) => void;
    wasmShell: { wasmTerminalConfig: { wasmFs: { fs: FileSystem } } };
}

export interface Terminal {
    runCommand: (cmd: string) => void;
    wasmFs: any;
}

export const createTerminal = (element: HTMLElement): Terminal => {

    const wasmFs = new WasmFs();

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
        wasmFs,
    });

    wasmTerminal.open(element);

    return {
        runCommand: (cmd: string) => {
            wasmTerminal.runCommand(cmd);
        },
        wasmFs,
    };
};
