import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../GeneralScreens/Loader';
import '../../Css/EditProfile.css';

const EditUserProfile = () => {
    const { id } = useParams(); // Get user ID from URL
    const { config } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [BTC, setBTC] = useState('');
    const [EUR, setEUR] = useState('');
    const [USD, setUSD] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://crypto-euug.onrender.com/user/${id}`, config);
                setBTC(response.data.BTC);
                setEUR(response.data.EUR);
                setUSD(response.data.USD);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, config]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("BTC", BTC);
        formdata.append("EUR", EUR);
        formdata.append("USD", USD);

        try {
            const { data } = await axios.post(`https://crypto-euug.onrender.com/user/editProfile/${id}`, formdata, config);
            setSuccess('Edit Wallet successfull');
            // Redirect or handle success
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.response?.data?.error || "Failed to update profile");
        }
    };

    return (
        <>
            {loading ? <Loader /> : (
                <div className="Inclusive-editprofile-page">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error_msg">{error}</div>}
                        {success && <div className="success_msg">{success}</div>}
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="BTC"
                                placeholder="BTC"
                                name='BTC'
                                value={BTC}
                                onChange={(e) => setBTC(e.target.value)}
                            />
                            <label htmlFor="BTC">BTC</label>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="EUR"
                                placeholder="ETH"
                                name='EUR'
                                value={EUR}
                                onChange={(e) => setEUR(e.target.value)}
                            />
                            <label htmlFor="EUR">ETH</label>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="USD"
                                placeholder="USDT"
                                name='USD'
                                value={USD}
                                onChange={(e) => setUSD(e.target.value)}
                            />
                            <label htmlFor="USD">USDT</label>
                        </div>
                        <button type='submit' className='editprofile-btn'>Edit Profile</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditUserProfile;
