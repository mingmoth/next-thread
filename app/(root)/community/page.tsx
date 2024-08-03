import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/SearchBar";
// import Pagination from "@/components/shared/Pagination";
import CommunityCard from "@/components/cards/CommunityCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // const user = await currentUser();
  // if (!user) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const result = await fetchCommunities({
  //   searchString: searchParams.q,
  //   pageNumber: searchParams?.page ? +searchParams.page : 1,
  //   pageSize: 25,
  // });

  const result = {
    communities: [
      {
        id: '1',
        name: 'Community 1',
        username: 'community1',
        image: 'https://i.pravatar.cc/100',
        bio: 'Community 1 bio',
        members: [{
          image: 'https://i.pravatar.cc/200'
        }]
      },
      {
        id: '2',
        name: 'Community 2',
        username: 'community2',
        image: 'https://i.pravatar.cc/300',
        bio: 'Community 2 bio',
        members: [
          {
            image: 'https://i.pravatar.cc/400'
          },
          {
            image: 'https://i.pravatar.cc/500'
          }
        ]
      }
    ],
    totalPage: 5,
    isNext: true
  }

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-5'>
        <Searchbar routeType='communities' />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        {result.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      {/* <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </>
  );
}

export default Page;