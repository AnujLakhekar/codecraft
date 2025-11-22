"use client";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { User } from "lucide-react";
import UserProfileButton from "./UserProfileButton";


function HeaderProfileBtn() {

  return (
    <>
      <SignedIn>
         <UserProfileButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
export default HeaderProfileBtn;
