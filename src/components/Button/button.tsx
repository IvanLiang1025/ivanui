import React from 'react'
import classname from 'classnames'



type ButtonType = 'primary' | 'default' | 'link'
type ButtonSize = 'lg' | 'sm' | 'default'

interface BaseButtonProps {
  btnType?: ButtonType,
  size?: ButtonSize,
  disabled?: boolean,
  className?: string,
  children: React.ReactNode,
}

type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<any>
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<any>

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>


const prefixCls = 'btn'

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    size,
    disabled,
    className,
    children,
    ...restProps
  } = props

  const classes = classname(prefixCls, {
    [`${prefixCls}-${btnType}`]: btnType,
    [`${prefixCls}-${size}`]: size
  }, className)

  const linkBtnProps = restProps as AnchorButtonProps
  if (linkBtnProps.href !== undefined && btnType=== 'link') {
    return (
      <a
        {...linkBtnProps}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      {...(restProps as NativeButtonProps)}
      className={classes} 
      disabled={disabled}
    >{children}</button>
  )
}

Button.defaultProps = {
  disabled: false,
  type: 'button'
}

export default Button