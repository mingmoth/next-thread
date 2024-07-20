import { ClerkProvider } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <main>
        <h1>Threads</h1>
        <UserButton />
      </main>
    </ClerkProvider>
  );
}
