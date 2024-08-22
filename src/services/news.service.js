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

export {
  createService,
  getAllService,
  ContNewsService,
  getTopNewService,
  getNewsByIdService,
};
