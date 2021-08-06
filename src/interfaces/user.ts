export interface User {
    id: number;
    first_name: string;
    last_name: string;
    password?: string;
    email: string;
    bvn: string;
    dob: string;
    created_at: string;
}