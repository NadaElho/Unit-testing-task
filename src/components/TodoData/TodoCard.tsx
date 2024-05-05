import { ITodo } from "../../Interfaces/Todo";

const TodoCard = ({ todoData }: { todoData: ITodo }) => {
  return (
    <div className="w-1/2 text-center block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {todoData.title}
      </h5>
      <p
        className={`font-norma mx-auto text-white ${
          todoData.completed ? "bg-green-500" : "bg-red-500"
        } w-fit px-4 py-2 rounded dark:text-gray-400`}
      >
        {todoData.completed ? "completed" : "To Do"}
      </p>
    </div>
  );
};

export default TodoCard;
