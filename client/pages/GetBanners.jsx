import React, { useEffect, useState } from 'react'
import { useDataFetcher } from '../utils/services';

export default function GetBanners() {
const [data, setData] = useState([])
    const getAllBanner = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      };
    
      const [responseBanner, fetchBanner] = useDataFetcher(
        "",
        "/api/getAllBanner",
        getAllBanner
      );
      useEffect(()=>{
        fetchBanner();
        console.log(responseBanner.lenght)
     
      },[])
      useEffect(()=>{
        console.log(responseBanner.length)
        if(responseBanner.length>0)
        setData(responseBanner)
      },[responseBanner])

  return (
    <div>
   {data.map((banner)=>(
    <div><label htmlFor="">{banner.id}</label>
    <img src={banner.bannerImg}/>
    
    </div>
   ))}
    </div>
  )
}
