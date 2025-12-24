export type User = { 
    id: string;
    email: string;
    name: string;
    nationality?: string;
    points: Int16Array;
    dob: Date;

}

export type LoginCredential = { 
    email: string; 
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    refreshToken?: string; 
    user: User;
}

