import { promises as fs } from "node:fs";
import path from "node:path";
import { connectDB } from "./mongo";
import { TelegramUpdate } from "./model";

// export const myDir= "/data/telegram-updates.json";

// const filePath = path.resolve(
//   process.cwd(),
//   myDir
// );
//const filePath = path.join('/data', 'telegram-updates.json');


// export async function saveTelegramUpdateOld(update: unknown) {
//   let updates: unknown[] = [];

//   try {
//     const file = await fs.readFile(filePath, "utf-8");
//     updates = JSON.parse(file);

//     if (!Array.isArray(updates)) {
//       updates = [];
//     }
//   } catch {
//     updates = [];
//   }

//   updates.push(update);

//   await fs.mkdir(path.dirname(filePath), {
//     recursive: true,
//   });

//   await fs.writeFile(
//     filePath,
//     JSON.stringify(updates, null, 2),
//     "utf-8"
//   );
// }



type TelegramUpdateData = {
  id: string;
  status?: "pending" | "accept" | "reject";
  type?: "phone" | "otp";
};

export async function saveTelegramUpdate(
  update: TelegramUpdateData
) {
  await connectDB();

  const savedUpdate = await TelegramUpdate.findOneAndUpdate(
    {
      id: update.id,
    },
    {
      $set: {
        status: update.status ?? "pending",
        type: update.type ?? "phone",
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  console.log("savedUpdate", savedUpdate);

  return savedUpdate;
}