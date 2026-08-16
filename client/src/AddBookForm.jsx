import { useState } from "react";

function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [yearError, setYearError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (yearError) return;
    const success = await onAdd({
      title,
      release_year: releaseYear,
      author,
      genre,
    });
    if (success) {
      setTitle("");
      setReleaseYear("");
      setYearError("");
      setAuthor("");
      setGenre("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-xs"
    >
      <input
        type="text"
        placeholder="Book Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Release Year..."
          value={releaseYear}
          onChange={(e) => {
            setReleaseYear(e.target.value);
            setYearError(
              /\D/.test(e.target.value) ? "Release year must be a number." : "",
            );
          }}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {yearError && <span className="text-red-500 text-xs">{yearError}</span>}
      </div>
      <input
        type="text"
        placeholder="Author..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Genre..."
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        disabled={!title || !releaseYear || !author || !genre || !!yearError}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Book
      </button>
    </form>
  );
}

export default AddBookForm;
