import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import createRouter  from './routers/createRouter.js';
import getNftRouter from './routers/getNftRouter.js';
config();

const port = 8000;
const app = express();

//use static files
app.use(express.static('public'));
//middleware
var corsOptions = {
  credentials: true,
  origin: "http://localhost",
  // origin: "https://market-place-backend-vert.vercel.app/",
};
//connect mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
      console.log("Connected to MongoDB")
  })
  .catch((err) => {
      console.log(err);
  });

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/create", createRouter);
app.use("/getNft", getNftRouter);

app.listen(port, () => {
  console.log(`server is runnig at ${port}`);
})