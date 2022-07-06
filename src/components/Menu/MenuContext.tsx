import React from 'react'
import { MenuMode } from './types'

export interface IMenuContext {
  prefixCls: string,
  onSelect?: (selectedIndex: string) => void,
  selectedIndex?: string,
  defaultOpenIndexes?: string[],
  mode?: MenuMode
}

const MenuContext = React.createContext<IMenuContext>({
  prefixCls: ''
})

export default MenuContext