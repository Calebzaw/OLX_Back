import { Sequelize } from "sequelize";
import Users from "./Users.js";
import States from "./States.js";
import Categories from "./Categories.js";
import db from "../db.js";

export default db.define("ads", {
    idad: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    adstatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    iduser: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: Users,
            key: 'iduser'
        }
    },
    idstate: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references:{
            model: States,
            key: 'idstate'
        }
    },
    idcat: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: Categories,
            key: 'idcat'
        }
    },
    title: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    priceneg: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    adviews: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    datecreated: {
        type: Sequelize.DATE,
        allowNull:false,
    }
},{
    freezeTableName: true,
    timestamps: false,
});
