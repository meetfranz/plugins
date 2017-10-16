# Backend API

Provides a set of helper functions to integrate the recipe into [Franz](http://meetfranz.com).

## Franz Backend Class Methods
* [validateUrl](#user-content-validateurl)
* [overrideUserAgent](#user-content-overrideuseragent)

## Events
* [webview events](#user-content-events)

### validateUrl(URL)
Validate if the given URL is a valid service instance.  

#### Arguments
1. `string` URL

#### Returns
[`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### Usage

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

### overrideUserAgent()
Validate if the given URL is a valid service instance.  

#### Returns
`Boolean`

#### Usage

```js
// Discord integration
module.exports = Franz => class Discord extends Franz {
  overrideUserAgent() {
    const useragent = window.navigator.userAgent;

    // Quick and dirty hackfix
    const parts = useragent.split('(KHTML, like Gecko)');

    return parts.join('(KHTML, like Gecko) discord/0.0.248').replace('Electron', 'Discord').replace('Franz', 'Discord');
  }
};

```

### Events
Franz recipes can hook into the [electron webview events](https://electron.atom.io/docs/api/webview-tag/#dom-events) to trigger custom functions.

This is necessary for services like TweetDeck where custom URL forwarding is needed during login.

#### Usage
```js
module.exports = Franz => class Tweetdeck extends Franz {
  events = {
    'did-get-redirect-request': '_redirectFix',
  }

  _redirectFix(event) {
    if (event.newURL !== undefined && event.oldURL !== undefined && event.isMainFrame) {
      if (event.isMainFrame) {
        setTimeout(() => this.send('redirect-url', event.newURL), 100);
        event.preventDefault();
      }
    }
  }
};
```
