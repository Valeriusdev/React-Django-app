import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test("renders the Book app heading", () => {
    render(<App />);
    const heading = screen.getByText(/Book app/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders Add Book button", () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add Book/i });
    expect(addButton).toBeInTheDocument();
  });

  test("renders book title input field", () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText(/Book Title/i);
    expect(titleInput).toBeInTheDocument();
  });

  test("renders release year input field", () => {
    render(<App />);
    const releaseYearInput = screen.getByPlaceholderText(/Release Year/i);
    expect(releaseYearInput).toBeInTheDocument();
  });
});
