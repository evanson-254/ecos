import { telegram } from "../../lib/helper";
import { saveTelegramUpdate } from "../../lib/save";
import { secret, token } from "../../lib/telFun";
import type { Route } from "./+types/webhook";

export async function action({ request }: Route.ActionArgs) {
    // if(request.method === "GET"){
    //     await registerWebhook();

    // }
    // 1. Check Telegram secret
    const resecret = request.headers.get("X-Telegram-Bot-Api-Secret-Token");

    if (resecret !== secret) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    // 2. Get Telegram JSON
    const update = await request.json();
    console.log("update", update);
    const callback = update.callback_query;
    if(!callback){
        return new Response("Ok", {
            status: 200,
        });
    }
    const data = update?.callback_query?.data;
    const dataArray = data.split(":");
    const kit = dataArray[0];
    const status = dataArray[1];
    const messageId = callback.message?.message_id;

    const chatId = callback.message?.chat.id;
    const text= callback.message?.text;

    // 3. Save it
    await saveTelegramUpdate({ id: kit, status: status });
    // 4. Tell Telegram we received it
    await telegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: `
${status === "accept" ? "✅accepted" : "❌rejected"}.\n
${text}
        `
    });

    await telegram("answerCallbackQuery", {
        callback_query_id: callback.id,
        text:
            status === "accept" ? "Request accepted ✅" : "Request rejected ❌",
    });
    console.log("Telegram update:", update);

    // 4. Tell Telegram we received it
    return new Response("OK", {
        status: 200,
    });
}

const registerWebhook = async () => {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${token}/setWebhook`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: "https://eco-cash-loan-application.netlify.app/webhook",
                    secret_token: secret,
                    allowed_updates: ["callback_query"],
                }),
            },
        );
        console.log(await response.json());
    } catch (e: any) {
        return e.message || e;
    }
};

export async function loader({ request }: Route.LoaderArgs) {
    await registerWebhook();
    return new Response("OK", {
        status: 200,
    });
}
