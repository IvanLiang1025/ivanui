import React from 'react'
import {render, RenderOptions } from '@testing-library/react'


/**
 * Make a custom render for further development
 */

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
) => render(ui, {...options})

export * from '@testing-library/react'
export {customRender as render}