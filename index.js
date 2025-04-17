require("dotenv").config();
const axios = require("axios");

const notionApiUrl = "https://api.notion.com/v1/pages";
const notionApiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.DATABASE_ID;

const notionHeaders = {
	Authorization: `Bearer ${notionApiKey}`,
	"Content-Type": "application/json",
	"Notion-Version": "2022-06-28",
};

const generateTitle = (date, id) => `INV-${date}-${id}`;

module.exports = async (req, res) => {
	try {
		const date = new Date().toISOString().split("T")[0];
		const id = Math.floor(Math.random() * 1000);
		const title = generateTitle(date, id);

		const response = await axios.post(
			notionApiUrl,
			{
				parent: { database_id: databaseId },
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

		return res.status(200).json({
			success: true,
			message: "Item creado en Notion",
			data: response.data,
		});
	} catch (error) {
		console.error(
			"Error creando item en Notion:",
			error.response?.data || error.message,
		);
		return res.status(500).json({
			success: false,
			error: error.response?.data || error.message,
		});
	}
};
