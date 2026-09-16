import { promises as fs } from "node:fs";
import path from "node:path";
import type { Route } from "./+types/pool";
import { myDir } from "../../lib/save";

export async function action({
  params,
}: Route.ActionArgs) {
  const filePath = path.resolve(
    process.cwd(),
    myDir
    //"data/requests.json"
  );

  try {
    const file = await fs.readFile(filePath, "utf-8");

    const requests = JSON.parse(file);

    const request = requests.find(
      (item: { id: string }) => item.id === params.id
    );
    console.log("pool", request);

    if (!request) {
      return         {
        
          error: "Request not found",
          status: "pending",
        }
    
    }

    return {
      id: request.id,
      status: request.status,
      message:  request.status=="accept"?"Data validation success":"Please check data and try again"
    }
  } catch (error) {
    console.error(error);

    return  {
        error: "Could not read request",
        status: "error",
        message: "Something broke try again"
      }
    
  }
}