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
});
