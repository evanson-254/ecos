import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import image from "@workspace/ui/background-image.jpg"

export async function action({}:any) {
    return {
        successRedirect: "/confirmation"
    }
}

export default function SuccessPage() {
    const navigate = useNavigate();
    const total = 5;
    const [countdown, setCountDown] = useState(total);


    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/confirmation");
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown === 0) {
                clearInterval(timer);
                return;
            };
            setCountDown((countDown) => countDown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bgs-[#eef4ff]" 
        style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
        >

            {/* Background */}

            <div className="absolute inset-0 overflow-hidden">

                <div className="blob left-20 top-24 h-52 w-52 bg-blue-300/25" />

                <div className="blob right-20 bottom-16 h-72 w-72 bg-cyan-300/20 animation-delay-2000" />

                <div className="blob left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-blue-400/10 animation-delay-4000" />

            </div>


            {/* Floating Sparkles */}

            <span className="sparkle left-[15%] top-[25%]">✨</span>
            <span className="sparkle right-[12%] top-[18%]">⭐</span>
            <span className="sparkle left-[75%] top-[70%]">🎉</span>
            <span className="sparkle right-[8%] bottom-[25%]">🎈</span>

            {/* Card */}

            <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/40 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-xl">

                <div className="mx-auto flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-blue-100">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">

                        <CheckCircle2 className="h-9 w-9 text-white" />

                    </div>

                </div>

                <h1 className="mt-8 text-4xl font-bold text-blue-700">
                    {/* {countdown} */}
                    Success!
                </h1>

                <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                    Your loan application has been submitted successfully.
                </p>

                <p className="mt-2 text-slate-500">
                    The next step is confirming your number through
                    <span className="font-semibold text-blue-700">
                        {" "}EcoCash
                    </span>.
                </p> 

                {/* Progress */}

                <div className="mt-10">

                    <div className="h-2 overflow-hidden rounded-full bg-blue-100">

                        <div className={"progress-bar h-full rounded-full bg-blue-600"} style={{ width: `${countdown == 0 ? 0 : countdown / total * 100}%` }}></div>

                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                        Redirecting...
                    </p>

                </div>

            </div>

        </main>
    );
}