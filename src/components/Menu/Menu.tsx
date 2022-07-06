import React, {useState, useCallback, createContext, useMemo} from 'react'
import classname from 'classnames'
import {MenuProps, MenuItemProps, } from './types'
import MenuContext, {IMenuContext} from './MenuContext'


const prefixCls = 'ivan-menu'


const Menu: React.FC<MenuProps> = (props) => {
  const {className, mode, style, children, onSelect, defaultIndex, defaultOpenIndexes } = props
  const [ currentActiveIndex, setCurrentActiveIndex ]= useState(defaultIndex)

  const classes = classname(`${prefixCls}`, className, {
    [`${prefixCls}-vertical`]: mode === 'vertical',
    [`${prefixCls}-horizontal`]: mode !== 'vertical'
  })

  const selectHandler = useCallback((index: string) => {
    console.log(index)
    setCurrentActiveIndex(index)
    if(onSelect){
      onSelect(index)
    }
  }, [onSelect])

  const menuContextValue : IMenuContext = useMemo(() => {
    return {
      prefixCls: prefixCls,
      onSelect: selectHandler, 
      selectedIndex: currentActiveIndex,
      defaultOpenIndexes,
      mode
    }
  }, [selectHandler, currentActiveIndex])
  
  const renderChilden = () => {
    return React.Children.map(children, (child, index) => {
      const childEle = child as React.FunctionComponentElement<MenuItemProps>
      if(childEle.type.displayName === 'MenuItem' 
        || childEle.type.displayName === 'SubMenu'
      ){
        return React.cloneElement(
          childEle,
        )
      }else {
        throw new Error('Only SubMenu or MenuItem could be used within Menu Component')
      }
    })
  }

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={menuContextValue}>
        {renderChilden()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}

export default Menu


