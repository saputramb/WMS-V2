import { Router } from 'express';
import maintenance from "./maintenance";
import authentication from "./authentication";
import user from './user';

const router = Router();

export default (): Router => {
  maintenance(router);
  authentication(router);
  user(router);

  return router;
};