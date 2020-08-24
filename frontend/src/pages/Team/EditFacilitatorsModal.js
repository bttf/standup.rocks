import React from 'react';
import { Dialog } from 'evergreen-ui';

export default ({
  showEditFacilitators,
  setShowEditFacilitators,
}) => {
  return (
    <Dialog
      isShown={showEditFacilitators}
      title="Edit facilitators"
      confirmLabel="Done"
      onCloseComplete={() => setShowEditFacilitators(false)}
    >
      Hi there
    </Dialog>
  );
};
