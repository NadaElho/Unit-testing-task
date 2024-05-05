import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Register from "./Register";
import userEvent from "@testing-library/user-event";
describe("<Register/>", () => {
  const mockHandleClick = vi.fn();
  const mockSetData = vi.fn();
  const data = {
    email: "",
    password: "",
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("render 2 inputs and disabled button", () => {
    render(
      <Register
        data={data}
        handleClick={mockHandleClick}
        setData={mockSetData}
      />
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("enable button on input data", async () => {
    render(
      <Register
        data={data}
        handleClick={mockHandleClick}
        setData={mockSetData}
      />
    );
    await userEvent.type(screen.getByLabelText(/email/i), "nada@gmail.com");
    await userEvent.type(screen.getByLabelText(/password/i), "123456");

    expect(mockSetData).toBeCalledTimes(20);
    expect(screen.getByRole("button")).toBeEnabled();

    await userEvent.click(screen.getByRole("button"));
    expect(mockHandleClick).toHaveBeenCalledOnce();
  });
});
