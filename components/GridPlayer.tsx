import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playerIdState, playersState } from '../atoms/playersAtom'
import { themeState } from '../atoms/themeAtom'
import { apiKey } from '../lib/apiKey'

// interface GridPlayerProps {
//   name: string
//   id: string
//   photo: string
// }

function GridPlayer() {
  const [results, setResults] = useState<any>([])
  const [thePlayers, setThePlayers] = useRecoilState(playersState)
  const [playerId, setPlayerId] = useRecoilState(playerIdState)
  console.log(playerId)
  const theme = useRecoilValue(themeState)
  // console.log(thePlayers, 'thePlayers')
  const { team } = results
  // console.log(team)
  const isLight = theme === 'light'

  useEffect(() => {
    axios
      .get(`https://api-football-v1.p.rapidapi.com/v3/players/squads`, {
        method: 'GET',
        params: { team: '532' },
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      })
      .then((res) => {
        setResults(res.data.response[0])
        setThePlayers(res.data.response[0].players)
      })
      .catch((err) => console.error(err))
  }, [])
  return (
    <>
      {thePlayers.map((player: any) => (
        <div
          onClick={() => setPlayerId(player?.id)}
          className={`${
            isLight
              ? 'grid cursor-pointer grid-cols-2 place-items-center  rounded-lg border-b-2 py-4 px-5 text-black hover:bg-gray-500 hover:text-white'
              : 'grid cursor-pointer grid-cols-2 place-items-center  rounded-lg border-b-2 py-4 px-5 text-gray-200 hover:bg-gray-400'
          }`}
        >
          <div className="flex items-center space-x-4 ">
            <img
              className="h-10 w-10 rounded-full"
              src={player?.photo}
              alt=""
            />
            <p className="">{player?.name}</p>
          </div>
          <div className="flex items-center">
            <p className="hidden w-36 md:inline lg:w-64">Age: {player?.age}</p>
            <div>
              <p className="w-40">Number: {player?.number}</p>
              <img className="h-10 w-10 rounded-full" src={team?.logo} />
            </div>
          </div>
          <div className="ml-auto flex items-center justify-end md:ml-0">
            <p className="hidden w-40 md:inline">{player?.position}</p>
            <p>{team?.name}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default GridPlayer
