import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [newTitle, setNewTitle] = useState("");

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

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === pk ? data : book)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (pk) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-blue-500 text-3xl font-bold mb-8 text-center">
        Book app
      </h1>
      <div className="flex flex-col items-center gap-8">
        <form className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-xs">
          <input
            type="text"
            placeholder="Book Title..."
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Release Year..."
            onChange={(e) => setReleaseYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={addBook}
          >
            Add Book
          </button>
        </form>

        <div className="w-full max-w-4xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4"
              >
                <div>
                  <p className="font-semibold text-gray-700">{book.title}</p>
                  <p className="text-gray-500 text-sm">
                    Year: {book.release_year}
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="New title..."
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTitle(book.id, book.release_year)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
