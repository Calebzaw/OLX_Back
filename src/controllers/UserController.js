import bcrypt from 'bcrypt';
import User from '../models/Users.js';

export const AddOne = async (req, res) => {
    let { nome, email } = req.body
    const token = await bcrypt.hash((Math.random() + (new Date().toString())), 8) 

    User.create({
        nome,
        email,
        utoken: token
    },{logging: false})
    .then(result => res.json(result))
    .catch(err => (console.log(err), res.status(500).send(err)))

}