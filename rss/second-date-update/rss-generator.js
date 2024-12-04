const fs = require('fs');
const path = require('path');

function generateRSS(audioFiles) {
    const rssItems = audioFiles.map(file => `
        <item>
            <title>${file.title}</title>
            <link>${file.url}</link>
            <guid>${file.url}</guid>
            <pubDate>${file.date}</pubDate>
        </item>
    `).join('');

    const rssFeed = `
        <?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>Second Date Update Podcast</title>
                <link>https://api.scyted.tv/rss/second-date-update/audio/</link>
                <description>Second Date Update audio episodes.</description>
                ${rssItems}
            </channel>
        </rss>
    `;

    fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssFeed);
    console.log('RSS feed generated!');
}

module.exports = { generateRSS };