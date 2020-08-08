import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<Row className="align-items-center justify-content-xl-between">
					<Col xl="6">
						<div className="copyright text-center text-xl-left text-muted">© 2020{" "}
							<a className="font-weight-bold ml-1" href="https://goes2nobel.com" rel="noopener noreferrer" target="_blank">
								Goes2Nobel
							</a>
						</div>
					</Col>

					<Col xl="6">
						<Nav className="nav-footer justify-content-center justify-content-xl-end">
							<NavItem>
								<NavLink href="https://goes2nobel.com" rel="noopener noreferrer" target="_blank">
									Goes2Nobel
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="https://darkyasha.goes2nobel.com/" rel="noopener noreferrer" target="_blank">
									About Us
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="https://darkyasha.goes2nobel.com/" rel="noopener noreferrer" target="_blank" >
									Blog
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="https://github.com/ichsankurnia/React-Dashboard-Argon-Template/blob/master/LICENSE" rel="noopener noreferrer" target="_blank" >
									MIT License
								</NavLink>
							</NavItem>
						</Nav>
					</Col>
				</Row>
			</footer>
		);
	}
}

export default Footer;
