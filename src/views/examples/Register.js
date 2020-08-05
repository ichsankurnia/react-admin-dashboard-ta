import React from "react";

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

import { getUserById, createNewUser } from "../../api/ApiUsers";


class Register extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			name : "",
			email: "",
			Username: "",
			password: "",
			agree: false,
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
                this.props.history.push('/')
            }
        }else{
            alert(res.message)
        }
	}


	handleRegisterAccount = async () => {
		const bodyRaw = {
			"name" : this.state.name,
			"username" : this.state.username,
			"password" : this.state.password,
			"email" : this.state.email
		}

		const res = await createNewUser(bodyRaw)

		console.log("Register Account : ", res)
		
		if(res.data){
			if(res.data.code !== 0){
				alert(res.data.message)
			}else{
				alert(res.data.message)
				this.props.history.push('/auth/login')
			}
		}else{
			alert(res.message)
		}
	}


	handleCheckBox = () => {
		this.setState({agree: !this.state.agree})
	}

	render() {
		return (
			<>
				<Col lg="6" md="8">
					<Card className="bg-secondary shadow border-0">
						<CardHeader className="bg-transparent pb-5">
							<div className="text-muted text-center mt-2 mb-4">
								<small>Sign up with</small>
							</div>
							<div className="text-center">
								<Button className="btn-neutral btn-icon mr-4" color="default" href="#pablo" onClick={e => e.preventDefault()} >
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
								<small>Or sign up with credentials</small>
							</div>
							<Form role="form">
								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-hat-3" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Name" type="text" onChange={(e) => this.setState({name: e.target.value})} />
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-email-83" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Email" type="email" autoComplete="new-email" onChange={(e) => this.setState({email: e.target.value})}/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-single-02" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Username" type="text" onChange={(e) => this.setState({username: e.target.value})} />
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<InputGroup className="input-group-alternative">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-lock-circle-open" />
											</InputGroupText>
										</InputGroupAddon>
										<Input placeholder="Password" type="password" autoComplete="new-password" onChange={(e) => this.setState({password: e.target.value})} />
									</InputGroup>
								</FormGroup>
								<div className="text-muted font-italic">
									<small> password strength:{" "}<span className="text-success font-weight-700">strong</span></small>
								</div>
								<Row className="my-4">
									<Col xs="12">
										<div className="custom-control custom-control-alternative custom-checkbox">
											<input className="custom-control-input" id="customCheckRegister" type="checkbox" checked={this.state.agree} onChange={this.handleCheckBox} />
											<label className="custom-control-label" htmlFor="customCheckRegister">
												<span className="text-muted">
													I agree with the{" "}
													<a href="#pablo" onClick={e => e.preventDefault()}>
														Privacy Policy
													</a>
												</span>
											</label>
										</div>
									</Col>
								</Row>
								<div className="text-center">
									{
										this.state.agree?
										<Button className="mt-4" color="primary" type="button" onClick={this.handleRegisterAccount}>
											Create account
										</Button> :
										<Button className="mt-4" color="secondary" type="button" onClick={() => alert('Please check agree with the Privacy Policy first!')}>
											You have check agree with the Privacy Policy
										</Button>
									}
								</div>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</>
		);
	}
}

export default Register;
