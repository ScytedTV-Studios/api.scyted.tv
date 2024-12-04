const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const RSS = require("rss");

const playlistUrl = "https://www.youtube.com/playlist?list=PLKMH9IkVljS73TegxFya_cM4xmjlLOls2";
const audioDir = path.join(__dirname, "audio");
const baseUrl = "https://api.scyted.tv/rss/second-date-update/audio";

// Ensure the audio directory exists
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Download the playlist audio files using yt-dlp
console.log("Downloading audio files...");
try {
    execSync(`yt-dlp -x --audio-format mp3 -o "${audioDir}/%(title)s.%(ext)s" ${playlistUrl}`, {
        stdio: "inherit",
    });
} catch (error) {
    console.error("Error downloading playlist:", error.message);
    process.exit(1);
}

// Generate the RSS feed
console.log("Generating RSS feed...");
const feed = new RSS({
    title: "Second Date Update Podcast",
    description: "Audio from the Second Date Update podcast on YouTube.",
    feed_url: `${baseUrl}/feed.xml`,
    site_url: playlistUrl,
    language: "en",
    pubDate: new Date(),
});

const files = fs.readdirSync(audioDir);
files.forEach((file) => {
    const originalTitle = path.basename(file, path.extname(file));
    const cleanedTitle = originalTitle.replace(/^Second Date Update PODCAST:\s*/, "");
    const fileUrl = `${baseUrl}/${encodeURIComponent(file)}`;

    feed.item({
        title: cleanedTitle,
        description: cleanedTitle,
        url: fileUrl,
        date: new Date(), // Replace with video publish date if available
    });
});

// Write the RSS feed to a file
const rssFilePath = path.join(audioDir, "feed.xml");
fs.writeFileSync(rssFilePath, feed.xml({ indent: true }));

console.log(`RSS feed generated at: ${rssFilePath}`);