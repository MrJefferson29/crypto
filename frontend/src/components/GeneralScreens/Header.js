import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../Context/AuthContext';
import Navbar from './Navbar'
import styled from 'styled-components'


const Header = () => {
    const bool = localStorage.getItem("authToken") ? true : false
    const [auth, setAuth] = useState(bool)
    const { activeUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        setAuth(bool)
        setTimeout(() => {
            setLoading(false)
        }, 1600)

    }, [bool])


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/')
    };

    return (
        <Styles>
        <div className="container">
          <Link to='/' className="logo-link">
            <div className="logo-text">
              <span className="text-bold" style={{fontSize: '1rem'}}>My Private</span>
              <span className="second" style={{color: '#ff9900', fontWeight: '600', fontSize: '1.1rem'}}>Crypto Wallet</span>
            </div>
          </Link>
          <div className="icon-wrapper">
            <Link to={auth? '/' : '/login'} aria-label="User Profile">
              <FontAwesomeIcon icon={faUserCircle} className="user" color={auth? '#6c5ce7': 'black'} />
            </Link>
            <Link to='/login' aria-label="Add Item">
              <FontAwesomeIcon icon={faPlusSquare} className="plus" />
            </Link>
          </div>
        </div>
      </Styles>
    )
}

export default Header;

const Styles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 6px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  height: 55px; /* Maintain header height */

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .logo-link {
    display: flex;
    align-items: center;
    height: 100%; /* Ensure the logo is vertically centered */
    margin-left: 10px; /* Add margin if needed */
    text-decoration: none; /* Remove underline from link */
    color: inherit; /* Inherit color from parent */
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .logo-link:hover {
    color: #007bff; /* Change color on hover */
    transform: scale(1.05); /* Slightly enlarge the logo text on hover */
  }

  .logo-image {
    height: 95%; /* Make the image fill the container height */
    width: auto; /* Maintain aspect ratio */
    object-fit: cover; /* Cover the container and zoom in as needed */
    margin-right: 10px; /* Add spacing between logo and text */
    transition: transform 0.3s ease;
  }

  .logo-link:hover .logo-image {
    transform: scale(1.05); /* Slightly enlarge the logo image on hover */
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center text vertically */
  }

  .text-bold {
    font-weight: 800;
    font-size: 2.3rem; /* Adjust font size if needed */
  }

  .logo-text span {
    font-size: 0.75rem; /* Adjust font size if needed */
    color: black;
  }

  .icon-wrapper {
    display: flex;
    gap: 17px;
    align-items: center;
    margin-left: auto;
  }

  .icon-wrapper a {
    color: #333;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .icon-wrapper a:hover {
    color: #ff9900; /* Change color on hover */
    transform: scale(1.1); /* Slightly enlarge the icon on hover */
  }

  .search, .user, .plus {
    font-size: 30.5px; /* Maintain font size for icons */
    transition: color 0.3s ease;
  }
`;