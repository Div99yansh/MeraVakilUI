import { marked } from 'marked';

// Configure marked for proper rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

export async function downloadAsDocx(content: string, filename: string): Promise<void> {
  // Convert markdown to HTML using marked
  const htmlBody = await marked.parse(content);

  // Create a Blob with the content as HTML that Word can open
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Times New Roman', serif;
          font-size: 12pt;
          line-height: 1.6;
          margin: 1in;
        }
        h1 {
          font-size: 18pt;
          font-weight: bold;
          margin-bottom: 12pt;
          text-align: center;
        }
        h2 {
          font-size: 14pt;
          font-weight: bold;
          margin-top: 18pt;
          margin-bottom: 6pt;
        }
        h3 {
          font-size: 12pt;
          font-weight: bold;
          margin-top: 12pt;
          margin-bottom: 6pt;
        }
        p {
          margin-bottom: 12pt;
          text-align: justify;
        }
        ul, ol {
          margin-bottom: 12pt;
          padding-left: 24pt;
        }
        li {
          margin-bottom: 6pt;
        }
        strong, b {
          font-weight: bold;
        }
        em, i {
          font-style: italic;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 12pt;
        }
        th, td {
          border: 1px solid #000;
          padding: 6pt;
          text-align: left;
        }
        th {
          font-weight: bold;
          background-color: #f0f0f0;
        }
        hr {
          border: none;
          border-top: 1px solid #000;
          margin: 12pt 0;
        }
      </style>
    </head>
    <body>
      ${htmlBody}
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  downloadBlob(blob, `${filename}.doc`);
}

export function downloadAsText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `${filename}.txt`);
}

export async function downloadAsHtml(content: string, filename: string): Promise<void> {
  // Convert markdown to HTML using marked
  const htmlBody = await marked.parse(content);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${filename}</title>
      <style>
        body {
          font-family: 'Times New Roman', serif;
          font-size: 12pt;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        h1, h2, h3 {
          font-weight: bold;
        }
        h1 { font-size: 18pt; }
        h2 { font-size: 14pt; }
        h3 { font-size: 12pt; }
        p { margin-bottom: 12pt; }
        ul, ol { padding-left: 24pt; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; }
      </style>
    </head>
    <body>
      ${htmlBody}
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  downloadBlob(blob, `${filename}.html`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
