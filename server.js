import app from './app.js';
import dotenv from 'dotenv';
import connectToMongoDB from './database/mongo.js';
import { startCronJob } from "./utils/cronJob.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToMongoDB();
  startCronJob();
});
