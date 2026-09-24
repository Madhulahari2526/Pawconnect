import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "./api";
import PetCard from "./petcard";
import localPets from "./data";
import Shop from "./shop.jsx";
function Home() {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    apiRequest("/pets?limit=3")
      .then((data) => setPets(data.pets || []))
      .catch(() => setPets(localPets.slice(0, 3)));
  }, []);
  return <><section className="hero"><div className="hero-content"><p className="hero-small">🐾 GIVE THEM A SECOND CHANCE</p><h1>Find Your<span> New Best Friend</span></h1><p>Every pet deserves a loving home. Find your perfect companion and give them the family they deserve.</p><Link to="/pets" className="hero-button">Find a Pet 🐶</Link></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1000" alt="Happy pets" /></div></section>
    <section className="how-section"><h2>How It Works</h2><p className="section-subtitle">Adopting a pet is simple</p><div className="steps">{["🔍|1. Find a Pet|Browse through pets waiting for their forever home.","📝|2. Apply|Submit an adoption request for your favorite pet.","🤝|3. Meet|Meet the pet and get to know your future companion.","❤️|4. Adopt|Welcome your new best friend into your family."].map((step) => { const [icon, title, text] = step.split("|"); return <div className="step" key={title}><div>{icon}</div><h3>{title}</h3><p>{text}</p></div>; })}</div></section>
    <section className="featured"><h2>Pets Looking for a Home</h2><p className="section-subtitle">Meet some of our adorable friends</p><div className="pet-grid">{pets.map((pet) => <PetCard key={pet._id || pet.id} pet={{ ...pet, id: pet._id || pet.id }} />)}</div><Link to="/pets" className="all-pets-button">View All Pets →</Link></section><Shop /></>;
}
export default Home;
