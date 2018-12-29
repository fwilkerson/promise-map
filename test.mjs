import { it, expect, run } from "driven";

import { all } from "./index.mjs";

const sleep = ms => new Promise(res => setTimeout(res, ms));
async function mockFunc(result, ms = 10) {
  await sleep(ms);
  return result;
}

it("should run the map of promises concurrently", async () => {
  let promiseMap = {
    one: mockFunc("one"),
    two: mockFunc("two", 20),
    three: null,
    four: false
  };

  const result = await all(promiseMap);

  expect(result.one).toBe("one");
  expect(result.two).toBe("two");
  expect(result.three).toBe(null);
  expect(result.four).toBe(false);
});

run();
