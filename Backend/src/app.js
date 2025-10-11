import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import forge from 'node-forge';
import mongoose from 'mongoose';
import { Key } from './models/keys.models.js';

import userRouter from './routes/user.routes.js';
import passwordRouter from './routes/password.routes.js';

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

const regenerateServerKeys = async () => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);

    console.log("Private key - ",privateKeyPem);
    console.log("Public key - ",publicKeyPem);

    try {
        await Key.findOneAndUpdate(
            {}, 
            { privateKey: privateKeyPem, publicKey: publicKeyPem },
            { upsert: true, new: true }
        );
        console.log(`Server keys generated & updated in MongoDB at ${new Date().toISOString()}`);
    } catch (err) {
        console.error("Failed to update keys in MongoDB:", err);
    }
};

regenerateServerKeys();

setInterval(() => {
    regenerateServerKeys();
}, 20 * 60 * 1000);

app.use('/users', userRouter);
app.use('/password', passwordRouter);

export { app };
