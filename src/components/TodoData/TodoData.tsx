import axios from "axios";
import { useEffect, useState } from "react";
import { ITodo } from "../../Interfaces/Todo";
import TodoCard from "./TodoCard";

const TodoData = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<ITodo[]>(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setData(data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <h3 className="text-2xl text-center p-2">Loading...</h3>;
  if (error)
    return <h3 className="text-2xl text-center p-2">Sorry, Error happened</h3>;
  if (data.length == 0)
    return <h3 className="text-2xl text-center p-2">No data found</h3>;

  return (
    <>
      <div className="text-2xl text-center p-2">Todo Data</div>
      <div className="flex justify-center flex-wrap gap-4">
        {data.map((todoData) => {
          return <TodoCard key={todoData.id} todoData={todoData} />;
        })}
      </div>
    </>
  );
};

export default TodoData;
