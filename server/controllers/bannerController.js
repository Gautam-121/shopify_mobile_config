import BannerModel from "../models/BannerModel.js";
import {deleteImages , uploadFile} from "../utils/aws-config.js"


export const createBanner = async(req , res)=>{

    try{

    const data = JSON.parse(JSON.stringify(req.body))
    const bannerImg = req.files

    console.log(data)
    console.log(bannerImg)


    if(!bannerImg || bannerImg?.length == 0 || !data.typeBanner || !data.id){
        return res.status(400).json({
            success : false,
            message : "Please Provide All Neccessary Field bannerImage , typeBanner and Id"
        })
    }

    const isBannerExist = await BannerModel.findOne({
        where: {
          id : data.id
        },
    });
    
    if(isBannerExist){
        return res.status(400).json({
          success : false,
          message : `${data.id} is Already Exist`
        })
      }
    
    if(!["Product" , "Category" , "Marketing"].includes(data.typeBanner)){
        return res.status(400).json({
            success : false,
            message : "BannerTypes Only Product , Category , Marketing"
        })
    }

    const uploadAws = await uploadFile(bannerImg[0])
    data.bannerImg = uploadAws

    const banner = await BannerModel.create(data)

    return res.status(200).json({
        success : true,
        message : `${data.typeBanner} creted Successfully`,
        banner
    })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

export const getAllBanner = async(req , res)=>{

    try{

        const banner = await BannerModel.findAll()

        return res.status(200).json({
            success : true,
            message : "Banner Fetch SuccessFully",
            banner
        })

    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

export const updateBanner =  async(req , res)=>{

    try{

        const {id} = req.params

        if(!id) {
            return res.status(400).json({
              success: false,
              message: "Banner_id is Missing",
            });
        }

        const banner = await BannerModel.findOne({
            where:{
                id : id
            }
        })

        if(!banner){
        return res.status(404).json({
          success : false,
          message : "Banner Not Found"
        })
      }
    
        const data = JSON.parse(JSON.stringify(req.body))
        const bannerImg = req.files
    
        if(Object.keys(data).length == 0 && !bannerImg && bannerImg.length == 0){
            return res.status(400).json({
                success : false,
                message : "No field is selected for update"
            })
        }
    
        if(data.typeBanner && !["Product" , "Category" , "Marketing"].includes(data.typeBanner)){
            return res.status(400).json({
                success : false,
                message : "BannerTypes Only Product , Category , Marketing"
            })
        }
    
        if(bannerImg && bannerImg?.length!=0){

        //First Destroy The image in Aws
        // await deleteImages(banner);
        
        //Second Upload The Current Image in Aws
        const uploadAws = await uploadFile(bannerImg[0]);
        data.bannerImg = uploadAws

        }
    
        const [,updateBanner] = await BannerModel.update(
            data,
            {
                where: { id: id },
                returning: true, // Add this to get the updated records
            }, 
        )
    
        return res.status(200).json({
            success : true,
            message : "Banner Update SuccessFully",
            updateBanner
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

export const deleteBanner =  async(req , res)=>{

    try{

    const {id} = req.params

    if(!id) {
        return res.status(400).json({
          success: false,
          message: "Banner_id is Missing",
        });
    }

    const banner = await BannerModel.findOne({where:{id : id}})

    if(!banner){
        return res.status(400).json({
            success : false,
            message : "Banner Not Found"
        })
    }

     await BannerModel.destroy({
        where: { id: id },
    });

    //Destroy Images From the AWS

    return res.status(200).json({
        success : true,
        message : "Banner Deleted Succefully"
    })
     
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}
 