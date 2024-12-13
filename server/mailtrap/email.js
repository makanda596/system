import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { sender, mailtrapClient } from "./mailtrap.configu.js";
export const sendVerificationEmail = async (email, verificationToken) => {
    if (!email) {
        throw new Error("Recipient email is required");
    }

    const recipient = [{ email }]


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

export const sendWelcomeEmail = async (email, name) => {
    const recipients = [{ email }]

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            template_uuid: "e177bbfd-4993-4877-b627-b651f77660f9",
            template_variables: {
                name: name,
                company_info_name: "Lampard Appartments",

            }
        })
        console.log("welcome email sent succesfully", response)
    } catch {
        console.error(`Error sending welcome email`, error);

        throw new Error(`Error sending welcome email: ${error}`);

        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "password Reset"
        })
        console.log("welcome email sent succesfully for the password reset", response)

    } catch (error) {
        console.error(`Error sending password reset email`)
    }
}

export const sendRestPasswordEmail = async (email) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "password Reset"
        })
        console.log("password reset success email sent successfully", response)

    } catch (err) {
        console.log(err.message)
    }
}