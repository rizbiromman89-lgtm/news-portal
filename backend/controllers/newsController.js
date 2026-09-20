const News = require('../models/News');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate('author', 'name').sort({ createdAt: -1 }).lean();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.getTopNews = async (req, res) => {
  try {
    const topNews = await News.find().sort({ createdAt: -1 }).limit(6).populate('author', 'name').lean();
    res.status(200).json(topNews);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name');
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    const newArticle = await News.create({
      title,
      content,
      category,
      image,
      author: req.user.id,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.getUserNews = async (req, res) => {
  try {
    const userNews = await News.find({ author: req.user.id }).sort({ createdAt: -1 }).lean();
    res.status(200).json(userNews);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'Article not found' });
    if (news.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'Article not found' });
    if (news.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await news.deleteOne();
    res.status(200).json({ status: 'success', message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};