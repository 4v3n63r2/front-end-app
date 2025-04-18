import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../services/api";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener el evento", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500">Evento no encontrado</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p className="mb-2"><strong>Fecha:</strong> {event.date}</p>
      <p className="mb-2"><strong>Descripción:</strong> {event.description}</p>
      <p className="mb-2"><strong>Ubicación:</strong> {event.location}</p>
      <p className="mb-2"><strong>Imagen:</strong> <img src={event.image} alt={event.title} className="w-full h-auto" /></p> {/* Muestra la imagen */}
      <p className="mb-2"><strong>ID:</strong> {event.id}</p> {/* Muestra el ID */}

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
};

export default EventDetail;
