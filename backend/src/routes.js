const express = require('express'); //importando express

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); // desacoplando modulo de rotas na variavel routes

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index); //lista as inserções da tabela
routes.post('/ongs', OngController.create); // preenche a tabela de ongs.

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;