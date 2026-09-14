import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import routerAPI from './routes/index.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));

connectDB();

const PORT = process.env.PORT;

app.get('/api/status', (request, response) => {
    response.json({
        message: 'API Quanti funcionando correctamente',
    });
});

routerAPI(app);

app.listen(PORT, () => {
    console.log(chalk.green(`Servidor corriendo en http://localhost:${PORT}`));
});
