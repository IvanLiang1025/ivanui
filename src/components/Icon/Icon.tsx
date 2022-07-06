import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classname from 'classnames'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

interface IconProps extends FontAwesomeIconProps{
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  const {className, theme, ...restProps} = props

  const classes = classname('ivan-icon', {
    [`icon-${theme}`]: theme
  }, className)

  return (
    <FontAwesomeIcon className={classes} {...restProps} ></FontAwesomeIcon>
  )
}

export default Icon