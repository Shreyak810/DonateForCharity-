import { useMutation, useQuery } from "react-query";
import { useMatch, useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const {hotelId} = useParams();
    const {showToast} = useAppContext();

    const {data: hotel} = useQuery("fetchMyHotelById", ()=> apiClient.fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId,  //!! this means a check for hotelId. If hotelId has a value this expression returns true, else it will return false
    }
    );

    const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
        onSuccess: ()=>{
            showToast({message: "NGO Saved!", type: "SUCCESS"});
        },
        onError:()=>{
            showToast({message: "Error Saving Hotel", type: "ERROR"});
        }
    })

    const handleSave = (hotelFormData: FormData) =>{
        mutate(hotelFormData);
    }

    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/> //here we have passed a prompt to ManageHotelForm component
}

export default EditHotel;

// In React applications that use the React Router library for routing, the useParams hook is used to access the parameters from the URL.

// When you define routes in React Router, you can specify dynamic segments in the URL path using placeholders. For example:

// jsx
// Copy code
// <Route path="/users/:userId" component={UserDetail} />
// In this route configuration, :userId is a placeholder for the actual user ID that will be part of the URL.

// Now, in the UserDetail component, you can use the useParams hook to access the userId parameter from the URL:

// jsx
// Copy code
// import { useParams } from "react-router-dom";

// function UserDetail() {
//   let { userId } = useParams();

//   return <div>User ID: {userId}</div>;
// }
// So, useParams hook provides a way to extract parameters from the URL in functional components in React Router applications. It returns an object containing key-value pairs where keys are the parameter names defined in the route and values are the actual parameter values from the URL.
