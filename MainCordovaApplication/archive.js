const fs = require("fs-extra");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// Определите относительные пути
const outPath = "../../MiniappCity/out";
const wwwPath = "www";
const destinationPath = "../app/src/main/res/raw/www.zip";
const currentDir = __dirname;

async function main() {
  // Копировать все файлы и папки из MiniappCity/out в MainCordovaApplication/www
  fs.copySync(path.join(currentDir, outPath), path.join(currentDir, wwwPath));

  // Удалить все файлы и папки в MainCordovaApplication/www, кроме native_config.json
  const files = fs.readdirSync(path.join(currentDir, wwwPath));
  for (const file of files) {
    if (file !== "native_config.json") {
      fs.removeSync(path.join(currentDir, wwwPath, file));
    }
  }

  // Выполнить команду 'cordova prepare ios'
  await exec("cordova prepare ios", { cwd: currentDir });

  // Создать архив www.zip из папки MainCordovaApplication/www
  await exec(`tar -a -c -f www.zip ${wwwPath}`, { cwd: currentDir });

  // Проверить наличие файла www.zip в текущей директории и, если он существует, переименовать его

  // Переместить www.zip в указанную директорию
  fs.moveSync(
    path.join(currentDir, "www.zip"),
    path.join(currentDir, destinationPath)
  );

  // Вернуться в директорию mobile_cordova_android_application
  process.chdir(path.join(currentDir, "../../"));

  // Переместить www.zip в mobile_cordova_android_application
  fs.moveSync(path.join(currentDir, "www.zip"), "www.zip");

  console.log("Все действия выполнены.");
}

main();
