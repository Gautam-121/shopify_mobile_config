import { useState } from "react";
import useFetch from "../hooks/useFetch";


 export const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();
  
    const fetchData = async () => {
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log(result)
      if ("serverKey" in result) {
        setData(result.serverKey);
        }
        else if('error' in result){
          let error = (result.error)
          if(error==="Server key not found"){
            setData(error)
          }
      } else if('segments' in result) {
        let dataFromApi = result.segments;
        setData(dataFromApi);
      }
      else if('banner' in result){
        let dataFromApi = result.banner;
        setData(dataFromApi);
      }
    };
    return [data, fetchData];
  };