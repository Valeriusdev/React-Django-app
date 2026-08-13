import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

function BookCard({ book, onDelete, onUpdate }) {
  const [newTitle, setNewTitle] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          message={`Delete "${book.title}"?`}
          onConfirm={() => {
            onDelete(book.id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div className="relative bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        <button
          onClick={() => setShowConfirm(true)}
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
          value={newTitle}
          placeholder="New title..."
          onChange={(e) => setNewTitle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          value={newReleaseYear}
          placeholder="New release year..."
          onChange={(e) => setNewReleaseYear(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={newAuthor}
          placeholder="New author..."
          onChange={(e) => setNewAuthor(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={newGenre}
          placeholder="New genre..."
          onChange={(e) => setNewGenre(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => {
            onUpdate(book.id, {
              title: newTitle || book.title,
              release_year: newReleaseYear ? parseInt(newReleaseYear) : book.release_year,
              author: newAuthor || book.author,
              genre: newGenre || book.genre,
            });
            setNewTitle("");
            setNewReleaseYear("");
            setNewAuthor("");
            setNewGenre("");
          }}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>
    </>
  );
}

export default BookCard;
