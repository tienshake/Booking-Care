require("dotenv").config();
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
import bcrypt from 'bcryptjs';

import _ from 'lodash';
import moment from 'moment';
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE


const handleGetTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVi', 'valueEn'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}
const getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                },
            })
            resolve({
                errCode: 0,
                errMessage: 'get doctor success',
                data: doctors
            })
        } catch (e) {
            reject(e);
        }
    })
}
const checkRequiredFiles = (inputData) => {
    const arr = ['doctorId', 'contentHTML', 'contentMarkdown',
        'action', 'selectedPrice', 'selectedProvince', 'selectedPayment',
        'nameClinic', 'addressClinic', 'note', 'specialtyId'];
    let isValid = true;
    let element = '';
    for (let i = 0; i < arr.length; i++) {
        if (!inputData[arr[i]]) {
            isValid = false;
            element = arr[i];
            break;
        }
    }
    return {
        isValid,
        element
    };
}
const saveDetailInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkObject = await checkRequiredFiles(data);
            if (checkObject.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameter: ${checkObject.element}`,
                })
            } else {
                //upsert to markdown table
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,

                    })
                } else if (data.action === 'EDIT') {
                    const markdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false,
                    })
                    if (markdown) {
                        markdown.contentHTML = data.contentHTML
                        markdown.contentMarkdown = data.contentMarkdown
                        markdown.description = data.description
                        await markdown.save()
                    }
                }
                //upsert to doctor info table
                const doctorInfo = await db.Doctor_Infor.findOne({
                    where: { doctorId: data.doctorId },
                    raw: false,
                })
                if (doctorInfo) {
                    //update info doctor
                    doctorInfo.priceId = data.selectedPrice
                    doctorInfo.paymentId = data.selectedPayment
                    doctorInfo.provinceId = data.selectedProvince
                    doctorInfo.addressClinic = data.addressClinic
                    doctorInfo.nameClinic = data.nameClinic
                    doctorInfo.note = data.note
                    doctorInfo.specialtyId = data.specialtyId
                    await doctorInfo.save()
                } else {
                    //create info doctor
                    await db.Doctor_Infor.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        paymentId: data.selectedPayment,
                        provinceId: data.selectedProvince,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClinic,
                        note: data.note,
                        specialtyId: data.specialtyId,
                    })
                }
                resolve({
                    errCode: 0,
                    message: 'save info success'
                })

            }

        } catch (e) {
            reject(e)
        }
    })
}
const getDetailDoctorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {

                const data = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [{
                        model: db.Markdown,
                        attributes: ["description", "contentHTML", "contentMarkdown"]
                    },
                    {
                        model: db.Allcode,
                        as: 'positionData',
                        attributes: ['valueVi', 'valueEn']

                    },
                    {
                        model: db.Doctor_Infor,
                        attributes: {
                            exclude: ['doctorId', 'id'],
                        },

                        include: [
                            { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                            { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                            { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] }
                        ]
                    },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const bulkCreateScheduleService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.arrSchedule || !dataInput.doctorId || !dataInput.date) {
                resolve({
                    errCode: 1,
                    data: "Missing required parameters"
                })
            } else {
                // MAX_NUMBER_SCHEDULE
                let schedule = dataInput.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule.map(item => {
                        item.maxNumber = +MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                let existing = await db.Schedule.findAll({
                    where: { doctorId: dataInput.doctorId, date: dataInput.date },
                    attributes: ['doctorId', 'date', 'timeType', 'maxNumber']
                })
                //compare different
                const checkDataSameToCreate = _.differenceWith(schedule, existing,
                    (schedule, existing) => {
                        return schedule.timeType === existing.timeType && +schedule.date === +existing.date
                    }
                )
                //create data
                if (checkDataSameToCreate && checkDataSameToCreate.length > 0) {
                    await db.Schedule.bulkCreate(checkDataSameToCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: "OK create schedule success"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
const getScheduleDoctorByDateService = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                });
            } else {

                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: id,
                        date: date
                    },
                    // igLoading
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                    ],
                    raw: true,
                    nest: true

                });
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data
                })
                // console.log(data);
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getExtraInfoDoctorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                });
            } else {
                let data = await db.Doctor_Infor.findOne({
                    where: { doctorId: id },
                    attributes: {
                        exclude: ['doctorId', 'id'],
                    },

                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] }
                    ],
                    nest: true,
                    raw: true,
                });
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};
const getProfileDoctorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                });
            } else {
                const data = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [{
                        model: db.Markdown,
                        attributes: ["description"]
                    },
                    {
                        model: db.Allcode,
                        as: 'positionData',
                        attributes: ['valueVi', 'valueEn']

                    },
                    {
                        model: db.Doctor_Infor,
                        attributes: {
                            exclude: ['doctorId', 'id'],
                        },

                        include: [
                            { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                            { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                            { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] }
                        ]
                    },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};
const getListPatientsForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData', attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueVi', 'valueEn'] },
                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
};
module.exports = {
    handleGetTopDoctor,
    getAllDoctorService,
    saveDetailInfoDoctor,
    getDetailDoctorByIdService,
    bulkCreateScheduleService,
    getScheduleDoctorByDateService,
    getExtraInfoDoctorByIdService,
    getProfileDoctorByIdService,
    getListPatientsForDoctor
}