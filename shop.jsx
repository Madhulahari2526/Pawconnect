const products = [
  {
    name: "Glass Fish Pot",
    category: "Aquarium",
    description: "A compact glass fish pot for small fish and easy home care.",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800"
  },
  {
    name: "Starter Aquarium",
    category: "Aquarium",
    description: "A beginner-friendly aquarium setup with room for plants and fish.",
    image: "https://images.unsplash.com/photo-1520990269335-9271441e5f05?w=800"
  },
  {
    name: "Tropical Fish Flakes",
    category: "Fish Food",
    description: "Nutritious daily flakes for goldfish, tetras, and other community fish.",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800"
  },
  {
    name: "Puppy & Dog Food",
    category: "Dog Food",
    description: "Balanced dry food for active puppies and adult dogs.",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800"
  },
  {
    name: "Cat Nutrition Pack",
    category: "Cat Food",
    description: "Complete wet and dry nutrition for healthy, happy cats.",
    image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800"
  },
  {
    name: "Rabbit Fresh Greens",
    category: "Small Pet Food",
    description: "A fresh-food guide and hay blend for rabbits and small pets.",
    image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=800"
  }
];

function Shop() {
  return (
    <section className="shop-section">
      <h2>Pet Foods & Fish Pots</h2>
      <p className="section-subtitle">Helpful supplies for every companion</p>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <img src={product.image} alt={product.name} />
            <div>
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button type="button" onClick={() => window.alert(`${product.name} added to your shopping list.`)}>Add to list</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Shop;
