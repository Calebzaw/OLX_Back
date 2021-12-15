import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("users", {
    iduser: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    numberAds: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    utoken: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false,
});
