import express from 'express';
import db from './config/index.js';
import router from './routes/index.js';
import cors from 'cors';
import Users from './model/index.js';
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended:false }));
app.use(router);

try {
  await db.authenticate();
  console.log("databases connected...");
} catch (error) {
  console.log(error);
}

app.listen(8000);