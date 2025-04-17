# Invoice Title Generate

This project is a utility for generating invoice titles using the Notion API. It automates the process of creating consistent and formatted invoice titles based on data retrieved from a Notion database.

## Features

- Connects to the Notion API to fetch data.
- Generates invoice titles based on predefined rules.
- Easy to configure and extend.

## Prerequisites

- Node.js (v14 or higher)
- A Notion API integration token
- Access to a Notion database

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/invoice-title-generate.git
   cd invoice-title-generate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   NOTION_API_TOKEN=your-notion-api-token
   NOTION_DATABASE_ID=your-database-id
   ```

## Usage

1. Run the application:
   ```bash
   npm start
   ```

2. The application will fetch data from the Notion database and generate invoice titles based on the configured logic.

## Configuration

- Modify the logic for generating invoice titles in the `src` directory as needed.
- Update the `.env` file with your Notion API token and database ID.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
