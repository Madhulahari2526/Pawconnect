import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { apiRequest, backendEnabled, saveDemoPet } from "./api";
import { useAuth } from "./auth.jsx";

function PostPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  if (!user) {
    return <section className="form-page"><div className="form-card"><h1>Post a Pet</h1><p>Please log in to share a pet with the PawConnect community.</p><Link className="form-button" to="/login">Login to continue</Link></div></section>;
  }

  async function enableCamera() {
    setCameraError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access is not supported in this browser.");
      return;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraOpen(true);
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = streamRef.current;
      });
    } catch {
      setCameraError("Camera permission was denied or the camera is unavailable.");
    }
  }

  function capturePhoto() {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (!video?.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    document.querySelector('input[name="image"]').value = canvas.toDataURL("image/jpeg", 0.85);
    stopCamera();
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const pet = {
      id: `posted-${Date.now()}`,
      name: form.get("name"),
      type: form.get("species"),
      species: form.get("species"),
      breed: form.get("breed"),
      price: Number(form.get("price")),
      age: `${form.get("age")} Years`,
      gender: form.get("gender"),
      location: form.get("location"),
      contactPhone: form.get("contactPhone"),
      image: form.get("image") || "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800",
      description: form.get("description"),
      status: "available",
    };

    try {
      if (backendEnabled) {
        const { id, type, image, ...body } = pet;
        const saved = await apiRequest("/pets", { method: "POST", body: JSON.stringify({ ...body, age: Number(form.get("age")), price: Number(form.get("price")), species: type, image }) });
        navigate(`/pets/${saved._id}`);
      } else {
        saveDemoPet(pet);
        navigate("/pets");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }

  }

  return (
    <section className="form-page">
      <div className="form-card">
        <h1>Post a Pet</h1>
        <p>Help a pet find a safe and loving home.</p>
        <form onSubmit={handleSubmit} className="pet-form">
          <label>Pet name<input name="name" required placeholder="e.g. Daisy" /></label>
          <label>Animal type<select name="species" required defaultValue="Dog"><option>Dog</option><option>Cat</option><option>Bird</option><option>Cow</option><option>Rabbit</option><option>Fish</option><option>Other</option></select></label>
          <label>Breed<input name="breed" required placeholder="e.g. Labrador" /></label>
          <label>Price (INR)<input name="price" type="number" min="0" step="1" required placeholder="e.g. 15000" /></label>
          <div className="form-row"><label>Age (years)<input name="age" type="number" min="0" step="1" required placeholder="e.g. 2" /></label><label>Gender<select name="gender" defaultValue="Unknown"><option>Unknown</option><option>Male</option><option>Female</option></select></label></div>
          <label>Location<input name="location" required placeholder="City or town" /></label>
          <label>Contact phone number<input name="contactPhone" type="tel" pattern="^\+?[1-9][0-9 ()-]{7,14}$" required placeholder="+91 98765 43210" /></label>
          <label>Image URL <span className="field-hint">(optional)</span><input name="image" type="url" placeholder="https://..." /></label>
          <div className="media-controls">
            <button type="button" className="secondary-button" onClick={cameraOpen ? stopCamera : enableCamera}>{cameraOpen ? "Stop camera" : "Enable camera"}</button>
          </div>
          {cameraOpen && <div className="camera-box"><video ref={videoRef} autoPlay playsInline /><button type="button" className="form-button" onClick={capturePhoto}>Capture pet photo</button></div>}
          {cameraError && <p className="form-error">{cameraError}</p>}
          <label>Description<textarea name="description" required rows="5" placeholder="Tell people about this pet..." /></label>
          {error && <p className="form-error">{error}</p>}
          <button className="form-button" type="submit" disabled={busy}>{busy ? "Posting..." : "Post Pet"}</button>
        </form>
      </div>
    </section>
  );
}

export default PostPet;
