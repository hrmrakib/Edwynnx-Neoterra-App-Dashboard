"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const settingsLinks = [
    { title: "Personal Information", href: "/setting/personal-information" },
    { title: "Change Password", href: "/setting/change-password" },
    { title: "Terms & Condition", href: "/setting/terms-condition" },
    { title: "Privacy Policy", href: "/setting/privacy-policy" },
    { title: "Trust & Safety", href: "/setting/trust-safety" },
  ];

  return (
    <div className='flex min-h-screen bg-transparent p-6'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='bg-[#1F2937] text-2xl font-semibold text-gray-100 p-6 mb-8 border-b border-b-[#66F1FC] rounded-t-2xl'>
              Settings
            </h1>

            <div className='space-y-4'>
              {settingsLinks.map((link, index) => (
                <div
                  key={index}
                  className='p-[1px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-xl'
                >
                  <Link
                    href={link.href}
                    className='bg-[#1F2937] flex items-center justify-between p-4 border border-[#760C2A] rounded-xl hover:bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 transition-colors'
                  >
                    <span className='text-white text-lg'>{link.title}</span>
                    <ChevronRight className='h-5 w-5 text-gray-400' />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
