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

	if (req.method !== "POST")
		return res.status(405).send("Method Not Allowed");

	const event = req.body;

	if (event.challenge) return res.status(200).send(event.challenge);

	if (event.type === 'page.created') {

		console.log("Page created event detected");

		const pageId = event.entity?.id;

		if (!pageId) {
			console.error("Page ID not found in event data");
			return res.status(400).send("Page ID not found");
		}

		console.log("Page ID:", pageId);

		const pageTitle = generateTitle();

		try {
			const response = await axios.patch(
				`https://api.notion.com/v1/pages/${pageId}`,
				{
					properties: {
						'Invoice Number': {
							title: [
								{
									text: {
										content: pageTitle,
									},
								},
							],
						},
					},
				},
				{ headers: notionHeaders }
			);

			// console.log("Page updated in Notion:", response.data);

			res.status(200).send("Page updated successfully");

		} catch (error) {
			console.error("Error updating page in Notion:", error.response?.data || error.message);
			res.status(500).send("Error updating page in Notion");
		}

	} else {
		res.status(200).send('Unhandled event type');
	}
};
