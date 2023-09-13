const fs = require("fs-extra");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// Определите относительные пути
const outPath = "../../MiniappCity/out";
const wwwPath = "www";
const destinationPath = "../app/src/main/res/raw/www.zip";
const currentDir = __dirname;
const main = async () => {
  try {
    // Удалить все файлы и папки в MainCordovaApplication/www, кроме native_config.json
    const wwwDir = path.join(currentDir, wwwPath);
    const files = fs.readdirSync(wwwDir);
    for (const file of files) {
      if (file !== "native_config.json") {
        const filePath = path.join(wwwDir, file);
        fs.removeSync(filePath);
      }
    }

    // Копировать все файлы и папки из MiniappCity/out в MainCordovaApplication/www
    fs.copySync(path.join(currentDir, outPath), wwwDir);

    await exec("cordova prepare ios", { cwd: currentDir });
    await exec(`tar -a -c -f www.zip ${wwwPath}`, { cwd: currentDir });

    // Переименовать www.zip в указанное имя файла
    fs.renameSync(
      path.join(currentDir, "www.zip"),
      path.join(currentDir, destinationPath)
    );

    // Вернуться в директорию mobile_cordova_android_application
    process.chdir(path.join(currentDir, "../../"));

    console.log("Все действия выполнены.");
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

main();
