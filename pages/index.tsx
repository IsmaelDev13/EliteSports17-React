import Head from 'next/head'
import { Players } from '../components/TablePlayers'
import Header from '../components/Header'
import { useRecoilValue } from 'recoil'
import { themeState } from '../atoms/themeAtom'
import GridPlayer from '../components/GridPlayer'
import PlayerInfo from '../components/PlayerInfo'

export default function Home() {
  return (
    <div className="flex flex-col font-serif">
      <Head>
        <title>EliteSports - Players</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        {/* <Players /> */}
        <GridPlayer />
        <PlayerInfo />
      </div>
    </div>
  )
}
