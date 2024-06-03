import { api } from "@/lib/api";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
type Inputs = {
  title: string;
  amount: number;
};
const InputForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { title: "", amount: 0 },
  });
  const [loading, setloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function createExpense(data: Inputs) {
    setloading(true);
    console.log(data);

    const response = await api.expenses.$post({
      json: { ...data, amount: parseInt(data.amount.toString()) },
    });
    if (!response.ok) {
      console.log(response);

      setError(response.statusText);
      setloading(false);
      throw new Error("Error creating expense");
    }
    console.log(response);
    setError(null);
    setloading(false);
    reset();
  }

  return (
    <form
      className="grid w-full max-w-sm items-center gap-3"
      onSubmit={handleSubmit(createExpense)}
    >
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        placeholder="Title"
        {...register("title", { required: true, minLength: 3 })}
      />
      <Label htmlFor="amount">Amount</Label>
      <Input
        type="number"
        id="amount"
        placeholder="Amount"
        {...register("amount", { required: true, min: 0 })}
      />
      <Button disabled={loading} type="submit">
        Add
      </Button>
      {error && <div className="text-red-500">{error}</div>}
      {(errors.title || errors.amount) && (
        <div className="text-red-500">Invalid Inputs</div>
      )}
    </form>
  );
};

export default InputForm;
