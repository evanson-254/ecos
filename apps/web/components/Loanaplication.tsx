import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import image from "@workspace/ui/background-image.jpg"
import { useNavigate } from "react-router";

export default function LoanApplication() {
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // navigate("/success");
        window.location.href = "/success";
    }
    return (
        <main className="min-h-screen bgs-slate-100 py-10 px-4"
        style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
        >
            <title>EcoCash Loan Application</title>
            <div className="mx-auto max-w-5xl rounded-3xl bg-white shadow-sm p-6 md:p-10">

                {/* Header */}

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-blue-700">
                        EcoCash Loan Application
                    </h1>

                    <p className="text-gray-600">
                        Please fill in all required details accurately. All information is
                        kept confidential and used only for loan processing and verification.
                    </p>
                </div>

                {/* Notice */}

                <div className="mt-6 rounded-lg border-l-4 border-blue-600 bg-blue-50 px-5 py-4 text-blue-700">
                    <span className="font-semibold">Important:</span> You must have at
                    least 10% of the loan amount you want in your Ecocash account.
                </div>

                {/* Form */}

                <form className="mt-8 space-y-6" 
                action={"/success"}
                method="post"
                onSubmit={handleSubmit}
                >

                    {/* Row */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-medium">
                                Full Name *
                            </label>

                            <Input name="name" required />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Phone Number *
                            </label>

                            <Input name="phone" required />

                            <small className="mt-2 block text-gray-500">
                                Include country code
                            </small>
                        </div>

                    </div>

                    {/* Row */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-medium">
                                Email
                            </label>

                            <Input placeholder="you@example.com" name="email"  />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                National ID *
                            </label>

                            <Input placeholder="ID / Passport" name="national_id" required />
                        </div>

                    </div>

                    {/* DOB */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Date of Birth *
                        </label>

                        <div className="grid grid-cols-3 gap-4">

                            <Input type="number" placeholder="YYYY" name="dob_year" required />

                            <Input type="number" placeholder="MM" name="dob_month" required />

                            <Input type="number" placeholder="DD" name="dob_day" required />

                        </div>

                    </div>

                    {/* Address */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Residential Address *
                        </label>

                        <Input placeholder="Street, City, Country" name="address" required />

                    </div>

                    {/* Employment */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">
                                Employment *
                            </label>

                            <Select name="employment" required>

                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose..." />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="employed">
                                        Employed
                                    </SelectItem>

                                    <SelectItem value="self">
                                        Self Employed
                                    </SelectItem>

                                    <SelectItem value="business">
                                        Business
                                    </SelectItem>

                                    <SelectItem value="student">
                                        Student
                                    </SelectItem>

                                    <SelectItem value="unemployed">
                                        Unemployed
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">
                                Monthly Income
                            </label>

                            <Input
                                type="number"
                                placeholder="0.00"
                            />

                        </div>

                    </div>

                    {/* Loan */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">
                                Loan Type *
                            </label>

                            <Select name="loan_type" required>

                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose..." />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="personal">
                                        Personal Loan
                                    </SelectItem>

                                    <SelectItem value="salary">
                                        Salary Advance
                                    </SelectItem>

                                    <SelectItem value="business">
                                        Business Loan
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">
                                Loan Amount (USD) *
                            </label>

                            <Input
                                type="number"
                                placeholder="0.01"
                                name="loan_amount"
                                required
                            />

                        </div>

                    </div>

                    {/* Repayment */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">
                                Repayment *
                            </label>

                            <Select name="repayment" required>

                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose..." />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="3">
                                        3 Months
                                    </SelectItem>

                                    <SelectItem value="6">
                                        6 Months
                                    </SelectItem>

                                    <SelectItem value="12">
                                        12 Months
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    </div>

                    {/* Agreement */}

                    <div className="flex items-start gap-3">

                        <Checkbox id="terms" name="terms" required />

                        <label
                            htmlFor="terms"
                            className="text-sm leading-relaxed"
                        >
                            I confirm that the information provided is true and I
                            agree to the EcoCash Loans terms and conditions.
                        </label>

                    </div>

                    {/* Footer */}

                    <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-end md:justify-between">

                        <p className="text-sm text-gray-500">
                            Fields marked * are required.
                        </p>

                        <div className="flex w-full flex-col gap-3 md:w-72">

                            <Button
                                className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700"
                                type="submit"
                            >
                                Continue with Ecocash
                            </Button>

                            <Button
                                variant="outline"
                                className="h-12 rounded-xl"
                                type="reset"
                            >
                                Reset
                            </Button>

                        </div>

                    </div>

                </form>

            </div>
        </main>
    );
}