import "./styles/Photos/Photos.css";
import { useState } from "react";

export function Photos({ photos }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState(null);
  return (
    <div className="photos">
      {photos.map((photo, index) => {
        return (
          <button
            onClick={() => {
              setCurrentPhotoIndex(index);
            }}
            onMouseEnter={() => {
              setHoveredPhotoIndex(index);
            }}
            onMouseLeave={() => {
              setHoveredPhotoIndex(null);
            }}
          >
            {photo && (
              <img
                key={index}
                src={photo}
                alt={`Zdjęcie ${index + 1}`}
                className={
                  index === currentPhotoIndex || index === hoveredPhotoIndex
                    ? "current"
                    : ""
                }
              />
            )}
          </button>
        );
      })}
      <img
        src={photos[currentPhotoIndex]}
        alt={`Zdjęcie ${currentPhotoIndex + 1}`}
        className={"current-photo"}
      />
    </div>
  );
}
