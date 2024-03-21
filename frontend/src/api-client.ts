import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {HotelType} from "../../backend/src/shared/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {

const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: "include",  //it tells the browser to set the cookies inclusding all the info of the user
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
});

if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
}

// Assuming the response is JSON
const responseBody = await response.json();
console.log(responseBody);
};

export const signIn = async (formData: SignInFormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include", //this will tell the btowser to send thw http cookis
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)
    })

    const body = await response.json();
    if(!response.ok)
    {
        throw new Error(body.message)
    }
    return body;
};

export const validateToken = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })

    if(!response.ok)
    {
        throw new Error("Token invalid")
    }

    return response.json();
};

export const signOut = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",  
        method: "POST"
    });

    if(!response.ok)
    {
        throw new Error("Error during sign out");
    }
};

export const addMyHotel = async (hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-ngos`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if(!response.ok)
    {
        throw new Error("Failed to add ngo");
    }
    
    return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-ngos`, {
        credentials: "include"
    });

    if(!response.ok)
    {
        throw new Error("Error fetching the NGOs");
    }

    return response.json();
}