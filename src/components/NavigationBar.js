import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../static/images/logo-anchal.png";

function NavigationBar(props) {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(0);
              }}
            >
              Menu
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(1);
              }}
            >
              Event
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(7);
              }}
            >
              Report
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(9);
              }}
            >
              Billing
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
