import express from 'express';
import dotenv from 'dotenv';
import weatherRoute from './routes/weather.js';

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', weatherRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
