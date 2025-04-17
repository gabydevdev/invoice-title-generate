require("dotenv").config();
const axios = require("axios");

const notionApiUrl = "https://api.notion.com/v1/pages";
const notionApiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.DATABASE_ID;

const notionHeaders = {
	Authorization: `Bearer ${notionApiKey}`,
	"Content-Type": "application/json",
	"Notion-Version": "2021-05-13", // Notion API version
};

// Function to generate the title based on the date and ID
// This function generates a title in the format "INV-YYYY-MM-DD-ID"
const generateTitle = (date, id) => {
	return `INV-${date}-${id}`;
};

// Create a new item in Notion
const createNotionItem = async () => {
	const date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
	const id = Math.floor(Math.random() * 1000); // Generate a random ID

	const title = generateTitle(date, id);

	const requestBody = {
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
			// Add other properties as needed
			// Example: Amount, Date, etc.
		},
	};

	try {
		const response = await axios.post(notionApiUrl, requestBody, {
			headers: notionHeaders,
		});
		console.log("Item successfully created:", response.data);
	} catch (error) {
		console.error(
			"Error creating item in Notion:",
			error.response ? error.response.data : error.message,
		);
	}
};

// Function to create an item in Notion
createNotionItem();
