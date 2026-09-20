const express = require('express');
const {
  getAllNews,
  getTopNews,
  getSingleNews,
  createNews,
  getUserNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/all', getAllNews);
router.get('/top', getTopNews);
router.get('/user', verifyToken, getUserNews);
router.get('/:id', getSingleNews);
router.post('/', verifyToken, createNews);
router.put('/:id', verifyToken, updateNews);
router.delete('/:id', verifyToken, deleteNews);

module.exports = router;