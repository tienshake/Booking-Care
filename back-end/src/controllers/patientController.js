import patientServices from '../services/patientServices'
const postBookAppointment = async (req, res) => {
    try {
        const data = await patientServices.postBookAppointmentServices(req.body);
        return res.status(200).json(data);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
};
const verifyBookAppointment = async (req, res) => {
    try {
        const data = await patientServices.verifyBookAppointmentServices(req.body);
        return res.status(200).json(data);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!!'
        })
    }
};
module.exports = {
    postBookAppointment,
    verifyBookAppointment
}