import { connect as mConnect } from "mongoose";

const DB_URL =
    process.env.MONGO_URL || "mongodb://localhost:27017/hackathon-imta";

const connect = () => {
    mConnect(DB_URL)
        .then(() => console.log(`connected to the database on url: ${DB_URL}`))
        .catch((err) => {
            console.log("cannot connect to the database", err);
            process.exit();
        });
};

export { connect };
