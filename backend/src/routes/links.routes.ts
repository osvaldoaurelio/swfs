import { Router } from 'express';

import LinksController from '../controllers/linksController';

const { postLink, getLink, hitLink } = new LinksController();
const linksRoutes = Router();

linksRoutes.post('/', postLink);
linksRoutes.get('/:code', hitLink);
linksRoutes.get('/:code/stats', getLink);

export default linksRoutes;
