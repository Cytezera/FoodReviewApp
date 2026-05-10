import { apiUrl } from "@/services/apiConfig";
import { BookmarkResponse } from "@/types/place";
import { UpdateUser } from "@/types/user";

export async function updateUser(user: UpdateUser) {
  console.log(user);
  try {
    const res = await fetch(apiUrl(`/api/users/update/${user.id}`), {
      method: "PATCH",
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
    console.error("Failed to update user ", e);

    return {
      success: false,
      errors: e.data,
    };
  }
}

export async function bookmarkPlace(
  placeId: number,
  token: string,
): Promise<BookmarkResponse> {
  const res = await fetch(apiUrl(`/api/users/bookmarks`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ placeId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? "Bookmarking place failed");
  return data;
}
