import express from "express";
import { AddOne } from "./controllers/UserController.js";
import { addAction, getAll } from './controllers/AdsController.js'
const router = express.Router();

router.post('/user/new', AddOne)

router.post('/ad/new', addAction)

router.get('/ads', getAll)

export default router;