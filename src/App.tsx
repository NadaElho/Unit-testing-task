import { useState } from "react";
import { ModalComponent } from "./components/Modal/Modal";
import Register from "./components/Register/Register";
import { IUser } from "./Interfaces/User";
import TodoData from "./components/TodoData/TodoData";

function App() {
  
  const [data, setData] = useState<IUser>({
    email: "",
    password: "",
  });

  const [clicked, setCliked] = useState<boolean>(false);
  const handleClick = (email: string, password: string) => {
    setData({ email, password });
    setCliked(true);
  };

  const resetForm = () => {
    setData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Register handleClick={handleClick} data={data} setData={setData}/>
      <ModalComponent data={data} clicked={clicked} setClicked = {setCliked} resetForm={resetForm}/>
      <TodoData />
    </>
  );
}

export default App;
