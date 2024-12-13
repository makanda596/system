import {

    VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { sender, mailtrapClient } from "./mailtrap.configu.js";
export const sendVerificationEmail = async (email, verificationToken) => {
    if (!email) {
        throw new Error("Recipient email is required");
    }

    // Define the recipient correctly
    const recipient = [{ email: "brian@gmail.com" }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient, // Correct format
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};
