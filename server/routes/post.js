import protectRoute from '../middlewares/protectRoute.js'
import {
  deletePost,
  favUnfavPost,
  getPost,
  getUserPosts,
  newPost,
  replyToPost,
  updatePost
} from '../controllers/post.js'
import express from 'express'

const router = express.Router()

router.get('/:id', getPost)
/* router.get('/feed', protectRoute, getFeedPosts) */
router.get('/user/:username', getUserPosts)
router.post('/create', protectRoute, newPost)
router.patch('/:id', protectRoute, updatePost)
router.delete('/delete/:id', protectRoute, deletePost)
router.post('/fav/:id', protectRoute, favUnfavPost)
router.post('/reply/:id', protectRoute, replyToPost)

export default router
