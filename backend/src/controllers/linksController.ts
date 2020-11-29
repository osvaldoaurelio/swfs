import { Request, Response } from 'express';

import Link from '../models/link';
import { findByCode, add, hit } from '../models/linkRepository';

const generateCode = () => {
  let text = '';

  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export default class LinksController {
  public async postLink(request: Request, response: Response) {
    const link: Link = request.body;
    
    link.code = generateCode();
    link.hits = 0;
    const result = await add(link);

    if (!result.id) return response.status(400).json({ "error": "Bad request!"});

    link.id = result.id;

    return response.status(201).json(link);
  }

  public async getLink(request: Request, response: Response) {
    const { code } = request.params;

    const link = await findByCode(code);

    if (!link)  return response.status(404).json({ "error": "Not found!"});

    return response.json(link);
  }

  public async hitLink(request: Request, response: Response) {
    const { code } = request.params;

    const link = await hit(code);

    if (!link)  return response.status(404).json({ "error": "Not found!"});

    return response.json(link);
  }
}

