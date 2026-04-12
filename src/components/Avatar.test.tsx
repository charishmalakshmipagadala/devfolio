import { render, screen } from "@testing-library/react";
import { Avatar } from "../components/ui/Avatar";

describe("Avatar", () => {
  it("renders initials from full name", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders single initial for one word name", () => {
    render(<Avatar name="John" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("renders ? for empty name", () => {
    render(<Avatar name="" />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("applies correct size", () => {
    const { container } = render(<Avatar name="John Doe" size={64} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("64px");
    expect(el.style.height).toBe("64px");
  });
});
