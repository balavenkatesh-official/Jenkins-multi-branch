const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Node.js App</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                .card {
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 50px;
                    text-align: center;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                }
                h1 { font-size: 2.5rem; margin-bottom: 10px; }
                p  { font-size: 1.1rem; opacity: 0.9; margin: 8px 0; }
                .badge {
                    display: inline-block;
                    margin-top: 20px;
                    background: rgba(255,255,255,0.25);
                    padding: 8px 20px;
                    border-radius: 50px;
                    font-size: 0.9rem;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>🚀 Hello from Node.js!</h1>
                <p>Your app is running inside a Docker container.</p>
                <p>Port: <strong>${PORT}</strong></p>
                <div class="badge">Node ${process.version}</div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
