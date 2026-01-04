export async function downloadAsDocx(content: string, filename: string): Promise<void> {
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
        h1, h2, h3 {
          font-weight: bold;
        }
        p {
          margin-bottom: 12pt;
        }
      </style>
    </head>
    <body>
      ${content.replace(/\n/g, '<br>')}
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

export function downloadAsHtml(content: string, filename: string): void {
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
      </style>
    </head>
    <body>
      ${content.replace(/\n/g, '<br>')}
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
