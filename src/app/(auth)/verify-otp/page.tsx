"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function VerifyAccountPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
          newOtp[i] = digits[i] || "";
        }
        setOtp(newOtp);

        // Focus on next empty input or last input
        const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
      });
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, accept any 6-digit code
      console.log("[v0] OTP verification attempted:", otpCode);

      // Redirect to success page or dashboard
      router.push("/auth/signin?verified=true");
    } catch (error) {
      setError("Invalid verification code. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("[v0] Resend OTP requested");

      // Clear current OTP and focus first input
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError("Failed to resend code. Please try again.");
      console.log(error);
    } finally {
      setIsResending(false);
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
        <div className='w-[60%] mx-auto p-[2px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl'>
          <div className='relative bg-[#1F2937] p-8 rounded-2xl'>
            {/* Header */}
            <div className='text-center mb-8 flex items-center justify-center gap-4'>
              <button onClick={() => router.back()} className='cursor-pointer'>
                <ArrowLeft className='w-6 h-6 text-gray-100' />
              </button>
              <h1 className='text-2xl font-bold text-gray-100 mb-3'>
                Verify Your Account
              </h1>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleVerification} className='space-y-6'>
              {/* OTP Input Fields */}
              <div className='flex justify-center gap-3 mb-6'>
                {otp.map((digit, index) => (
                  <div
                    key={index}
                    className='p-[2px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full'
                  >
                    <input
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type='text'
                      inputMode='numeric'
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className='w-16 h-16 text-center text-2xl font-semibold bg-[#1F2937] text-white rounded-full outline-none focus:ring-2 focus:ring-orange-500'
                      placeholder='-'
                    />
                  </div>
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <p className='text-red-500 text-sm text-center'>{error}</p>
              )}

              {/* Verification Button */}
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition-colors'
              >
                {isLoading ? "Verifying..." : "Verification"}
              </Button>

              {/* Resend Code */}
              <div className='text-center'>
                <span className='text-gray-400 text-sm'>
                  Didn&apos;t receive the code?{" "}
                </span>
                <button
                  type='button'
                  onClick={handleResendCode}
                  disabled={isResending}
                  className='text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors disabled:opacity-50'
                >
                  {isResending ? "Sending..." : "Resend Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
