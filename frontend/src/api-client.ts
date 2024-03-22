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
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-ngos/${hotelId}`, {
        credentials: "include"
    });
    if(!response.ok){
        throw new Error("Error fetching NGOs")
    }

    return response.json();

};

export const updateMyHotelById = async (hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-ngos/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Failed to update NGO");
    }

    return response.json();
};


// A Promise in JavaScript represents a value that may be available now, in the future, or never. It's a way to handle asynchronous operations. Here's what the Promise does in the context of your fetchMyHotelById function:

// Asynchronous Behavior:

// When you make an asynchronous call, such as a network request with fetch, the function returns a Promise. This means the function doesn't immediately return the result. Instead, it returns a promise to supply the result at some point in the future.
// Resolution:

// The Promise can be in one of three states: pending, fulfilled, or rejected.
// If the asynchronous operation is successful, the promise is fulfilled with a value. In your case, when the fetch operation successfully retrieves data, the promise resolves with the hotel/NGO data.
// Handling Asynchronous Results:

// When working with promises, you can use the .then() method to handle the resolved value (in this case, the hotel/NGO data) once it becomes available.
// You can also use .catch() to handle errors if the promise is rejected, such as when there's a network issue or the server returns an error response.