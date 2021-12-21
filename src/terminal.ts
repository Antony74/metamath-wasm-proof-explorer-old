import WasmTerminal from '@wasmer/wasm-terminal';

export const createTerminal = () => {
    const wasmTerminal = new WasmTerminal({
        fetchCommand: (command: { args: string[] }) => {
            const program = command.args[0];
            throw new Error(`Program ${program} is not part of this project`);
        },
    });

    return wasmTerminal;
};
