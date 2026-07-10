import { useState } from "react";

function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAdd({
      title,
      release_year: releaseYear,
      author,
      genre,
    });
    if (success) {
      setTitle("");
      setReleaseYear("");
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
      <input
        type="text"
        placeholder="Release Year..."
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
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
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2 cursor-pointer"
      >
        Add Book
      </button>
    </form>
  );
}

export default AddBookForm;
