import userServices from '../services/userServices'

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    const userData = await userServices.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
const handleGetAllUser = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'missing require parameter',
            user: {}
        })
    }

    const userData = await userServices.getAllUser(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        user: userData ? userData : {}
    })
}
const handleCreateUser = async (req, res) => {
    const message = await userServices.createUser(req.body)
    return res.status(200).json(message)
}
const handleEditUser = async (req, res) => {
    const data = req.body
    const message = await userServices.updateUser(data)
    return res.status(200).json(message)
}
const handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!'
        })
    }
    const message = await userServices.deleteUser(req.body.id)
    return res.status(200).json(message)
}
const handleAllCode = async (req, res) => {
    try {
        const data = await userServices.getAllCodeServices(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleAllCode
}