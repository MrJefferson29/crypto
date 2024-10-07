import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Row, Col, Container } from "react-bootstrap";
import avatar from "../../Assets/avatar.png";
import btc from "../../Assets/btc.png";
import usd from "../../Assets/usd.png";
import eur from "../../Assets/eur.png";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import qr from '../../Assets/qr.jpg'
import p1 from "../../Assets/p1.png";
import p2 from "../../Assets/p2.png";
import p3 from "../../Assets/p3.png";
import p4 from "../../Assets/p4.png";
import p5 from "../../Assets/p5.png";
import Pop from '../GeneralScreens/Pop'

const Profile = () => {
  const { config } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { activeUser } = useContext(AuthContext);
  const [randomImage, setRandomImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const images = [p1, p2, p3, p4, p5];

  // Select a random image when the component loads
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, [images]);

  return (
    <StyledWallet>
      <Container>
        {/* User Profile Section */}
        <Row className="profile-row align-items-center">
          <Col xs="12" md="6" className="profile-info">
            <img src={randomImage} alt="Avatar" className="avatar" />
            <div className="user-details">
              <p className="user-name">{activeUser.username}</p>
              <p className="summary">
                Welcome! Here’s a brief summary of your account.
              </p>
            </div>
          </Col>
          <Col xs="12" md="6" className="button-container">
            <button className="action-button deposit" onClick={handleOpenModal}>Deposit Money</button>
            <button className="action-button withdraw" onClick={handleOpenModal}>Withdraw Money</button>
            {/* Modal for maintenance message */}
            <Pop show={showModal} handleClose={handleCloseModal} />
          </Col>
        </Row>

        {/* Wallet Balance Section */}
        <Row className="wallet-cards">
          {/* BTC Card */}
          <Col xs="6" md="3" className="wallet-card">
            <CardContent>
              <div className="currency-info">
                <p className="currency-name">BTC</p>
                <p className="currency-type">Crypto</p>
                <p className="balance">{activeUser.BTC}</p>
              </div>
              <div className="currency-icon">
                <img src={btc} alt="BTC" />
              </div>
            </CardContent>
          </Col>

          {/* USD Card */}
          <Col xs="6" md="3" className="wallet-card">
            <CardContent>
              <div className="currency-info">
                <p className="currency-name">USD</p>
                <p className="currency-type">Fiat</p>
                <p className="balance">${activeUser.USD}</p>
              </div>
              <div className="currency-icon">
                <img src={usd} alt="USD" />
              </div>
            </CardContent>
          </Col>

          {/* EUR Card */}
          <Col xs="6" md="3" className="wallet-card">
            <CardContent>
              <div className="currency-info">
                <p className="currency-name">EUR</p>
                <p className="currency-type">Fiat</p>
                <p className="balance">€{activeUser.EUR}</p>
              </div>
              <div className="currency-icon">
                <img src={eur} alt="EUR" />
              </div>
            </CardContent>
          </Col>

          {/* Balance Summary Card */}
          <Col xs="12" md="12" className="wallet-card balance-card">
            <p>
              Check all{" "}
              <span className="wallet-balance-link">Wallet Balances</span> →
            </p>
          </Col>
        </Row>
      </Container>
    </StyledWallet>
  );
};

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledWallet = styled.div`
  background-color: #f5f6fa;
  padding: 20px;
  margin-top: 50px;

  .profile-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .avatar:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.2);
  }
  .user-name {
    font-size: 1.6rem;
    font-weight: bold;
    color: #2d3436;
  }

  .edit-icon {
    font-size: 0.85rem;
    margin-left: 8px;
    cursor: pointer;
    color: #6c5ce7;
  }

  .summary {
    font-size: 1.05rem;
    color: #636e72;
    font-weight: 700;
  }

  /* Action Button Styling */
  .button-container {
    display: flex;
    justify-content: flex-end;
  }

  .action-button {
    width: 48%;
    margin-left: 10px;
    height: 45px;
    border-radius: 10px;
    font-size: 1rem;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .deposit {
    background-color: #6c5ce7;
  }

  .withdraw {
    background-color: #e17055;
  }

  .action-button:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  /* Wallet Cards */
  .wallet-cards {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .wallet-card {
    background-color: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px; /* Spacing between cards */
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .wallet-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  .currency-info {
    text-align: left;
  }

  .currency-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: #6c5ce7;
  }

  .currency-type {
    font-size: 1rem;
    color: #b2bec3;
    font-weight: bold;
  }

  .balance {
    font-size: 1rem;
    color: #b2bec3;
    font-weight: bold;
    overflow-wrap: break-word; /* Prevent overflow */
    word-wrap: break-word; /* Fallback for older browsers */
    width: 8ch; /* Limit width to 6 characters */
  }

  .currency-icon img {
    width: 50px;
    height: 50px;
  }

  .balance-card {
    text-align: center;
    background-color: #f1f2f6;
    padding: 25px;
  }

  .wallet-balance-link {
    font-weight: bold;
    color: #6c5ce7;
    cursor: pointer;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .profile-info {
      justify-content: center;
    }

    .button-container {
      justify-content: center;
    }

    .action-button {
      width: 100%;
      margin-bottom: 10px;
    }

    .wallet-card {
      width: 48%;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 576px) {
    .avatar {
      width: 65px;
      height: 65px;
    }

    .user-name {
      font-size: 1.3rem;
    }

    .currency-name {
      font-size: 1.1rem;
    }

    .wallet-card {
      padding: 15px;
    }
  }
`;

export default Profile;
