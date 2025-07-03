import express from 'express'
import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

const client = new Client({
    puppeteer: {
        headless: false,
    },
    authStrategy: new LocalAuth({
        clientId: "YOUR_CLIENT_ID",
    }),
});

client.on("qr", (qr) => {
    console.log("QR Received", qr);
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on('message_create', message => {
	console.log(message.body);
});

client.on('message_create', message => {
    const response_message = 'pong'
	if (message.body === 'ping') {
		client.sendMessage(message.from, response_message);
	}
});

client.initialize();