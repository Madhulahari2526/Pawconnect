import { useEffect, useState } from "react";
import PetCard from "./petcard";
import localPets from "./data";
import { apiRequest, backendEnabled, getDemoFavoriteIds } from "./api";
import { useAuth } from "./auth.jsx";

function Favorites() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (backendEnabled && user) {
      apiRequest("/users/favorites").then(setPets).catch(() => setPets([]));
      return undefined;
    }

    const updateFavorites = () => {
      const ids = getDemoFavoriteIds().map(String);
      setPets(localPets.filter((pet) => ids.includes(String(pet.id))));
    };
    updateFavorites();
    window.addEventListener("pett-favorites-changed", updateFavorites);
    return () => window.removeEventListener("pett-favorites-changed", updateFavorites);
  }, [user]);

  return (
    <section className="pets-page">
      <div className="page-header">
        <h1>Your Favorite Pets</h1>
        <p>Pets you save will appear here.</p>
      </div>
      <div className="pet-grid">
        {pets.length ? pets.map((pet) => <PetCard key={pet._id || pet.id} pet={pet} />) : <p>No favorites yet.</p>}
      </div>
    </section>
  );
}

export default Favorites;
