import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { apiKey } from '../lib/apiKey'
import GridPlayer from './GridPlayer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playersState } from '../atoms/playersAtom'
import { themeState } from '../atoms/themeAtom'

interface PlayersProps {
  id: string
  name: string
  nationality: string
  position: string
  age: string
  photo: string
  number: Number
}
type Theme = string

export const Players = () => {
  const theme = useRecoilValue(themeState)

  const [results, setResults] = useState<any>([])
  const [thePlayers, setThePlayers] = useRecoilState(playersState)
  const { players, team } = results

  useEffect(() => {
    setThePlayers(players)
  }, [])
  useEffect(() => {
    axios
      .get(`https://api-football-v1.p.rapidapi.com/v3/players/squads`, {
        method: 'GET',
        params: { team: '33' },
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      })
      .then((res) => {
        setResults(res.data.response[0])
        console.log(res.data.response[0])
      })
      .catch((err) => console.error(err))
  }, [])
  return (
    <div>
      {theme === 'dark' && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead className="bg-gray-500 uppercase text-white">
              <TableRow>
                <TableCell className="text-gray-300" align="left">
                  Player
                </TableCell>
                <TableCell className="text-gray-300" align="right">
                  Age
                </TableCell>
                <TableCell className="text-gray-300" align="right">
                  Team
                </TableCell>
                <TableCell className="text-gray-300" align="right">
                  Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results &&
                players.map((player: PlayersProps) => (
                  <TableRow
                    key={player.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      className="flex items-center font-bold"
                      component="th"
                      scope="row"
                    >
                      <img
                        loading="lazy"
                        className="left-0 h-16 w-16  rounded-full"
                        src={player.photo}
                        alt=""
                      />
                      <div>
                        {player.name}
                        <p className="text-sm  font-medium text-gray-400">
                          {player.position}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell align="right">{player.age}</TableCell>
                    <TableCell
                      className="flex items-center space-x-2"
                      align="right"
                    >
                      <img
                        loading="lazy"
                        className=" h-12 w-12  rounded-full"
                        src={team.logo}
                      />
                      <p className="hidden border p-2 text-xs text-gray-400 shadow md:flex">
                        {team.name}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:flex" align="right">
                      {player.number}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {theme === 'light' && (
        <TableContainer component={Paper}>
          <Table
            className="bg-gray-400"
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow className="bg-gray-500">
                <TableCell style={{ color: 'white' }} align="left">
                  Player
                </TableCell>
                <TableCell style={{ color: 'white' }} align="right">
                  Age
                </TableCell>
                <TableCell style={{ color: 'white' }} align="right">
                  Team
                </TableCell>
                <TableCell style={{ color: 'white' }} align="right">
                  Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player: PlayersProps) => (
                <TableRow
                  key={player.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    className="flex items-center font-bold"
                    component="th"
                    scope="row"
                  >
                    <img
                      loading="lazy"
                      className="left-0 h-16 w-16  rounded-full"
                      src={player.photo}
                      alt=""
                    />
                    <div>
                      {player.name}
                      <p className="text-sm  font-medium text-gray-400">
                        {player.position}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell align="right">{player.age}</TableCell>
                  <TableCell
                    className="flex items-center space-x-2"
                    align="right"
                  >
                    <img
                      loading="lazy"
                      className=" h-12 w-12  rounded-full"
                      src={team.logo}
                    />
                    <p className="hidden border p-2 text-xs text-gray-400 shadow md:flex">
                      {team.name}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:flex" align="right">
                    {player.number}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
