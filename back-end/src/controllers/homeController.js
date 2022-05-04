import db from '../models/index'
import crudServices from '../services/crudServices'

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        res.render("homePage", { dataUser: JSON.stringify(data) });
    } catch (e) {
        console.log(e)
    }


}
const getCrud = async (req, res) => {
    return res.render('crud')
}
const postCrud = async (req, res) => {
    const message = await crudServices.createNewUser(req.body)
    console.log(message)
    return res.send('oke')
}
const displayGetCrud = async (req, res) => {
    const data = await crudServices.getAllUsers()
    return res.render("displayCrud", { dataUser: data })
}
const getEditCrud = async (req, res) => {
    const id = req.query.id
    if (id) {
        const data = await crudServices.editUser(id)
        return res.render("editCrud", { dataUser: data })
    } else {
        return res.send('user not found')

    }

}
const putCrud = async (req, res) => {
    const data = req.body
    const allUser = await crudServices.updateUser(data)
    return res.render("displayCrud", { dataUser: allUser })
}
const deleteCrud = async (req, res) => {
    const id = await req.query.id
    if (id) {
        await crudServices.deleteUser(id)
        return res.send("oke delete")

    } else {
        return res.send("user not found")
    }

}
module.exports = {
    getHomePage,
    getCrud,
    postCrud,
    displayGetCrud,
    getEditCrud,
    putCrud,
    deleteCrud
}