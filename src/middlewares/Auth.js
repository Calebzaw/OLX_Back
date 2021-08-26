import User from '../models/Users.js'

export default {
    private: async (req, res, next) => {
        if(!req.query.token && !req.body.token){
            res.json({error: {notAllowed: true}});
            return;
        }

        let token = '';

        if(req.query.token){
            token = req.query.token;
        }
        if(req.body.token){
            token = req.body.token;
        }

        if(token == ''){
            res.json({error: {notAllowed: true}});
            return;
        }

        const user = await User.findOne({where: {utoken:token}})
        
        if(!user){
            res.json({error: {notAllowed: true}});
            return;
        }

        next()
    },
}