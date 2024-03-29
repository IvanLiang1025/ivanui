import React, { useContext, useState, useCallback, useMemo } from 'react'
import classname from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { SubMenuProps } from './types'
import MenuContext from './MenuContext'
import Icon from '../Icon'

const SubMenu: React.FC<SubMenuProps> = (props) => {
	const { className, style, title, index, children, expandIcon } = props
	const { defaultOpenIndexes, prefixCls, onSelect, mode } =
		useContext(MenuContext)

	const isDefaultOpened = useMemo(() => {
		return defaultOpenIndexes && defaultOpenIndexes.length > 0 && index
			? defaultOpenIndexes.includes(index)
			: false
	}, [defaultOpenIndexes, index])

	const [isOpen, setOpen] = useState(isDefaultOpened)

	const classes = classname(`${prefixCls}-submenu`, className)
	const subMenuTitleClass = classname(`${prefixCls}-submenu-title`, {
		[`${prefixCls}-submenu-title-active`]: isOpen,
	})

	const clickHandler = useCallback(() => {
		setOpen(!isOpen)
	}, [setOpen, isOpen])

	let timer: any
	const mouseHandler = useCallback(
		(event: React.MouseEvent, toggle: boolean) => {
			clearTimeout(timer)
			event.preventDefault()
			timer = setTimeout(() => setOpen(toggle), 300)
		},
		[setOpen]
	)

	const verticalEventHandler = useMemo(() => {
		return { onClick: clickHandler }
	}, [clickHandler])

	const horizontalEventHandler = useMemo(() => {
		return {
			onMouseEnter: (event: React.MouseEvent) => mouseHandler(event, true),
			onMouseLeave: (event: React.MouseEvent) => mouseHandler(event, false),
		}
	}, [mouseHandler])

	const renderChildren = () => {
		const subMenuContainerClass =
			mode === 'horizontal'
				? classname(`${prefixCls}-submenu-popup`, {
						[`${prefixCls}-submenu-popup-open`]: isOpen,
				  })
				: ''
		const subMenuClass = classname(
			`${prefixCls}-vertical ${prefixCls} ${prefixCls}-sub`,
			{}
		)

		const childrenComponents = React.Children.map(children, (child, index) => {
			const childEle = child as React.FunctionComponentElement<SubMenuProps>

			if (childEle.type.displayName === 'MenuItem') {
				return React.cloneElement(childEle)
			} else {
				throw new Error('Only MenuItem could be used within SubMenu Component')
			}
		})

		return (
			<CSSTransition
				in={isOpen}
				timeout={500}
				classNames='zoom-in-top'
				unmountOnExit
			>
				<div className={subMenuContainerClass}>
					<ul className={subMenuClass}>{childrenComponents}</ul>
				</div>
			</CSSTransition>
		)
	}

	return (
		<li
			className={classes}
			style={style}
			{...(mode !== 'vertical' ? horizontalEventHandler : {})}
		>
			<div
				className={subMenuTitleClass}
				{...(mode === 'vertical' ? verticalEventHandler : {})}
			>
				{title}
				{expandIcon ? (
					<span className='expand-icon'>{expandIcon}</span>
				) : (
					<Icon icon='angle-down' className='expand-icon'></Icon>
				)}
			</div>
			{renderChildren()}
		</li>
	)
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
