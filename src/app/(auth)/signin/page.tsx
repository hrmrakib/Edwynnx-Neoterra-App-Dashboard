"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Sign in data:", formData);
    } catch (error) {
      console.error("Sign in error:", error);
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

      <Card className='w-full bg-transparent shadow-lg border-0'>
        <CardContent className='w-[60%] mx-auto p-[2px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl'>
          <div className='relative bg-[#1F2937] p-8 rounded-2xl'>
            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='text-2xl font-bold text-[#D1D5DB] mb-2'>
                Sign in
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Address */}
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-[#F9FAFB] text-lg font-medium'
                >
                  Email
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 h-[52px] !bg-[#374151] !border-none focus:bg-white ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-[#F9FAFB] text-lg font-medium'
                >
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Min 8 character'
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 h-[52px] !bg-[#374151] !border-none focus:bg-white ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className='text-right'>
                <Link
                  href='/auth/forgot-password'
                  className='text-[#40EDFB] text-sm hover:text-[#40EDFB] transition-colors'
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full h-12 bg-[#3F9E9D] hover:bg-[#31c5c3] text-white font-medium py-3 rounded-lg transition-colors'
              >
                {isLoading ? "Signing In..." : "Sign in"}
              </Button>

              {/* Sign Up Link */}
              <div className='text-center'>
                <span className='text-[#D1D5DB] text-base'>
                  Don&apos;t have an account?{" "}
                  <Link
                    href='/signup'
                    className='text-[#40EDFB] hover:text-[#40EDFB] font-medium transition-colors'
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
