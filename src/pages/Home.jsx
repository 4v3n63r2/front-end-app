import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (error) {
      console.error("Error al obtener eventos", error);
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
    await deleteEvent(id);
    fetchEvents();
  }
  
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Eventos</h1>
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nuevo Evento
        </button>
      </div>

      {events.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.date}</p>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{event.image}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Ver
                </button>
                <button
                  onClick={() => navigate(`/edit/${event.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
