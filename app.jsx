import { Routes, Route } from "react-router-dom";

import Navbar from "./navie.jsx";
import Footer from "./footer.jsx";

import Home from "./home.jsx";
import Pets from "./pets.jsx";
import PetDetails from "./details.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import ForgotPassword from "./forgot-password.jsx";
import ResetPassword from "./reset-password.jsx";
import Favorites from "./fav.jsx";
import Adoption from "./adoption.jsx";
import Chatbot from "./chatbot.jsx";
import PostPet from "./post-pet.jsx";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/post-pet" element={<PostPet />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/pets/:id/adopt" element={<Adoption />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}

export default App;