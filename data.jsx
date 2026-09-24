const pets = [
  {
    id: 1,
    name: "Bruno",
    type: "Dog",
    breed: "Golden Retriever",
    price: 25000,
    age: "2 Years",
    gender: "Male",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
    description:
      "Bruno is a friendly and energetic Golden Retriever looking for a loving family.",
    posterName: "Suresh",
    contactPhone: "+91 90000 00001",
  },

  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    price: 18000,
    age: "1 Year",
    gender: "Female",
    location: "Guntur",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    description:
      "Luna is a calm and affectionate cat who loves spending time with people.",
    posterName: "Geeta",
    contactPhone: "+91 90000 00002",
  },

  {
    id: 3,
    name: "Max",
    type: "Dog",
    breed: "Labrador",
    price: 22000,
    age: "3 Years",
    gender: "Male",
    location: "Vijayawada",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800",
    description:
      "Max is playful, loyal and loves going on walks.",
    posterName: "Rahul",
    contactPhone: "+91 90000 00003",
  },

  {
    id: 4,
    name: "Milo",
    type: "Cat",
    breed: "British Shorthair",
    price: 20000,
    age: "8 Months",
    gender: "Male",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
    description:
      "Milo is a playful kitten who enjoys cuddles and toys.",
    posterName: "Anjali",
    contactPhone: "+91 90000 00004",
  },

  {
    id: 5,
    name: "Daisy",
    type: "Dog",
    breed: "Beagle",
    price: 16000,
    age: "2 Years",
    gender: "Female",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800",
    description:
      "Daisy is a sweet and cheerful Beagle searching for her forever home.",
    posterName: "Priya",
    contactPhone: "+91 90000 00005",
  },

  {
    id: 6,
    name: "Coco",
    type: "Bird",
    breed: "Cockatiel",
    price: 6500,
    age: "1 Year",
    gender: "Female",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800",
    description:
      "Coco is a beautiful and friendly bird who enjoys singing.",
    posterName: "Shyam",
    contactPhone: "+91 90000 00006",
  },

  {
    id: 7,
    name: "Ganga",
    type: "Cow",
    breed: "Gir Cow",
    price: 55000,
    age: "4 Years",
    gender: "Female",
    location: "Warangal",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800",
    description:
      "Ganga is a gentle Gir cow looking for a safe and caring shelter.",
    posterName: "Ramesh",
    contactPhone: "+91 90000 00007",
  },

  {
    id: 8,
    name: "Lakshmi",
    type: "Cow",
    breed: "Sahiwal Cow",
    price: 60000,
    age: "5 Years",
    gender: "Female",
    location: "Nellore",
    image:
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800",
    description:
      "Lakshmi is a calm and friendly cow who enjoys peaceful surroundings.",
    posterName: "Meera",
    contactPhone: "+91 90000 00008",
  },

  {
    id: 10,
    name: "Snowy",
    type: "Rabbit",
    breed: "Angora Rabbit",
    price: 4500,
    age: "10 Months",
    gender: "Female",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800",
    description:
      "Snowy is a soft and gentle rabbit who loves fresh vegetables and cuddles.",
    posterName: "Anand",
    contactPhone: "+91 90000 00009",
  },

  {
    id: 11,
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    price: 28000,
    age: "4 Years",
    gender: "Male",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800",
    description:
      "Rocky is a loyal German Shepherd who enjoys walks and learning new commands.",
    posterName: "Kavita",
    contactPhone: "+91 90000 00010",
  },

  {
    id: 12,
    name: "Bella",
    type: "Dog",
    breed: "Poodle",
    price: 24000,
    age: "2 Years",
    gender: "Female",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800",
    description:
      "Bella is a cheerful Poodle who loves people and gentle playtime.",
    posterName: "Ravi",
    contactPhone: "+91 90000 00011",
  },

  {
    id: 13,
    name: "Charlie",
    type: "Dog",
    breed: "Indie",
    price: 8000,
    age: "1 Year",
    gender: "Male",
    location: "Vijayawada",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800",
    description:
      "Charlie is a friendly Indie dog looking for an active and caring family.",
    posterName: "Sita",
    contactPhone: "+91 90000 00012",
  },

  {
    id: 14,
    name: "Simba",
    type: "Cat",
    breed: "Maine Coon",
    price: 30000,
    age: "2 Years",
    gender: "Male",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800",
    description:
      "Simba is a gentle Maine Coon who enjoys quiet homes and soft cuddles.",
    posterName: "Vikram",
    contactPhone: "+91 90000 00013",
  },

  {
    id: 15,
    name: "Nala",
    type: "Cat",
    breed: "Siamese",
    price: 17000,
    age: "1 Year",
    gender: "Female",
    location: "Pune",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",
    description:
      "Nala is a curious Siamese cat who loves interactive toys and attention.",
    posterName: "Deepa",
    contactPhone: "+91 90000 00014",
  },

  {
    id: 16,
    name: "Kiwi",
    type: "Bird",
    breed: "Lovebird",
    price: 3500,
    age: "8 Months",
    gender: "Female",
    location: "Guntur",
    image:
      "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800",
    description:
      "Kiwi is a colorful Lovebird who enjoys singing and friendly company.",
    posterName: "Manoj",
    contactPhone: "+91 90000 00015",
  },

  {
    id: 17,
    name: "Moti",
    type: "Cow",
    breed: "Jersey Cow",
    price: 50000,
    age: "3 Years",
    gender: "Female",
    location: "Nellore",
    image:
      "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=800",
    description:
      "Moti is a calm Jersey cow who would be happy in a caring farm shelter.",
    posterName: "Raju",
    contactPhone: "+91 90000 00016",
  },

  {
    id: 19,
    name: "Pepper",
    type: "Rabbit",
    breed: "Dutch Rabbit",
    price: 4000,
    age: "1 Year",
    gender: "Male",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=800",
    description:
      "Pepper is a playful Dutch rabbit who enjoys fresh greens and open space.",
    posterName: "Hari",
    contactPhone: "+91 90000 00017",
  },

  {
    id: 20,
    name: "Cinnamon",
    type: "Rabbit",
    breed: "Lionhead Rabbit",
    price: 5000,
    age: "9 Months",
    gender: "Female",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1591382386627-349b692688ff?w=800",
    description:
      "Cinnamon is a gentle Lionhead rabbit who loves calm homes and attention.",
    posterName: "Radha",
    contactPhone: "+91 90000 00018",
  },

  {
    id: 22,
    name: "Goldie",
    type: "Fish",
    breed: "Goldfish",
    price: 1200,
    age: "1 Year",
    gender: "Unknown",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800",
    description:
      "Goldie is an active Goldfish looking for a well-maintained fish tank.",
    posterName: "Aquarium Store",
    contactPhone: "+91 90000 00019",
  },

  {
    id: 23,
    name: "Neon",
    type: "Fish",
    breed: "Neon Tetra",
    price: 250,
    age: "6 Months",
    gender: "Unknown",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
    description:
      "Neon is a colorful community fish that enjoys swimming with other small fish.",
    posterName: "Fish Seller",
    contactPhone: "+91 90000 00020",
  },

  {
    id: 24,
    name: "Kamadhenu",
    type: "Cow",
    breed: "Hallikar Cow",
    price: 65000,
    age: "4 Years",
    gender: "Female",
    location: "Mysore",
    image:
      "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800",
    description:
      "Kamadhenu is a calm Hallikar cow who would be happy in a caring farm home.",
    posterName: "Kumar",
    contactPhone: "+91 90000 00021",
  },
];

export default pets;