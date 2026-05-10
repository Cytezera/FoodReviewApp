import { apiUrl } from "@/services/apiConfig";
import { RegisterFormData } from "@/types/registerFormData";

export async function registerAccount(user: RegisterFormData) {
  try {
    const res = await fetch(apiUrl("/api/users/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, data };
    }

    return { success: true, data };
  } catch (e: any) {
    console.error("Failed to register form, ", e);

    return {
      success: false,
      errors: e.data,
    };
  }
}
