import { Sequelize } from "sequelize";
import Ads from "./Ads.js";
import db from "../db.js";

export default db.define("images", {
    idimage: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idad: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
            model: Ads,
            key: 'idad'
        }
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    flimage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false,
});
