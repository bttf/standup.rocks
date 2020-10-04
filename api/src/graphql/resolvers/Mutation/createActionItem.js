import db from 'src/data';

async function createActionItemMutation(_, args, context) {
  const {text, standupUuid} = args;

  const standup = await db.Standup.findOne({
    where: {uuid: standupUuid},
  });

  const actionItem = await db.ActionItem.create({
    text,
    standup_id: standup.id,
  });

  console.log('DEBUG actionItem', actionItem);

  return {actionItem};
}

export default createActionItemMutation;
