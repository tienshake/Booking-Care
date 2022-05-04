const db = require("../models")

const createNewSpecialty = async (data) => {
    try {
        if (!data.name || !data.imageB64 || !data.contentHTML || !data.contentMarkdown) {
            return {
                errCode: 1,
                errMessage: "Missing required parameter!"
            }
        } else {
            await db.Specialty.create({
                name: data.name,
                image: data.imageB64,
                descriptionMarkdown: data.contentMarkdown,
                descriptionHTML: data.contentHTML
            });
            return {
                errCode: 0,
                errMessage: "Oke"
            }
        }
    } catch (e) {
        throw new Error('Error from sever', e)
    }
}
const getAllSpecialty = async () => {
    try {
        let data = await db.Specialty.findAll();
        if (data && data.length > 0) {
            data.map(item => {
                item.image = new Buffer(item.image, 'base64').toString('binary');
                return item;
            })
            return {
                errCode: 0,
                errMessage: 'oke',
                data: data
            }
        } else {
            return {
                errCode: 1,
                errMessage: 'Error from sever',
                data: []
            }
        }
    } catch (e) {
        console.log(e);
        throw new Error('Error from sever', e)
    }
};
const getSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                // let data = {}
                let data = await db.Specialty.findOne({
                    where: {
                        id: id,
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: id },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: id, provinceId: location },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;

                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'oke',
                    data: data
                })


            }
        } catch (e) {
            reject(e)
        }
    })
};
module.exports = {
    createNewSpecialty,
    getAllSpecialty,
    getSpecialtyById
}