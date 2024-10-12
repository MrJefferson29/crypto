import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "../../Css/Home.css";
import Profile from "../ProfileScreens/Profile";
import UserList from "./UserList";
import CryptoPage from "./Main";

const Home = () => {
  const { activeUser, loading } = useContext(AuthContext);  // Access both activeUser and loading state

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;  // Still loading, show spinner
    }

    if (!activeUser) {
      return <CryptoPage />;  // No activeUser (unauthenticated), render CryptoPage
    }

    if (activeUser?.role === "admin") {
      return <UserList />;  // Render UserList if activeUser is an admin
    }

    return <Profile />;  // Authenticated user, render Profile
  };

  return (
    <div className="Inclusive-home-page">
      {renderContent()}  {/* Render based on user status */}
    </div>
  );
};

export default Home;
