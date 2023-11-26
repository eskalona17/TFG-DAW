import protectRoute from '../middlewares/protectRoute.js'
import {
  deletePost,
  favUnfavPost,
  getFeedPosts,
  getPost,
  getUserPosts,
  newPost,
  replyToPost,
  updatePost,
  searchPosts
} from '../controllers/post.js'
import express from 'express'

const router = express.Router()

router.get('/feed', protectRoute, getFeedPosts)
router.get('/search', protectRoute, searchPosts)
router.get('/:id', protectRoute, getPost)
router.get('/user/:username', protectRoute, getUserPosts)
router.post('/create', protectRoute, newPost)
router.patch('/:id', protectRoute, updatePost)
router.delete('/delete/:id', protectRoute, deletePost)
router.post('/fav/:id', protectRoute, favUnfavPost)
router.post('/reply/:id', protectRoute, replyToPost)

export default router
