/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.


export type MessageInput = {
  id?: string | null
  content: string
  owner?: string | null
  createdAt?: string | null
  roomId?: string | null
}

export type RoomInput = {
  id?: string | null
  name?: string | null
}

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type CreateMessageMutationVariables = {
  input?: MessageInput | null
}

export type CreateMessageMutation = {
  createMessage: {
    __typename: 'Message'
    id: string
    content: string
    owner: string | null
    createdAt: string | null
    roomId: string | null
  } | null
}

export type CreateRoomMutationVariables = {
  input?: RoomInput | null
}

export type CreateRoomMutation = {
  createRoom: {
    __typename: 'Room'
    id: string
    name: string | null
    messages: {
      __typename: 'MessageConnection'
      nextToken: string | null
    } | null
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type GetRoomQueryVariables = {
  id?: string | null
}

export type GetRoomQuery = {
  getRoom: {
    __typename: 'Room'
    id: string
    name: string | null
    messages: {
      __typename: 'MessageConnection'
      nextToken: string | null
    } | null
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type ListMessagesForRoomQueryVariables = {
  roomId?: string | null
  sortDirection?: ModelSortDirection | null
}

export type ListMessagesForRoomQuery = {
  listMessagesForRoom: {
    __typename: 'MessageConnection'
    items: Array<{
      __typename: 'Message'
      id: string
      content: string
      owner: string | null
      createdAt: string | null
      roomId: string | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListRoomsQueryVariables = {
  limit?: number | null
}

export type ListRoomsQuery = {
  listRooms: {
    __typename: 'RoomConnection'
    items: Array<{
      __typename: 'Room'
      id: string
      name: string | null
      createdAt: string | null
      updatedAt: string | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type OnCreateRoomSubscription = {
  onCreateRoom: {
    __typename: 'Room'
    id: string
    name: string | null
    messages: {
      __typename: 'MessageConnection'
      nextToken: string | null
    } | null
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type OnCreateMessageByRoomIdSubscriptionVariables = {
  roomId?: string | null
}

export type OnCreateMessageByRoomIdSubscription = {
  onCreateMessageByRoomId: {
    __typename: 'Message'
    id: string
    content: string
    owner: string | null
    createdAt: string | null
    roomId: string | null
  } | null
}
