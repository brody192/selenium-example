# This example is to be used with the [Browserless template](https://railway.app/template/browserless)

Create two reference variables on your Railway service that you deploy your app to -

```shell
BROWSER_WEBDRIVER_ENDPOINT=${{Browserless.BROWSER_WEBDRIVER_ENDPOINT}}
BROWSER_TOKEN=${{Browserless.BROWSER_TOKEN}}
```

</br>

Then use `process.env.BROWSER_WEBDRIVER_ENDPOINT` and `process.env.BROWSER_TOKEN` in code

### Before

```javascript
const chromeCapabilities = webdriver.Capabilities.chrome();
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
    .build();
```

### After

```javascript
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
```

The rest of your JS/TS code remains the same with no other changes required.