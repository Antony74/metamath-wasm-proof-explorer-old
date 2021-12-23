import * as React from 'react';
import ReactDOM from 'react-dom';
import { createTerminal, Terminal } from './terminal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supportsSharedArrayBuffer: boolean = (window as any).SharedArrayBuffer && (window as any).Atomics;

let terminal: Terminal;

if (supportsSharedArrayBuffer) {
    terminal = createTerminal(document.getElementById('terminal'));
    setTimeout(() => terminal.runCommand('metamath'));
}

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
