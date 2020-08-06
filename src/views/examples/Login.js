import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col
} from "reactstrap";

import { postAuth, getUserById } from "../../api/ApiUsers";


class Login extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			username : "",
			password: ""
		}
	}

	componentDidMount(){
		if(localStorage.getItem('auth') === null){
			localStorage.clear()
		}else{
			this.handleGetUserByID()
		}
	}


	handleGetUserByID = async () => {
		const userId = await JSON.parse(localStorage.getItem('auth')).user_id
		const res = await getUserById(userId)

		console.log("Get User by ID :", res)
        
        if(res.data){
            if(res.data.code !== 0){
                alert(res.data.message)
                if(res.data.code === 99){
					localStorage.clear()
                }
            }else{
				if(!res.data.data.is_admin){
					localStorage.clear()
				}else{
					this.props.history.push('/')
				}
            }
        }else{
            alert(res.message)
        }
	}


	handleLogin = async () => {
		const data = {
			"username" : this.state.username,
			"password" : this.state.password
		}

		const res = await postAuth(data)

		console.log("Auth :", res)

		if(res.data){
			if(res.data.code !== 0){
				alert(res.data.message)
			}else{
				if(res.data.data.is_admin){
					localStorage.setItem('token', res.data.token)
					localStorage.setItem('auth', JSON.stringify(res.data.data))
					this.props.history.push('/')
				}else{
					alert("Only administrator can login and access this site!")
				}
			}
		}else{
			alert(res.message)
		}
	}

	
	render() {
		return (
			<>
				<Col lg="5" md="7">
					<Card className="bg-secondary shadow border-0">
						<CardHeader className="bg-transparent pb-5">
							<div className="text-muted text-center mt-2 mb-3">
								<small>Sign in with</small>
							</div>
							<div className="btn-wrapper text-center">
								<Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={e => e.preventDefault()} >
									<span className="btn-inner--icon">
										<img alt="..." src={require("../../assets/img/icons/common/github.svg")} />
									</span>
									<span className="btn-inner--text">Github</span>
								</Button>
								<Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={e => e.preventDefault()} >
									<span className="btn-inner--icon">
										<img alt="..." src={require("../../assets/img/icons/common/google.svg")} />
									</span>
									<span className="btn-inner--text">Google</span>
								</Button>
							</div>
						</CardHeader>
						<CardBody className="px-lg-5 py-lg-5">
							<div className="text-center text-muted mb-4">
								<small>Or sign in with credentials</small>
							</div>
							<Form role="form">
								<FormGroup className="mb-3">
									<InputGroup className="input-group-alternative">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-single-02" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Username" type="text" autoComplete="new-username" onChange={(e) => this.setState({username: e.target.value})} />
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<InputGroup className="input-group-alternative">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-lock-circle-open" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Password" type="password" autoComplete="new-password" onChange={(e) => this.setState({password: e.target.value})}/>
									</InputGroup>
								</FormGroup>
								<div className="custom-control custom-control-alternative custom-checkbox">
									<input className="custom-control-input" id=" customCheckLogin" type="checkbox"/>
									<label className="custom-control-label" htmlFor=" customCheckLogin">
										<span className="text-muted">Remember me</span>
									</label>
								</div>
								<div className="text-center">
									<Button className="my-4" color="primary" type="button" onClick={this.handleLogin}>
										Sign in
									</Button>
								</div>
							</Form>
						</CardBody>
					</Card>
					<Row className="mt-3">
						<Col xs="6">
							<a className="text-light" href="#pablo" onClick={e => e.preventDefault()}>
								<small>Forgot password?</small>
							</a>
						</Col>
						<Col className="text-right" xs="6">
							<Link className="text-light" to="/auth/register">
								<small>Create new account</small>
							</Link>
						</Col>
					</Row>
				</Col>
			</>
		);
	}
}

export default Login;
