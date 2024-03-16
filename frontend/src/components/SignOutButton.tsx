import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

const SignOutButton =()=>{
    const queryClient = useQueryClient(); //this is react query hook
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken"); //this invalidates the token after clicking the sign out button
            
            // show toast
            showToast({message: "Signed Out!", type: "SUCCESS"});
        }, onError: (error: Error)=>{
            showToast({message: error.message , type: "ERROR"});
        }
    });

    const handleClick = () =>{
        mutation.mutate(); // this invokes the api client
    }

    return (
        <button onClick={handleClick}
         className="text-blue-600 px-3 fond-bold bg-white hover:bg-gray-100">Sign Out</button>
    );
};

export default SignOutButton;