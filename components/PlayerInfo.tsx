import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { playerIdState } from '../atoms/playersAtom'
import { apiKey } from '../lib/apiKey'

function PlayerInfo() {
  const playerId = useRecoilValue(playerIdState)
  const [playerInfo, setPlayerInfo] = useState<any>([])

  useEffect(() => {
    axios
      .get(`https://api-football-v1.p.rapidapi.com/v3/players`, {
        method: 'GET',
        params: { id: playerId, team: '532', season: '2021' },
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      })
      .then((res) => {
        setPlayerInfo(res.data.response[0].player)
      })
      .catch((err) => console.error(err))
  }, [playerId])
  return (
    <>
      {playerId && (
        <div className="fixed top-0 right-0 hidden flex-col  items-center border bg-gray-300 p-10  text-black shadow transition-transform duration-150 ease-in-out hover:scale-105 md:flex">
          <div className="flex flex-col items-center justify-evenly border-y-2">
            <img
              className="h-40 w-40 rounded-full"
              src={playerInfo?.photo}
              alt=""
            />
            <div className="flex items-start space-x-2 border-b-2">
              <p className="">{playerInfo?.firstname}</p>
              <p>{playerInfo?.lastname}</p>
              <p className="border-l-2 pl-2">{playerInfo?.nationality}</p>
            </div>
            <div className=" flex items-end  space-x-2">
              {playerInfo.height && playerInfo.weight && (
                <>
                  <p>Height: {playerInfo?.height}</p>
                  <p>Weight: {playerInfo?.weight}</p>
                </>
              )}
              {playerInfo?.injured && <p>Injured</p>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PlayerInfo
