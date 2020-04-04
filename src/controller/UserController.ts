import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entities/User';

export default class UserController {
  private userRepository = getRepository(User);

  constructor() {
    this.all = this.all.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
    this.confirmation = this.confirmation.bind(this);
  }

  async all(req: Request, res: Response) {
    const { page = 1, perPage = 10 } = req.query;
    const skip = (page - 1) * perPage;

    const users = await this.userRepository.find({ skip, take: perPage });

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const user = this.userRepository.create(req.body);
    await this.userRepository.save(user);

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    await this.userRepository.update(req.params.id, req.body);
    const user = await this.userRepository.findOneOrFail(req.params.id);

    return res.json(user);
  }

  async show(req: Request, res: Response) {
    const user = await this.userRepository.findOneOrFail(req.params.id);

    return res.json(user);
  }

  async destroy(req: Request, res: Response) {
    const userToRemove = await this.userRepository.findOneOrFail(req.params.id);
    await this.userRepository.remove(userToRemove);

    return res.json();
  }

  async confirmation(req: Request, res: Response) {
    const { params, query } = req;
    const userToConfirm = await this.userRepository.findOneOrFail({
      where: {
        id: params.id,
        token: query.token,
        status: false,
      },
      select: ['id']
    });

    await this.userRepository.update(userToConfirm.id, { status: true });

    return res.json({ message: 'confirmed' });
  }
}
