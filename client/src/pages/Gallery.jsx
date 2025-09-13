import React, { useRef } from "react";
import { useEventStore } from "@/store/useEventStore";
import { Link } from "react-router-dom";

const Gallery = () => {
  const events = useEventStore((state) => state.events);
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="p-6">
      <h2 className="text-6xl font-bold mb-8 text-center font-serif">
        Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events?.map((ev) =>
          ev.medias.map((src, index) => (
            <Link
              to={`/events/${ev._id}`}
              key={index}
              className="gallery-card rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transform transition duration-300 relative"
            >
              <img
                src={src.mediaUrl}
                alt={`Gallery ${index}`}
                className="w-full h-64 object-cover"
              />
              <div className="rounded-2xl overflow-hidden shadow-lg bg-black/80 absolute top-0 w-full h-64 group-hover:flex items-center justify-center text-xl font-serif font-semibold hidden transition duration-300 ease-in-out text-white text-center p-3">
                {ev.title}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
