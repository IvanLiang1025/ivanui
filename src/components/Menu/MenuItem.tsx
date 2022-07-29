import React, { useCallback, useContext } from 'react'
import classname from 'classnames'
import { MenuItemProps } from './types'
import MenuContext from './MenuContext'

const MenuItem: React.FC<MenuItemProps> = (props) => {
	const { className, disabled, children, index } = props

	const { onSelect, selectedIndex, prefixCls } = useContext(MenuContext)

	const classes = classname(`${prefixCls}-item`, className, {
		[`${prefixCls}-item-disabled`]: disabled,
		[`${prefixCls}-item-selected`]: index === selectedIndex,
	})

	const clickHandler = useCallback(() => {
		if (onSelect && typeof index === 'string') {
			onSelect(index)
		}
	}, [index, onSelect])

	return (
		<li className={classes} key={index} onClick={clickHandler}>
			{children}
		</li>
	)
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
