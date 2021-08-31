import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col
} from "reactstrap";


class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collapseOpen: false,
			logout: false
		};

		this.activeRoute.bind(this);
	}

	// verifies if routeName is the one active (in browser input)
	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
	}

	// toggles collapse between opened and closed (true/false)
	toggleCollapse = () => {
		this.setState({ collapseOpen: !this.state.collapseOpen });
	};

	// closes the collapse
	closeCollapse = () => {
		this.setState({ collapseOpen: false });
	};

	// creates the links that appear in the left menu / Sidebar
	createLinks = (routes) => {
		// return routes.map((prop, key) => {
		return routes.map((data) => {
			return (
				<NavItem key={data.name}>
					<NavLink to={data.layout + data.path} tag={NavLinkRRD} onClick={this.closeCollapse} activeClassName="active">
						<i className={data.icon} />
						{data.name}
					</NavLink>
				</NavItem>
			);
		});
	};


	handleLogout = async () => {
		const confirm = await window.confirm("Are you sure to logout?")

		if(confirm){
			localStorage.clear()

			this.props.history.push('/auth')
		}
	}


	render() {
		// const { routes, logo } = this.props;
		const { logo, userImg } = this.props;
		let navbarBrandProps;

		if (logo && logo.innerLink) {
			navbarBrandProps = {
				to: logo.innerLink,
				tag: Link
			};
		} else if (logo && logo.outterLink) {
			navbarBrandProps = {
				href: logo.outterLink,
				target: "_blank"
			};
		}

		return (
			<Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
				<Container fluid>

					{/* Toggler jika dahsboard dalam phone mode*/}
					<button className="navbar-toggler" type="button" onClick={this.toggleCollapse}>
						<span className="navbar-toggler-icon" />
					</button>
					
					{/* Brand Logo Dashboard*/}
					{logo ? (
						<NavbarBrand className="pt-0" {...navbarBrandProps}>
							<img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc}/>
							<p style={{marginBottom: -25, marginTop: -5, fontWeight: 400, fontStyle: 'italic'}}>Repair Indonesia</p>
						</NavbarBrand>
					) : null}


					{/* User dalam mobile mode*/}
					<Nav className="align-items-center d-md-none">
						
						<UncontrolledDropdown nav>
						{/* Icon bell saat mobile mode */}
							<DropdownToggle nav className="nav-link-icon">
								<i className="ni ni-bell-55" />
							</DropdownToggle>
							{/* Apabila di click icon tsb, muncul menu dropdown dibawah ini */}
							<DropdownMenu
								aria-labelledby="navbar-default_dropdown_1"
								className="dropdown-menu-arrow"
								right
							>
								<DropdownItem>Action</DropdownItem>
								<DropdownItem>Another action</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Something else here</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>

						<UncontrolledDropdown nav>
							{/* Icon User pada Navbar */}
							<DropdownToggle nav>
								<Media className="align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={userImg}/>
									</span>
								</Media>
							</DropdownToggle>
							{/* Apabila Icon User pada navbar di click muncul menu dropdown dibawah ini*/}
							<DropdownMenu className="dropdown-menu-arrow" right>
								<DropdownItem className="noti-title" header tag="div">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</DropdownItem>
								<DropdownItem to="/admin/user-profile" tag={Link}>
									<i className="ni ni-single-02" />
									<span>My profile</span>
								</DropdownItem>
								<DropdownItem to="/admin/user-profile" tag={Link}>
									<i className="ni ni-settings-gear-65" />
									<span>Settings</span>
								</DropdownItem>
								<DropdownItem to="/admin/user-profile" tag={Link}>
									<i className="ni ni-calendar-grid-58" />
									<span>Activity</span>
								</DropdownItem>
								<DropdownItem to="/admin/user-profile" tag={Link}>
									<i className="ni ni-support-16" />
									<span>Support</span>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem href="#pablo" onClick={this.handleLogout}>
									<i className="ni ni-user-run" />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				
					{/* Collapse */}
					<Collapse navbar isOpen={this.state.collapseOpen}>
						{/* Collapse header mode */}
						<div className="navbar-collapse-header d-md-none">
							<Row>
								{logo ? (
									<Col className="collapse-brand" xs="6">
										{logo.innerLink ? 
											(
												<Link to={logo.innerLink}>
													<img alt={logo.imgAlt} src={logo.imgSrc} />
												</Link>
											) : 
											(
												<a href={logo.outterLink}>
													<img alt={logo.imgAlt} src={logo.imgSrc} />
												</a>
											)
										}
									</Col>
								) : null}
								<Col className="collapse-close" xs="6">
									<button
										className="navbar-toggler"
										type="button"
										onClick={this.toggleCollapse}
									>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>

						{/* Form Search untuk mobile mode*/}
						<Form className="mt-4 mb-3 d-md-none">
							<InputGroup className="input-group-rounded input-group-merge">
								<Input
									aria-label="Search"
									className="form-control-rounded form-control-prepended"
									placeholder="Search"
									type="search"
								/>
								<InputGroupAddon addonType="prepend">
								<InputGroupText>
									<span className="fa fa-search" />
								</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</Form>


						{/* Navigation Semua sidebar*/}
						<Nav navbar>
							{this.createLinks(this.props.routes)}

							{/* LOGOUT */}
							<NavItem>
								<NavLink onClick={this.handleLogout} className="text-hover" >
									<i className='ni ni-button-power text-black' />
									Logout
								</NavLink>
							</NavItem>
						</Nav>
						
						{/* Divider */}
						<hr className="my-3" />
					
						{/* Heading */}
						{/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
						{/* Navigation */}
						{/* <Nav className="mb-md-3" navbar>
							<NavItem>
								<NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
									Getting started
									<i className="ni ni-spaceship" />
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
									<i className="ni ni-palette" />
									Foundation
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
									<i className="ni ni-ui-04" />
									Components
								</NavLink>
							</NavItem>
						</Nav> */}
						<Nav className="mb-md-3" navbar>
							<NavItem className="active-pro active">
								<NavLink href="/">
									<i className="ni ni-spaceship" />
									Reload
								</NavLink>
							</NavItem>
						</Nav> 
						
					</Collapse>
				</Container>
			</Navbar>
		);
	}

}

Sidebar.defaultProps = {
	routes: [{}]
};

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired
	})
};

export default Sidebar;
