## Install

1. Pull repo
2. Run `yarn` to install dependencies
3. Run `yarn start` to run local development server

## Build using EAS (expo application service)

https://docs.expo.dev/build/setup/

After you have set up eas-cli
You can build the project with `eas build --profile development --platform android`

You can view the build log on https://expo.dev \
You should have 30 free builds per month.

If you see an error that you do not own this project.
Remove they `extra` key from `app.json`

```json
"extra": {
  "eas": {
    "projectId": "064d5db0-8e08-4802-9be7-bd7e9b1bb603"
  }
}
```

### Local build

You can build it locally (you still need to sign in to EAS i believe) \
`eas build --profile development --platform android --local`
