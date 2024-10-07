import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import btc from '../../Assets/btc.png';
import eur from '../../Assets/eur.png';
import usd from '../../Assets/usd.png';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CurrencyIcon = styled.div`
  position: absolute;
  animation: float ${(props) => props.duration}s ease-in-out infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  img {
    width: 40px;
    height: 40px;
    opacity: 0.3;
  }
`;

const SectionWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 400px;
  width: 90%;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    max-width: 320px;
    padding: 15px;
  }
`;

const TopSuggestLogin = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  label {
    position: absolute;
    left: 10px;
    top: 10px;
    transition: 0.3s;
    color: #999;
    pointer-events: none;

    input:focus + &,
    input:not(:placeholder-shown) + & {
      top: -10px;
      left: 5px;
      font-size: 12px;
      color: #007bff;
    }
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setError("Passwords do not match");
      setTimeout(() => setError(""), 8000);
      return;
    }

    try {
      const { data } = await axios.post("https://crypto-euug.onrender.com/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("authToken", data.token);
      setTimeout(() => navigate('/'), 1800);
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
      setTimeout(() => setError(""), 6000);
    }
  };

  const generateRandomPositions = () => {
    const positions = [];
    const icons = [btc, eur, usd];
    for (let i = 0; i < 15; i++) { // Added more icons
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      positions.push({ icon, top: `${top}vh`, left: `${left}vw` });
    }
    return positions;
  };

  const [iconPositions, setIconPositions] = useState([]);

  useEffect(() => {
    setIconPositions(generateRandomPositions());
  }, []);

  return (
    <Container>
      {/* Render currency icons as background */}
      {iconPositions.map((pos, index) => (
        <CurrencyIcon
          key={index}
          style={{ top: pos.top, left: pos.left }}
          duration={Math.random() * 3 + 2} // Randomize between 2s and 5s
        >
          <img src={pos.icon} alt="currency" />
        </CurrencyIcon>
      ))}

      <SectionWrapper>
        <TopSuggestLogin>
          <span style={{fontWeight: 'bold', fontSize: '1.rem'}}> Have an account? </span>
          <a href="/login" style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Sign In</a>
        </TopSuggestLogin>
        <form onSubmit={registerHandler}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputWrapper>
            <input
              type="text"
              required
              id="name"
              placeholder=" " // This placeholder disappears when input begins
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="name">Username</label>
          </InputWrapper>
          <InputWrapper>
            <input
              type="email"
              required
              id="email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
            />
            <label htmlFor="email">E-mail</label>
          </InputWrapper>
          <InputWrapper>
            <input
              type="password"
              required
              id="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
            />
            <label htmlFor="password">Password</label>
          </InputWrapper>
          <InputWrapper>
            <input
              type="password"
              required
              id="confirmpassword"
              placeholder=" "
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmpassword">Confirm Password</label>
          </InputWrapper>

          <RegisterButton type="submit">Register</RegisterButton>
        </form>
      </SectionWrapper>
    </Container>
  );
};

export default RegisterScreen;
