# Frontend API

Provides a set of helper functions to integrate the service into [Franz](http://meetfranz.com).

## Franz Class Methods
* [setBadge](#user-content-setbadge)
* [injectCSS](#user-content-injectcss)
* [loop](#user-content-loop)

### setBadge(directMessages, [indirectMessages])
Sets the unread message badge

#### Arguments
1. `int` directMessages
  * sets the count of direct messages eg. Slack direct mentions, or a message to @channel
2. `int` indirectMessages (optional)
  * Set a badge that defines there are new messages but they do not involve me directly to me eg. in a channel

#### Usage

```js
Franz.setBadge(4, 2);
```

### injectCSS(pathToCssFile)
Injects the contents of one or more CSS files into the current webview

#### Arguments
1. `string` cssFile
  * CSS files that should be injected. This must be an absolute path to the file

#### Usage

```js
const path = require('path');

// inject a single css file
Franz.injectCSS(path.join(__dirname, 'style.css'));

// inject multiple css files
const globalStyles = path.join(__dirname, 'global.css');
const focusModeStyles = path.join(__dirname, 'focusmode.css');

Franz.injectCSS(globalStyles, focusModeStyles);
```

### loop(action)
Runs an action every X milliseconds (Franz default is currently 1s)

#### Arguments
1. `function` action

#### Usage

```js
// slack integration
const path = require('path');

module.exports = (Franz) => {
  const getMessages = () => {
    const directMessages = $('.unread_highlights, .unread_highlight').not('.hidden').length;
    const indirectMessages = $('.unread').length - directMessages;

    Franz.setBadge(directMessages, indirectMessages);
  }

  Franz.loop(getMessages);

  Franz.injectCSS(path.join(__dirname, 'style.css'));
}
```

### onNotiy(fn)
Runs `fn` on every notification created by the service before sending them to the host (Useful if you want to update information of the notification before showing it to the user)

#### Arguments
1. `function` fn

#### Usage

```js
// messenger integration
module.exports = (Franz) => {
  const getMessages = function getMessages() {
    let count = document.querySelectorAll('._5fx8:not(._569x),._1ht3:not(._569x)').length;
    const messageRequestsElement = document.querySelector('._5nxf');
    if (messageRequestsElement) {
      count += parseInt(messageRequestsElement.innerHTML, 10);
    }

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);

  Franz.onNotify(notification => {

    if (typeof notification.title !== 'string') {
      notification.title = ((notification.title.props || {}).content || [])[0] || 'Messenger';
    }

    return notification;

  });
};
```
