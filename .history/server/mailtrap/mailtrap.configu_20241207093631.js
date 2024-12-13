import { MailtrapClient } from "mailtrap";

const TOKEN = "7e5594110b915de5d75a49d997264f30";

export const client = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.com",
    name: "Mailtrap Test",
};
