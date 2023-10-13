const SequelizeAuto = require("sequelize-auto");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const GENERATE_MODELS = new SequelizeAuto(
    process.env.DATABASE_AUTH,
    process.env.USERNAME_AUTH,
    process.env.PASSWORD_AUTH,
    {
        host: process.env.HOST_AUTH,
        dialect: process.env.DIALECT_AUTH,
        directory: "./src/databases/models",
        port: process.env.PORT_AUTH,
        caseFile: "c",
        // caseModel: "c",
        // caseProp: "c",
        singularize: true,
        spaces: true,
        indentation: 2,
        additional: {
            timestamps: false,
            // ...options added to each model
        },
        lang: 'ts',
        useDefine: true
    },
);

GENERATE_MODELS.run();