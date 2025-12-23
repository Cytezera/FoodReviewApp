import { RegisterFormData } from '@/types/registerFormData';
const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function registerAccount(user: RegisterFormData) {
  try {
    const res = await fetch(`${API_URL}/api/users/register`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })

    return { success: true, res};
  } catch (e: any) {
    console.error("Failed to register form, " , e) 

    return {
      success: false,
      errors: e.data,
    };
  }
}
