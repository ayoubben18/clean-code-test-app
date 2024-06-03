import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return (
      <Button variant={"secondary"}>
        <a href="/api/login">Login</a>
      </Button>
    );
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (error) {
      return { user: null };
    }

    // return { user: null };
  },
  component: Component,
});
