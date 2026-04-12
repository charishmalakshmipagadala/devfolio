import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>,
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders full width when fullWidth is true", () => {
    const { container } = render(<Button fullWidth>Full</Button>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("100%");
  });
});
