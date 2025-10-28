"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would send the reset email here
      console.log("Password reset email sent to:", email);

      // Redirect to a success page or show success message
      alert("Password reset link has been sent to your email!");
    } catch (error) {
      console.error("Error sending reset email:", error);
      setErrors({ email: "Failed to send reset email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#111827] flex items-center justify-center'>
      <div className='w-full max-h-screen overflow-hidden bg-transparent rounded-sm shadow-lg relative'>
        <Image
          src='/auth-banner.png'
          alt='Logo'
          width={1200}
          height={800}
          className='h-full w-full object-cover'
        />

        {/* Centered text */}
        <h2 className='absolute inset-0 flex items-center justify-center text-white font-bold text-4xl'>
          Neoterra
        </h2>
      </div>

      <div className='w-full bg-transparent shadow-lg border-0'>
        <div className='w-[60%] mx-auto bg-[#1F2937] p-8 rounded-2xl'>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className='absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-gray-600' />
          </button>

          {/* Header */}
          <div className='text-center mb-8 flex items-center justify-center gap-4'>
            <button onClick={() => router.back()} className="cursor-pointer">
              <ArrowLeft className='w-5 h-5 text-gray-100' />
            </button>
            <h1 className='text-2xl font-bold text-gray-100 mb-2'>
              Forget Password
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-lg font-medium text-gray-100 mb-2'
              >
                Email
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  placeholder='Enter your email'
                  className={`pl-10 h-[52px] !bg-[#374151] !border-none focus:border-orange-400 focus:ring-orange-400 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full h-12 bg-[#3F9E9D] hover:bg-[#39cfcd] text-white font-medium rounded-lg transition-colors'
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className='text-center mt-6'>
            <p className='text-gray-300 text-sm'>
              Already have an account?{" "}
              <Link
                href='/auth/signin'
                className='text-[#3F9E9D] hover:text-[#3ecac8] font-medium transition-colors'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
