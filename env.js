const yaml = require("js-yaml");

function loadConfigFromEnv() {
  const env = {};
  for (const [envKey, envValue] of Object.entries(process.env)) {
    const keys = envKey.split("_").map((k) => k.toLowerCase());
    if (keys[0] !== "misskey") continue;
    let target = env;
    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        target[key] = envValue;
      }
      if (!(key in target)) {
        target[key] = {};
      }
      target = target[key];
    });
  }
  return env.misskey;
}

const config = loadConfigFromEnv();

console.log(yaml.dump(config));
