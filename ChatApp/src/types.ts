export interface Room {
  id: string
  name: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface Message {
  id?: string
  content: string
  owner: string
  createdAt?: string
  roomId: string
}

export interface RoomsState {
  loading: boolean
  rooms: Room[]
}

export enum RoomsActions {
  CreatedRoom = '[rooms] CreatedRoom',
  SetRooms = '[rooms] SetRooms',
  SetLoading = '[rooms] SetLoading',
}

export interface CreatedRoomAction {
  type: typeof RoomsActions.CreatedRoom
  payload: {
    room: Room
  }
}

export interface SetRoomsAction {
  type: typeof RoomsActions.SetRooms
  payload: {
    rooms: Room[]
  }
}

export interface SetLoadingAction {
  type: typeof RoomsActions.SetLoading
  payload: {
    loading: boolean
  }
}

export type RoomsActionTypes =
  | CreatedRoomAction
  | SetRoomsAction
  | SetLoadingAction

export interface MessagesState {
  messages: Message[]
  loading: boolean
}

export enum MessagesActions {
  MessageCreated = '[messages] CreateMessage',
  SetMessages = '[messages] SetMessages',
  SetLoading = '[loading] SetLoading',
}

export interface MessageCreatedAction {
  type: typeof MessagesActions.MessageCreated
  payload: {
    message: Message
  }
}

export interface SetMessagesAction {
  type: typeof MessagesActions.SetMessages
  payload: {
    messages: Message[]
  }
}

export interface SetMessagesLoadingAction {
  type: typeof MessagesActions.SetLoading
  payload: {
    loading: boolean
  }
}

export type MessagesActionTypes =
  | SetMessagesAction
  | MessageCreatedAction
  | SetMessagesLoadingAction

export type RootStackParamList = {
  Rooms: undefined
  Chat: { id: string; name: string }
}
