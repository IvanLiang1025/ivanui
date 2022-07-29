import React from 'react'
import { fireEvent, render } from '../../utils/test-utils'
import Button, { ButtonProps } from './button'

const defaultProps: ButtonProps = {
	btnType: 'default',
}

const disabledProps: ButtonProps = {
	disabled: true,
	onClick: jest.fn(),
}

describe('Button', () => {
	test('Should render default button', () => {
		const wrapper = render(<Button>Default</Button>)
		const element = wrapper.getByText('Default') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('btn')
		expect(element.disabled).toBeFalsy()
	})

	test('Should render large style with lg', () => {
		const wrapper = render(<Button size='lg'>Large</Button>)
		const element = wrapper.getByText('Large')
		expect(element).toHaveClass('btn btn-lg')
	})

	test('Should render a tag when href provided and btnType is link', () => {
		const { container, getByText } = render(
			<Button btnType='link' href='https://www.google.com'>
				Link
			</Button>
		)
		expect(container.querySelector('a')).toBeTruthy()
		expect(getByText('Link')).toHaveClass('btn btn-link')
	})

	test('Should not be clickable with disabled', () => {
		const wrapper = render(<Button {...disabledProps}>disabled</Button>)
		const element = wrapper.getByText('disabled')
		fireEvent.click(element)
		expect(disabledProps.onClick).not.toHaveBeenCalled()
	})
})
