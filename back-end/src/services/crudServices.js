import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);


const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('oke creat new user successfully!')
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
const getAllUsers = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                raw: true
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
const editUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findOne({ where: { id: id }, raw: true });
            if (data) {
                resolve(data)

            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                id: data.id,
            })
            if (user) {
                const { firstName, lastName, address } = data;
                user.firstName = firstName
                user.lastName = lastName
                user.address = address
                await user.save();
                const allUser = await db.User.findAll()
                resolve(allUser);

            } else {
                resolve();
            }

        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id: id } })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser,
    getAllUsers,
    editUser,
    updateUser,
    deleteUser
}