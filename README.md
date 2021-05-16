# Position Indicator

[![npm version](https://img.shields.io/npm/v/position-indicator.svg?style=flat-square)](https://www.npmjs.com/package/position-indicator)
[![npm downloads](https://img.shields.io/npm/dm/position-indicator.svg?style=flat-square)](https://www.npmjs.com/package/position-indicator)
[![License](https://badgen.net/github/license/kunukn/position-indicator)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/position-indicator)](https://bundlephobia.com/result?p=position-indicator)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/position-indicator)](https://bundlephobia.com/result?p=position-indicator)

## About

Minimal VanillaJS code to know the scroll position of the page with no external dependencies.
<br/>

A position indicator that updates on:

- scroll
- resize
- body height change.<br/>

It has been tested on

- Phones (iOS, Android)
- Tablets (iPadOS, Android)
- Laptops (Mac, Windows)
- Modern browsers

It updates when the devices rotates and if the height changes on interaction.

## Browser Support

| ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.0.0/chrome/chrome_48x48.png) | ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.0.0/safari-ios/safari-ios_48x48.png) | ![Firefox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.0.0/firefox/firefox_48x48.png) |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| 60+                                                                                            | 12+                                                                                                    | 60+                                                                                               |

## Demo

<table style="border-spacing: 16px;border-collapse: separate;">

<tr>
<td>Codesandbox React</td>
<td><img width="24" height="24" src="ui-library-logo/React-logo.svg"/></td>
<td><a href="https://0li7c.csb.app/" target="_blank" rel="noopener noreferrer">View</a></td>
<td><a href="https://codesandbox.io/s/position-indicator-reactjs-0li7c" target="_blank" rel="noopener noreferrer">Edit</a></td>
</tr>

<tr>
<td>Codesandbox Vue</td>
<td><img width="24" height="24" src="ui-library-logo/Vue-logo.svg"/></td>
<td><a href="https://88mtz.csb.app/" target="_blank" rel="noopener noreferrer">View</a></td>
<td><a href="https://codesandbox.io/s/angry-night-88mtz" target="_blank" rel="noopener noreferrer">Edit</a></td>
</tr>

<tr>
<td>Codesandbox Angular</td>
<td><img width="24" height="24" src="ui-library-logo/Angular-logo.svg"/></td>
<td><a href="https://jgm6g.csb.app/" target="_blank" rel="noopener noreferrer">View</a></td>
<td><a href="https://codesandbox.io/s/position-indicator-angular-jgm6g" target="_blank" rel="noopener noreferrer">Edit</a></td>
</tr>

<tr>
<td>Codepen Vue</td>
<td><img width="24" height="24" src="ui-library-logo/Vue-logo.svg"/></td>
<td><a href="https://codepen.io/kunukn/full/wvJGzda" target="_blank" rel="noopener noreferrer">View</a></td>
<td><a href="https://codepen.io/kunukn/pen/wvJGzda" target="_blank" rel="noopener noreferrer">Edit</a></td>
</tr>

</table>

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
yarn add position-indicator

# For npm, use the command below.
npm install position-indicator --save
```

### Usage

```js
import { createPositionIndicator } from 'position-indicator'

let myOnInitCallback = (data) => {}
let myOnUpdateCallback = (data) => {}

// where data is:
let data = {
  position /* value between 0 and 1 */,
  prevPosition /* value between 0 and 1 */,
  hasUpdated /* if position is different from previous event */,
  hasScroll /* true or false */,
  eventType /* scroll, resize, heightChange or init */,
  eventDate /* Date.now() */,
}

let positionIndicator = createPositionIndicator({
  onInit: myOnInitCallback,
  onUpdate: myOnUpdateCallback,
  useResizeListener: true, // optional: default true
  useResizeObserver: true, // optional: default true
})

positionIndicator.init()

// Then later when not used anymore
positionIndicator.destroy()
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/position-indicator"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/position-indicator"></script>

<script>
  // UMD module is exposed through the "positionIndicator" global variable.
  console.log(positionIndicator)
</script>
```

## Explore the dist files

https://unpkg.com/position-indicator/

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).
