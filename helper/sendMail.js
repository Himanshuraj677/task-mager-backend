const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


// Send email
const sendMail = async (email, textBody) => {

    // Define email options
    let mailOptions = {
        from: `"Task Manager" <${process.env.EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: 'Email Verification', // Subject line
        text: textBody, // plain text body
      };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        throw error;
        console.error('Error sending verification email:', error);
    }
}

module.exports = sendMail;