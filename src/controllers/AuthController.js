import bcrypt from 'bcrypt';
import { validationResult, matchedData } from "express-validator"
import User from "../models/Users.js";
import State from '../models/States.js';
export default {
    signIn: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error: errors.mapped()})
            return
        }
        const data = matchedData(req);

        const user = await User.findOne({where: {email: data.email}});

        if(!user){
            res.status(400).json({error: 'Email e/ou senha errados!'});
            return;
        }

        const match = await bcrypt.compare(data.password, user.phash)
        
        if(!match){
            res.status(400).json({error: 'Email e/ou senha errados!'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10);

        user.utoken = token;
        await user.save();

        res.status(200).json({token, email: user.email})
    },

    signUp: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error: errors.mapped()})
            return
        }
        const data = matchedData(req);

        const stateItem = await State.findByPk(data.state)
        
        if(!stateItem){
            res.status(400).json({error:{msg: 'Estado não existe'}})
            return;
        }
        
        const phash = await bcrypt.hash(data.password, 10);
        const payload = (Date.now() + Math.random()).toString()
        const utoken = await bcrypt.hash(payload, 10);

        User.sequelize.transaction(async () => {
            await User.create({
                nmuser: data.name,
                email: data.email,
                phash,
                utoken,
                idstate: data.state,
            },{returning: ['utoken']}).then(result=>res.json(result.dataValues.utoken))
        }).catch(err=>res.status(400).send(err))
    },
}