import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

async function Page() {
  // user from clerk
  const user = await currentUser();
  // userInfo from database
  const userInfo = {
    id: '',
    username: '',
    name: '',
    bio: '',
    image: '',
  }
  // Merge user and userInfo
  const userData = {
    id: user?.id || '',
    objectId: userInfo?.id || '',
    username: userInfo?.username || user?.username || '',
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl || '',
  }

  return (
    <main className="mx-auto flex flex-col max-w-3xl justify-start px-10 py-20">
      <h1 className="head-text">OnBoarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page