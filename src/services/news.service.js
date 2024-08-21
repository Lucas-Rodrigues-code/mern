import News from "../models/News.js";

function createService(body) {
  return News.create(body);
}

function getAllService() {
  return News.find();
}

export { createService, getAllService };
