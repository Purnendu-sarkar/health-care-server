import nodemailer from 'nodemailer'
import config from '../../config';

const emailSender = async (email: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.emailSender.email,
            pass: config.emailSender.app_pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Health Care" <${config.emailSender.email}>`,
            to: email, // receiver email
            subject: "Reset Password Link", // Subject line
            html, // HTML body
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

export default emailSender;
