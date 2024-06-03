import TotalSpent from "@/components/TotalSpent";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: () => <Index />,
});

const Index = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<div className="text-2xl">Loading...</div>}>
        <TotalSpent />
      </Suspense>
    </div>
  );
};
