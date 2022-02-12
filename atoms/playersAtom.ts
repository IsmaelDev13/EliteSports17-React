import { atom } from 'recoil'

export const playersState = atom({
  key: 'playersState',
  default: [],
})

export const playerIdState = atom({
  key: 'playerIdState',
  default: null,
})
