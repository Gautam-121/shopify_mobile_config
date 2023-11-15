import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import useFetch from "../hooks/useFetch";

export default function Banner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState("");
  const [bannerId, setBannerId] = useState("");
  let bannerDetail = {id: bannerId, bannerImg: selectedFile, typeBanner: category};
 const [bannerDetails,setBannerDetails] = useState(new FormData())

 const formData = new FormData()
// formData.append("hi",1)
    // for (const pair of formData.entries()) {
    //   console.log(pair)
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
  const handleBannerUpload = () => {
   // bannerDetail = { id: bannerId, bannerImg: selectedFile, typeBanner: category };

    formData.append('bannerImg', selectedFile)
    formData.append('id',bannerId)
    formData.append('typeBanner', category )

    // formData.bannerImg = selectedFile
    // formData.id = bannerId
    // formData.typeBanner = category

    // console.log(formData.entries())
    console.log(formData)
    setBannerDetails(formData)
    // for (const pair of formData.entries()) {
    //   console.log(pair)
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

   
  };
  const sendDataToBackend = async () => {
    try {
      const formData = new FormData();
     formData.append('bannerImg', selectedFile)
    formData.append('id',bannerId)
    formData.append('typeBanner', category )
  
      const response = await fetch('https://e5d8-106-51-37-219.ngrok-free.app/apps/api/createBanner', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response from server:', responseData);
      } else {
        throw new Error('Failed to send data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Call sendDataToBackend function when submitting the form or whenever you want to send the data


  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();
    const fetchData = async () => {
      setData(["Loading..."]);
      const result = await (await fetch(url, options)).json();
      console.log(result);
      if ("message" in result) {
        setData(result.message);
        console.log(result.message);
      }
    };
    return [data, fetchData];
  };

  
  const postOptions = {
    // headers: {
    //   Accept: "application/json",
    //   'Content-Type': 'multipart/form-data',
    // },
    method: "POST",
    body: bannerDetails,
  };
  const [bannerPost, callBannerPost] = useDataFetcher(
    "",
    "/api/createBanner",
    postOptions
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Add more image types if needed

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please select a valid image file (JPEG, PNG, GIF)");
    }
  };
useEffect(()=>{

  const data = {}

  for (const pair of bannerDetails.entries()) {
      // console.log(pair)
      // console.log(pair[0] + ', ' + pair[1]);
      data[pair[0]] = pair[1]
    }

  if(Object.keys(data).length!=0){
    console.log(data)
    callBannerPost();
  }
},[bannerDetails])
  return (
    <div className={styles.container}>
      <label htmlFor="">Select the type of Banner</label>
      <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
        <option value="">Type of Banner</option>
        <option value="Category">Category</option>
        <option value="Product">Product</option>
        <option value="Marketing">Marketing</option>
      </select>
      <label htmlFor="">Id for the Banner</label>
      <input type="text" onChange={(e) => setBannerId(e.target.value)} />
      <label htmlFor="">Add an image for the Banner</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <label htmlFor="">{errorMessage}</label>
      <button onClick={handleBannerUpload}>Upload</button>
    </div>
  );
}
