import pb from "@/services/pocketbase";
import { RegisterFormData } from '@/types/registerFormData';

export async function registerAccount(user: RegisterFormData) {
  try {
    const record = await pb.collection('users').create({
      username: user.username,
      email: user.email,
      password: user.password,
      passwordConfirm: user.confirmPassword,
      nationality: user.nationality,
      dob: user.dateOfBirth,
    });

    return { success: true, record };
  } catch (e: any) {
    console.error("Failed to register form, " , e) 

    return {
      success: false,
      errors: e.data,
    };
  }
}
