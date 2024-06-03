import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const ExpensesList = () => {
  async function getAllExpenses() {
    const response = await api.expenses.$get();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const body = await response.json();
    return body;
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

  if (error) {
    return "An error occurred";
  }

  return (
    <Table>
      <TableCaption>A list of your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>$ {expense.amount}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default ExpensesList;
