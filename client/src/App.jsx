import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import BookCard from "./BookCard";
import AddBookForm from "./AddBookForm";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google/`, {
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
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/`);
      if (!response.ok) throw new Error("Failed to load books.");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) throw new Error("Failed to add book.");
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, data]);
    } catch (err) {
      setError("Failed to add book.");
    }
  };

  const updateBook = async (pk, bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) throw new Error("Failed to update book.");
      const data = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === pk ? data : book)),
      );
    } catch (err) {
      setError("Failed to update book.");
    }
  };

  const deleteBook = async (pk) => {
    try {
      await fetch(`${API_BASE_URL}/api/books/${pk}/`, {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (err) {
      setError("Failed to delete book.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow flex items-center justify-between px-8 py-6">
        <a href="/" className="text-blue-500 text-2xl font-bold">
          Book App
        </a>
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
          <AddBookForm onAdd={addBook} />
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded flex items-center gap-3 w-full max-w-xs">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="font-bold text-red-500 hover:text-red-700 ml-auto"
              >
                &times;
              </button>
            </div>
          )}

          <div className="w-full max-w-4xl px-4">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onDelete={deleteBook}
                    onUpdate={updateBook}
                  />
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
