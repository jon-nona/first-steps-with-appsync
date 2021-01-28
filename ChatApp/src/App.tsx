import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import React from 'react'
import 'react-native-gesture-handler'
import { config } from './config'
import Rooms from './Rooms'
import Chat from './Chat'
import { RootStackParamList } from './types'
import { StackNavigationProp } from '@react-navigation/stack'

Amplify.configure({
  ...config.amplify,
})

type ChatScreenRouteProps = RouteProp<RootStackParamList, 'Chat'>
export interface ChatScreenProps {
  route: ChatScreenRouteProps
}

declare const global: { HermesInternal: null | {} }

const RoomsScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Rooms'>
}) => {
  const handleRoomSelected = (id: string, name: string) =>
    navigation.navigate('Chat', {
      id,
      name,
    })
  return <Rooms onRoomSelected={handleRoomSelected} />
}
const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { name, id } = route.params
  return <Chat name={name} id={id} />
}
const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Rooms">
        <Stack.Screen name="Rooms" component={RoomsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default withAuthenticator(App, { includeGreetings: true })
