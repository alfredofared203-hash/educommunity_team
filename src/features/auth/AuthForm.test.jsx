import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AuthForm from "./AuthForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn()
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn()
  })
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe("AuthForm", () => {
  it("shows student and teacher as registration role options", async () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByRole("button", { name: /حساب جديد/i }));

    fireEvent.click(screen.getAllByRole("combobox")[0]);

    const studentLabels = await screen.findAllByText("طالب");
    expect(studentLabels.length).toBeGreaterThan(0);
    const teacherLabels = await screen.findAllByText("معلم");
    expect(teacherLabels.length).toBeGreaterThan(0);
  });

  it("renders the select content above modal overlays", async () => {
    render(
      <div className="z-[100]">
        <Select defaultValue="student">
          <SelectTrigger>
            <SelectValue placeholder="اختر الدور" />
          </SelectTrigger>
          <SelectContent data-testid="role-options">
            <SelectItem value="student">طالب</SelectItem>
            <SelectItem value="teacher">معلم</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );

    fireEvent.click(screen.getByRole("combobox"));

    const content = await screen.findByTestId("role-options");
    expect(content.className).toContain("z-[110]");
  });
});
