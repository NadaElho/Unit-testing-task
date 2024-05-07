import { Button, Label, TextInput } from "flowbite-react";
import { IUser } from "../../Interfaces/User";

export default function Register({
  handleClick,
  data,
  setData,
}: {
  handleClick: (email: string, password: string) => void;
  data: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser>>;
}) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    setData((prev: IUser) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto h-screen justify-center">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          name="password"
          required
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <Button
        type="button"
        disabled={!data.email || !data.password}
        name="submit"
        onClick={() => handleClick(data.email, data.password)}
      >
        Submit
      </Button>
    </form>
  );
}
