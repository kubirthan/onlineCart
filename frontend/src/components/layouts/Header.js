import { Link } from "react-router-dom";
import Search from "./Search";
import {useSelector} from 'react-redux'
import {DropdownButton, Dropdown, Image} from 'react-bootstrap'

export default function Header() {
  const {isAuthenticated, user} = useSelector(state=> state.authState)
  return (
    <nav className="navbar row">
      <div className='container '>
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to={'/'}>
          <img width="150px" alt="onlinecart logo" src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>

      <div classNameName="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {
          isAuthenticated ? (
            <Dropdown className="d-inline">
              <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
                <figure className="avatar avatar-nav">
                  <Image width="50px" src={user.avatar??'./images/default_avatar.png'}/>
                </figure>
                <span>{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="text-danger">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : 
          <Link to={'/login'} className="btn" id="login_btn">
          Login
        </Link>
        }
       

        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
      </div>
    </nav>
  );
}
