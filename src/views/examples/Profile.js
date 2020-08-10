import React, { useEffect, useState } from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Col,
	DropdownItem,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Label
} from "reactstrap";

// core components
import UserHeader from "../../components/Headers/UserHeader.js";
import noPhoto from "../../assets/img/theme/nophoto.png"

//API
import { getUserById, updateUser, updateProfile, deleteProfilePicture } from "../../api/ApiUsers.js";

function Profile (props) {
	const [dataUser, setDataUser] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState(0)
	const [userImg, setUserImg] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [modalPhoto, setModalPhoto] = useState(false)

	useEffect(() => {
		handleGetDetailUser()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	console.log(dataUser)

	const handleGetDetailUser = async () => {
		try {
			const userId = await JSON.parse(localStorage.getItem('auth')).user_id
			const res = await getUserById(userId)
	
			if(res.data){
				if(res.data.code !== 0){
					alert(res.data.message)
					if(res.data.code === 99){
						localStorage.clear()
						props.history.push('/auth')
					}
				}else{
					setDataUser(res.data.data)
					setUsername(res.data.data.username)
					setPassword(res.data.data.password)
					setName(res.data.data.name)
					setEmail(res.data.data.email)
					setPhone(res.data.data.Profil.phone !== null? res.data.data.Profil.phone : 0)
				}
			}else{
				alert(res.message)
			}
		} catch (error) {
			console.log("Profile :", error.message)
		}
	}

	
	const handleUpdateProfile = async () => {
		const userId = await JSON.parse(localStorage.getItem('auth')).user_id

		const rawBodyUser = {
			"name" : name,
			"username" : username,
			"password" : password,
			"email" : email
		}

		const resUser = await updateUser(userId, rawBodyUser)

		const dataProfle = new FormData()
		dataProfle.append('phone', phone)
		dataProfle.append('user_img', userImg)
		console.log(userImg)

		const resProfile = await updateProfile(userId, dataProfle)

		console.log("Update UserProfile :", resUser, resProfile)

		if(userImg === null){
			handleGetDetailUser()
			setShowModal(!showModal)
		}else{
			window.location.reload()
		}
	}


	const handleUpdateProfilePicture = async () => {
		const userId = await JSON.parse(localStorage.getItem('auth')).user_id

		const data = new FormData()
		data.append('user_img', userImg)

		const res = await updateProfile(userId, data)
		console.log("Update Profile Pictue : ", res)

		window.location.reload()
	}

	const handleDeleteProfilePicture = async (e) => {
		// e.preventDefault()

		const confirm = await window.confirm('are you sure to remove profle picture?')

		if(confirm){
			const userId = await JSON.parse(localStorage.getItem('auth')).user_id
	
			const bodyRaw = {
				"user_id" : userId
			}
	
			const res = await deleteProfilePicture(bodyRaw)
	
			console.log("Delete Profile Pictue : ", res)

			window.location.reload()
		}
	}

	const openOrCloseModal = (e) => {
		e.preventDefault()
		setShowModal(!showModal)
	}

	const openOrCloseModalPhoto = (e) => {
		e.preventDefault()
		setModalPhoto(!modalPhoto)
	}

	return (
		<>
			<UserHeader nameUser={dataUser !== null? dataUser.name : null} onClickEdit={openOrCloseModal} />

			{/* Page content */}
			<Container className="mt--7" fluid>
				<Row>
					<Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
						<Card className="card-profile shadow">
							<Row className="justify-content-center">
								<Col className="order-lg-2" lg="3">
									<div className="card-profile-image">
									<a href={dataUser !== null? dataUser.Profil !== null? dataUser.Profil.user_img : null : null} >
										<img alt="..." className="rounded-circle stretch-img"
											src={dataUser !== null? dataUser.Profil.user_img !== null? dataUser.Profil.user_img : noPhoto : noPhoto} />
									</a>
									</div>
								</Col>
							</Row>
							<CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
								<div className="d-flex justify-content-between">
									<Button className="mr-4" color="info" onClick={openOrCloseModalPhoto} size="sm" >Change Photo</Button>
									<Button className="float-right" color="default" onClick={handleDeleteProfilePicture} size="sm" >Delete Photo</Button>
								</div>
							</CardHeader>
							<CardBody className="pt-0 pt-md-4">
								<Row>
									<div className="col">
										<div className="card-profile-stats d-flex justify-content-center mt-md-5">
											<div>
												<span className="heading">22</span>
												<span className="description">Friends</span>
											</div>
											<div>
												<span className="heading">10</span>
												<span className="description">Photos</span>
											</div>
											<div>
												<span className="heading">89</span>
												<span className="description">Comments</span>
											</div>
										</div>
									</div>
								</Row>
								<div className="text-center">
									<h3>
										{dataUser !== null? dataUser.name : null}
										<span className="font-weight-light">, 27</span>
									</h3>
									<div className="h5 font-weight-300">
										<i className="ni location_pin mr-2" />
										Bucharest, Romania
									</div>
									<div className="h5 mt-4">
									<	i className="ni business_briefcase-24 mr-2" />
										Solution Manager - Creative Tim Officer
									</div>
									<div>
										<i className="ni education_hat mr-2" />
										University of Computer Science
									</div>
									<hr className="my-4" />
									<p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
									<a href="#pablo" onClick={e => e.preventDefault()}>Show more</a>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col className="order-xl-1" xl="8">
						<Card className="bg-secondary shadow">
							<CardHeader className="bg-white border-0">
								<Row className="align-items-center">
									<Col xs="8">
										<h3 className="mb-0">My account</h3>
									</Col>
									<Col className="text-right" xs="4">
										<Button color="primary" href="#pablo" onClick={openOrCloseModal} size="sm">Settings</Button>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Form>
									<h6 className="heading-small text-muted mb-4">User information</h6>
									<div className="pl-lg-4">
										<Row>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-username" >Username</label>
													<Input className="form-control-alternative" type="text" id="input-username" placeholder="Username" readOnly 
													defaultValue={dataUser !== null? dataUser.username : null} />
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-password" >Password</label>
													<Input className="form-control-alternative" type="password" id="input-password" placeholder="jesse@example.com" readOnly
													defaultValue={dataUser !== null? dataUser.password : null} />
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-first-name" >Full name</label>
													<Input className="form-control-alternative" type="text" id="input-first-name" placeholder="First name" readOnly
													defaultValue={dataUser !== null? dataUser.name : null} />
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-email" >Email address</label>
													<Input className="form-control-alternative" type="email" id="input-email" placeholder="jesse@example.com" readOnly
													defaultValue={dataUser !== null? dataUser.email : null} />
												</FormGroup>
											</Col>
										</Row>
									</div>
									
									<hr className="my-4" />
									{/* Address */}
									<h6 className="heading-small text-muted mb-4">Contact information</h6>
									<div className="pl-lg-4">
										<Row>
											<Col md="4">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-phone" >Phone</label>
													<Input className="form-control-alternative" type="number" id="input-phone" placeholder="08123456xxxx" readOnly
													defaultValue={dataUser !== null? dataUser.Profil !== null? dataUser.Profil.phone : null : null} />
												</FormGroup>
											</Col>
											<Col md="8">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-address" >Address</label>
													<Input className="form-control-alternative" type="textarea" id="input-address" placeholder="Home Address" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col lg="4">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-city" >City</label>
													<Input className="form-control-alternative" type="text" id="input-city" placeholder="City" defaultValue="Padang" />
												</FormGroup>
											</Col>
											<Col lg="4">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-country" >Country</label>
													<Input className="form-control-alternative" type="text" id="input-country" placeholder="Country" defaultValue="Indonesia" />
												</FormGroup>
											</Col>
											<Col lg="4">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-country" >Postal code</label>
													<Input className="form-control-alternative" type="number" id="input-postal-code" placeholder="Postal code" />
												</FormGroup>
											</Col>
										</Row>
									</div>

									<hr className="my-4" />
									{/* Description */}
									<h6 className="heading-small text-muted mb-4">About me</h6>
									<div className="pl-lg-4">
									<FormGroup>
										<label>About Me</label>
										<Input rows="4" className="form-control-alternative" type="textarea" placeholder="A few words about you ..."
											defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
										/>
									</FormGroup>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>

			{
				dataUser !== null ?
				<Modal isOpen={showModal}>
					<ModalHeader>Update Profile</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Label>User Authentication</Label>
						</FormGroup>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Label>Username</Label>
									<Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label>Password</Label>
									<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</FormGroup>  
							</Col>
						</Row>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Label>Name</Label>
									<Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label>Email</Label>
									<Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
								</FormGroup>
							</Col>
						</Row>
						<DropdownItem divider />
						<FormGroup>
							<Label>User Profile</Label>
						</FormGroup>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Label>Phone Number</Label>
									<Input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label>Profile Image</Label>
									<Input type="file" onChange={(e) => setUserImg(e.target.files[0])} />
								</FormGroup>
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={handleUpdateProfile}>Save</Button>
						<Button color="secondary" onClick={openOrCloseModal}>Close</Button>
					</ModalFooter>
				</Modal>
				:
				null
			}

			<Modal isOpen={modalPhoto}>
				<ModalHeader>Update Profile Picture</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label>Browse an Image to Upload :</Label>
						<Input type="file" onChange={e => setUserImg(e.target.files[0])} />
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handleUpdateProfilePicture}>Save</Button>
					<Button color="secondary" onClick={openOrCloseModalPhoto}>Cancel</Button>
				</ModalFooter>
			</Modal>
			
		</>
	);
}

export default Profile;
