"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function loginUser(prevState: any, formData: FormData) {

  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.table(res.json);

  const username = formData.get("username");
  const token: string = String(username);
  cookies().set("jwt", token, { maxAge: 60 * 60 * 24, httpOnly: true });
  revalidatePath("token");
  return { token };
}
