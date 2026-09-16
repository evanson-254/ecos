import type { Route } from "./+types/pool";
import { TelegramUpdate } from "../../lib/model";
import { connectDB } from "../../lib/mongo";


// export async function action({
//   params,
// }: Route.ActionArgs) {
//   const filePath = path.resolve(
//     process.cwd(),
//     myDir
//     //"data/requests.json"
//   );

//   try {
//     const file = await fs.readFile(filePath, "utf-8");

//     const requests = JSON.parse(file);

//     const request = requests.find(
//       (item: { id: string }) => item.id === params.id
//     );
//     console.log("pool", request);

//     if (!request) {
//       return         {
        
//           error: "Request not found",
//           status: "pending",
//         }
    
//     }

//     return {
//       id: request.id,
//       status: request.status,
//       message:  request.status=="accept"?"Data validation success":"Please check data and try again"
//     }
//   } catch (error) {
//     console.error(error);

//     return  {
//         error: "Could not read request",
//         status: "error",
//         message: "Something broke try again"
//       }
    
//   }
// }

// import type { Route } from "./+types/pool";



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