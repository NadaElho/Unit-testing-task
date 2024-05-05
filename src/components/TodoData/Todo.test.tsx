import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { beforeAll, afterEach, afterAll, describe, expect, test } from "vitest";
import TodoData from "./TodoData";
import { ITodo } from "../../Interfaces/Todo";

describe("<Todo/>", () => {
  const todoData: ITodo[] = [
    {
      userId: 1,
      id: 1,
      title: "task1",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "task2",
      completed: true,
    },
    {
      userId: 1,
      id: 3,
      title: "task3",
      completed: false,
    },
  ];

  const server = setupServer(
    http.get("*/todos", () => {
      return HttpResponse.json(todoData);
    })
  );

  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Show loading", () => {
    render(<TodoData />);
    expect(screen.getByText(/loading\.*/i)).toBeInTheDocument();
  });

  test("Show feched data", async () => {
    render(<TodoData />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading\.*/i));
    expect(screen.getByText("Todo Data")).toBeInTheDocument();
    todoData.forEach((ele) => {
      expect(screen.getByText(ele.title)).toBeInTheDocument();
    });
  });

  test("Handle error", async () => {
    server.use(
      http.get("*/todos", () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    render(<TodoData />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading\.*/i));
    expect(screen.getByText("Sorry, Error happened")).toBeInTheDocument();
  });

  test("Response data is empty", async () => {
    server.use(
      http.get("*/todos", () => {
        return HttpResponse.json([]);
      })
    );
    render(<TodoData />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading\.*/i));
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });
});
