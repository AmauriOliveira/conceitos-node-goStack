const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const obj = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }
  repositories.push(obj);
  return response.json(obj);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const indexId = repositories.findIndex(repositore => repositore.id === id);

  if (indexId < 0) {
    return response.status(400).json({ erro: 'Not Found' });
  }
  let { likes } = repositories[indexId];
  const obj = {
    id,
    url,
    title,
    techs,
    likes
  }

  repositories[indexId] = obj;

  return response.json(obj);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexId = repositories.findIndex(repositore => repositore.id === id);

  if (indexId < 0) {
    return response.status(400).json({ erro: 'Not Found' });
  }
  repositories.splice(indexId, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const indexId = repositories.findIndex(repositore => repositore.id === id);

  if (indexId < 0) {
    return response.status(400).json({ erro: 'Not Found' });
  }
  let { likes } = repositories[indexId];
  likes++;
  const obj = { ...repositories[indexId], likes }

  repositories[indexId] = obj;

  return response.json(obj);

});

module.exports = app;
