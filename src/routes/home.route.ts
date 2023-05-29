import { Request, Response, Router } from 'express';
import GangwarController from '@controllers/test.controller';
import { Routes } from '@interfaces/routes.interface';

class HomeRoute implements Routes {
  public path = '/';
  public router = Router();
  public gangwarController = new GangwarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, (req: Request, res: Response) => {
      res.status(200).json({ code: 200, message: 'Welcome to the template.' });
    });
  }
}

export default HomeRoute;
