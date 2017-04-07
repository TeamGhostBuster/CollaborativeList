# Chrome Extension Guide

The Google Chrome extension can be accessed via its [Github repository](https://github.com/TeamGhostBuster/ChromeExtension).

## Installation
Development instructions are included in the repository's README and will not be described here.

However, if you wish to use the extension as-is, you must load it as an unpacked extension into Google Chrome. To do so:
1. Open Chrome and go to `chrome://extensions` in the address bar
2. Enable developer mode and load an unpacked extension
3. Select the `/app/` directory

A second option is to load the packaged app into Chrome by dragging and dropping the `app.crx` file directly into the extensions page. It should be noted, however, that upon closing Chrome, the browser may disable the extension for security purposes.

## Usage
To use the extension, make sure you are signed into the correct Google account in your browser, then simply click the icon and select a list. From there, you can choose to either:
- create an article using the current page, which will use the title of the page as the article's title and store the current url, or
- enter your own title and (optional) url, it should be noted that the URL must be a valid https:// url

Upon creation, a default description is added to the article. All fields of an article can be changed later, as with an article created using the CollaborativeLists webpage.
