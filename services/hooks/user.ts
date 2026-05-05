import { loginUser, fetchUserJWT } from "@/services/authService";
import { registerAccount } from "@/services/registerService";
import { bookmarkPlace, updateUser } from "@/services/userService";
import { RegisterFormData } from "@/types/registerFormData";
import { LoginCredential, UpdateUser } from "@/types/user";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useLoginUser() {
  return useMutation({
    mutationFn: (credentials: LoginCredential) => loginUser(credentials),
  });
}

export function useRegisterAccount() {
  return useMutation({
    mutationFn: (user: RegisterFormData) => registerAccount(user),
  });
}

export function useFetchUserJWT(session: string) {
  return useQuery({
    queryKey: ["user", "me", session],
    queryFn: () => fetchUserJWT(session),
    enabled: !!session,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UpdateUser) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}

export function useBookmarkPlace() {
  return useMutation({
    mutationFn: ({ placeId, token }: { placeId: number; token: string }) =>
      bookmarkPlace(placeId, token),
  });
}
