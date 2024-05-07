import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Register from "./Register";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { IUser } from "../../Interfaces/User";

describe("<Register/>", () => {
  const mockHandleClick = vi.fn();

  const RegisterTest = () => {
    const [data, setData] = useState<IUser>({
      email: "",
      password: "",
    });

    return (
      <Register 
        data={data} 
        handleClick={mockHandleClick} 
        setData={setData} 
      />
    );
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Render 2 inputs and disabled button", () => {
    render(<RegisterTest />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("Enable submit button on input data", async () => {
    render(<RegisterTest />);
    await userEvent.type(screen.getByLabelText(/email/i), "nada@gmail.com");
    await userEvent.type(screen.getByLabelText(/password/i), "123456");

    expect(screen.getByRole("button")).toBeEnabled();

    await userEvent.click(screen.getByRole("button"));
    expect(mockHandleClick).toHaveBeenCalledOnce();
  });
});
