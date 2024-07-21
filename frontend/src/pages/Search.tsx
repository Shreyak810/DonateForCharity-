import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client";
import { useState } from "react";
import { HotelSearchResponse } from "../../../backend/src/shared/types";
// import SearchResultsCard from "../components/SearchResultsCard";

const Search = () =>{
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    
    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
    };

    const  {data} = useQuery<HotelSearchResponse>(["searchHotels", searchParams], () =>
      apiClient.searchHotels(searchParams)
    );
    
    if (data) {
        console.log("pagination", data);
      } else {
        // Handle the case when hotelData is not available yet
        console.log("Hotel data is not available yet.");
      }

    // console.log("Hotel data", hotelData);
    // console.log("Hotel data", hotelData?.data);
    // console.log("Hotel data", hotelData);
    // console.log("pagination", hotelData?.pagination);
    // console.log("Total", hotelData?.pagination?.total);

    // const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    //    apiClient.searchHotels(searchParams)
    // );
    
    // console.log("Hotel data", hotelData);
    // console.log("Is hotelData defined?", hotelData !== undefined);
    // console.log("pagination", hotelData?.pagination);
    // console.log("Total", hotelData?.pagination.total);
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    {/* TODO FILTERS */}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                    {/* {hotelData && hotelData.pagination && (
                           <>
                               {hotelData.pagination.total} NGOs found
                               {search.destination ? ` in ${search.destination}` : ""}
                           </>
                       )} */}
                    </span>
                    {/* TODO sort options */}
                </div>
                {/* {hotelData && hotelData.data && hotelData.data.map((hotel) => (
                    <SearchResultsCard key={hotel._id} hotel={hotel} />
                ))} */}
            </div>
        </div>
    );

    // return (
    //     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
    //         <div className="rounded-lg border-slate-300 p-5 h-fit sticky top-10">
    //             <div className="space-y-5">
    //                 <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
    //                     Filter by:
    //                 </h3>
    //                 {/* TODO FILTERS */}
    //             </div>
    //         </div>

    //         <div className="flex flex-col gap-5">
    //             <div className="flex justify-between items-center">
    //                 <span className="text-xl font-bold">
    //                    {/* {hotelData?.pagination.total}  */}
    //                    {/* {search.destination ? ` in ${search.destination}` : ""} */}
    //                 </span>
    //                 {/* TODO sort options */}
    //             </div>
    //             {/* {hotelData && hotelData.data && hotelData.data.map((hotel)=>(
    //                 <SearchResultsCard hotel={hotel}/>
    //             ))} */}
    //         </div>
    //     </div>
    // );
};

export default Search;

// // // const Search = () => {
// // //     const search = useSearchContext();
// // //     const [page, setPage] = useState<number>(1);

// // //     const searchParams = {
// // //         destination: search.destination,
// // //         adultCount: search.adultCount.toString(),
// // //         childCount: search.childCount.toString(),
// // //         page: page.toString(),
// // //     };

// // //     // const { data: hotelData, isLoading, isError } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams));

// // //     const { data: hotelData, isLoading, isError } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams));

// // //     // console.log("isLoading:", isLoading);
// // //     // console.log("isError:", isError);
// // // //     console.log("hotelData:", hotelData);
// // // // console.log("hotelData.pagination:", hotelData?.pagination);
// // // // console.log("hotelData.pagination.total:", hotelData?.pagination?.total);

// // //     return (
// // //         <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
// // //             <div className="rounded-lg border-slate-300 p-5 h-fit sticky top-10">
// // //                 <div className="space-y-5">
// // //                     <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
// // //                         Filter by:
// // //                     </h3>
// // //                     {/* TODO FILTERS */}
// // //                 </div>
// // //             </div>

// // //             <div className="flex flex-col gap-5">
// // //                 {isError && <div>Error fetching data...</div>}
// // //                 {isLoading ? (
// // //                     <div>Loading...</div>
// // //                 ) : (
// // //                     <div className="flex justify-between items-center">
                        
// // //                         <span className="text-xl font-bold">
// // //                         {hotelData?.pagination?.total} NGOs found
// // //                         </span>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Search;

// const Search = () => {
//     const search = useSearchContext();
//     const [page, setPage] = useState<number>(1);
    
//     const searchParams = {
//         destination: search.destination,
//         checkIn: search.checkIn.toISOString(),
//         checkOut: search.checkOut.toISOString(),
//         adultCount: search.adultCount.toString(),
//         childCount: search.childCount.toString(),
//         page: page.toString(),
//     };

//     const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
//         apiClient.searchHotels(searchParams)
//     );

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//             <div className="rounded-lg border-slate-300 p-5 h-fit sticky top-10">
//                 <div className="space-y-5">
//                     <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
//                         Filter by:
//                     </h3>
//                     {/* TODO FILTERS */}
//                 </div>
//             </div>

//             <div className="flex flex-col gap-5">
//                 <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold">
//                        {hotelData && hotelData.pagination && (
//                            <>
//                                {hotelData.pagination.total} NGOs found
//                                {search.destination ? ` in ${search.destination}` : ""}
//                            </>
//                        )}
//                     </span>
//                     {/* TODO sort options */}
//                 </div>
//                 {/* {hotelData && hotelData.data && hotelData.data.map((hotel) => (
//                     <SearchResultsCard key={hotel._id} hotel={hotel} />
//                 ))} */}
//             </div>
//         </div>
//     );
// };

// export default Search;
