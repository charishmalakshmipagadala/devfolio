import { render, screen } from "@testing-library/react";
import { Badge } from "../components/ui/Badge";

describe("Badge", () => {
  it("renders label text", () => {
    render(<Badge label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders with default brand variant", () => {
    const { container } = render(<Badge label="TypeScript" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders all variants without crashing", () => {
    const variants = ["brand", "ghost", "success", "danger"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Badge label="test" variant={variant} />);
      expect(screen.getByText("test")).toBeInTheDocument();
      unmount();
    });
  });
});
