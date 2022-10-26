# Quasar Supabase Vite Starter (quasar-supabase-vite-starter)

Translated the original project to English with the following changes:

1) Use vite instead of Webpack
2) Use Supabase V2 JavaScript client (Released in August and still RC at this time)
3) Added a second Supabase boot file to access the Router (Intention is to redirect the Password reset. Requires further testing)

## ToDo
1) Improve image loading on the (new) Product page.

Comments and suggestions are welcome

Added a Change Password item to the Logout menu - (The password can only be changed when the user is logged in.)

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
