import {
  getAllService,
  createService,
  ContNewsService,
  getTopNewService,
  getNewsByIdService,
  getNewsByTitleService,
  getNewsByUserService,
  updateService,
  deleteNewsService,
} from "../services/news.service.js";

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
      user: req.userId,
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
    let { limit, offset } = req.query;

    limit = parseInt(limit);
    offset = parseInt(offset);

    if (!limit) limit = 10;
    if (!offset) offset = 0;

    const news = await getAllService(limit, offset);

    const total = await ContNewsService();
    const currentUrl = req.baseUrl;
    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous !== null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (!news) return res.status(400).send("news not found");

    res.send({
      total,
      limit,
      offset,
      next: nextUrl,
      previous: previousUrl,
      results: news.map((newsItem) => {
        return {
          id: newsItem._id,
          title: newsItem.title,
          text: newsItem.text,
          banner: newsItem.banner,
          likes: newsItem.likes,
          comments: newsItem.comments,
          name: newsItem.user.name,
          userName: newsItem.user.name,
          userAvatar: newsItem.user.avatar,
        };
      }),
    });
  } catch (error) {
    console.error(error, "Error getting news");
    res.status(500).send("Internal server error");
  }
}

async function topNews(req, res) {
  try {
    const news = await getTopNewService();
    if (!news) return res.status(400).send("top news not found");

    res.send({
      topNew: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.name,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    console.error(error, "Error getting top news");
    res.status(500).send("Internal server error");
  }
}

async function getNewsById(req, res) {
  try {
    const { id } = req.params;

    const news = await getNewsByIdService(id);
    if (!news) return res.status(400).send("News not found");

    res.send({
      topNew: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.name,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    console.error(error, "Error getting by id");
    res.status(500).send("Internal server error");
  }
}

async function getNewsByTitle(req, res) {
  try {
    const { title } = req.query;

    const news = await getNewsByTitleService(title);

    if (!news || news.length === 0)
      return res.status(400).send("News not found");

    res.send({
      results: news.map((newsItem) => {
        return {
          id: newsItem._id,
          title: newsItem.title,
          text: newsItem.text,
          banner: newsItem.banner,
          likes: newsItem.likes,
          comments: newsItem.comments,
          name: newsItem.user.name,
          userName: newsItem.user.name,
          userAvatar: newsItem.user.avatar,
        };
      }),
    });
  } catch (error) {
    console.error(error, "Error getting by title");
    res.status(500).send("Internal server error");
  }
}

async function getNewsByUser(req, res) {
  try {
    const { _id } = req.userId;

    const news = await getNewsByUserService(_id);

    if (!news || news.length === 0)
      return res.status(400).send("News not found");

    res.send({
      results: news.map((newsItem) => {
        return {
          id: newsItem._id,
          title: newsItem.title,
          text: newsItem.text,
          banner: newsItem.banner,
          likes: newsItem.likes,
          comments: newsItem.comments,
          name: newsItem.user.name,
          userName: newsItem.user.name,
          userAvatar: newsItem.user.avatar,
        };
      }),
    });
  } catch (error) {
    console.error(error, "Error getting by user");
    res.status(500).send("Internal server error");
  }
}

async function update(req, res) {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      return res
        .status(400)
        .send({ message: "At least one field is required" });
    }

    const news = await getNewsByIdService(id);

    if (news.user._id.toString() !== req.userId.toString()) {
      return res.status(401).send({ message: "unauthorized" });
    }

    const update = await updateService(id, title, text, banner);
    res.send({ message: "News updated", update });
  } catch (error) {
    console.error(error, "Error getting by user");
    res.status(500).send("Internal server error");
  }
}

async function deleteNews(req, res) {
  try {
    const { id } = req.params;

    const news = await getNewsByIdService(id);
    if (!news) return res.status(400).send({ message: "News not found" });

    if (news.user._id.toString() !== req.userId.toString()) {
      return res.status(401).send({ message: "unauthorized" });
    }

    const deleteNew = await deleteNewsService(id);
    res.send({ message: "News delete", deleteNew });
  } catch (error) {
    console.error(error, "Error delete news");
    res.status(500).send("Internal server error");
  }
}
export {
  create,
  getAll,
  topNews,
  getNewsById,
  getNewsByTitle,
  getNewsByUser,
  update,
  deleteNews,
};
