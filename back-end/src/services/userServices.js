import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'firstName', 'lastName', 'password'],
                    raw: true
                })
                // false
                if (user) {
                    const check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'oke';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email`;
            }
            resolve(userData)

        } catch (e) {
            reject(e)
        }
    })
}


const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //checkUserEmail
            const check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'you email is already in used, please another email'
                })
            } else {
                const hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'oke'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id: userId } });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist`
                })
            }
            if (user) {
                await db.User.destroy({ where: { id: user.id } });
            }
            resolve({
                errCode: 0,
                message: `The user is delete`
            })
        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameter`
                });
            }
            const user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.gender = data.gender
                user.phoneNumber = data.phoneNumber
                user.roleId = data.roleId
                user.positionId = data.positionId
                if (data.avatar) {
                    user.image = data.avatar
                }
                await user.save();

                resolve({
                    errCode: 0,
                    message: `Update user success`
                });

            } else {
                resolve({
                    errCode: 1,
                    message: `User isn't found`
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}
const getAllCodeServices = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    error: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                const res = {};
                const allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);

            }


        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin,
    getAllUser,
    createUser,
    deleteUser,
    updateUser,
    getAllCodeServices
}