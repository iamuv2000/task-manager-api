const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to: email,
        from: 'iamyuvi2000@gmail.com',
        subject: 'Welcome to Task Manager!',
        text: `Welcome to the app, ${name}. Let me know how your experience is with us!`,
        //html: ``
    })
}

const sendGoodByeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'iamyuvi2000@gmail.com',
        subject: `Sorry to see you go ${name}`,
        text: `We are sorry to see you go ${name}. Please let us know what could have been done better from our side to improve our services. Farewell from Team Task Manager!`,
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}