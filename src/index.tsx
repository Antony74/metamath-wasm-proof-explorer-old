import * as React from 'react';
import ReactDOM from 'react-dom';
import { createTerminal } from './terminal';

const terminal = createTerminal();
terminal.open(document.getElementById('terminal'));
terminal.fit();
terminal.focus();

setTimeout(() => {
    console.log('Attempting to run metamath');
    terminal.runCommand('metamath');
});

const App: React.FunctionComponent = () => {
    return <div>Hello world</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
