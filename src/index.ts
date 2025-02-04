import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Client } from "pg";
const redis = require('redis');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const main = () => {
  const client = new Client({
    user: "example",
    host: "postgres",
    database: "test",
    password: "example",
    port: 5432,
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
      host: 'redis', // Redis server host
      port: 6379,        // Redis server port
    });
    rediclient.connect().then(()=>{
      console.log('connected to redis successfully')
    }).catch(()=>{
      console.log("Error while connecting to redis")
    })
};
main();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
