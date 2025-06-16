# Journal Article Creator

A web application that helps users create journal articles following a standard academic structure. The application allows users to fill in various sections of a journal article and export it in multiple formats (PDF, Microsoft Word, or Google Docs).

## Features

- User-friendly interface for creating journal articles
- Standard journal article structure including:
  - Title
  - Authors (with affiliations and emails)
  - Abstract
  - Keywords
  - Introduction
  - Methods
  - Results
  - Discussion
  - Conclusion
  - References
- Export options:
  - PDF
  - Microsoft Word (.docx)
  - Google Docs (coming soon)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd journal-article-creator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Development

To run the application in development mode with auto-reload:
```bash
npm run dev
```

## Usage

1. Fill in the article details in the form
2. Add multiple authors and references as needed
3. Choose your preferred export format
4. Click "Generate Document" to create and download your article

## Technical Details

The application is built using:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- Document Generation:
  - PDF: PDFKit
  - Word: docx
  - Google Docs: googleapis (coming soon)

## Contributing

Feel free to submit issues and enhancement requests! 