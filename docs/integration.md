# Franz Recipe Documentation / Overview

A Franz recipe is basically nothing else than a node module and is currently initialized on `dom-ready`. You access all of the [electron](http://electron.atom.io) modules as well.

## Table of Contents
* [Installation](#user-content-installation)
* [Plugin structure](#user-content-recipe-structure)
* [Configuration (package.json)](#user-content-packagejson)
* [Backend (index.js)](#user-content-indexjs)
* [Frontend (webview.js)](#user-content-webviewjs)
* [Icons](#user-content-icons)
* [Debugging](#user-content-debugging)
* [Deployment](#user-content-deployment)

## Installation
1. To install a new integration, download the integration folder e.g `whatsapp`.
2. Open the Franz Plugins folder on your machine:
  * Mac: `~/Library/Application Support/Franz/recipes/dev/`
  * Windows: `%appdata%/Franz/recipes/dev/`
3. Copy the `whatsapp` folder into the plugins directory
4. Reload Franz

## Recipe structure
Every recipe needs a specific file structure in order to be detected as a Franz recipe

* recipes/dev/`[NAME]`/
  * icon.svg
  * icon.png
  * index.js
  * package.json
  * webview.js

### package.json
The package.json is structured like any other node module and allows to completely configure the service.

```json
{
  "id": "tweetdeck",
  "name": "Tweetdeck",
  "version": "1.0.1",
  "description": "Tweetdeck",
  "main": "index.js",
  "author": "Stefan Malzner <stefan@adlk.io>",
  "license": "MIT",
  "config": {
    "serviceURL": "https://tweetdeck.twitter.com/"
  }
}


```

To get more information about all the provided configuration flags, check the [config docs](configuration.md).


### index.js
This is your "backend" code. Right now the options are very limited and most of the services don't need a custom handling here. If your service is relatively straight forward and has a static URL eg. _messenger.com_, _`[TEAMID]`.slack.com_ or _web.skype.com_ all you need to do to return the Franz Class:

```js
// default integration (e.g messenger.com, ...)
module.exports = Franz => Franz;
```

If your service can be hosted on custom servers, you can validate the given URL to detect if it's your server and not e.g. google.com. To enable validation you can override the function `validateServer`
```js
// RocketChat integration
module.exports = Franz => class RocketChat extends Franz {
  async validateUrl(url) {
    try {
      const resp = await window.fetch(`${url}/api/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();

      return Object.hasOwnProperty.call(data, 'version');
    } catch (err) {
      console.error(err);
    }

    return false;
  }
};
```

`validateServer` needs to return a [`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), otherwise validation will fail.

### webview.js
The webview.js is the actual script that will be loaded into the webview. Here you can do whatever you want to do in order perfectly integrate the service into Franz. For convenience, we have provided a very simple set of functions to set unread message badges (`Franz.setBadge()`) and inject CSS files (`Franz.injectCSS()`).


```js
// orat.io integration
module.exports = (Franz) => {
  function getMessages() {
    let direct = 0;
    let indirect = 0;
    const FranzData = document.querySelector('#FranzMessages').dataset;
    if (FranzData) {
      direct = FranzData.direct;
      indirect = FranzData.indirect;
    }

    Franz.setBadge(direct, indirect);
  }

  Franz.loop(getMessages);
}
```

To get more information about the provided functions, check the [API docs](frontend_api.md).

### Icons
In order to show every service icon crystal clear within the Franz UI, we require a .svg and .png in 1024x1024px.

### Debugging
In order to debug your service integration, open Franz and use the shortcut `Cmd/Ctrl+Shift+Ctrl+Alt+Page Up` to open the recipes developer tools.

### Deployment
As of Franz 5, recipes can be deployed globally via our central repository. In order to get your plugin listed, create an [issue](https://github.com/meetfranz/plugins/issues) with the tag `deploy`, link to your repository and write a short description what your recipe does.

We are working on easier ways to make deployment more straightforward.
