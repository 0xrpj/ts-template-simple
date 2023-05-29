import { Response, Request } from 'express';

class TestController {
  public testWar = async (req: Request, res: Response) => {
    try {
      res.send('Hello, Test!');
    } catch (e) {
      res.status(500);
    }
  };
}

export default TestController;
