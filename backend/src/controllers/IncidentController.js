const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        // esquema de paginação
        // limita o numero de casos a 5 por pagina 
        // em offset pula-se casos, na primeira pagina pula-se 0 casos, na segunda pagina pula-se os 5 primeiros casos e asism por diante
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count(); // contador para a quantidade de casos

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; // guarda informações do contexto da requisição

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            if(incident.ong_id != ong_id){
                return response.status(401).json({ error: 'Operation not permitted.'}) // http status code 401 desautorizado
            }

            await connection('incidents').where('id', id).delete(); // deleta registros da tabela do CD

            return response.status(204).send();
    }
};