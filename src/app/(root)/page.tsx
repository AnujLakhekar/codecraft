import { SignIn, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";
import Header from "./_components/Header";
import MobileEditorLayout from "./_components/MobileEditorLayout";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div>
          <div className="md:grid hidden grid-cols-1 lg:grid-cols-2 gap-4">
            <EditorPanel controller={true} />
            <OutputPanel controller={true} />
          </div>
          <div className="md:hidden grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MobileEditorLayout />
          </div>
        </div>
      </div>
    </div>
  );
}
