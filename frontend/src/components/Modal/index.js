import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const modalStyle = {
  content: {
    top: '25%',
    right: '25%',
    bottom: '25%',
    left: '25%',
    borderRadius: '16px',
  },
};

export default ({ isOpen, onClose, children }) => (
  <ReactModal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
    {children}
  </ReactModal>
);
