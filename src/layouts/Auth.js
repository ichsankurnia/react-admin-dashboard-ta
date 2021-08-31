import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "../components/Navbars/AuthNavbar.js";
import AuthFooter from "../components/Footers/AuthFooter.js";

// import routes from "../routes.js";
import Login from "../views/examples/Login.js";
import Register from "../views/examples/Register.js";

class Auth extends React.Component {

	componentDidMount() {
		document.body.classList.add("bg-default");
	}

	componentWillUnmount() {
		document.body.classList.remove("bg-default");
	}


	// MAIN ROUTE
	getRoutes = (routes) => {
		return routes.map((data, key) => {
			if (data.layout === "/auth") {
				return (
					<Route path={data.layout + data.path} component={data.component} key={key}/>
				);
			} else {
				return null;
			}
		});
	};


	render() {
		return (
			<>
				<div className="main-content">
					<AuthNavbar />
					<div className="header bg-gradient-info py-lg-6">
						<Container>
							<div className="header-body text-center mb-6">
								<Row className="justify-content-center">
									<Col lg="5" md="6">
										<h1 className="text-white">Welcome!</h1>
									</Col>
								</Row>
							</div>
						</Container>
						<div className="separator separator-bottom separator-skew zindex-100">
							<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
								<polygon className="fill-default" points="2560 0 2560 100 0 100" />
							</svg>
						</div>
					</div>

					{/* Page content */}
					<Container className="mt--8 pb-5">
						<Row className="justify-content-center">
							<Switch>
								{/* MAIN ROUTE */}
								{/* {this.getRoutes(routes)} */}
								<Route path='/auth/login' component={Login} />
								<Route path='/auth/register' component={Register} />

								<Redirect from="*" to="/auth/login" />
							</Switch>
						</Row>
					</Container>
				</div>
				<AuthFooter />
			</>
		);
	}
}

export default Auth;
