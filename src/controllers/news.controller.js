import {
  getAllService,
  createService,
  ContNewsService,
  getTopNewService,
  getNewsByIdService,
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

export { create, getAll, topNews, getNewsById };
