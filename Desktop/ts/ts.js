const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { employeeId, projectName, date, hoursWorked } = req.body;

    // Read existing data
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data || '[]');
        
        // Add new entry
        jsonData.push({ employeeId, projectName, date, hoursWorked });

        // Write updated data
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

// Endpoint to get all entries
app.get('/entries', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data || '[]'));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
