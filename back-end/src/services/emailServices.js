require("dotenv").config();
import nodemailer from "nodemailer";

const sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TienShakeDev 👻" <tranviettiencntt@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặc lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend)
    });
}
const getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì nhận được lịch khám bệnh online TienShakeDev</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là sự thật, vui lòng click vào đường link bên dưới để hoàn tất thủ
            tục đặc lịch khám bệnh.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn</div>
    `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3> Hello ${dataSend.patientName}! </h3>
        <p> You received this email because you received an online appointment for TienShakeDev </p>
        <p> Medical examination according to information: </p>
        <div> <b>Time: ${dataSend.time} </b> </div>
        <div> <b>Doctor: ${dataSend.doctorName} </b> </div>
        <p>If the above information is true, please click on the link below to complete the procedure
            Characteristic Fecutation.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank"> Click here </a>
        </div>
        <div> Thank you very much </div>
    `
    }
    return result;
}
async function main() {
}
module.exports = {
    sendSimpleEmail
}