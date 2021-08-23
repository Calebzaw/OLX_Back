import { Sequelize } from "sequelize";
import State from "./States.js";
import db from "../db.js";

export default db.define("users", {
    iduser: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nmuser: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phash: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    utoken: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    idstate: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references:{
            model: State,
            key: 'idstate'
        }
    }
},{
    freezeTableName: true,
    timestamps: false,
});
