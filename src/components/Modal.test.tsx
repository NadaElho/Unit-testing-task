import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModalComponent } from "./Modal";

describe("<ModalComponent/>", () => {
  const data = {
    email: "nada@gmail.com",
    password: "123456",
  };
  const mockSetClicked = vi.fn();
  const mockResetForm = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Modal data is shown correctly", () => {
    render(
      <ModalComponent
        data={data}
        clicked={true}
        setClicked={mockSetClicked}
        resetForm={mockResetForm}
      />
    );
    expect(screen.getByText(/user data/i)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${data.email}`)).toBeInTheDocument();
    expect(screen.getByText(`Password: ${data.password}`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  test("On click submit data reset", async () => {
    render(
      <ModalComponent
        data={data}
        clicked={true}
        setClicked={mockSetClicked}
        resetForm={mockResetForm}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(mockSetClicked).toHaveBeenCalledOnce();
    expect(mockResetForm).toHaveBeenCalledOnce();
  });

  test("On click cancel data not reset", async () => {
    render(
      <ModalComponent
        data={data}
        clicked={true}
        setClicked={mockSetClicked}
        resetForm={mockResetForm}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockSetClicked).toHaveBeenCalledWith(false);
    expect(mockResetForm).toHaveBeenCalledTimes(0);
  });
});
