import {
    BadgeCheck,
    CircleDollarSign,
    ShieldCheck,
    Smartphone,
    Clock3,
    BadgeX,
} from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function QualificationPage() {
    const [creditScore, setCreditScore] = useState(0);
    const [loanAmount, setloandAmount] = useState(0);
    //const creditScore = Math.floor(Math.random() * 1000);
    const loanQualified = creditScore >= 800;
    // const loanAmnount = creditScore >= 800 ?Math.floor(Math.random() * 100): 0.0;
    const [phone, sePhone] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (sessionStorage.getItem("phone") == null) {
            navigate("/confirmation");
        }
        sePhone(sessionStorage.getItem("phone"));
        setCreditScore(Number(sessionStorage.getItem("creditScore") || 0));
        setloandAmount(Number(sessionStorage.getItem("loanAmount") || 0));

    },
        []);

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#08305c] via-[#0a4b94] to-[#1169cf]">
            <title>Qualification</title>
            {/* Animated Background */}

            <div className="blob left-10 top-10 h-80 w-80 bg-cyan-400/10" />
            <div className="blob right-0 top-40 h-[30rem] w-[30rem] bg-blue-300/10 animation-delay-2000" />
            <div className="blob bottom-0 left-1/3 h-[28rem] w-[28rem] bg-sky-400/10 animation-delay-4000" />

            <div className="relative z-10 mx-auto max-w-5xl px-4 py-12">

                <h1 className="text-center text-5xl font-bold text-white">
                    Account Qualification
                </h1>

                <p className="mt-2 text-center text-blue-100">
                    Review your account qualification and compliance status
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-3">

                    {/* User Card */}

                    <Card className="border-white/20 bg-white/10 backdrop-blur-xl">

                        <CardContent className="space-y-6 p-6 text-white">

                            <div className="flex items-center gap-3">

                                <Smartphone className="text-cyan-300" />

                                <div>

                                    <p className="text-sm text-blue-200">
                                        Phone Number
                                    </p>

                                    <h2 className="text-2xl font-bold">
                                        {phone}
                                    </h2>

                                </div>

                            </div>

                            <div>

                                <p className="text-sm text-blue-200">
                                    Status
                                </p>
                                {loanQualified ?
                                    <Badge className="mt-2 bg-green-500 hover:bg-green-500">
                                        Qualified
                                    </Badge> :
                                    <Badge className="mt-2 bg-red-500 hover:bg-red-500">
                                        Not Qualified
                                    </Badge>
                                }
                            </div>

                            <div className="flex items-center gap-3">

                                <Clock3 className="text-cyan-300" />

                                <div>

                                    <p className="text-sm text-blue-200">
                                        Last Login
                                    </p>

                                    <p>
                                        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                                    </p>

                                </div>

                            </div>

                        </CardContent>

                    </Card>

                    {/* Score */}

                    <Card className="border-white/20 bg-white/10 backdrop-blur-xl lg:col-span-2">

                        <CardContent className="p-8 text-white">

                            <div className="flex items-center gap-3">
                                {creditScore >= 800 ?
                                    <BadgeCheck className="h-8 w-8 text-green-400" /> :
                                    <BadgeX className="h-8 w-8 text-red-400" />
                                }

                                <h2 className="text-3xl font-bold">
                                    {creditScore >= 800 ? "Congratulations!" : "Qualification Failed"}
                                </h2>

                            </div>

                            <p className="mt-5 max-w-xl text-blue-100">
                                {creditScore >= 800 ?
                                    `Your application has been successfully reviewed.

                                Based on your account activity and credit profile,
                                you qualify for enhanced lending terms.`:
                                    `Your application has been rejected.
                                
                                Please review your application and try again.`
                                }

                            </p>
                            {!loanQualified &&
                                <Link to="/confirmation">
                                    <Button variant="default" className="mt-6 bg-red-500 text-white hover:bg-red-700">
                                        <CircleDollarSign className="mr-2 h-5 w-5" />
                                        Retry
                                    </Button>
                                </Link>
                            }
                            <div className="mt-10 flex flex-col items-center gap-6 md:flex-row md:justify-between">

                                {/* Score Circle */}

                                <div className="relative">

                                    <svg
                                        className="h-44 w-44 -rotate-90"
                                        viewBox="0 0 180 180"
                                    >

                                        <circle
                                            cx="90"
                                            cy="90"
                                            r="70"
                                            stroke="rgba(255,255,255,.15)"
                                            strokeWidth="12"
                                            fill="none"
                                        />

                                        <circle
                                            cx="90"
                                            cy="90"
                                            r="70"
                                            stroke="#4ade80"
                                            strokeWidth="12"
                                            strokeDasharray="440"
                                            strokeDashoffset="110"
                                            strokeLinecap="round"
                                            fill="none"
                                        />

                                    </svg>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                                        <span className="text-6xl font-bold">
                                            {creditScore}
                                        </span>

                                        <span className="text-blue-200">
                                            Credit Score
                                        </span>

                                    </div>

                                </div>

                                <div className="space-y-5">

                                    <div>

                                        <p className="text-blue-200">
                                            Loan Qualified
                                        </p>

                                        <h2 className="text-4xl font-bold">
                                            ${loanAmount}
                                        </h2>

                                    </div>

                                    <div>

                                        <p className="text-blue-200">
                                            Bonus Included
                                        </p>

                                        <h2 className="text-3xl font-bold text-green-400">
                                            {creditScore >= 800 ? 10 : 0}%
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        </CardContent>

                    </Card>

                </div>

                {/* Compliance */}

                <Card className="mt-8 border-white/20 bg-white/10 backdrop-blur-xl">

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3 text-white">

                            <ShieldCheck className="text-cyan-300" />

                            <h2 className="text-3xl font-bold">
                                Compliance Notice
                            </h2>

                        </div>

                        <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">

                            Your EcoCash account should remain active and maintain
                            the required security deposit before funds can be
                            disbursed.

                            The deposit remains fully refundable after successful
                            loan repayment and helps secure preferential interest
                            rates.

                        </p>

                        <Button
                            className="mt-8 bg-white text-blue-700 hover:bg-blue-100"
                        >
                            <CircleDollarSign className="mr-2 h-5 w-5" />
                            Continue
                        </Button>

                    </CardContent>

                </Card>

                <p className="mt-10 text-center text-blue-200">
                    Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                </p>

            </div>

        </main>
    );
}