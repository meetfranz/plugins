# Integration Config

A [Franz](http://meetfranz.com) recipe is a node module. In order to learn more about node modules and their configuration check the official [Node.js documentation](https://nodejs.org/api/modules.html) / [npm package.json documentation](https://docs.npmjs.com/files/package.json).

## Table of Contents
* [Config flags](#user-content-config-flags)
* [Examples](#user-content-examples)

## Config flags

`string` **id**<br />
Unique identifier name of the plugin. The name of the plugin folder has to be the same.

`string` **name**<br />
Display name of the service.

`string` **version**<br />
Version number. Will be used for auto updating the integrations. The version number must be in a semver compatible format: `1.0.0`.
**important:** the version will be used to figure out if a new recipe update should be deployed to the user.

`string` **desciption**<br />
Short description about your integration. Will be displayed in a future release.

`string` **main**<br />
The plugins main entry point. In our case `index.js`.

`string` **author**<br />
Author of the integration. Will be displayed in a future release.

`string` **license**<br />
The license of the integration. We prefer MIT, but here is a list of all the available SPDX licenses http://spdx.org/licenses/

`object` **config**<br />
This is the Franz specific integration config.

* `string` **serviceURL**<br/>
Defines the URL that should be loaded into the Franz webview.
<br /><br />
If you want to load a simple URL like `https://www.messenger.com`, you can simply define it via the `serviceURL` parameter. If your service URL is team based, e.g. Slack or HipChat you can use `https://{teamID}.slack.com`.
<br /><br />
If your service works with custom URLs, just leave this empty.
<br /><br />
**Examples**
```json
{
    "serviceURL": "https://www.messenger.com"
}
```
<br />

```json
{
    "serviceURL": "https://{teamID}.slack.com"
}
```
* `boolean` **hasTeamID** _default: true_<br />
Is this a team based service? If true, the interface to add the service will require a team identifier. e.g. `[teamID]`.slack.com
* `boolean` **urlInputSuffix**<br />
This option is only used in combination with `hasTeamId: true` in order to display the value of `urlInputSuffix` after the input for TeamId to make it obvious to the user what input is required from him. Eg. _&lt;TeamID&gt;.hipchat.com_
* `boolean` **hasCustomUrl** _default: false_<br />
On premise services like HipChat, Mattermost, ... require a custom URL. This option enables the user to enter a custom URL when adding the service.
* `boolean` **hasNotificationSound** _default: false_<br />
Some services provide their own notification sound. In order to avoid multiple sounds when the user receives a message set this to `true`. If the service has no built in notification sound set this to `false`.
* `boolean` **hasIndirectMessages** _default: false_<br />
Services like Slack or HipChat have direct messages e.g. a mention or message to every user in a channel (@channel) and indirect messages e.g. general discussion in a channel. If this flag is set to `true`, the user can enable/disable if there should be a badge for indirect messages.
* `string` **message**<br />
Info message that will be displayed in the add/edit service interface.

## Example
### HipChat configuration
```json
{
  "id": "mattermost",
  "name": "Mattermost",
  "version": "1.0.0",
  "description": "Mattermost",
  "main": "index.js",
  "author": "Stefan Malzner <stefan@adlk.io>",
  "license": "MIT",
  "config": {
    "hasNotificationSound": true,
    "hasIndirectMessages": true,
    "hasCustomUrl": true
  }
}
```
