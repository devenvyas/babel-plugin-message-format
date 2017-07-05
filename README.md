# babel-plugin-message-format



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-message-format
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["message-format"]
}
```

### Via CLI

```sh
$ babel --plugins message-format script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["message-format"]
});
```
