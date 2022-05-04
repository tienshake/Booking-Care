require("dotenv").config();
import db from '../models/index';
import emailServices from '../services/emailServices';
import { v4 as uuidv4 } from 'uuid';
const buildUrlEmail = (token, doctorId) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}
const postBookAppointmentServices = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType
                || !data.date || !data.selectedGender
                || !data.fullName || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                const token = uuidv4();
                await emailServices.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.time,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(token, data.doctorId),
                })

                const user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        address: data.address,
                        gender: data.selectedGender,
                        firstName: data.fullName,
                    }
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }

                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save info patient success!',
                })
            }
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
};

const verifyBookAppointmentServices = async (data) => {
    try {
        if (!data.doctorId || !data.token) {
            return {
                errCode: 1,
                errMessage: "Missing required parameter!"
            }
        } else {
            let appointment = await db.Booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    token: data.token,
                    statusId: 'S1'
                },
                raw: false
            });
            if (appointment) {
                appointment.statusId = "S2"
                await appointment.save();
                return {
                    errCode: 0,
                    errMessage: "Update the appointment success!"
                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "Appointment has been activated or does not exist!"
                }
            }
        }
    } catch (e) {
        throw new Error(e);
    }
};
module.exports = {
    postBookAppointmentServices,
    verifyBookAppointmentServices
}