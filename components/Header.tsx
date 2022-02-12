import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { themeState } from '../atoms/themeAtom'
import { MaterialUISwitch } from '../utils/switch'
const label = { inputProps: { 'aria-label': 'Swith Demo' } }

function Header() {
  const { theme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = useRecoilState<any>(themeState)
  useEffect(() => {
    setColorTheme(theme)
  }, [theme])
  return (
    <div className="w-full justify-end bg-gray-300 p-2">
      <MaterialUISwitch
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        {...label}
        defaultChecked
        size="small"
      />
    </div>
  )
}

export default Header
