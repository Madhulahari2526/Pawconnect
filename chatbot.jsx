import { useState } from "react";
import localPets from "./data";

function getReply(message) {
  const text = message.toLowerCase();
  if (text.includes("health") || text.includes("sick") || text.includes("vaccine") || text.includes("symptom")) {
    return "For health concerns, keep fresh water available and contact a licensed veterinarian promptly. Emergency signs like breathing trouble, poisoning, collapse, heavy bleeding, or seizures need immediate veterinary care. I can share general guidance, but I cannot diagnose pets.";
  }
  const animal = ["cow", "dog", "cat", "bird", "rabbit"].find((type) => text.includes(type));
  if (animal) {
    const matches = localPets.filter((pet) => `${pet.name} ${pet.type} ${pet.breed} ${pet.location}`.toLowerCase().includes(animal));
    if (matches.length) return `I found ${matches.length} possible match${matches.length > 1 ? "es" : ""}: ${matches.map((pet) => `${pet.name} (${pet.type}, ${pet.location})`).join(", ")}. Visit Find Pets to view them.`;
  }
  if (text.includes("location") || text.includes("near") || text.includes("hyderabad") || text.includes("bangalore")) {
    return "Use the location filter on Find Pets to narrow results. Each pet card also has a map link for its listed location.";
  }
  if (text.includes("adopt") || text.includes("find")) {
    return "Tell me an animal type, breed, or city such as “cow”, “dog”, or “Hyderabad”, and I’ll suggest matching pets.";
  }
  return "I can help you find pets by animal, breed, or location, and share general pet-health guidance. Try “find cows” or “my pet is sick”.";
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I can help you find a pet or answer general health questions. How can I help?" }
  ]);

  function send(event) {
    event.preventDefault();
    const value = message.trim();
    if (!value) return;
    setMessages((current) => [...current, { from: "user", text: value }, { from: "bot", text: getReply(value) }]);
    setMessage("");
  }

  return (
    <div className="chatbot">
      {open && <div className="chat-window">
        <div className="chat-header"><strong>🐾 PawHelper</strong><button type="button" onClick={() => setOpen(false)}>×</button></div>
        <div className="chat-messages">{messages.map((item, index) => <p className={`chat-message ${item.from}`} key={`${item.from}-${index}`}>{item.text}</p>)}</div>
        <form className="chat-form" onSubmit={send}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about pets or health..." aria-label="Chat message" /><button type="submit">Send</button></form>
      </div>}
      <button className="chat-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open PawHelper">💬</button>
    </div>
  );
}

export default Chatbot;
