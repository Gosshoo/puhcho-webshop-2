import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { getToken, clearToken, clearCart } from '../utils';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import './App.css';

class NavigationBar extends React.Component {
  handleSignout = () => {
    clearToken();
    clearCart();
    // redirect home
    this.props.history.push('/');
}

  render() {
      return getToken() !== null ? 
      <AuthNav handleSignout={this.handleSignout} /> : <UnAuthNav />;
  }
};
  
const AuthNav = ({ handleSignout }) => (
    <div>
      <Navbar className="navbar" light expand="md">
        <NavbarBrand href="/" style={{ fontWeight:"bold" }}>Puhcho Toys</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="navbarButtons" to="/checkout">Checkout</NavLink>
            </NavItem>
              <Button className="signoutButton" color="primary" onClick={handleSignout}>Sign out</Button>
          </Nav>
      </Navbar>
    </div>
  )

const UnAuthNav = () => (
<div>
  <Navbar class="navbar" light expand="md">
    <NavbarBrand href="/">Puhcho Toys</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink className="navbarButtons" to="/signin">Sign in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navbarButtons" to="/signup">Sign up</NavLink>
        </NavItem>
      </Nav>
  </Navbar>
</div>
)

export default withRouter(NavigationBar);