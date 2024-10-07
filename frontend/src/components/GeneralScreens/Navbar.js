import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'react-bootstrap-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';

// Define the product mapping
const categoryMapping = {
  "RIFLES": "Rifles",
  "AIR GUNS": "Air Guns",
  "SHOTGUNS": "Shotguns",
  "ACCESSORIES": "Accessories",
  "PISTOL / HANDGUNS": "Pistols",
  "AMMUNITION": "Ammunition",
  "DEACTIVATED": "Deactivated",
  "BLADES": "Blades",
  "OTHER GUNS": "Other Guns",
  "GUN DOGS": "Gun Dogs",
  "REPLICA": "Replica",
  "BOWS & CROSSBOWS": "Bows & Crossbows",
  "WANTED": "Wanted",
  "SERVICES": "Services"
};

// Sample products array
const products = [
  { name: "DEPOSITS" },
  {name: "WITHDRAWALS"}
];

function Navbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProductClick = (productName) => {
    const categoryName = categoryMapping[productName];
    if (categoryName) {
      navigate(`/all-guns?category=${encodeURIComponent(categoryName)}`);
      handleClose(); // Close the Offcanvas after navigation
    } else {
      console.error(`Category "${productName}" not found.`);
    }
  };

  return (
    <NavbarContainer>
      <MenuIcon
        size={30}
        color="#343a40" // Dark color for the icon
        onClick={handleShow}
        aria-label="Open product categories menu"
      />
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <OffcanvasHeader closeButton style={{marginLeft: '15px', fontWeight: '800'}}>
          <OffcanvasTitle />
        </OffcanvasHeader>
        <Offcanvas.Body>
          <ProductList>
            {products.map((product) => (
              <ProductItem
                key={product.name}
                onClick={() => handleProductClick(product.name)}
              >
                {product.name}
              </ProductItem>
            ))}
          </ProductList>
        </Offcanvas.Body>
      </Offcanvas>
    </NavbarContainer>
  );
}

export default Navbar;

// Styled components
const NavbarContainer = styled.div`
  position: relative;
`;

const MenuIcon = styled(List)`
  cursor: pointer;
`;

const OffcanvasHeader = styled(Offcanvas.Header)`
  background-size: 50% auto; // Adjust the percentage as needed
  background-position: center;
  background-repeat: no-repeat;
  height: 70px; // Adjust the height if needed
  border-bottom: none; // Remove the border if not needed
  padding: 0; // Remove default padding if needed
`;

const OffcanvasTitle = styled(Offcanvas.Title)`
  display: none; // Hide the title if not needed
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem; // Reduced spacing
`;

const ProductItem = styled.div`
  padding: 0.75rem; // Reduced padding
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 4px;
  background-color: #f8f9fa; // Light background color
  color: #343a40; // Dark text color
  font-weight: bold;

  &:hover {
    background-color: #343a40; // Dark background on hover
    color: #f8f9fa; // Light text on hover
  }
`;