import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
class UserController {

    async create(req: Request, res: Response) {

        try {
            const { name, email } = req.body;

            const usersRepository = getRepository(User);
            const user = usersRepository.create({
                name, email
            })

            const userExists = await usersRepository.findOne({
                email
            })

            if (userExists) {
                return res.status(400).json({
                    error: "Usuário já exite"
                })
            }

            await usersRepository.save(user);
            res.json(user);
        } catch (error) {
            console.log("Error", error);
        }
    }
}

export { UserController }