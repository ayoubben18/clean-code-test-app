import ExpensesList from "@/components/ExpensesList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: () => <Expenses />,
});

const Expenses = () => {
  return (
    <div className="container mx-auto min-h-screen">
      <ExpensesList />
    </div>
  );
};
