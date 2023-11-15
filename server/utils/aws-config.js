import {
    S3Client,
    PutObjectCommand,
    DeleteObjectsCommand,
    HeadObjectCommand,
  } from "@aws-sdk/client-s3";
  
const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: "AKIAY3L35MCRZNIRGT6N",
      secretAccessKey: "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",
    },
});

import aws  from 'aws-sdk'

aws.config.update({
  accessKeyId: "AKIAY3L35MCRZNIRGT6N",
  secretAccessKey: "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",
  region: "ap-south-1"
})

export let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
      // this function will upload file to aws and return the link
      let s3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws

      var uploadParams = {
          ACL: "public-read",
          Bucket: "classroom-training-bucket",  //HERE
          Key: "jyoti/" + file.originalname, //HERE 
          Body: file.buffer
      }


      s3.upload(uploadParams, function (err, data) {
          if (err) {
              return reject({ "error": err })
          }
         console.log(data)
         console.log("file uploaded succesfully")
         return resolve(data.Location)
      })

  })
}
  
export const deleteImages = async (files) => {
    // I got the error Access Denied Please Fixed It First
    const objectsToDelete = files.map((file) => ({
      Key: "jyoti/" + file.bannerImg,
    }));
  
    // Check if each object exists before attempting to delete
    const existingObjects = await Promise.all(
      objectsToDelete.map(async (object) => {
        try {
          // Use headObject to check if the object exists
          await client.send(
            new HeadObjectCommand({
              Bucket: "classroom-training-bucket",
              Key: object.Key,
            })
          );
          return object; // Object exists
        } catch (error) {
          console.error(`Object not found: ${object.Key}`);
          return null; // Object does not exist
        }
      })
    );
  
    // Remove null values (objects that do not exist) from the array
    const objectsToDeleteFiltered = existingObjects.filter(
      (object) => object !== null
    );
  
    if (objectsToDeleteFiltered.length === 0) {
      console.log("No objects found for deletion.");
      return;
    }
  
    const command = new DeleteObjectsCommand({
      Bucket: "classroom-training-bucket",
      Delete: {
        Objects: objectsToDeleteFiltered,
      },
    });
  
    try {
      const { Deleted } = await client.send(command);
      console.log(
        `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`
      );
      console.log(Deleted.map((d) => ` • ${d.Key}`).join("\n"));
    } catch (err) {
      console.error(err);
    }
};
  
  