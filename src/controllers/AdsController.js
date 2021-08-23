import { v4 as uuidv4 } from 'uuid';
import Jimp from 'jimp';
import Category from "../models/Categories.js"
import User from '../models/Users.js'
import State from '../models/States.js'
import Ad from  '../models/Ads.js'
import Images from '../models/Images.js'
import sequelize from 'sequelize';

const Op = sequelize.Op

Images.belongsTo(Ad, {
    foreignKey: 'idad'
})
Ad.hasMany(Images, {
    foreignKey: 'idad'
})

User.hasMany(Ad, {
    foreignKey: 'iduser'
})
Ad.belongsTo(User, {
    foreignKey: 'iduser'
})

Category.hasMany(Ad, {
    foreignKey: 'idcat'
})
Ad.belongsTo(Category, {
    foreignKey: 'idcat'
})

State.hasMany(User, {
    foreignKey: 'idstate'
})
User.belongsTo(State, {
    foreignKey: 'idstate'
})

State.hasMany(Ad, {
    foreignKey: 'idstate'
})
Ad.belongsTo(State, {
    foreignKey: 'idstate'
})


const addImage = async (buffer) => {
    let newName = `${uuidv4()}.jpg`;
    let temp = await Jimp.read(buffer);
    temp.cover(500,500).quality(80).write(`./public/media/${newName}`);
    return newName;
}

export default {
    getCategories: async (req, res) => {
        const cats = await Category.findAll({raw:true});

        let categories = []

        for(let i in cats){
            categories.push({
                ...cats[i],
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            })
        }

        res.status(200).json(categories)
    },

    addAction: async (req, res) => {
        let {title, price, priceneg, desc, cat, token} = req.body;
        const user = await User.findOne({
            where:{
                utoken:token
            }
        })

        if(!title || !cat){
            res.status(400).json({error: 'Título e/ou Categoria não foram preenchidos'});
            return;
        }

        const category = await Category.findByPk(cat)
        if(!category){
            res.status(400).json({error: 'Categoria inexistente'})
            return;
        }

        if(price){
            price = price.replace('.', '').replace(',','.').replace("R$ ", '');
            price = parseFloat(price)
        }else {
            price = 0
        }

        Ad.sequelize.transaction(async () => {
            await Ad.create({

                adstatus: true,
                iduser: user.iduser,
                idstate: user.idstate,
                datecreated: new Date(),
                title: title,
                idcat: cat,
                price: price,
                priceneg: (priceneg == "true") ? true : false,
                description: desc,
                adviews: 0
            },{returning: ['idad']})

            .then(result => {

                let idad = result.dataValues.idad;

                Images.sequelize.transaction(async () => {
                    if(req.files && req.files.img){
                        if(req.files.img.length == undefined){
                            if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)){
                                let url = await addImage(req.files.img.data);
                                await Images.create({
                                    idad,
                                    url,
                                    flimage: true,
                                })
                            }
                        }else {
                            for(let i = 0; i < req.files.img.length; i++){
                                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)){
                                    let url = await addImage(req.files.img[i].data);
                                    if( i = 0 ){
                                        await Images.create({
                                            idad,
                                            url,
                                            flimage: true,
                                        })
                                    }else{
                                        await Images.create({
                                            idad,
                                            url,
                                            flimage: false,
                                        })
                                    }
                                }
                            }
                        }
                    }
                }).catch(err => {
                    let erro = new Error;
                    res.status(400).send(err)
                    return erro;
                }) 

                res.json({id: idad});

            })
        }).catch(err => res.status(400).send(err))
    },

    getList: async (req, res) => {
        let {sort = 'asc', offset = 0, limit = 9, q, cat, state} = req.query;
        let filters = { where: {}};

        filters.where.adstatus = true
        
        let total = 0;
        if(q){
            filters.where.title = {[Op.iLike]: `%${q}`};
        }

        if(cat){
            filters.where.idcat = cat
        }

        if(state){
            filters.where.idstate = state
        }

        total = await Ad.count(filters)

        const adsData = await Ad.findAll({
            raw:true,
            attributes: ['idad', 'title', 'price', 'priceneg'],
            where: filters.where,
            limit,
            offset,
            order: [['datecreated', `${sort}`]],
            include: [{
                model: Images,
                attributes: ['url'],
                required: false,
                duplicating: false,
                where:{
                    flimage: true
                }
            }]
        })

        let ads = [];

        for(let i in adsData){
            ads.push({
                id: adsData[i].idad,
                title: adsData[i].title,
                price: adsData[i].price,
                priceNegotiable: adsData[i].priceneg,
                image: adsData[i]['images.url'] ? `${process.env.BASE}/media/${adsData[i]['images.url']}` : `${process.env.BASE}/media/default.jpg`
            })
        }

        res.json({ads, total})
    },

    getItem: async (req, res) => {
        let {id, other = null} = req.query

        if(!id){
            res.json({error: 'Sem produto'});
            return;
        }

        let item = await Ad.findOne({
            raw:true,
            attributes: { exclude: ['idcat', 'iduser', 'idstate'] },
            where: {
                idad: id
            },
            include: [{
                model: User,
                duplicating: false,
                attributes: ['nmuser', 'email']
            },{
                model: Category,
                attributes: ['dscat', 'slug'],
                duplicating: false,
            },{
                model: State,
                duplicating: false,
                attributes: ['dsstate']
            }]
        })

        if(!item){
            res.json({error: 'Produto inexistente'})
            return;
        }

        Ad.increment('adviews', {where: {idad: item.idad}})

        let tempImages = await Images.findAll({
            raw:true,
            attributes: ['url', 'flimage'],
            where: {
                idad: id
            }
        });


        let images = []
        for(let i in tempImages){
            images.push({
                ...tempImages[i], url: `${process.env.BASE}/media/${tempImages[i].url}`
            }) 
        }
        

        let others = []

        if(other){
            const otherData = await Ad.findAll({
                raw:true,
                where: {
                    iduser: item.iduser,
                    adstatus: true
                }
            })
            if(otherData){
                for(let i in otherData){
                    if(otherData[i].idad != item.idad){

                        let image = await Images.findOne({
                            raw:true,
                            attributes: ['url'],
                            where: {
                                idad: otherData[i].idad,
                                flimage: true
                            }
                        })
                        
                        if(!image){
                            image = `${process.env.BASE}/media/default.jpg`;
                        }else{
                            image.url = `${process.env.BASE}/media/${image.url}`;
                        }

                        others.push({
                            id:otherData[i].idad,
                            title:otherData[i].title,
                            price:otherData[i].price,
                            priceNegotiable:otherData[i].priceneg,
                            image: image.url ? image.url : image 
                        })

                    }
                }
            }
        }

        res.json({
            id:item.idad,
            title:item.title,
            price: item.price,
            priceNegotiable: item.priceneg,
            description: item.description,
            dateCreated:item.datecreated,
            views:item.adviews,
            images,
            category: {
                name: item['category.dscat'],
                slug: item['category.slug'],
            },
            userInfo: {
                name: item['user.nmuser'],
                email: item['user.email']
            },
            stateName: item['state.dsstate'],
            others
        })
    },

    editAction: async (req, res) => {
        let { id } = req.params;
        let { title, status, price, priceneg, desc, cat, images, token } = req.body;

        if(id.length < 12) {
            res.status(400).json({error: 'ID Inválido'});
            return;
        }

        const ad = await Ad.findById(id).exec()
        if(!ad){
            res.status(400).json({error: "Anúncio inexistente"})
            return;
        }

        const user = await User.findOne({token}).exec()
        if(user._id.toString() !== ad.idUser){
            res.json({error: "Este anúncio não é seu"})
            return;
        }

        let updates = {}

        if(title){
            updates.title = title;
        }
        if(price){
            price = price.replace('.', '').replace(',','.').replace("R$ ", '');
            price = parseFloat(price)
            updates.price = price
        }
        if(priceneg){
            updates.priceNegotiable = priceneg;
        }
        if(status){
            updates.status = status
        }
        if(desc) {
            updates.description = desc
        }
        if(cat){
            const category = await Category.findOne({slug: cat}).exec()
            if(!category){
                res.json({error: 'Categoria Inexistente'});
                return;
            }
            updates.category = category._id.toString()
        }
        if(images){
            updates.images = images
        }
        
        if(req.files && req.files.img){
            if(req.files.img.length == undefined){
                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)){
                    let url = await addImage(req.files.img.data);
                    updates.images.push({
                        url,
                        default: false,
                    })
                }
            }else {
                for(let i = 0; i < req.files.img.length; i++){
                    if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)){
                        let url = await addImage(req.files.img[i].data);
                        updates.images.push({
                            url,
                            default: false,
                        })
                    }
                }
            }

            updates.images = [...updates.images]
        }
        
        await Ad.findByIdAndUpdate(id, {$set: updates})

        res.status(200).send("Atualização Concluída")
    },
}