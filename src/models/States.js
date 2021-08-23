import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("states", {
    idstate: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    dsstate: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false,
});
