import { Session } from "@shopify/shopify-api";
import Cryptr from "cryptr";
import SessionModel from "../models/SessionModels.js";

const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeSession = async (session) => {
  const [result , created ] = await SessionModel.findOrCreate({
        where: { id: session.id },
        defaults: {
         content : cryption.encrypt(JSON.stringify(session)),
         shop : session.shop,
        }
      })

      if(!created)
      {
         await SessionModel.update(
          {
            content : cryption.encrypt(JSON.stringify(session)),
            shop: session.shop
          },
          {
            where : {id :  session.id},
            limit : 1
          },
          
         )
      }
  return true;
};

const loadSession = async (id) => {

  const sessionResult = await SessionModel.findOne({ where : {id :  id}} )

  if (sessionResult === null) {
    return undefined;
  }
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    const returnSession = new Session(sessionObj);
    return returnSession;
  }
  return undefined;
};

const deleteSession = async (id) => {
  await SessionModel.destroy({where : {id : id}})
  return true;
};

const sessionHandler = { storeSession, loadSession, deleteSession };

export default sessionHandler;
