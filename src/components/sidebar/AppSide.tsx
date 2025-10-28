/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import Link from "next/link";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardSidebar() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  const handleLogout = async () => {
    // await logout();
    router.push("/signin");
  };

  if (
    pathname === "/signup" ||
    pathname === "/signin" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password"
  ) {
    return null;
  }

  return (
    <>
      <div className='!bg-sidebar-bg md:!bg-sidebar-bg'>
        <Sidebar className='border-r-0 border-transparent fixed left-0 h-full z-30 !bg-sidebarBg md:!bg-sidebarBg'>
          <SidebarContent>
            <Link
              href='/'
              className='flex items-center justify-center gap-2 px-3 py-8'
            >
              <h2 className='text-4xl font-semibold text-[#00FFFF]'>
                Neoterra
              </h2>
            </Link>

            <SidebarMenu className='px-6 space-y-2'>
              <NavItem
                href='/'
                icon={LayoutDashboard}
                label='Dashboard'
                active={pathname === "/"}
              />

              <NavItem
                href='/events'
                icon={Users}
                label='Events'
                active={
                  pathname === "/events" || pathname.startsWith("/events/")
                }
              />

              <NavItem
                href='/transaction'
                icon={Settings}
                label='Transaction'
                active={
                  pathname === "/transaction" ||
                  pathname.startsWith("/transaction/")
                }
              />

              <NavItem
                href='/settings'
                icon={Settings}
                label='Setting'
                active={
                  pathname === "/settings" || pathname.startsWith("/settings/")
                }
              />
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className='p-6'>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className='flex w-full items-center gap-3  px-4 py-3'
            >
              <svg
                width='25'
                height='24'
                viewBox='0 0 25 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.4 7.56023C9.71 3.96023 11.56 2.49023 15.61 2.49023H15.74C20.21 2.49023 22 4.28023 22 8.75023V15.2702C22 19.7402 20.21 21.5302 15.74 21.5302H15.61C11.59 21.5302 9.74 20.0802 9.41 16.5402'
                  stroke='#4F3E19'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15.5 12H4.12'
                  stroke='#4F3E19'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M6.35 8.65039L3 12.0004L6.35 15.3504'
                  stroke='#4F3E19'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <span className='text-[#FE504E] text-lg font-semibold'>
                Log out
              </span>
            </button>
          </SidebarFooter>
        </Sidebar>
        {/* <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        /> */}
      </div>
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

function NavItem({ href, icon: Icon, label, active = true }: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center gap-3 px-4 !py-5 transition-colors rounded-full",
            active
              ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-[#fff]"
              : "hover:bg-bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:text-[#fff]"
          )}
        >
          <Icon size={18} />
          <span
            className={`text-lg text-nowrap ${
              active ? "text-[#E5E7EB]" : "text-[#E5E7EB]"
            }`}
          >
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
