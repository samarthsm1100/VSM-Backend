import cron from 'node-cron';
import axios from 'axios';

const pingURL = 'https://vsm-backend-fsps.onrender.com';

export const startCronJob = () => {
  cron.schedule('*/10 * * * *', async () => {
    try {
      const res = await axios.get(pingURL);
      console.log(`[CRON] Ping successful: ${res.status} at ${new Date().toISOString()}`);
    } catch (err) {
      console.error(`[CRON] Ping failed: ${err.message}`);
    }
  });
};
