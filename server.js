const express = require('express');
const cors = require('cors');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const PDFDocument = require('pdfkit');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Function to generate Word document
async function generateWordDocument(data) {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: data.title,
                            bold: true,
                            size: 32
                        })
                    ],
                    alignment: 'center'
                }),
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: data.authors.map(a => `${a.name}${a.affiliation ? ` (${a.affiliation})` : ''}`).join(', '),
                            size: 24
                        })
                    ],
                    alignment: 'center'
                }),
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'Abstract',
                            bold: true,
                            size: 24
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: data.abstract,
                            size: 24
                        })
                    ]
                }),
                // Add other sections similarly
            ]
        }]
    });

    const buffer = await Packer.toBuffer(doc);
    return buffer;
}

// Function to generate PDF document
async function generatePDFDocument(data) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const chunks = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Add content to PDF
        doc.fontSize(24).text(data.title, { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(data.authors.map(a => `${a.name}${a.affiliation ? ` (${a.affiliation})` : ''}`).join(', '), { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text('Abstract', { underline: true });
        doc.fontSize(12).text(data.abstract);
        // Add other sections similarly

        doc.end();
    });
}

// Function to generate Google Doc
async function generateGoogleDoc(data) {
    // This would require setting up Google API credentials
    // For now, we'll return a placeholder
    throw new Error('Google Docs integration not implemented yet');
}

// API endpoint for document generation
app.post('/api/generate-document', async (req, res) => {
    try {
        const { exportFormat, ...data } = req.body;
        let documentBuffer;

        switch (exportFormat) {
            case 'docx':
                documentBuffer = await generateWordDocument(data);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                res.setHeader('Content-Disposition', 'attachment; filename=journal-article.docx');
                break;
            case 'pdf':
                documentBuffer = await generatePDFDocument(data);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=journal-article.pdf');
                break;
            case 'gdoc':
                throw new Error('Google Docs export not implemented yet');
            default:
                throw new Error('Unsupported export format');
        }

        res.send(documentBuffer);
    } catch (error) {
        console.error('Error generating document:', error);
        res.status(500).json({ error: 'Failed to generate document' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 