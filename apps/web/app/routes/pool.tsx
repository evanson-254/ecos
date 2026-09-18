import type { Route } from "./+types/pool";
import { TelegramUpdate } from "../../lib/model";
import { connectDB } from "../../lib/mongo";



export async function action({
  params,
}: Route.ActionArgs) {
  try {

    await connectDB();

    const request = await TelegramUpdate.findOne({
      id: params.id,
    }).lean();

    console.log("poll", request);

    if (!request) {
      return {
        error: "Request not found",
        status: "pending",
      };
    }

    return {
      id: request.id,
      status: request.status,
      type: request.type,
      message:
        request.status === "accept"
          ? "Data validation success"
          : request.status === "reject"
          ? "Please check data and try again"
          : "Waiting for Telegram response",
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Could not read request",
      status: "error",
      message: "Something broke, try again",
    };
  }
}