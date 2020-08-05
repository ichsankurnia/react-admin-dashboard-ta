import React from "react";
import { Container, Row, Button, Modal,
	Card,
	CardHeader,
	CardFooter,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Pagination,
	PaginationItem,
	PaginationLink,
	Table,
	ModalBody,
	ModalHeader,
	ModalFooter,
	FormGroup,
	Input,
	Label,  
} from "reactstrap";

import Header from "../components/Headers/Header";

import { 
    getAllUser,
    createNewUser,
    updateAsAdmin,
    deleteUser
} from "../api/ApiUsers";


// Table Row
const TableRow = (props) => {
	return(
		<tr>
			<th scope="row">{props.getData.user_id}</th>
			<th>{props.getData.name}</th>
            <td>{props.getData.username}</td>
            <td style={{width: '15%'}}><Input type="password" defaultValue={props.getData.password} readOnly /></td>
			<td>{props.getData.email}</td>
            <td>
                <span style={{marginLeft: '25%'}} className={props.getData.is_login? "ni ni-user-run text-black" : "ni ni-fat-remove text-black"} />
            </td>
            <td>
                <span style={{marginLeft: '30%'}} className={props.getData.is_admin? "ni ni-single-02 text-black" : "ni ni-fat-remove text-black"} />
            </td>
			<td className="text-right">
				<UncontrolledDropdown>
					<DropdownToggle className="btn-icon-only text-light" href="#pablo" role="button" size="sm" color="" onClick={e => e.preventDefault()}>
						<i className="fas fa-ellipsis-v" />
					</DropdownToggle>
					<DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem className="text-hover" onClick={() => props.onClickUpdate(props.getData.user_id)}>
                            {props.getData.is_admin? "Remove this user from admin" : "Change this user to admin"}
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="text-hover" onClick={() => props.onClickDelete(props.getData.user_id)}>
                            Delete User
                        </DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</td>
		</tr>
	)
}



class Users extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showModalAddUser : false,

            dataUser: [],
            name: "",
            username: "",
            password: "",
            email: "",
        }
    }

    componentDidMount(){
        this.handleGetAllUser()
    }

    handleGetAllUser = async () => {
        const res = await getAllUser()
        
        console.log("Get All User :", res)
        
        if(res.data){
            if(res.data.code !== 0){
                alert(res.data.message)
                if(res.data.code === 99){
                    localStorage.clear()
                }
            }else{
                this.setState({dataUser : res.data.data})
            }
        }else{
            alert(res.message)
        }
    }


    handleCreateUser = async () => {
        this.setState({showModalAddUser: true})
    }


    handleSaveUser = async () => {
        const bodyRaw = {
            "name" : this.state.name,
            "username" : this.state.username,
            "password" : this.state.password,
            "email" : this.state.email   
        }

        const res = await createNewUser(bodyRaw)

        if(!res.data){
            alert(res)
        }else{
            if(res.data.code !== 0){
                alert(res.data.message)
            }
        }

        console.log("Create New User : ", res)
        
        await this.handleGetAllUser()
        await this.handleCloseModal()
    }


    handleUpdateAsAdmin = async (user_id) => {
        var confirm = await window.confirm('Are you sure to change this level user ?');

        if(confirm){
            const bodyRaw = {
                "user_id": user_id
            }
    
            const res = await updateAsAdmin(bodyRaw)
    
            if(!res.data){
                alert(res)
            }else{
                if(res.data.code !== 0){
                    alert(res.data.message)
                }
            }
    
            console.log("Update As Admin :", res)
        }

        await this.handleGetAllUser()
    }


    handleDeleteUser = async (user_id) => {
        var confirm = await window.confirm('Are you sure to remove this User ?');

        if(confirm){
            const res = await deleteUser(user_id)

            if(!res.data){
                alert(res)
            }else{
                if(res.data.code !== 0){
                    alert(res.data.message)
                }
            }
            
            console.log('Delete User :', res)

            await this.handleGetAllUser()
        }
    }


    handleCloseModal = async () => {
        this.setState({
            showModalAddUser: false,
            name: "", username: "", password: "", email: "",
        })
    }

    render(){
        return(
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row className="mt-1 ml-1">
						<Button color="success" onClick={this.handleCreateUser}>Add New User</Button>
					</Row>
                    {/* Dark table */}
					<Row className="mt-5">
						<div className="col">
                            <Card className="bg-default shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <h3 className="text-white mb-0">Users</h3>
                                </CardHeader>
                                <Table className="align-items-center table-dark table-flush" responsive>
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Password</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Login Apps</th>
                                        <th scope="col">Administrator</th>
                                        <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataUser !== null? 
                                                this.state.dataUser.map((data, key) => {
                                                    return <TableRow key={key} 
                                                                        getData={data}
                                                                        onClickUpdate={this.handleUpdateAsAdmin} 
                                                                        onClickDelete={this.handleDeleteUser} />
                                                }): null
                                        }
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                                            <PaginationItem className="disabled">
                                                <PaginationLink href="#pablo" onClick={e => e.preventDefault()} tabIndex="-1">
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
					</Row>
                </Container>

                {/* Modal Add New User */}
                <Modal isOpen={this.state.showModalAddUser}>
                    <ModalHeader>Add New User</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="name" id="exampleEmail" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSaveUser}>Save</Button>
                        <Button color="secondary" onClick={this.handleCloseModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Users