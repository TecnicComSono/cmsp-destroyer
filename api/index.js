const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/start-task', async (req, res) => {
    const { ra, digito, uf } = req.body;

    try {
        // Faz a requisição de autenticação com as credenciais do usuário
        const authResponse = await axios.post('https://api.cmsp.ip.tv/auth', {
            ra,
            digito,
            uf
        });

        const authToken = authResponse.data.auth_token;

        // Com o token, você pode fazer as outras requisições para realizar as tarefas
        const taskResponse = await axios.get('https://api.cmsp.ip.tv/tms/task', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        res.json({
            message: 'Tarefas iniciadas com sucesso!',
            data: taskResponse.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao iniciar as tarefas.' });
    }
});

module.exports = app;

