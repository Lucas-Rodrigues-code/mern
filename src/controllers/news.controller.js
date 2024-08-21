import { getAllService, createService } from "../services/news.service.js";

async function create(req, res) {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send("All fields are required");
    }

    const news = await createService({
      title,
      text,
      banner,
      user: { _id: "66c4aa02b85478d5cc99b767" },
    });

    if (!news) return res.status(400).send("Error creating news");

    res.send({ news });
  } catch (error) {
    console.error(error, "Error creating news");
    res.status(500).send("Internal server error");
  }
}

async function getAll(req, res) {
  try {
    const news = await getAllService();
    if (!news) return res.status(400).send("news not found");

    res.send(news);
  } catch (error) {
    console.error(error, "Error getting news");
    res.status(500).send("Internal server error");
  }
}

export { create, getAll };
