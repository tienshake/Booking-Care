import axios from '../axios';

const handleLoginApi = async (email, password) => {
    return await axios.post('/api/login', { email, password });
}
const getAllUser = (id) => {
    return axios.get(`/api/getAllUser?id=${id}`);
}
const createNewUserService = (data) => {
    return axios.post('/api/create-user', data);
}
const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id
        }
    })
}
const editUserService = (data) => {

    return axios.put('/api/edit-user', data);
}
const getAllCodeService = (type) => {
    return axios.get(`/api/AllCode?type=${type}`);
}
const getTopDocsService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`);
}

const saveDataDetailDoctor = (data) => {
    return axios.post('/api/save-info-doctor', data);
}

const getDetailDoctorById = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}
const saveBulkCreateScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}
const getScheduleDoctorByDate = (id, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?id=${id}&date=${date}`);
}
const getExtraInfoDoctorById = (id) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?id=${id}`);
}
const getProfileDoctorById = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?id=${id}`);
}
const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}
const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}
const getAllDetailSpecialty = (data) => {
    return axios.get(`api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}
export {
    getAllUser,
    handleLoginApi,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDocsService,
    getAllDoctor,
    saveDataDetailDoctor,
    getDetailDoctorById,
    saveBulkCreateScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookingAppointment,
    postVerifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialty
}