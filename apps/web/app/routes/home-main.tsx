import React, { useState, useMemo } from 'react';
import { Menu, Zap, Percent, Lock } from 'lucide-react';

export default function LoanCalculator() {
  // State management for sliders
  const [loanAmount, setLoanAmount] = useState<number>(5000);
  const [loanTerm, setLoanTerm] = useState<number>(12);

  // Constants based on the UI layout
  const minAmount = 100;
  const maxAmount = 5000;
  const minTerm = 6;
  const maxTerm = 60;
  const annualInterestRate = 0.08; // Based on the "From 8%" value in the image

  // Dynamic monthly payment calculation (Amortized loan formula)
  const monthlyPayment = useMemo(() => {
    const monthlyRate = annualInterestRate / 12;
    if (monthlyRate === 0) return (loanAmount / loanTerm).toFixed(2);
    
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                    (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    return payment.toFixed(2);
  }, [loanAmount, loanTerm]);

  // Formatter for currency display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans antialiased flex flex-col justify-between text-[#333333]">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-[#e5e7eb] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <button className="text-[#333333] hover:opacity-70 transition-opacity">
          <Menu size={24} strokeWidth={2} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold tracking-tight">
          <span className="text-[#2563eb]">Eco</span>
          <span className="text-[#1e40af]">Cash</span>
        </div>
        <div className="w-6"></div> {/* Spacer to perfectly center the logo */}
      </header>

      {/* Main Content Area Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[540px] bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-[#e5e7eb] p-8 md:p-10">
          
          {/* Header Typography */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-[28px] font-bold text-[#111827] tracking-tight mb-2">
              Get Your Loan Approved Fast
            </h1>
            <p className="text-xs md:text-sm text-[#6b7280] font-medium tracking-wide">
              Quick approval &bull; Competitive rates &bull; Flexible terms
            </p>
          </div>

          {/* Calculator Bounding Box */}
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-xl p-6 mb-8">
            <h2 className="text-base font-bold text-[#111827] mb-6 tracking-tight">
              Loan Calculator
            </h2>

            {/* Slider 1: Loan Amount */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[#4b5563]">Loan Amount</span>
                <span className="text-base font-bold text-[#2563eb]">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={minAmount}
                max={maxAmount}
                step={100}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
              />
              <div className="flex justify-between text-[11px] text-[#9ca3af] mt-1 font-medium">
                <span>{formatCurrency(minAmount)}</span>
                <span>{formatCurrency(maxAmount)}</span>
              </div>
            </div>

            {/* Slider 2: Loan Term */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[#4b5563]">Loan Term</span>
                <span className="text-base font-bold text-[#2563eb]">{loanTerm} months</span>
              </div>
              <input
                type="range"
                min={minTerm}
                max={maxTerm}
                step={1}
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-1.5 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
              />
              <div className="flex justify-between text-[11px] text-[#9ca3af] mt-1 font-medium">
                <span>{minTerm} months</span>
                <span>{maxTerm} months</span>
              </div>
            </div>

            {/* Monthly Payment Output Screen */}
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex justify-between items-center shadow-sm">
              <span className="text-sm font-medium text-[#4b5563]">Monthly Payment</span>
              <span className="text-2xl md:text-3xl font-extrabold text-[#2563eb]">
                ${monthlyPayment}
              </span>
            </div>
          </div>

          {/* Core Action Button */}
          <button onClick={()=>{
            window.location.href = "/application-form/"+loanAmount+"/"+loanTerm
          }} className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-sm font-bold uppercase tracking-wider py-4 rounded-xl shadow-md transition-colors mb-10">
            Apply Now
          </button>

          {/* Visual Trust Badges Grid */}
          <div className="grid grid-cols-3 gap-2 border-t border-[#f3f4f6] pt-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mb-2">
                <Zap size={20} fill="currentColor" strokeWidth={1} />
              </div>
              <span className="text-xs font-bold text-[#111827] block mb-0.5">Fast Approval</span>
              <span className="text-[10px] text-[#9ca3af]">Within 24 hours</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mb-2">
                <Percent size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-[#111827] block mb-0.5">Low Rates</span>
              <span className="text-[10px] text-[#9ca3af]">From 8%</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mb-2">
                <Lock size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-[#111827] block mb-0.5">Secure</span>
              <span className="text-[10px] text-[#9ca3af]">Bank-level</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Branding Context */}
      <footer className="w-full bg-[#f3f4f6] text-center py-6 text-xs text-[#9ca3af] font-medium border-t border-[#e5e7eb]">
        &copy; 2026 Ecocash
      </footer>
    </div>
  );
}
