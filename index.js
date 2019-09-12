const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
    const link = req.query.link || "www.bbc.com";
    console.log(link);
    let metaTags = [];
    axios.get(link).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        $('meta').each(function() {
            var htmlString = $.html(this);
            metaTags.push(htmlString);
        })
        res.json({ metaTags });
    });
})

if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname, "client","build", "index.html"));
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));;