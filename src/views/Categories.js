import React from "react";
// reactstrap components
import {
	Card,
	CardHeader,
	CardFooter,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Media,
	Pagination,
	PaginationItem,
	PaginationLink,
	Table,
	Container,
	Row,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	FormGroup,
	Input,
	Label,
	FormText
} from "reactstrap";

import Header from "../components/Headers/Header";
import { getCategory, createNewCategory, updateCategory, deleteCategory, createNewSubCategory, updateSubCategory, deleteSubCategory } from "../api/APICategory";


// Row Table
const TableRow = (props) => {
	return(
		<tr>
			<th scope="row">
				<Media className="align-items-center">
					<a className="avatar rounded-circle mr-3" href="#pablo" onClick={e => e.preventDefault()}>
					<img alt="..." src={props.getData.img_url}/>
					</a>
					<Media><span className="mb-0 text-sm">{props.getData.sub_category_name}</span></Media>
				</Media>
			</th>
			<td>{props.getData.sub_category_desc}</td>
			<td className="text-right">
				<UncontrolledDropdown>
					<DropdownToggle className="btn-icon-only text-light" href="#pablo" role="button" size="sm" color="" onClick={e => e.preventDefault()}>
						<i className="fas fa-ellipsis-v" />
					</DropdownToggle>
					<DropdownMenu className="dropdown-menu-arrow" right>
						<DropdownItem onClick={() => props.onClickUpdate(props.getData)}>Edit</DropdownItem>
						<DropdownItem onClick={() => props.onClickDelete(props.getData.sub_category_id)}>Delete</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</td>
		</tr>
	)
}


// Table
const TableContent = (props) => {
	return(
		<Row className="mt-5">
			<div className="col">
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <UncontrolledDropdown nav>
                {/* Icon bell saat mobile mode */}
                    <DropdownToggle nav className="nav-link-icon">
                        <i className="ni ni-settings-gear-65" />
                    </DropdownToggle>
                    {/* Apabila di click icon tsb, muncul menu dropdown dibawah ini */}
                    <DropdownMenu
                        aria-labelledby="navbar-default_dropdown_1"
                        className="dropdown-menu-arrow"
                        right
                    >
                        <DropdownItem onClick={() => props.onClickUpdateCate(props.getData)}>Edit</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => props.onClickDeleteCate(props.getData.category_id)}>Delete this Category</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
				<Card className={parseInt(props.getData.category_id)%2 === 0? "shadow" : "bg-default shadow"}>
					<CardHeader className={parseInt(props.getData.category_id)%2 === 0? "border-0" : "bg-transparent border-0"}>
						<div style={{display:'flex', justifyContent:'space-between', flexDirection: 'row'}}>
							<h3 className={parseInt(props.getData.category_id)%2 === 0? "mb-0" : "text-white mb-0"}>{props.getData.category_name}</h3>
                            <Button color="primary" onClick={() => props.onClickAddSub(props.getData.category_id, props.getData.category_name)}>
                                Add New {props.getData.category_name}
                            </Button>
						</div>
					</CardHeader>
					{/* parseInt(props.getData.category_id)%2 === 0? */}
					<Table className={parseInt(props.getData.category_id)%2 === 0? "align-items-center table-flush" : "align-items-center table-dark table-flush"} responsive>
						<thead className={parseInt(props.getData.category_id)%2 === 0? "thead-light" : "thead-dark"}>
							<tr>
								<th scope="col">Sub Category</th>
								<th scope="col">Deskripsi</th>
								<th scope="col" />
							</tr>
						</thead>
						<tbody>
							{
								props.getData.Sub_categories.map((data) => {
									return <TableRow
												getData={data}
												onClickUpdate={props.onClickUpdateSub}
												onClickDelete={props.onClickDeleteSub}
												key={data.sub_category_id}
											/>
								})
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
	)
}



class Categories extends React.Component{
    constructor(props){
        super(props)

        this.state = {
			dataTable : [],

			category_id : 0,
			category_name : "",
			category_desc : "",

			sub_category_id: 0,
			sub_category_name : "",
			sub_category_desc : "",
			sub_category_img: null,

			showModalAddCate : false,
			isUpdateCate: false,
			showModalAddSub: false,
			isUpdateSub: false
		}
    }

    componentDidMount(){
		this.handleGetCategory()
	}

	handleGetCategory = async () => {
		const res = await getCategory()

		if(res.data){
			this.setState({dataTable: res.data.data})
		}else{
			alert(res)
		}

		console.log("Get Category :", res)
	}


	handleCreateCategory = async () => {
		this.setState({showModalAddCate: true, isUpdateCate: false})
	}

	handleUpdateCategory = async (data) => {
		this.setState({
			showModalAddCate: true,
			category_id: data.category_id,
			category_name: data.category_name,
			category_desc: data.category_desc,
			isUpdateCate: true
		})
	}

	handleSaveCategory = async () => {
		const data = {
			category_name: this.state.category_name,
			category_desc: this.state.category_desc
		}

		if(this.state.isUpdateCate){
			const res = await updateCategory(this.state.category_id, data)

			console.log("Update Category :", res)
		}else{
			const res = await createNewCategory(data)

			console.log("Create New Category :", res)
		}

		await this.handleGetCategory()
		await this.handleCloseModal()
	}

	handleDeleteCategory = async (id) => {
        var confirm = await window.confirm('Are you sure to delete this ?');
        if(confirm){
            const res = await deleteCategory(id)
    
            console.log("Delete Category :", res)
            await this.handleGetCategory()
        }
	}


	handleCreateSubCategory = async (categoryId, categoryName) => {
		this.setState({showModalAddSub: true, category_id: categoryId, category_name: categoryName})
	}


	handleUpdateSubCategory = async (data) => {
		this.setState({
			sub_category_id: data.sub_category_id,
			category_id: data.category_id,
			sub_category_name: data.sub_category_name,
			sub_category_desc: data.sub_category_desc,
			sub_category_img: data.img_url,

			showModalAddSub: true,
			isUpdateSub: true
		})
	}


	handleSaveSubCategory = async () => {
		const data = new FormData()
		
		data.append('category_id', this.state.category_id)
		data.append('sub_category_name', this.state.sub_category_name)
		data.append('sub_category_desc', this.state.sub_category_desc)
		data.append('img_url', this.state.sub_category_img)
		
		if(this.state.isUpdateSub){
			const res = await updateSubCategory(this.state.sub_category_id, data)

			console.log('Update SubCategory : ', res)
		}else{
			const res = await createNewSubCategory(data)
	
			console.log('Create SubCategory :', res)
		}

		await this.handleCloseModal()
		await this.handleGetCategory()
	}


	handleDeleteSubCategory = async (id) => {
        var confirm = await window.confirm('Are you sure to remove this ?');
        if(confirm === true){
            const res = await deleteSubCategory(id)
    
            console.log("Delete SubCategory :", res)
            await this.handleGetCategory()
        }
	}

	handleCloseModal = async () => {
		this.setState({
			showModalAddCate: false, isUpdateCate: false, showModalAddSub: false, isUpdateSub: false,
			category_name: "", category_desc: "",
			sub_category_name: "", sub_category_desc: "", sub_category_img: null
		})
	}

    render(){
        return(
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row className="ml-1">
						<Button color="success" onClick={this.handleCreateCategory}>Add New Category</Button>
					</Row>

                    {/* Table Content */}
					{
						this.state.dataTable.length !== 0 || this.state.dataTable !== null || this.state.dataTable !== undefined?
							this.state.dataTable.map((data) => {
								return <TableContent 
											getData={data}
											onClickUpdateCate={this.handleUpdateCategory}
											onClickDeleteCate={this.handleDeleteCategory}
											onClickAddSub={this.handleCreateSubCategory}
											onClickUpdateSub={this.handleUpdateSubCategory}
											onClickDeleteSub={this.handleDeleteSubCategory}
											key={data.category_id}
										/>
							}) : null
					}


					{/* Modal Add New Category */}
					<Modal isOpen={this.state.showModalAddCate}>
						<ModalHeader>{this.state.isUpdateCate? `Update Category ${this.state.category_name}` : 'Add New Category'}</ModalHeader>
						<ModalBody>
							<FormGroup>
								<Label for="exampleEmail">Category Name</Label>
								<Input type="text" name="name" id="exampleEmail" value={this.state.category_name} onChange={e => this.setState({category_name: e.target.value})} />
							</FormGroup>
							<FormGroup>
								<Label for="examplePassword">Category Description</Label>
								<Input type="text" name="desc" id="examplePassword" value={this.state.category_desc} onChange={e => this.setState({category_desc: e.target.value})} />
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.handleSaveCategory}>Save</Button>
							<Button color="secondary" onClick={this.handleCloseModal}>Cancel</Button>
						</ModalFooter>
					</Modal>


					{/* Modal Add New Sub Category */}
					<Modal isOpen={this.state.showModalAddSub}>
						<ModalHeader>{this.state.isUpdateSub? `Update SubCategory ${this.state.sub_category_name}` : `Add New ${this.state.category_name}`}</ModalHeader>
						<ModalBody>
							<FormGroup>
								<Label for="exampleEmail">{this.state.category_name} Name</Label>
								<Input type="text" name="name" id="exampleEmail" value={this.state.sub_category_name} onChange={e => this.setState({sub_category_name: e.target.value})} />
							</FormGroup>
							<FormGroup>
								<Label for="examplePassword">{this.state.category_name} Description</Label>
								<Input type="text" name="desc" id="examplePassword" value={this.state.sub_category_desc} onChange={e => this.setState({sub_category_desc: e.target.value})} />
							</FormGroup>
							<FormGroup>
								<Label for="exampleFile">{this.state.category_name} Icon</Label>
								<Input type="file" name="file" id="exampleFile" onChange={(e) => this.setState({sub_category_img: e.target.files[0]})} />
								<FormText color="muted">
								Upload {this.state.category_name} icon here.
								This is some placeholder block-level help text for the above input.
								It's a bit lighter and easily wraps to a new line.
								</FormText>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.handleSaveSubCategory}>Save</Button>
							<Button color="secondary" onClick={this.handleCloseModal}>Cancel</Button>
						</ModalFooter>
					</Modal>
                </Container>
            </>
        )
    }
}

export default Categories