import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest, getDemoPets } from "./api";

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiRequest(`/pets/${id}`)
      .then(setPet)
      .catch(() => {
        const fallback = getDemoPets().find((item) => String(item.id) === id);
        if (fallback) setPet({ ...fallback, species: fallback.type });
        else setError("Pet not found");
      });
  }, [id]);
  if (error || !pet) return <div className="not-found"><h1>{error || "Loading pet..."}</h1><Link to="/pets">← Back to Pets</Link></div>;
  return <section className="details-page"><div className="details-card">
    <img src={pet.image} alt={pet.name} className="details-image" />
    <div className="details-content"><p className="available">● Available for Adoption</p><h1>{pet.name}</h1><h3>{pet.breed || pet.species}</h3>
      <div className="details-info"><div><strong>Price</strong><span>{pet.price ? `₹${Number(pet.price).toLocaleString("en-IN")}` : "Price on request"}</span></div><div><strong>Age</strong><span>{pet.age || "Unknown"}</span></div><div><strong>Gender</strong><span>{pet.gender || "Unknown"}</span></div><div><strong>Type</strong><span>{pet.species}</span></div><div><strong>Location</strong><span>{pet.location || "Unknown"}</span></div></div>
      <h2>About {pet.name}</h2><p className="description">{pet.description || "This pet is waiting for a loving home."}</p>
      {( (pet.createdBy && pet.createdBy.phone) || pet.posterPhone || pet.contactPhone) && (
        <a className="contact-phone" href={`tel:${(pet.createdBy && pet.createdBy.phone) || pet.posterPhone || pet.contactPhone}`}>
          📞 Contact poster: {(pet.createdBy && pet.createdBy.name) || pet.posterName || ((pet.createdBy && pet.createdBy.phone) || pet.posterPhone || pet.contactPhone)} — {(pet.createdBy && pet.createdBy.phone) || pet.posterPhone || pet.contactPhone}
        </a>
      )}
      <Link to={`/pets/${pet._id || pet.id}/adopt`} className="adopt-button">❤️ Adopt {pet.name}</Link>
    </div></div></section>;
}
export default PetDetails;
