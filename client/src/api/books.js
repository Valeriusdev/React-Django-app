const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function fetchBooks() {
  const response = await fetch(`${API_BASE_URL}/api/books/`);
  if (!response.ok) throw new Error("Failed to load books.");
  return response.json();
}

export async function addBook(bookData) {
  const response = await fetch(`${API_BASE_URL}/api/books/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error("Failed to add book.");
  return response.json();
}

export async function updateBook(pk, bookData) {
  const response = await fetch(`${API_BASE_URL}/api/books/${pk}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error("Failed to update book.");
  return response.json();
}

export async function deleteBook(pk) {
  const response = await fetch(`${API_BASE_URL}/api/books/${pk}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete book.");
}
