import ProfileCard from "@/components/ProfileCard";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: () => <Profile />,
});

const Profile = () => {
  const { data, isLoading, error } = useQuery(userQueryOptions);
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return "Not Logged in";
  }
  if (!data?.user) {
    return "No data";
  }
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <ProfileCard user={data.user} />
    </div>
  );
};
