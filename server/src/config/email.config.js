import nodemailer from "nodemailer";
const sendEmail = async (toString,subject,message) => {
    try{
        const transporter=nodemailer.createTransport({
            services: "gmail",
            auth:{
                user: process.env.GMAIL_USERNAME,
                pass : process.env.GMAIL_PASSCODE,
            },
        });

        const mailOption={
            from: process.env.GMAIL_USERNAME,
            to,
            subject,
            html: message,
        };
        const res = await transporter.sendMail(mailOption);
        console.log(res);
    } catch (error) {
        console.log(error);
        throw error;
    }
        
    };

export default sendEmail;