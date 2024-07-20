"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// constants
import { sidebarLinks } from "@/constants";

export default function LeftSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map(link => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || link.route === pathname;
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  );
}