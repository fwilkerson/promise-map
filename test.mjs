import kleur from "kleur";
import { all } from "./index.mjs";

const encode = JSON.stringify;
const tests = {};

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

const printTestResult = test => err => {
  const txt =
    (err ? kleur.red().bold("✘ ") : kleur.green().bold("✓ ")) +
    test +
    (err ? kleur.red().italic("\n" + err.message) : "");

  console.log(txt);

  if (typeof document !== "undefined") {
    const node = document.createElement("p");
    node.innerText = txt;
    node.setAttribute("class", err ? "failure" : "success");
    document.body.appendChild(node);
  }
};

for (let test in tests) {
  const print = printTestResult(test);

  try {
    const res = tests[test]();
    if (!res) print();
    else res.then(print).catch(print);
  } catch (err) {
    print(err);
  }
}

function it(msg, fn) {
  tests[msg] = fn;
}

function expect(actual) {
  return {
    toBe: expected => {
      if (actual === expected) return;
      const err = errorFactory(expected, actual);
      throw err;
    },
    toEqual: expected => {
      if (encode(actual) == encode(expected)) return;
      const err = errorFactory(expected, actual);
      throw err;
    }
  };
}

function errorFactory(expected, actual) {
  return new Error(
    `    Expected: ${encode(expected)} \n    Actual: ${encode(actual)}`
  );
}

function spy(mockImpl = () => {}) {
  function fn(...args) {
    fn.args = args;
    fn.called = true;
    return mockImpl();
  }

  fn.called = false;
  fn.expectToBeCalledWith = (...args) => {
    for (let i = 0, l = args.length; i < l; i++) {
      expect(args[i]).toBe(fn.args[i]);
    }
  };
  fn.expectToBeCalledExactlyWith = (...args) => expect(args).toBe(fn.args);

  return fn;
}
