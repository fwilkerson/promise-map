# Keyed Promise.all

Promise.all implementation that takes an object literal

> npm i @aberration/promise-map

Useful for destructuring results, with the build in Promise.all you have to rely on the order the promises
were added to the array. This is problematic if you want to add

```javascript
import { all } from "@aberration/promise-map";

let fetchOptionalResource = false;
let requests = {
  resource: fetch("/resource"),
  optionalResource: fetchOptionalResource ? fetch("/resource") : null
};

const { resource, optionalResource } = await all(requests);
```

## all

Promise.all implementation that takes an object literal instead of
an array. If a value is not Promise like the value is returned.

### Parameters

- `obj` **[Object][3]** The key value pair of promises to be awaited

Returns **[Promise][4]&lt;[Object][3]>**

[1]: #all
[2]: #parameters
[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
