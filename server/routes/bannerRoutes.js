import express from "express"
import verifyRequest from "../middleware/verifyRequest.js"
const router = express.Router()
import multer from "multer"
const upload = multer({dest : "uploads/"})

import {createBanner , getAllBanner , updateBanner , deleteBanner} from "../controllers/bannerController.js"

router.route("/api/createBanner").post(verifyRequest , createBanner)

router.route("/api/getAllBanner").get(getAllBanner)

router.route("/api//updateBanner/:id").put(verifyRequest , updateBanner)

router.route("/api/deleteBanner/:id").delete(verifyRequest , deleteBanner)

export default router