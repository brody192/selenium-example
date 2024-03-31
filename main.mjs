import webdriver from 'selenium-webdriver';
import express from 'express';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'buffer';

var screenshotsDir = './screenshots';

const app = express();

const filename = 'screenshot.png';

app.use(express.static(screenshotsDir, { index: filename }));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));

const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set('browserless:token', process.env.BROWSER_TOKEN);
// Set args similar to puppeteer's for best performance
chromeCapabilities.set('goog:chromeOptions', {
    args: [
        '--window-size=1920,1080',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-extensions-with-background-pages',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-ipc-flooding-protection',
        '--disable-renderer-backgrounding',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--force-color-profile=srgb',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--headless',
        '--no-sandbox',
    ],
});

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .usingServer(process.env.BROWSER_WEBDRIVER_ENDPOINT)
    .build();

await driver.get('https://example.com/');
const base64png = await driver.takeScreenshot();
await writeFile(path.join(screenshotsDir, filename), Buffer.from(base64png, 'base64'));

driver.quit();