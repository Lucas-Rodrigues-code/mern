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

export { createService, getAllService, ContNewsService };
