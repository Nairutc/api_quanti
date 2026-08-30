import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/api/status', (request, response) => {
    response.json({
        message: 'API Quanti funcionando correctamente'
    });
});

app.listen(PORT, () => {
    console.log(chalk.green(`Servidor corriendo en http://localhost:${PORT}`));
});