import doctorServices from '../services/doctorServices';

const getDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) {
        limit = 10;
    }
    try {
        const doctors = await doctorServices.handleGetTopDoctor(+limit);
        return res.status(200).json(doctors);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
}

const getAllDoctor = async (req, res) => {
    try {
        const doctor = await doctorServices.getAllDoctorService();
        return res.status(200).json(doctor);
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
}
const postSaveInfoDoctor = async (req, res) => {
    try {
        const response = await doctorServices.saveDetailInfoDoctor(req.body)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
}
const getDetailDoctorById = async (req, res) => {
    try {
        const info = await doctorServices.getDetailDoctorByIdService(req.query.id)
        res.status(200).json(info)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
}
const bulkCreateSchedule = async (req, res) => {
    try {
        const data = await doctorServices.bulkCreateScheduleService(req.body)
        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
}
const getScheduleDoctorByDate = async (req, res) => {
    const id = req.query.id;
    const date = req.query.date;
    try {
        const data = await doctorServices.getScheduleDoctorByDateService(id, date)
        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
}
const getExtraInfoDoctorById = async (req, res) => {
    const id = req.query.id;
    try {
        const data = await doctorServices.getExtraInfoDoctorByIdService(id)
        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
};
const getProfileDoctorById = async (req, res) => {
    const id = req.query.id;
    try {
        const data = await doctorServices.getProfileDoctorByIdService(id)
        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
};
const getListPatientsForDoctor = async (req, res) => {
    const doctorId = req.query.doctorId;
    const date = req.query.date;
    try {
        const data = await doctorServices.getListPatientsForDoctor(doctorId, date)
        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
};
module.exports = {
    getDoctorHome,
    getAllDoctor,
    postSaveInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    getListPatientsForDoctor
}