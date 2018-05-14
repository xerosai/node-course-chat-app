const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

const PORT = process.env.PORT || 3455;
app.listen(PORT, () => {
    console.log(`Started server on PORT: ${PORT}`);
});
