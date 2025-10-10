import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import forge from 'node-forge';
import path from 'path';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

const keysDir = path.join(process.cwd(), 'src', 'Keys'); 

const regenerateServerKeys = () => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);

    fs.writeFileSync(path.join(keysDir, "privatekey.pem"), privateKeyPem, "utf-8");
    fs.writeFileSync(path.join(keysDir, "publickey.pem"), publicKeyPem, "utf-8");

    console.log(`Server keys regenerated at ${new Date().toISOString()}`);
};

regenerateServerKeys();

setInterval(() => {
    regenerateServerKeys();
}, 10 * 60 * 1000);

import userRouter from './routes/user.routes.js';
import passwordRouter from './routes/password.routes.js';

app.use('/users', userRouter);
app.use('/password', passwordRouter);

export { app };