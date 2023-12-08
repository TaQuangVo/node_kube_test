import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

const db_url = NODE_ENV == "production" ? DB_URL : "localhost:27018"
const db_username = NODE_ENV == "production" ? DB_USERNAME : "root"
const db_password = NODE_ENV == "production" ? DB_PASSWORD : "123456"
const db_name = NODE_ENV == "production" ? DB_NAME : "db_test"


const db_conn_string = `mongodb://${db_username}:${db_password}@${db_url}/${db_name}?authSource=admin`
console.log(db_conn_string)
mongoose.connect(db_conn_string).then(() => {
  console.log("connected to db")
}).catch(e => {
  console.log(e)
})

const app: Express = express();
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send()
});

app.get('/server_config', (req: Request, res: Response) => {
  const config = {
    port: PORT,
    node_env: NODE_ENV,
    db_url: DB_URL,
    ok:"ok"
  }
  res.status(200).send(config)
});

let port = NODE_ENV == "production" ? PORT : 3000
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
