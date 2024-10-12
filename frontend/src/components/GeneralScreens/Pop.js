// Pop.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledModalHeader = styled(Modal.Header)`
  background-color: #343a40;
  color: white;
`;

const StyledModalBody = styled(Modal.Body)`
  text-align: center;
  padding: 30px;
`;

const StyledModalFooter = styled(Modal.Footer)`
  border-top: none;
  justify-content: center;
`;

const Pop = ({ show, handleClose }) => {

  const handleEmailClick = () => {
    const email = "help@myprivatecryptowallet.com";
    const subject = `Wallet #4t345h65l9`;
    const body =
      `Hello MPCT Team,\n\n` +
      `I am facing a maintenance error with my deposit/withdrawals, can you please guide me through the process\n\n` +
      `\n\n` +
      `Thank you!\n\n` +
      `[Your Name]`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <StyledModalHeader closeButton>
        <Modal.Title>System Maintenance</Modal.Title>
      </StyledModalHeader>
      <StyledModalBody>
        <p>
          <strong>Sorry!</strong> Due to system maintenance, we cannot process
          deposits or withdrawals. Please contact our support team right away
          to process your transaction.
        </p>
      </StyledModalBody>
      <StyledModalFooter>
        <Button variant="secondary" onClick={handleEmailClick}>
          Cntact Us Here
        </Button>
      </StyledModalFooter>
    </Modal>
  );
};

export default Pop;
