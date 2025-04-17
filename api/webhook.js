/// api/webhook.js

const axios = require("axios");
require("dotenv").config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2022-06-28";

const notionHeaders = {
	Authorization: `Bearer ${NOTION_API_KEY}`,
	"Notion-Version": NOTION_VERSION,
	"Content-Type": "application/json",
};

const generateTitle = () => {
	const date = new Date().toISOString().split("T")[0];
	const id = Math.floor(Math.random() * 1000);
	return `INV-${date}-${id}`;
};

module.exports = async (req, res) => {

	console.log(req.body);
	return res.status(200).send(req.body);

	if (req.method !== "POST")
		return res.status(405).send("Method Not Allowed");

	try {
		const { event, data } = req.body;

		if (event !== "page.created") {
			return res.status(200).json({ ignored: true });
		}

		const pageId = data.id;
		const title = generateTitle();

		await axios.patch(
			`https://api.notion.com/v1/pages/${pageId}`,
			{
				properties: {
					Name: {
						title: [
							{
								text: {
									content: title,
								},
							},
						],
					},
				},
			},
			{ headers: notionHeaders },
		);

		res.status(200).json({ success: true, title, pageId });
	} catch (error) {
		console.error(
			"Error handling webhook:",
			error.response?.data || error.message,
		);
		res.status(500).json({ error: error.response?.data || error.message });
	}
};
