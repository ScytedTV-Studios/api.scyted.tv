const { execSync } = require('child_process');
const fs = require('fs');
const RSS = require('rss');
const path = require('path');

// Configuration
const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLFPTe1D2YoQMNw4XRt_ogjj6JnsjdzyXh';
const DOWNLOAD_PATH = './downloads';
const AUDIO_URL_BASE = 'https://api.scyted.tv/rss/second-date-update/audio/';
const RSS_FILE_PATH = './rss_feed.xml';

// Function to sanitize filenames
const sanitizeFilename = (filename) => filename.replace(/[<>:"/\\|?*\x00-\x1F]/g, '');

// Step 1: Download audio from playlist
async function downloadPlaylist() {
    console.log('Downloading playlist...');

    try {
        execSync(
            `yt-dlp -i --extract-audio --audio-format mp3 --output "${DOWNLOAD_PATH}/%(title)s.%(ext)s" "${PLAYLIST_URL}"`,
            { stdio: 'inherit' }
        );
        console.log('Download complete.');
    } catch (error) {
        console.error('Error downloading playlist:', error.message);
        process.exit(1);
    }
}

// Step 2: Create RSS feed
async function createRSSFeed() {
    console.log('Creating RSS feed...');

    const feed = new RSS({
        title: 'Second Date Update',
        description: 'A collection of Second Date Update episodes.',
        feed_url: AUDIO_URL_BASE,
        site_url: 'https://api.scyted.tv/rss/second-date-update',
        language: 'en',
    });

    // Read downloaded files
    const files = await fs.readdir(DOWNLOAD_PATH);
    for (const file of files) {
        const filePath = path.join(DOWNLOAD_PATH, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile() && path.extname(file) === '.mp3') {
            const originalName = path.basename(file, '.mp3');
            const title = originalName.replace(/^Second Date Update PODCAST:\s*/, '').trim();

            feed.item({
                title,
                description: title,
                url: `${AUDIO_URL_BASE}${sanitizeFilename(file)}`,
                date: stats.mtime,
            });
        }
    }

    // Write RSS feed to file
    const rssXML = feed.xml({ indent: true });
    await fs.writeFile(RSS_FILE_PATH, rssXML);

    console.log('RSS feed created at:', RSS_FILE_PATH);
}

// Main function
(async () => {
    await fs.ensureDir(DOWNLOAD_PATH);
    await downloadPlaylist();
    await createRSSFeed();
})();
