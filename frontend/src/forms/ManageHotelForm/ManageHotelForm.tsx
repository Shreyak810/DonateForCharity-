import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type Props = {
    hotel?: HotelType
    onSave: (hotelFormData: FormData)=> void;
    isLoading: boolean;
}

const ManageHotelForm = ({onSave, isLoading, hotel} : Props) => {
    const formMethods = useForm<HotelFormData>();
    const {handleSubmit, reset} = formMethods; //reset is used to reset the form with new data
   
    // whenever this ngo will recieve new data or changes its form, then this useEffect hook is initialized
    useEffect(()=>{
        reset(hotel);
    }, [hotel, reset]);

//     The useEffect hook includes [hotel, reset] as its dependency array. This specifies that the effect should re-run whenever either the hotel object or the reset function changes. This ensures that the form is always in sync with the latest data from the hotel object.
//    In summary, this useEffect hook ensures that whenever the hotel object changes, the form is reset with the new data from the hotel. It helps maintain synchronization between the form and the hotel data.

    const onSubmit = handleSubmit((formDataJson: HotelFormData)=>{
        // create a new FormData object & call out API
        console.log(formDataJson);
        const formData = new FormData();
        if(hotel){
            formData.append("hotelId", hotel._id);
        }

        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index)=>{
            formData.append(`facilities[${index}]`, facility)
        })

        // [image1.jpeg, image1.jpeg, image1.jpeg]
        // imageUrls = [iamge1.jpeg]
        if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((url, index)=>{
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile);
        });

        onSave(formData);
    });
    return (
        <FormProvider {...formMethods}>
           <form className="flex flex-col gap-10" onSubmit={onSubmit}>
              <DetailsSection/>
              <TypeSection/>
              <FacilitiesSection/>
              <GuestsSection/>
              <ImagesSection/>

              <span className="flex justify-end">
                <button
                 disabled={isLoading}
                 type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">
                    {isLoading? "Saving..." : "Save"}
                </button>
              </span>
           </form> 
        </FormProvider>
    );
};

export default ManageHotelForm;