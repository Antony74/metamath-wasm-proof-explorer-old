import path from 'path';
import express from 'express';

const app = express();

app.use(
    '/',
    express.static(path.join(__dirname, 'dist'), {
        setHeaders: res => {
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        },
    }),
);

app.get('/', function(_req, res){
    res.redirect('/index.html');
});

const port = 1234;
app.listen(port, () => console.log(`Listening on port ${port}`));
