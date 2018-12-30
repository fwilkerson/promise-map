/**
 * Promise.all implementation that takes an object literal instead of
 * an array. If a value is not Promise like the value is returned.
 *
 * @param {Object} obj - The key value pair of promises to be awaited
 * @returns {Promise<Object>}
 */
export function all(obj) {
  return new Promise((resolve, reject) => {
    let result = {},
      keys = Object.keys(obj),
      length = keys.length,
      count = 0;

    function completed(key, data) {
      result[key] = data;
      if (++count >= length) resolve(result);
    }

    while (keys.length > 0) {
      let key = keys.shift();
      if (obj[key] !== null && !!obj[key].then) {
        obj[key].then(data => completed(key, data)).catch(reject);
      } else completed(key, obj[key]);
    }
  });
}

export default { all };
