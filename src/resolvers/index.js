import Resolver from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();

const getUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const getListKeyFromContext = (context) => {
  const { localId: id } = context;
  return id.split('/')[id.split('/').length - 1];
};

const getAll = async (listId) => {
  return await storage.get(listId) || [];
}

resolver.define('create', async (req) => {
    const listId = getListKeyFromContext(req.context);
    const records = await getAll(listId);
    const id = getUniqueId();
  
    const newRecord = {
      id: id,
      description:  req.payload.expenseDescription,
      amount: req.payload.expenseAmount,
    };
  
    await storage.set(listId, [...records, newRecord]);
    return newRecord;
});

resolver.define('get-all', (req) => {
  return getAll(getListKeyFromContext(req.context));
});

export const handler = resolver.getDefinitions();
