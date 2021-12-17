import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './src/routes.js'
import db from './src/db.js'
import mongoose from 'mongoose';
dotenv.config()

const server = express();

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(fileUpload())
server.use(express.static("./public"))

server.use(routes)

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
    console.log('Erro:', error.message)
})

db.sync({force: true})
server.listen(process.env.PORT, () => console.log(`-- Servidor inicado em ${process.env.BASE}`))