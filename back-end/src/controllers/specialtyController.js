import specialtyServices from '../services/specialtyServices'

const createNewSpecialty = async (req, res) => {
    try {
        const message = await specialtyServices.createNewSpecialty(req.body);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error creating new specialty'
        })
    }

};
const getAllSpecialty = async (req, res) => {
    try {
        const data = await specialtyServices.getAllSpecialty();
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error creating new specialty'
        })
    }
};
const getSpecialtyById = async (req, res) => {
    try {
        const data = await specialtyServices.getSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

};
module.exports = {
    createNewSpecialty,
    getAllSpecialty,
    getSpecialtyById
}
