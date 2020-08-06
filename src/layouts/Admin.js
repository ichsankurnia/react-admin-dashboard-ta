import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

import routes from "../routes.js";
import { getUserById } from "../api/ApiUsers.js";

class Admin extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			dataUser : null
		}
	}

	componentDidMount(){
		if(localStorage.getItem('auth') === null){
			this.props.history.push('/auth/login')
		}else{
			this.handleGetUserByID()
		}
	}

	handleGetUserByID = async () => {
		const userId = await JSON.parse(localStorage.getItem('auth')).user_id
		const res = await getUserById(userId)

		console.log("Get User by ID :", res)
		console.log("Profil :", res.data.data.Profil)
        
        if(res.data){
            if(res.data.code !== 0){
                alert(res.data.message)
                if(res.data.code === 99){
					localStorage.clear()
					this.props.history.push('/auth/login')
				}
			}else{
				if(!res.data.data.is_admin){
					alert('You now no longer as admin, please contact the administrator to access this site')
					localStorage.clear()
					this.props.history.push('/auth/login')
				}else{
					this.setState({dataUser: res.data.data})
				}
			}
        }else{
            alert(res.message)
        }
	}

	componentDidUpdate(e) {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.mainContent.scrollTop = 0;
	}

	// MAIN ROUTE
	getRoutes = (routes) => {
		return routes.map((data, key) => {
			if (data.layout === "/admin") {
				return (
					<Route path={data.layout + data.path} component={data.component} key={key} />
				);
			} else {
				return null;
			}
		});
	}

	getNavTitle = () => {
		const locatPath = this.props.location.pathname
		console.log("path :", locatPath)
		
		for (let i = 0; i < routes.length; i++) {
			if ( locatPath.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return "Brand";
	};

	
	render() {
		const {dataUser} = this.state
		return (
			<>
				<Sidebar {...this.props} routes={routes}
					logo={{
						innerLink: "/admin/index",
						imgSrc: require("./../assets/img/brand/argon-react.png"),
						imgAlt: "..."
					}}
				/>
				<div className="main-content" ref="mainContent">
					{
						dataUser !== null ?
							<AdminNavbar {...this.props}
								navTitle={this.getNavTitle()} nameUser={dataUser.name} imgUser={dataUser.Profil !== null? dataUser.Profil.user_img : require('../assets/img/theme/sketch.jpg')}
							/> : 
							<AdminNavbar {...this.props}
								navTitle={this.getNavTitle()} nameUser="User" imgUser={require('../assets/img/theme/team-3-800x800.jpg')}
							/>
						}
					<Switch>
						{/* MAIN ROUTE */}
						{this.getRoutes(routes)}
						<Redirect from="*" to="/admin/index" />
					</Switch>
					<Container fluid>
						<AdminFooter />
					</Container>
				</div>
			</>
		);
	}
}

export default Admin;
