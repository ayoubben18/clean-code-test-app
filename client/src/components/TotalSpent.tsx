import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

const TotalSpent = () => {
  async function getTotalSpent() {
    const response = await api.expenses["total-spent"].$get();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const body = await response.json();
    return body;
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["total"],
    queryFn: getTotalSpent,
  });

  if (error) {
    return "An error occurred";
  }

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>
            you spent the amount of money below.
          </CardDescription>
        </CardHeader>
        <CardContent>{isLoading ? "..." : data?.total} $</CardContent>
      </Card>
      <Button>
        <a href="/expenses">nice</a>
      </Button>
    </div>
  );
};

export default TotalSpent;
