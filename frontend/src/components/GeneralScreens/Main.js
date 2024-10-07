import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import currency from '../../Assets/currency.png';
import wallet from '../../Assets/wallet.png';
import bitcoin from '../../Assets/bitcoin.png';

const CryptoPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <StyledContainer>
      <Content>
        <Heading>Welcome to My Private Crypto Wallet</Heading>
        <Subheading>Number one crypto exchange platform.</Subheading>
        <Text>Buying crypto, selling crypto, and crypto exchanges made easy.</Text>
        <Features>
          <FeatureCard>
            <img src={bitcoin} alt="Buy Crypto" />
            <FeatureTitle>Buy Crypto</FeatureTitle>
            <FeatureText>Instantly buy your favorite cryptocurrencies with ease.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <img src={wallet} alt="Sell Crypto" />
            <FeatureTitle>Sell Crypto</FeatureTitle>
            <FeatureText>Quickly sell your assets whenever you need.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <img src={currency} alt="Exchange Crypto" />
            <FeatureTitle>Crypto Exchange</FeatureTitle>
            <FeatureText>Exchange between different cryptocurrencies seamlessly.</FeatureText>
          </FeatureCard>
        </Features>
        <ButtonContainer>
          <StyledButton onClick={handleRegister}>Register</StyledButton>
          <StyledButton onClick={handleLogin}>Login</StyledButton>
        </ButtonContainer>
      </Content>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: #f5f6fa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  max-width: 800px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2d3436;
`;

const Subheading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #636e72;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #636e72;
  margin-bottom: 2rem;
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureCard = styled.div`
  background-color: #fff;
  width: 250px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #6c5ce7;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #b2bec3;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background-color: #6c5ce7;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b4db7;
  }
`;

export default CryptoPage;