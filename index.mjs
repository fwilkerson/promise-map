export function all(map) {
  return new Promise((resolve, reject) => {
    let result = {},
      keys = Object.keys(map),
      length = keys.length,
      count = 0;

    function completed(key, data) {
      result[key] = data;
      if (++count >= length) resolve(result);
    }

    while (keys.length > 0) {
      let key = keys.shift();
      if (map[key] !== null && !!map[key].then) {
        map[key].then(data => completed(key, data)).catch(reject);
      } else completed(key, map[key]);
    }
  });
}
