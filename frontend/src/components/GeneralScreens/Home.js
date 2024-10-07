import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "../../Css/Home.css";
import Profile from "../ProfileScreens/Profile";
import UserList from "./UserList";
import CryptoPage from "./Main"; // The component you show when the user is not logged in

const Home = () => {
  const search = useLocation().search;
  const [loading, setLoading] = useState(true);
  const { activeUser } = useContext(AuthContext);

  useEffect(() => {
    // Set loading to false once we have the activeUser information
    if (activeUser !== undefined) {
      setLoading(false);
    }
  }, [activeUser]);

  const renderContent = () => {
    if (!activeUser) {
      return <CryptoPage />;  // Render CryptoPage when there's no activeUser
    } else if (activeUser?.role === "admin") {
      return <UserList />;  // Render UserList if activeUser is an admin
    } else {
      return <Profile />;    // Render Profile for a regular activeUser
    }
  };

  return (
    <div className="Inclusive-home-page">
      {loading ? <p>Loading...</p> : renderContent()} {/* Show loading spinner or content */}
    </div>
  );
};

export default Home;
