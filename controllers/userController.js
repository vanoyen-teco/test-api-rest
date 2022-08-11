require('dotenv/config');
const userService = require("../models/userService");

const dbSelected = process.env.DB || 'MongoDb';
const service = new userService(dbSelected);

const getUser = (req, res) => {
    if(!req.params.id){
        res.status(400).send({ status: "Bad Request", data: {error: "Id no recibido"} });
    }
    const getUserByID = service.getUserById(req.params.id);
    getUserByID
    .then( (response) => {
        if(response.username){
            res.status(200).send({ status: "OK", data: response })
        }else{
            res.status(400).send({ status: "FAILED", data: {error: "El Usuario no existe"} });
        }
    })
};

const addUser = (req, res) => {
    const { body } = req;
    if (
        !body.username ||
        !body.email ||
        !body.password 
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const newUser = {
        username: body.username,
        email: body.email,
        password: body.password,
    };
    const createdUser = service.createNewUser(newUser);
    (createdUser)
    ?res.status(201).send({ status: "OK", data: createdUser })
    :res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos agregar el elemento."} });
};

const updateUser = (req, res) => {
    const { body } = req;
    if (
        !body.username ||
        !body.email ||
        !body.password ||
        !body.id
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const user = {
        id: body.id,
        username: body.username,
        email: body.email,
        password: body.password,
    };
    const updatedUser = service.updateUser(body.id ,user);
    (updatedUser)
    ?res.status(201).send({ status: "OK", data: updatedUser })
    :res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos agregar el elemento."} });
};

const deleteUser = (req, res) => {
    if(!req.params.id){
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const deletedUser = service.removeUser(req.params.id);
    deletedUser.then((del)=>{
        (del)
        ?res.status(200).send({ status: "OK", data: del })
        :res.status(404).send({ status: "NOT FOUND", data: {error: "Lo sentimos, no encontramos el producto."} })
    })    
};

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser
};