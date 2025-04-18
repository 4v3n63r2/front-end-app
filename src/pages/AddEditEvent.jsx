import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load event data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`https://6801758b81c7e9fbcc42960b.mockapi.io/events/${id}`)
        .then((res) => {
          setFormData(res.data);
          setError(null);
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            setError(`Event with ID ${id} not found. Creating new one instead.`);
            // Clear the ID to switch to creation mode
            navigate('/events/new', { replace: true });
          } else {
            setError("Failed to load event data. Please try again later.");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const apiCall = id
      ? axios.put(`https://6801758b81c7e9fbcc42960b.mockapi.io/events/${id}`, formData)
      : axios.post(`https://6801758b81c7e9fbcc42960b.mockapi.io/events`, formData);

    apiCall
      .then(() => navigate("/"))
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to save event");
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Event" : "Create New Event"}
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : (id ? "Update Event" : "Create Event")}
        </button>
      </form>
    </div>
  );
};

export default AddEditEvent;
