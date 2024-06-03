import InputForm from "@/components/InputForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: () => <CreateExpense />,
});

const CreateExpense = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <InputForm />
    </div>
  );
};
