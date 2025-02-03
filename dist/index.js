"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const redis = require('redis');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const main = () => {
    const client = new pg_1.Client({
        user: "example",
        host: "localhost",
        database: "test",
        password: "example",
        port: 5431,
    });
    client
        .connect()
        .then(() => {
        console.log("Connected to PostgreSQL database!");
    })
        .catch((err) => {
        console.error("Error connecting to the database:", err);
    });
    const rediclient = redis.createClient({
        host: 'localhost', // Redis server host
        port: 6379, // Redis server port
    });
    rediclient.connect().then(() => {
        console.log('connected to redis successfully');
    });
};
main();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
