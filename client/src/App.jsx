import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-blue-500 text-3xl font-bold mb-8 text-center">
        Book app
      </h1>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-xs">
          <input
            type="text"
            placeholder="Book title..."
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Release Date..."
            onChange={(e) => setReleaseYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Add Book
          </button>
        </form>
      </div>
      {books.map((book) => (
        <div>
          <p>Title: {book.title} </p>
          <p>Release Year: {book.release_year} </p>
        </div>
      ))}
    </>
  );
}

export default App;
