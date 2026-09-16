import React, { useState } from "react";
import { CheckCircle2, ChevronLeft, Menu } from "lucide-react";
import type { Route } from "./+types/application-form";

interface FormData {
  loanType: string;
  loanAmount: string;
  loanTerm: string;
  purpose: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  employmentStatus: string;
  annualIncome: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function LoanApplicationForm({params}:Route.ComponentProps) {
    const { amount, term } = params;
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    loanType: "Personal Loan",
    loanAmount: amount,
    loanTerm: term +" Months",
    purpose: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+263",
    phoneNumber: "",
    employmentStatus: "Employed",
    annualIncome: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the field being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    // STEP 1 VALIDATION
    if (currentStep === 1) {
      const loanAmount = Number(formData.loanAmount);

      if (
        !formData.loanAmount.trim() ||
        Number.isNaN(loanAmount) ||
        loanAmount <= 0
      ) {
        newErrors.loanAmount = "Please enter a valid loan amount";
      }

      if (!formData.purpose.trim()) {
        newErrors.purpose = "Please provide the purpose of your loan";
      }
    }

    // STEP 2 VALIDATION
    if (currentStep === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !formData.email.trim() ||
        !emailRegex.test(formData.email.trim())
      ) {
        newErrors.email = "Please enter a valid email address";
      }

      const phoneRegex = /^\d{9,10}$/;

      if (
        !formData.phoneNumber.trim() ||
        !phoneRegex.test(formData.phoneNumber.trim())
      ) {
        newErrors.phoneNumber =
          "Enter 9-10 digits (e.g., 123456789)";
      }
    }

    // STEP 3 VALIDATION
    if (currentStep === 3) {
      const annualIncome = Number(formData.annualIncome);

      if (
        !formData.annualIncome.trim() ||
        Number.isNaN(annualIncome) ||
        annualIncome <= 0
      ) {
        newErrors.annualIncome = "Please enter a valid annual income";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateStep(3)) {
      setIsSubmitted(true);
      localStorage.setItem("kit", (new Date().getTime().toString())+formData.loanAmount);

      setTimeout(()=>{

        window.location.href = "/process/"+formData.loanAmount
      },1000);
    }
  };

  const resetApplication = () => {
    setStep(1);
    setIsSubmitted(false);
    setErrors({});

    setFormData({
      loanType: "Personal Loan",
      loanAmount: "5000",
      loanTerm: "6 Months",
      purpose: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneCountryCode: "+263",
      phoneNumber: "",
      employmentStatus: "Employed",
      annualIncome: "",
    });
  };

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-4 py-3 text-sm text-[#111827]
    placeholder-[#9ca3af]
    focus:outline-none focus:ring-2 focus:ring-[#2563eb]
    transition-all
    ${
      errors[field]
        ? "border-red-500 bg-red-50"
        : "border-[#d1d5db] bg-white"
    }`;

  const errorMessage = (field: string) => {
    if (!errors[field]) return null;

    return (
      <p className="text-[11px] text-red-500 mt-1 font-medium">
        {errors[field]}
      </p>
    );
  };

  const formattedLoanAmount = formData.loanAmount
    ? Number(formData.loanAmount).toLocaleString()
    : "0";

  const applicantName =
    `${formData.firstName} ${formData.lastName}`.trim() || "—";

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans antialiased flex flex-col text-[#333333]">
      {/* HEADER */}
      <header className="bg-white border-b border-[#e5e7eb] px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        {step > 1 && !isSubmitted ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-1 text-sm font-semibold text-[#4b5563] hover:text-[#2563eb] transition-colors"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Back
          </button>
        ) : (
          <button
            type="button"
            aria-label="Menu"
            className="text-[#333333] hover:opacity-70 transition-opacity"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        )}

        {/* LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-bold tracking-tight">
          <span className="text-[#2563eb]">Eco</span>
          <span className="text-[#1e40af]">Cash</span>
        </div>

        <div className="w-12" />
      </header>

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[540px] bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-[#e5e7eb] p-5 sm:p-8 md:p-10">

          {/* SUCCESS SCREEN */}
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={34} strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl font-bold text-[#111827] mb-2">
                Application Submitted!
              </h2>
              

              <p className="text-sm leading-6 text-[#6b7280] max-w-sm mx-auto">
                Thank you, {formData.firstName}. Your loan application
                has been received and is currently under review.
              </p>

              <div className="mt-5 text-red-4000 text-sm">
                Redirecting to processings page....
              </div>


              {/* <button
                type="button"
                onClick={resetApplication}
                className="mt-7 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Submit Another Application
              </button> */}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* TITLE + PROGRESS */}
              <div className="text-center mb-8">
                <h1 className="text-[24px] sm:text-[26px] font-bold text-[#111827] tracking-tight mb-1">
                  Loan Application
                </h1>

                <p className="text-xs text-[#9ca3af] font-medium tracking-wide mb-6">
                  Step {step} of 3
                </p>

                <div className="flex justify-center items-center gap-2 max-w-[180px] mx-auto">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                        step >= item
                          ? "bg-[#2563eb]"
                          : "bg-[#e5e7eb]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* ================= STEP 1 ================= */}
              {step === 1 && (
                <div className="space-y-5">
                  {/* Loan Type */}
                  <div>
                    <label
                      htmlFor="loanType"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Loan Type
                    </label>

                    <select
                      id="loanType"
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleChange}
                      className={inputClass("loanType")}
                    >
                      <option value="Personal Loan">
                        Personal Loan
                      </option>
                      <option value="Business Loan">
                        Business Loan
                      </option>
                      <option value="Education Loan">
                        Education Loan
                      </option>
                    </select>
                  </div>

                  {/* Loan Amount */}
                  <div>
                    <label
                      htmlFor="loanAmount"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Loan Amount ($)
                    </label>

                    <input
                      id="loanAmount"
                      type="number"
                      name="loanAmount"
                      min="1"
                      step="1"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      placeholder="5000"
                      className={inputClass("loanAmount")}
                    />

                    {errorMessage("loanAmount")}
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label
                      htmlFor="loanTerm"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Loan Term
                    </label>

                    <select
                      id="loanTerm"
                      name="loanTerm"
                      value={formData.loanTerm}
                      onChange={handleChange}
                      className={inputClass("loanTerm")}
                    >
                      <option value="6 Months">6 Months</option>
                      <option value="12 Months">12 Months</option>
                      <option value="19 Months">19 Months</option>
                      <option value="24 Months">24 Months</option>
                      <option value="36 Months">36 Months</option>
                      <option value="60 Months">60 Months</option>
                    </select>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label
                      htmlFor="purpose"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Purpose of Loan
                    </label>

                    <textarea
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      placeholder="What will you use the loan for?"
                      rows={3}
                      className={`${inputClass(
                        "purpose"
                      )} resize-none`}
                    />

                    {errorMessage("purpose")}
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold uppercase tracking-wider py-4 rounded-xl shadow-md transition-all mt-4"
                  >
                    Next Step
                  </button>
                </div>
              )}

              {/* ================= STEP 2 ================= */}
              {step === 2 && (
                <div className="space-y-5">
                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-xs font-bold text-[#374151] mb-2"
                      >
                        First Name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        className={inputClass("firstName")}
                      />

                      {errorMessage("firstName")}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-xs font-bold text-[#374151] mb-2"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        className={inputClass("lastName")}
                      />

                      {errorMessage("lastName")}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={inputClass("email")}
                    />

                    {errorMessage("email")}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Phone Number
                    </label>

                    <div className="flex gap-2">
                      <select
                        name="phoneCountryCode"
                        value={formData.phoneCountryCode}
                        onChange={handleChange}
                        aria-label="Country code"
                        className="w-[90px] sm:w-[100px] shrink-0 bg-white border border-[#d1d5db] rounded-lg px-2 sm:px-3 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      >
                        <option value="+263">+263</option>
                        <option value="+254">+254</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>

                      <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        placeholder="123456789"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        inputMode="numeric"
                        autoComplete="tel-national"
                        className={inputClass("phoneNumber")}
                      />
                    </div>

                    <p className="text-[11px] text-[#9ca3af] mt-1">
                      Enter 9-10 digits (e.g., 123456789)
                    </p>

                    {errorMessage("phoneNumber")}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 border border-[#d1d5db] bg-white hover:bg-[#f9fafb] text-[#374151] text-sm font-bold uppercase tracking-wider py-4 rounded-xl transition-all"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold uppercase tracking-wider py-4 rounded-xl shadow-md transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 3 ================= */}
              {step === 3 && (
                <div className="space-y-5">
                  {/* Employment Status */}
                  <div>
                    <label
                      htmlFor="employmentStatus"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Employment Status
                    </label>

                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      className={inputClass("employmentStatus")}
                    >
                      <option value="Employed">Employed</option>
                      <option value="Self-Employed">
                        Self-Employed
                      </option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>

                  {/* Annual Income */}
                  <div>
                    <label
                      htmlFor="annualIncome"
                      className="block text-xs font-bold text-[#374151] mb-2"
                    >
                      Annual Income ($)
                    </label>

                    <input
                      id="annualIncome"
                      type="number"
                      name="annualIncome"
                      min="1"
                      step="1"
                      placeholder="50000"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      inputMode="numeric"
                      className={inputClass("annualIncome")}
                    />

                    {errorMessage("annualIncome")}
                  </div>

                  {/* APPLICATION SUMMARY */}
                  <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-5 mt-6">
                    <h3 className="text-sm font-bold text-[#111827] mb-4">
                      Application Summary
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-[#6b7280]">
                          Loan Type:
                        </span>
                        <span className="font-semibold text-[#111827] text-right">
                          {formData.loanType}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#6b7280]">
                          Loan Amount:
                        </span>
                        <span className="font-semibold text-[#111827]">
                          ${formattedLoanAmount}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#6b7280]">
                          Loan Term:
                        </span>
                        <span className="font-semibold text-[#111827]">
                          {formData.loanTerm}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#6b7280]">
                          Purpose:
                        </span>
                        <span className="font-semibold text-[#111827] text-right max-w-[60%] break-words">
                          {formData.purpose || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#6b7280]">
                          Applicant:
                        </span>
                        <span className="font-semibold text-[#111827] text-right">
                          {applicantName}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#6b7280]">
                          Employment:
                        </span>
                        <span className="font-semibold text-[#111827]">
                          {formData.employmentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 border border-[#d1d5db] bg-white hover:bg-[#f9fafb] text-[#374151] text-sm font-bold uppercase tracking-wider py-4 rounded-xl transition-all"
                    >
                      Previous
                    </button>

                    <button
                      type="submit"
                      className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold uppercase tracking-wider py-4 rounded-xl shadow-md transition-all"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-5 text-xs text-[#9ca3af]">
        © 2026 EcoCash
      </footer>
    </div>
  );
}

