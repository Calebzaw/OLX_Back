import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './src/routes.js'
import db from './src/db.js'
dotenv.config()
const server = express();

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(fileUpload())
server.use(express.static("./public"))

server.use(routes)

db.authenticate()
server.listen(process.env.PORT, () => console.log(`-- Servidor inicado em ${process.env.BASE}`))