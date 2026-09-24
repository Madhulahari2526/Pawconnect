import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest, backendEnabled, getDemoFavoriteIds, toggleDemoFavorite } from "./api";

function PetCard({ pet }) {
  const petId = pet._id || pet.id;
  const [favorited, setFavorited] = useState(() =>
    getDemoFavoriteIds().map(String).includes(String(petId))
  );

  useEffect(() => {
    const updateFavorite = () =>
      setFavorited(getDemoFavoriteIds().map(String).includes(String(petId)));
    window.addEventListener("pett-favorites-changed", updateFavorite);
    return () => window.removeEventListener("pett-favorites-changed", updateFavorite);
  }, [petId]);

  async function toggleFavorite() {
    if (!backendEnabled) {
      setFavorited(toggleDemoFavorite(petId));
      return;
    }
    try {
      const data = await apiRequest(`/users/favorites/${petId}`, { method: "POST" });
      setFavorited(data.favorited);
    } catch {
      setFavorited(toggleDemoFavorite(petId));
    }
  }

  return (
    <div className="pet-card">
      <div className="pet-image-container">
        <img src={pet.image} alt={pet.name} />
        <button className="favorite-button" type="button" onClick={toggleFavorite} aria-label={`Favorite ${pet.name}`}>
          {favorited ? "♥" : "♡"}
        </button>
      </div>
      <div className="pet-card-content">
        <h3>{pet.name}</h3>
        <p className="breed">{pet.breed || pet.species}</p>
        <p className="pet-price">{pet.price ? `₹${Number(pet.price).toLocaleString("en-IN")}` : "Price on request"}</p>
        <div className="pet-info">
          <span>🎂 {pet.age || "Unknown"}</span>
          <span>⚧ {pet.gender || "Unknown"}</span>
        </div>
        <p className="location">📍 {pet.location || "Location unavailable"}</p>
        <p className="poster">Posted by: <strong>{(pet.createdBy && pet.createdBy.name) || pet.posterName || 'PawConnect'}</strong>{' '}
          {((pet.createdBy && pet.createdBy.phone) || pet.posterPhone || pet.contactPhone) ? (
            <a className="poster-phone" href={`tel:${(pet.createdBy && pet.createdBy.phone) || pet.posterPhone || pet.contactPhone}`}>📞 {(pet.createdBy && pet.createdBy.phone) || pet.posterPhone || pet.contactPhone}</a>
          ) : null}
        </p>
        {pet.location && <a className="map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pet.location)}`} target="_blank" rel="noreferrer">View location map ↗</a>}
        <Link to={`/pets/${pet.id || pet._id}`} className="view-button">View Details</Link>
      </div>
    </div>
  );
}

export default PetCard;
