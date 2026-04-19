import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/google/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await response.json();
      if (response.ok) {
        const userData = {
          name: data.name,
          email: data.email,
          accessToken: data.access,
          refreshToken: data.refresh,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear,
      author,
      genre,
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

  const updateReleaseYear = async (pk, title) => {
    const bookData = {
      title,
      release_year: newReleaseYear,
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow flex items-center justify-between px-8 py-6">
        <h1 className="text-blue-500 text-2xl font-bold">Book app</h1>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-blue-600 font-semibold">
              Welcome, {user.name}
            </span>
            <button
              onClick={logout}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Login failed")}
          />
        )}
      </header>
      <div className="py-8">
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
            <input
              type="text"
              placeholder="Author..."
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Genre..."
              onChange={(e) => setGenre(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2"
              onClick={addBook}
            >
              Add Book
            </button>
          </form>

          <div className="w-full max-w-4xl px-4">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-700">
                        {book.title}
                      </p>
                      <p className="text-gray-500">Year: {book.release_year}</p>
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
                      onChange={(e) =>
                        setNewReleaseYear(parseInt(e.target.value))
                      }
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateTitle(book.id, book.release_year)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                      >
                        Update Title
                      </button>
                      <button
                        onClick={() => updateReleaseYear(book.id, book.title)}
                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                      >
                        Update Year
                      </button>
                    </div>
                    <div className="flex mt-2">
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
