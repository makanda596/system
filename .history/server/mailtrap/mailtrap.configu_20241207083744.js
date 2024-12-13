import { MailtrapClient } from "mailtrap.js";

const TOKEN = "7e5594110b915de5d75a49d997264f30";

const client = new MailtrapClient({
    token: TOKEN,
});

const sender = {
    email: "hello@demomailtrap.com",
    name: "Mailtrap Test",
};
const recipients = [
    {
        email: "oumab743@gmail.com",
    }
];

client
    .send({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
    })
    .then(console.log, console.error);