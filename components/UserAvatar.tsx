import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";


const UserAvatar = () => {

    const { user } = useUser();

    return (
        <Avatar className="w-12 h-12">
            <AvatarImage src={user?.imageUrl} />
        </Avatar>
    );
}

export default UserAvatar;