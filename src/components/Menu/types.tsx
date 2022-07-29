import React from 'react'

export type MenuMode = 'horizontal' | 'vertical'

export interface MenuSharedProps {
	style?: React.CSSProperties
	className?: string
	children?: React.ReactNode
}

export interface MenuProps extends MenuSharedProps {
	// default active menu item
	defaultIndex?: string
	mode?: MenuMode
	onSelect?: (selectedIndex: string) => void
	// default opened submenu indexes
	defaultOpenIndexes?: string[]
}

export interface MenuItemProps extends MenuSharedProps {
	index?: string
	disabled?: boolean
}

export interface SubMenuProps extends MenuSharedProps {
	index?: string
	title: React.ReactNode
	expandIcon?: React.ReactNode
}
