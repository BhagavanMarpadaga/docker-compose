import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Client } from "pg";
const redis = require('redis');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const main = () => {
  const client = new Client({
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
      port: 6379,        // Redis server port
    });
    rediclient.connect().then(()=>{
      console.log('connected to redis successfully')
    })
};
main();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
