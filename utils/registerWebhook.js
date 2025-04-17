/// utils/registerWebhook.js

require("dotenv").config();
const axios = require("axios");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2022-06-28";
const DATABASE_ID = process.env.DATABASE_ID;
const WEBHOOK_URL = "https://<your-vercel-app>.vercel.app/api/webhook"; // Reemplaza con tu dominio real

const headers = {
	Authorization: `Bearer ${NOTION_API_KEY}`,
	"Notion-Version": NOTION_VERSION,
	"Content-Type": "application/json",
};

const registerWebhook = async () => {
	try {
		const response = await axios.post(
			"https://api.notion.com/v1/webhooks",
			{
				event: "page.created",
				subscription: {
					type: "database_id",
					id: DATABASE_ID,
				},
				destination: {
					type: "webhook",
					url: WEBHOOK_URL,
				},
			},
			{ headers },
		);

		console.log("Webhook registrado:", response.data);
	} catch (error) {
		console.error(
			"Error al registrar webhook:",
			error.response?.data || error.message,
		);
	}
};

registerWebhook();
