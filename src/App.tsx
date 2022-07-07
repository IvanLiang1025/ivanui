import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import './App.scss'

library.add(fas)

function App() {
  return (
    <div>
      <header>
        <Menu mode='horizontal' defaultIndex='2'>
          <MenuItem index={'1'}>item 1</MenuItem>
          <MenuItem index={'2'}> item 2</MenuItem>
          <MenuItem index={'3'} disabled> disabled</MenuItem>
          <MenuItem index={'4'}> item 4</MenuItem>
          <SubMenu title='submenu' index='sub'>
            <MenuItem index='sub-1'>sub-1</MenuItem>
            <MenuItem index='sub-2'>sub-2</MenuItem>
            <MenuItem index='sub-3'>sub-3</MenuItem>
          </SubMenu>
        </Menu>

        <ul onSelect={(e) => console.log(e)}>test
          <li value={1}>
            2
          </li>
          <li value={1}>2</li>
        </ul>
        {/* <Button>hello</Button>
      <div style={{margin: '10px'}}>
      <Button size='lg' btnType='primary' disabled>hello</Button>
      </div>
       <Button size='sm'>hello</Button>
      <div>
        <Button btnType='link' onClick={() => console.log("dsdfsdf")}>link button</Button>
      </div>
      <Icon icon='coffee' theme='primary'></Icon> */}
      </header>
    </div>
  );
}

export default App;
