import News from "../models/News.js";

function createService(body) {
  return News.create(body);
}

function getAllService(limit, offset) {
  return News.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
}

function ContNewsService() {
  return News.countDocuments();
}

function getTopNewService() {
  return News.findOne().sort({ _id: -1 }).populate("user");
}

function getNewsByIdService(id) {
  return News.findById(id).sort({ _id: -1 }).populate("user");
}

function getNewsByTitleService(title) {
  return News.find({ title: { $regex: title, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");
}

function getNewsByUserService(id) {
  return News.find({ user: id }).sort({ _id: -1 }).populate("user");
}

function updateService(id, title, text, banner) {
  return News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { new: true }
  );
}

function deleteNewsService(id) {
  return News.findByIdAndDelete({ _id: id });
}

function likeNewsService(idNews, userId) {
  return News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createAt: new Date() } } }
  );
}

function deleteLikeNewsService(idNews, userId) {
  return News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { likes: { userId } } }
  );
}

function addCommentService(idNews, comment, userId) {
  let idComment = Math.floor(Date.now() * Math.random()).toString();
  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: { comments: { idComment, userId, comment, createAt: new Date() } },
    }
  );
}

function deleteCommentService(idNews, idComment, userId) {
  return News.findOneAndUpdate(
    {
      _id: idNews,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  );
}
export {
  createService,
  getAllService,
  ContNewsService,
  getTopNewService,
  getNewsByIdService,
  getNewsByTitleService,
  getNewsByUserService,
  updateService,
  deleteNewsService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentService,
  deleteCommentService,
};
