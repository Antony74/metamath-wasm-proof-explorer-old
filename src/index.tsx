import * as React from 'react';
import ReactDOM from 'react-dom';
import { fetchToWasmFs } from './fetchToWasmFs';
import { createTerminal, Terminal } from './terminal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supportsSharedArrayBuffer: boolean = (window as any).SharedArrayBuffer && (window as any).Atomics;

let terminal: Terminal;

const startTerminal = async () => {
    if (supportsSharedArrayBuffer) {
        terminal = createTerminal(document.getElementById('terminal'));
        await fetchToWasmFs('./demo0.mm', terminal.wasmFs);
//        terminal.runCommand('metamath set.mm');
        const dirInfo = terminal.wasmFs.fs.readdirSync('/');
        console.log({dirInfo});
        const text = terminal.wasmFs.volume.readFileSync('demo0.mm', {encoding: 'utf-8'});
        console.log(text);
    }
};

startTerminal();

const App = (): JSX.Element => {
    if (supportsSharedArrayBuffer) {
        return <div>Hello world</div>;
    } else {
        return (
            <div>
                <p>
                    SharedArrayBuffer is not available in your browser. The offical metamath proof-explorer can be found
                    here, and as it is static html it shouldn't give you any such difficulties:
                </p>
                <p>
                    <a href="http://us.metamath.org">http://us.metamath.org</a>
                </p>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));

