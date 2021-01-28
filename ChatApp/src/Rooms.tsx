import React, { useState, useEffect, useReducer } from 'react'
import { API } from 'aws-amplify'
import { ListItem, Button, Input } from 'react-native-elements'
import { listRooms } from './graphql/queries'
import { createRoom as CreateRoom } from './graphql/mutations'
import { onCreateRoom as OnCreateRoom } from './graphql/subscriptions'
import { RoomsActions, RoomsActionTypes, RoomsState } from './types'
import { FlatList, Text, View } from 'react-native'
import { ListRoomsQuery } from './API'
import { Room } from './types'

interface Props {
  onRoomSelected: (id: string, name: string) => void
}

const initialState: RoomsState = {
  loading: false,
  rooms: [],
}

const reducer = (state: RoomsState, action: RoomsActionTypes) => {
  switch (action.type) {
    case RoomsActions.CreatedRoom:
      return { ...state, rooms: [...state.rooms, action.payload.room] }
    case RoomsActions.SetRooms:
      return { ...state, rooms: action.payload.rooms }
    case RoomsActions.SetLoading:
      return { ...state, loading: action.payload.loading }
    default:
      return state
  }
}

const Rooms: React.FC<Props> = ({ onRoomSelected }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [inputValue, setInputValue] = useState('')
  let subscription: any

  useEffect(() => {
    fetchRooms()
    subscribe()
    return () => subscription.unsubscribe()
  }, [])
  function subscribe() {
    subscription = (API.graphql({
      query: OnCreateRoom,
    }) as any).subscribe({
      next: (roomData: any) => {
        console.log({ roomData })
        dispatch({
          type: RoomsActions.CreatedRoom,
          payload: { room: roomData.value.data.onCreateRoom },
        })
      },
    })
  }

  const fetchRooms = async () => {
    try {
      const roomData = (await API.graphql({
        query: listRooms,
        variables: { limit: 1000 },
      })) as { data: ListRoomsQuery }
      const items = (roomData?.data?.listRooms?.items ?? []) as Room[]
      dispatch({
        type: RoomsActions.SetRooms,
        payload: { rooms: items },
      })
      console.log('roomData: ', roomData)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const createRoom = async () => {
    if (!inputValue) return
    try {
      await API.graphql({
        query: CreateRoom,
        variables: {
          input: {
            name: inputValue,
          },
        },
      })
    } catch (err) {
      console.log('error creating room: ', err)
    }
  }

  return (
    <View>
      <FlatList
        data={state.rooms}
        renderItem={({ item, index, separators }) => (
          <ListItem
            key={index}
            onPress={() => onRoomSelected(item.id, item.name as string)}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
      <Input
        placeholder="Chat Room Name"
        onChangeText={(value) => setInputValue(value)}
      />
      <Button title="Create Room" onPress={createRoom} />
    </View>
  )
}

export default Rooms
