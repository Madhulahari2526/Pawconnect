import { useEffect, useState } from "react";
import PetCard from "./petcard";
import { apiRequest, getDemoPets } from "./api";

function Pets() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [pets, setPets] = useState([]);
  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (type !== "All") query.set("species", type);
    if (location !== "All") query.set("location", location);
    apiRequest(`/pets?${query}`)
      .then((data) => {
        setPets(data.pets || []);
      })
      .catch(() => {
        setPets(getDemoPets());
      });
  }, [search, type, location]);

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      (pet.breed || "").toLowerCase().includes(search.toLowerCase()) ||
      (pet.location || "").toLowerCase().includes(search.toLowerCase());

    const matchesType =
      type === "All" || (pet.species || pet.type) === type;
    const matchesLocation = location === "All" || pet.location === location;

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <section className="pets-page">
      <div className="page-header">
        <h1>Find Your Perfect Pet 🐾</h1>

        <p>
          Search for a loving companion waiting
          for their forever home.
        </p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name, breed or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All Pets</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Bird">Birds</option>
          <option value="Cow">Cows</option>
          <option value="Rabbit">Rabbits</option>
          <option value="Fish">Fish</option>
        </select>
        <select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Filter by location">
          <option value="All">All locations</option>
          {[...new Set(getDemoPets().map((pet) => pet.location))].map((place) => <option value={place} key={place}>{place}</option>)}
        </select>
      </div>

      <div className="pet-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))
        ) : (
          <div className="no-results">
            <h2>😿 No pets found</h2>
            <p>Try changing your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Pets;