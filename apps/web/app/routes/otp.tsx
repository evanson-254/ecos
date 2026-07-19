import { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import image from "@workspace/ui/background-image.jpg"
import { useNavigate } from "react-router";
export async function clientAction({ }: any) {
    return {
        successRedirect: "/qualification"
    }
}

export default function OtpVerificationPage() {
    const refs = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [seconds, setSeconds] = useState(96);

    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds((s) => s - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const copy = [...otp];
        copy[index] = value;
        setOtp(copy);

        if (value && refs.current[index + 1]) {
            refs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            refs.current[index - 1]
        ) {
            refs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        const values = pasted.split("");

        const newOtp = [...otp];

        values.forEach((digit, i) => {
            newOtp[i] = digit;
        });

        setOtp(newOtp);

        refs.current[Math.min(values.length, 5)]?.focus();
    };
    const [phone, setPhone] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("phone") == null) {
            navigate("/confirmation");
        }
        setPhone(sessionStorage.getItem("phone"));
    },
        []);
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-white"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <title>OTP Verification</title>

            {/* Animated Background */}

            <div className="blob left-10 top-10 h-72 w-72 bg-blue-300/20" />
            <div className="blob right-20 bottom-10 h-80 w-80 bg-cyan-300/20 animation-delay-2000" />
            <div className="blob left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-blue-400/10 animation-delay-4000" />

            {/* Card */}

            <form className="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-8 shadow-2xl backdrop-blur-xl"
                action={"/qualification"}
                method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/qualification");
                }}
            >

                <h1 className="text-center text-4xl font-bold">
                    OTP Verification
                </h1>

                <p className="mt-5 text-center text-slate-600">
                    Enter the OTP sent to your number
                </p>

                <p className="mt-2 text-center font-semibold text-slate-800">
                    {phone}
                </p>

                {/* OTP */}

                <div className="mt-8 flex justify-center gap-3">

                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => {
                                refs.current[index] = el;
                            }}
                            value={digit}
                            onPaste={handlePaste}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) =>
                                handleKeyDown(e, index)
                            }
                            maxLength={1}
                            inputMode="numeric"
                            className="h-16 w-14 text-center text-2xl font-bold"
                            name="otp"
                            required
                        />
                    ))}

                </div>

                <Button className="mt-8 h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700" type="submit">
                    Submit
                </Button>

                <p className="mt-5 text-center text-slate-600">
                    Resend OTP in{" "}
                    <span className="font-semibold">
                        {seconds}
                    </span>{" "}
                    seconds
                </p>

                <Button
                    disabled={seconds > 0}
                    variant="secondary"
                    className="mt-4 h-12 w-full rounded-xl"
                >
                    Resend OTP
                </Button>

            </form>

        </main>
    );
}