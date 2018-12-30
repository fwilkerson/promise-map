# promise-map

Promise.all implementation that takes an object literal

> npm i @aberration/promise-map

```javascript
const requests = {
  google: fetch("/resource"),
  maybe: false && fetch("/maybe-resource"),
  another: true ? fetch("/conditional-resource") : null
};

const { google, maybe, another } = await all(requests);
```
