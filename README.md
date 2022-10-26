# Quasar Supabase Vite Starter

Translated the original project to English with the following changes:

1) Use vite instead of Webpack
2) Use Supabase V2 JavaScript client (Released in August and still RC at this time)
3) Added a second Supabase boot file (supabase-monitor) to access the Quasar/vue Router. (Intention is to redirect the PASSWORD_RECOVERY event. Requires further testing.)
4) Added a Change Password item to the Logout menu. (The password can only be changed when the user is logged in.)

## ToDo
1) Improve image loading on the (new) Product page.
2) Add i18-n transations
3) Add Dark-mode switching.
4) Link to or combine with Learn_Quasar project 
https://github.com/paladyne-io/learn_quasar

Comments and suggestions are welcome


## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
