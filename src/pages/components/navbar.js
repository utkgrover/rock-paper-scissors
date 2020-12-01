import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import './navbarStyle.css';
import {Link} from 'react-router-dom';

//change the fonts and make it look better 
function Navbar(props){
    return (
        <Menu mode="horizontal" theme="dark" style={{padding:"10px"}}>
            <MenuItem className='navbar'>
                <Link to='/'>Stone , Paper , Scissors</Link>
            </MenuItem>
            <MenuItem className='navbar' style={{float:"right"}}>
                <Link to='/singleplayer'>singlePlayer</Link>
            </MenuItem>
            <MenuItem className='navbar' style={{float:"right"}}>
                <Link to='/botfight'>botFight</Link>
            </MenuItem>
        </Menu>
    );
}

export default Navbar;