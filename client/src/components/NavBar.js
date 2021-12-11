import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
function NavBar() {
  
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">MLBanalytics</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    <NavDropdown title="Head2Head" id="basic-nav-dropdown">
        <NavDropdown.Item href="/Head2Head/Teams">Team Vs. Team</NavDropdown.Item>
        <NavDropdown.Item href="/Head2Head/Players">Pitcher Vs. Batter</NavDropdown.Item>
        <NavDropdown.Item href="/Batters">Batter Vs. Batter</NavDropdown.Item>
        <NavDropdown.Item href="/Pitchers">Pitcher Vs. Pitcher</NavDropdown.Item>
    </NavDropdown>
      <Nav.Link href="/Players">Players Leaderboard</Nav.Link>
      <Nav.Link href="/Teams">Teams Leaderboard</Nav.Link>
      <Nav.Link href="/Matches">Matches</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    )
}

export default NavBar;