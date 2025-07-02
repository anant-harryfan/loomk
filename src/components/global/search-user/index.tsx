import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/useMutationData";
import { useMutation } from "@tanstack/react-query";
import { User } from "lucide-react";
import React from "react";
import Loader from "../loader";
import { inviteMembers } from "@/app/dashboard/action/user";

type Props = {
  workspaceid: string;
};

const Search = ({ workspaceid }: Props) => {

 
  return (
    <div className="flex flex-col gap-y-5 ">
      {`${process.env.NEXT_PUBLIC_HOST_URL}/invite/${workspaceid}`}
    </div>
  );
};

export default Search;
