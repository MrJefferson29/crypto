import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import styled from 'styled-components';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { activeUser, config } = useContext(AuthContext); // Access the active user and config

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://crypto-euug.onrender.com/user/get-all', config); // Use the config with the token
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [config]); // Re-fetch if config changes

    const handleEditClick = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    return (
        <StyledUserList>
            <h1>All Users</h1>
            {loading && <p>Loading users...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <span>{user.email} ({user.role})</span>
                        {activeUser.role === 'admin' && (
                            <button onClick={() => handleEditClick(user._id)}>Edit</button>
                        )}
                    </li>
                ))}
            </ul>
        </StyledUserList>
    );
};

// Styled-components for improved UI
const StyledUserList = styled.div`
    padding: 20px;
    background-color: #f8f9fa;

    h1 {
        text-align: center;
        color: #343a40;
        margin-bottom: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin-bottom: 10px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease;
            
            &:hover {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            span {
                font-size: 1rem;
                color: #495057;
            }

            button {
                padding: 6px 12px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: #0056b3;
                }
            }
        }
    }

    .error {
        color: #dc3545;
        text-align: center;
        margin-bottom: 20px;
    }
`;

export default UserList;
