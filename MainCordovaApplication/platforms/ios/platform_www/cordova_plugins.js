cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-condo.Condo",
      "file": "plugins/cordova-plugin-condo/www/condo.js",
      "pluginId": "cordova-plugin-condo",
      "clobbers": [
        "cordova.plugins.condo"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-plugin-hidescrollbar.hidescrollbar",
      "file": "plugins/cordova-plugin-hidescrollbar/www/hidescrollbar.js",
      "pluginId": "cordova-plugin-hidescrollbar",
      "clobbers": [
        "plugins.hideScrollbar"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-condo": "0.0.1",
    "cordova-plugin-statusbar": "3.0.0",
    "cordova-plugin-hidescrollbar": "1.0.2",
    "cordova-plugin-device": "2.1.0"
  };
});