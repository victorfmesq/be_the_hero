const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const app = express();

app.use(cors()); // a principio permite as aplicações front-end acessar o back-end 
app.use(express.json()); // informa o app que utilizaremos Json para as requisições
app.use(routes);

app.listen(3333);
/**
 *Rotas / Recursos
*/

/**
 * Métodos HTTP:
 * 
 * GET: Buscar/Listar uma informação do Back-end
 * POST: Criar uma informação no Back-end
 * PUTS: Alterar uma informação no Back-end
 * DELETE: Deletar uma informação no Back-end
 */

 /**
  * Tipos de Parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação) acessados atravez de 'request.query'
  * Route Params: Parâmetros utilizados para identificar recursos especificos (ID) acessados atravez de 'request.params'
  * Request Body: Corpo da Requisição, utilizado para criar ou alterar recursos acessados atravez de 'request.body'
  */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle etc
 * NoSQL: MongoDB, CouchDB etc
 */

 /**
  * Driver: SELECT * FROM users
  * Query Builder: table('users').select('*').where()
  */
