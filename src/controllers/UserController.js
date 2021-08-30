import { validationResult, matchedData } from "express-validator"
import bcrypt from 'bcrypt';
import State from '../models/States.js';
import User from '../models/Users.js';
import Category from '../models/Categories.js';
import Ad from '../models/Ads.js';

State.hasMany(User, {
    foreignKey: 'idstate'
});
User.belongsTo(State, {
    foreignKey: 'idstate'
});

Category.hasMany(Ad, {
    foreignKey: 'idcat'
});
Ad.belongsTo(Category, {
    foreignKey: 'idcat'
});

State.hasMany(Ad, {
    foreignKey: 'idstate'
});
Ad.belongsTo(State, {
    foreignKey: 'idstate'
});

User.hasMany(Ad, {
    foreignKey: 'iduser'
});
Ad.belongsTo(User, {
    foreignKey: 'iduser'
});

export default {
    getStates: async (req, res) => {
        State.findAll({raw: true})
            .then(states=>res.status(200).json(states))
            .catch(err=>res.status(400).send(err))
    },

    getInfo: async (req,res) => {
        let utoken = req.query.token;

        const user = await User.findOne({
            raw:true,
            attributes: ['iduser', 'nmuser', 'email'],
            where: {
                utoken: utoken
            },
            include:[{
                model: State,
                attributes: ['dsstate']
            }]
        })
        const ads = await Ad.findAll({
            raw:true,
            where: {iduser: user.iduser},
            include:[{
                model: Category,
                attributes: ['dscat', 'slug']
            }]
        })

        res.status(200).json({
            name: user.nmuser,
            email: user.email,
            state: user['state.dsstate'],
            ads: ads
        })
    },

    editAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error: errors.mapped()})
            return
        }
        const data = matchedData(req);
        let phash = await bcrypt.hash(data.password, 10)

        User.sequelize.transaction(async () => {
            await User.update({
                nmuser: data.name,
                email: data.email,
                idstate: data.state,
                phash
            },{
                where: {
                    utoken: data.token
                },
                fields: ['nmuser', 'email', 'idstate', 'phash']
            }).then(() => res.status(200).send('Atualizado com sucesso!'))
        }).catch(err=>res.status(400).send(err))

    },
}