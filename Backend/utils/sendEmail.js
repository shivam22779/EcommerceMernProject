const nodeMailer = require("nodemailer");

const sendEmail = async (options)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        // host and port is needed when email is not sent successfully
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            //Simple mail transfer protocol
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};



module.exports = sendEmail;