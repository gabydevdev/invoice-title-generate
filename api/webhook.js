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

	console.log("Received event:", event);

	if (event.challenge) return res.status(200).send(event.challenge);

	if (event.type === 'page.created') {

		console.log("Page created event detected");
		console.log("Event data:", event.data);
		console.log("Event data ID:", event.data.id);

		const pageId = event.data.id;
		const pageTitle = generateTitle();
		const notionUrl = `https://api.notion.com/v1/pages`;

		const notionData = {
			parent: { page_id: pageId },
			properties: {
				Name: {
					title: [
						{
							text: {
								content: pageTitle,
							},
						},
					],
				},
			},
		};

		try {
			const response = await axios.post(notionUrl, notionData, {
				headers: notionHeaders,
			});

			console.log("Page created in Notion:", response.data);

			res.status(200).send("Page created successfully");

		} catch (error) {
			console.error("Error creating page in Notion:", error.response.data);
			res.status(500).send("Error creating page in Notion");
		}

	} else {
		res.status(200).send('Unhandled event type');
	}
};
