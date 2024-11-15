require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 4000;
const API_URL = process.env.API_URL;


console.log("API URL:", API_URL);

app.use(express.static('views'));


app.get('/api/recipes', async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/search.php?s=`);
      res.json(response.data.meals);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error.message); // Log detalhado do erro
      res.status(500).send("Erro ao carregar receitas.");
    }
  });
  

  app.get('/api/recipe/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
      const response = await axios.get(`${API_URL}/lookup.php?i=${recipeId}`);
      res.json(response.data.meals[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao carregar detalhes da receita.");
    }
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
