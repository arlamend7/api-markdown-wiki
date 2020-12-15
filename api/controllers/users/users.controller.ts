import { Request, Response } from 'express';
import knex from '../../connection';

class UsersController {
    async index(request: Request, response: Response) {
        const users = await knex('user').select('*');
        return response.json(users);
    }

    async create(request: Request, response: Response) {
        const { Nome }: { Nome: string } = request.body;

        var transaction = await knex.transaction()
        try {
            var [id] = await transaction('user').insert({
                Nome
            });
        } catch(e) {
            transaction.rollback();
            return response.status(500).json({ message: 'Failed to save user.'});
        }
        transaction.commit();

        return response.status(200).json({id,Nome});
    }
}

export default new  UsersController();
