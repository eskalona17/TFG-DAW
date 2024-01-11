import { getLabels } from '../controllers/label.js'
import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'

const router = express.Router()

router.get('/', protectRoute, getLabels)

export default router
