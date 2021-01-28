import { API, Auth } from 'aws-amplify'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { View } from 'react-native'
import { Button, Input, ListItem, Text } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { ListMessagesForRoomQuery } from './API'
import { createMessage as CreateMessage } from './graphql/mutations'
import { listMessagesForRoom as ListMessages } from './graphql/queries'
import { onCreateMessageByRoomId as OnCreateMessage } from './graphql/subscriptions'
import {
  Message,
  MessagesActions,
  MessagesActionTypes,
  MessagesState,
} from './types'

interface Props {
  name: string
  id: string
}

const initialState: MessagesState = {
  messages: [],
  loading: true,
}

const reducer = (state: MessagesState, action: MessagesActionTypes) => {
  switch (action.type) {
    case MessagesActions.MessageCreated:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      }
    case MessagesActions.SetMessages:
      return {
        ...state,
        messages: action.payload.messages,
        loading: false,
      }
    case MessagesActions.SetLoading:
      return {
        ...state,
        loading: action.payload.loading,
      }
    default:
      return state
  }
}

const refScrollToIndex = (ref: any, index: number) => {
  ref.current.scrollToIndex({ animated: true, index: '' + index })
}

const Chat: React.FC<Props> = ({ name, id }) => {
  const flatListRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [user, setUser] = useState<any>(null)
  const [inputValue, setInputValue] = useState('')
  let subscription: any
  let isMounted = true
  useEffect(() => {
    listMessages()
    setUserState()
    subscribe()
    return () => {
      subscription.unsubscribe()
      isMounted = false
    }
  }, [])

  const subscribe = () => {
    subscription = (API.graphql({
      query: OnCreateMessage,
      variables: {
        roomId: id,
      },
    }) as any).subscribe({
      next: async (subscriptionData: any) => {
        const {
          value: {
            data: { onCreateMessageByRoomId },
          },
        } = subscriptionData
        const currentUser = await Auth.currentAuthenticatedUser()
        if (onCreateMessageByRoomId.owner === currentUser.username) return
        dispatch({
          type: MessagesActions.MessageCreated,
          payload: { message: onCreateMessageByRoomId },
        })
        refScrollToIndex(flatListRef, state.messages.length)
      },
    })
  }

  const setUserState = async () => {
    const user = await Auth.currentAuthenticatedUser()
    if (!isMounted) return
    setUser(user)
  }

  const listMessages = async () => {
    try {
      const messageData = (await API.graphql({
        query: ListMessages,
        variables: {
          roomId: id,
          sortDirection: 'ASC',
        },
      })) as { data: ListMessagesForRoomQuery }
      const items = (messageData?.data?.listMessagesForRoom?.items ??
        []) as Message[]

      dispatch({
        type: MessagesActions.SetMessages,
        payload: { messages: items },
      })
      refScrollToIndex(flatListRef, state.messages.length)
    } catch (err) {
      console.log('error fetching messages: ', err)
    }
  }
  const createMessage = async () => {
    if (!inputValue) return
    const message = { owner: user.username, content: inputValue, roomId: id }
    dispatch({ type: MessagesActions.MessageCreated, payload: { message } })
    setInputValue('')
    setTimeout(() => {
      refScrollToIndex(flatListRef, state.messages.length)
    })
    try {
      await API.graphql({
        query: CreateMessage,
        variables: {
          input: message,
        },
      })
      console.log('message created!')
    } catch (err) {
      console.log('error creating message: ', err)
    }
  }

  return (
    <View>
      <Text h1>Room: {name}</Text>
      <FlatList
        ref={flatListRef}
        ListEmptyComponent={() => (
          <View>
            <Text>No Messages Yet</Text>
          </View>
        )}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500))
          wait.then(() => {
            ;(flatListRef.current! as any).scrollToIndex({
              index: info.index,
              animated: true,
            })
          })
        }}
        data={state.messages}
        renderItem={({ item, index, separators }) => (
          <ListItem key={item.id || item.content} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.owner}</ListItem.Title>
              <View>
                <Text>{item.content}</Text>
              </View>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
      <Input
        placeholder="Message"
        onChangeText={(value) => setInputValue(value)}
      />
      <Button title="Create Message" onPress={createMessage} />
    </View>
  )
}

export default Chat
