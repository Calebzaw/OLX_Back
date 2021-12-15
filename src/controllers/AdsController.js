import { v4 as uuidv4 } from 'uuid';
import Jimp from 'jimp';
import User from '../models/Users.js'
import Ad from  '../models/Ad.js'
import client from '../redis.js'

const addImage = async (buffer) => {
    let newName = `${uuidv4()}.jpg`;
    let temp = await Jimp.read(buffer);
    temp.cover(500,500).quality(80).write(`./public/media/${newName}`);
    return newName;
}

export const addAction = async (req, res) => {
    let { price, title, desc } = req.body;
    let { utoken } = req.headers
    const user = await User.findOne({where: {utoken}, logging: false})

    const newAd = new Ad();
    newAd.title = title;
    newAd.price = price;
    newAd.description = desc;

    if(req.files && req.files.images){
        if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.images.mimetype)){
            let url = await addImage(req.files.images.data);
            newAd.images.push({
                url,
                default: false,
            })
        }
    }

    if(newAd.images.length > 0){
        newAd.images[0].default = true;
    }

    const info = await newAd.save();
    
    await client.set(`${user.iduser}.${user.numberAds}`, `${info._id}`)

    user.numberAds++
    
    await user.save()

    res.json({id: info._id});

}

export const getAll = async (req, res) => {
    let { utoken } = req.headers
    let arr = []
    let response = []
    const user = await User.findOne({raw: true, where: {utoken}, logging: false})

    for(let i = 0; i < user.numberAds; i++){
        let res = await client.get(`${user.iduser}.${i}`)
        arr.push(res)
    }

    for(let i in arr){
        let aux = await Ad.findById(arr[i])   
        aux ? response.push(aux) : ''
    }

    res.json(response)

}