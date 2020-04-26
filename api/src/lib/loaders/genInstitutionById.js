import Dataloader from 'dataloader';
import db from '../../db';

export default () =>
  new Dataloader(ids => {
    return db.PlaidInstitution.findAll({
      where: { institutionId: ids },
    });
  });
