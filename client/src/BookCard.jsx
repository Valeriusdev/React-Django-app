import { useState } from "react";

function BookCard({ book, onDelete, onUpdate }) {
  const [newTitle, setNewTitle] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState(0);

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
      <button
        onClick={() => onDelete(book.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl leading-none"
        aria-label="Delete book"
      >
        &times;
      </button>
      <div>
        <p className="font-semibold text-gray-700">{book.title}</p>
        <p className="text-gray-500">Year: {book.release_year}</p>
        <p className="text-gray-500">Author: {book.author}</p>
        <p className="text-gray-500">Genre: {book.genre}</p>
      </div>
      <input
        type="text"
        placeholder="New title..."
        onChange={(e) => setNewTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        placeholder="New release year..."
        onChange={(e) => setNewReleaseYear(parseInt(e.target.value))}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex gap-2">
        <button
          onClick={() =>
            onUpdate(book.id, {
              title: newTitle,
              release_year: book.release_year,
            })
          }
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Title
        </button>
        <button
          onClick={() =>
            onUpdate(book.id, {
              title: book.title,
              release_year: newReleaseYear,
            })
          }
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Update Year
        </button>
      </div>
    </div>
  );
}

export default BookCard;
