import {

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
                "name": "Test_Name",
                "company_info_name": "Test_Company_info_name",
                "company_info_address": "Test_Company_info_address",
                "company_info_city": "Test_Company_info_city",
                "company_info_zip_code": "Test_Company_info_zip_code",
                "company_info_country": "Test_Company_info_country"
            }
        })
        console.log("email sent succesfully", response)
    } catch {

    }
}