import { amplify } from '../env.json'
import { AmplifyConfiguration } from './types'

const amplifyConfiguration: AmplifyConfiguration = Object.freeze({
  ...amplify,
})

export default amplifyConfiguration
