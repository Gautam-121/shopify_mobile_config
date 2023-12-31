import StoreModel from "../models/StoreModels.js";

const isShopActive = async (req, res, next) => {

  const { shop, host } = req.query;

  if (!shop) {
    next();
    return;
  }

  const isShopAvaialble = await StoreModel.findOne({where : {shop : shop}})

  if (isShopAvaialble === null || !isShopAvaialble.isActive) {

    if (isShopAvaialble === null) {

      await StoreModel.create({
        shop :  shop ,
        isActive : false
      })

    } else if (!isShopAvaialble.isActive) {

      await StoreModel.update(
        {
          isActive : false
        },
        {
          where : {shop : shop},
          limit : 1
        }
      )
    }
    res.redirect(`/auth?shop=${shop}&host=${host}`);
  } else {
    next();
  }
};

export default isShopActive;
