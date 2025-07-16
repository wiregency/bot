import 'reflect-metadata';
import env from "./start/env.js";
import path from "node:path";
import {dirname, importx} from "@discordx/importer";
import {bot} from "./bot.js"

async function run(): Promise<void> {
  
  const modulesPath = path.join(dirname(import.meta.url), "modules");
  await importx(`${modulesPath}/**/events/**/*.js`);
  await importx(`${modulesPath}/**/commands/**/*.js`);

  await bot.login(env.BOT_TOKEN);
}

void run();