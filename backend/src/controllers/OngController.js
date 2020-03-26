const connection = require('../database/connection');
const crypto = require('crypto'); // para gerar um ID aleatorio na linha 14

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create (request, response){
        const { name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX')
    
        // insere todas as colunas do BD
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id });
    }
};