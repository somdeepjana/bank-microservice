// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-firefox-launcher'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    files:[
      "./src/assets/keycloak.js",
      "./src/assets/env.js",
      "./src/assets/js/headerjs/header_asset.js",
      "./src/assets/js/transferjs/transferAmountServices.js",
      "./src/assets/js/checkBalanceJS/display_accounts_file.js",
      "./src/assets/js/mainPagejs/fetch_account_balance.js",
      "./src/assets/js/ministatementsjs/ministatement_impl.js",
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/capstone-product'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['FirefoxHeadless'],
    customLaunchers: {
      'FirefoxHeadless': {
        base: 'Firefox',
        flags: [
          '-headless',
        ],
      }
    },
    singleRun: true,
    restartOnFileChange: true
  });
};
