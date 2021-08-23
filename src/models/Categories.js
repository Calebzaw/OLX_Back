import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("categories", {
    idcat: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    dscat: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false,
});
