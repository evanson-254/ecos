import { promises as fs } from "node:fs";
import path from "node:path";

export const myDir= "C:/projects/data/telegram-updates.json";

const filePath = path.resolve(
  process.cwd(),
  myDir
);

export async function saveTelegramUpdate(update: unknown) {
  let updates: unknown[] = [];

  try {
    const file = await fs.readFile(filePath, "utf-8");
    updates = JSON.parse(file);

    if (!Array.isArray(updates)) {
      updates = [];
    }
  } catch {
    updates = [];
  }

  updates.push(update);

  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  });

  await fs.writeFile(
    filePath,
    JSON.stringify(updates, null, 2),
    "utf-8"
  );
}