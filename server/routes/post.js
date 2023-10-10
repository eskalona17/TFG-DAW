import { deletePost, getAllPosts, getPost, newPost, updatePost } from '../controllers/post.js'
import express from 'express'

const router = express.Router()

router.get('', getAllPosts)
router.post('', newPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

export default router
