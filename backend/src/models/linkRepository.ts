import linkModel, { ILinkModel } from './linkModel';
import Link from './link';

export const findByCode = (code: string) => linkModel.findOne<ILinkModel>({ where: { code } });

export const add = (link: Link) => linkModel.create<ILinkModel>(link);

export const hit = async (code: string) => {
  const link = await findByCode(code);

  if (!link) return null;

  link.hits!++;
  await link.save();

  return link;  
}
