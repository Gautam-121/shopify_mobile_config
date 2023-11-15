import SessionModel from "../models/SessionModels.js";
import StoreModel from "../models/StoreModels.js";

/**
 * @typedef { import("../../_developer/types/2023-07/webhooks.js").APP_UNINSTALLED } webhookTopic
 */

const appUninstallHandler = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  /** @type {webhookTopic} */
  const webhookBody = JSON.parse(webhookRequestBody);

  await StoreModel.update(
    {
      isActive : false
    },
    {
      where : {shop :  shop},
      limit : 1
    }
  )
  await SessionModel.destroy({where : {shop : shop}})
};

export default appUninstallHandler;
