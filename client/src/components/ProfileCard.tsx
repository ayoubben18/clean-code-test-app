import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserType } from "@kinde-oss/kinde-typescript-sdk";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  user: UserType;
}

const ProfileCard = ({ user }: Props) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={
                user.picture
                  ? user.picture
                  : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
              }
            />
            <AvatarFallback>
              <img
                src={
                  "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                }
              />
            </AvatarFallback>
          </Avatar>
          Hello {user.given_name} !
        </CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Button>
          <Link to="/expenses">See Exepenses</Link>
        </Button>
        <Button variant={"destructive"}>
          <a href="/api/logout">Logout</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
