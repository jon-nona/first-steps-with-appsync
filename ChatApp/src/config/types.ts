export interface AmplifyConfiguration {
  Auth: {
    identityPoolId: string
    region: string
    userPoolId: string
    userPoolWebClientId: string
    mandatorySignIn: boolean
  }
  Analytics: {
    disabled: boolean
  }
}

export interface Configuration {
  amplify: AmplifyConfiguration
}
