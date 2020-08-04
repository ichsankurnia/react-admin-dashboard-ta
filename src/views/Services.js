import React from "react";
import Header from "components/Headers/Header";
import { Container, Row, Button, Modal,
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
	ModalBody,
	ModalHeader,
	ModalFooter,
	FormGroup,
	Input,
	Label,  
} from "reactstrap";
import { getSubCategory } from "api/APICategory";
import { 
    getAllJasa, 
    createNewJasa, 
    updateJasa 
} from "api/APIJasa";
import { deleteJasa } from "api/APIJasa";


// Table Row
const TableRow = (props) => {
	return(
		<tr>
			<th scope="row">{props.getData.jasa_name}</th>
			<td>{props.getData.jasa_desc}</td>
            <td>Rp{props.getData.jasa_price}</td>
			<td>
                <Media className="align-items-center">
					<a className="avatar rounded-circle mr-3" href="#pablo" onClick={e => e.preventDefault()}>
                        <img alt="..." src={props.getData.Sub_category.img_url}/>
					</a>
					<Media><span className="mb-0 text-sm">{props.getData.Sub_category.sub_category_name}</span></Media>
				</Media>
			</td>
			<td>{props.getData.Sub_category.Category.category_name}
			</td>
			<td className="text-right">
				<UncontrolledDropdown>
					<DropdownToggle className="btn-icon-only text-light" href="#pablo" role="button" size="sm" color="" onClick={e => e.preventDefault()}>
						<i className="fas fa-ellipsis-v" />
					</DropdownToggle>
					<DropdownMenu className="dropdown-menu-arrow" right>
						<DropdownItem onClick={() => props.onClickUpdate(props.getData)}>Edit</DropdownItem>
						<DropdownItem onClick={() => props.onClickDelete(props.getData.jasa_id)}>Delete</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</td>
		</tr>
	)
}



class Services extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showModalAddJasa : false,

            dataSubCate : [],
            dataJasa : [],
            subCategoryId : 0,
            jasaId : 0,
            jasaName: '',
            jasaDesc: '',
            jasaPrice: '',

            isUpdateJasa : false,
        }
    }

    componentDidMount(){
        this.handleGetAllJasa()
    }

    handleGetAllJasa = async () => {
        const res = await getAllJasa()

        if(res.data){
            this.setState({dataJasa : res.data.data})
        }else{
            alert(res)
        }

        console.log('Get All Jasa : ', res)
    }


    handleGetSubCategory = async () => {
        const res = await getSubCategory()

        if(res.data){
            this.setState({dataSubCate: res.data.data, subCategoryId: res.data.data[0].sub_category_id})
        }
        console.log("Get SubCategory : ", res)
    }


    handleCreateJasa = async () => {
        await this.handleGetSubCategory()

        this.setState({showModalAddJasa: true, isUpdateJasa: false})
    }

    handleUpdateJasa = async (data) => {
        console.log(data)
        await this.handleGetSubCategory()

        this.setState({
            jasaId: data.jasa_id, jasaName: data.jasa_name, jasaDesc: data.jasa_desc, jasaPrice: data.jasa_price,
            isUpdateJasa: true, showModalAddJasa: true})
    }

    handleSaveJasa = async () => {
        const bodyRaw = {
            "sub_category_id" : this.state.subCategoryId,
            "jasa_name" : this.state.jasaName,
            "jasa_desc" : this.state.jasaDesc,
            "jasa_price" : this.state.jasaPrice
        }

        if(!this.state.isUpdateJasa){
            const res = await createNewJasa(bodyRaw)

            console.log("Create New Jasa :", res)
        }else{
            const res = await updateJasa(this.state.jasaId, bodyRaw)

            console.log("Update Jasa :", res)
        }
        
        await this.handleGetAllJasa()
        await this.handleCloseModal()
    }


    handleDeleteJasa = async (jasaId) => {
        var confirm = await window.confirm('Are you sure to remove this Service ?');

        if(confirm){
            const res = await deleteJasa(jasaId)

            console.log('Delete jasa :', res)

            await this.handleGetAllJasa()
        }
    }


    handleCloseModal = async () => {
        this.setState({
            showModalAddJasa: false, isUpdateCate: false,
            subCategoryId: 0, jasaId: 0, jasaName: "", jasaDesc: "", jasaPrice: 0,
        })
    }

    render(){
        return(
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row className="mt-1 ml-1">
						<Button color="success" onClick={this.handleCreateJasa}>Add New Service</Button>
					</Row>
                    {/* Dark table */}
					<Row className="mt-5">
						<div className="col">
                            <Card className="bg-default shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <h3 className="text-white mb-0">Services</h3>
                                </CardHeader>
                                <Table className="align-items-center table-dark table-flush" responsive>
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Sub Category</th>
                                        <th scope="col">Category</th>
                                        <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataJasa.length !== 0 || this.state.dataJasa !== null || this.state.dataJasa !== undefined? 
                                                this.state.dataJasa.map((data, key) => {
                                                    return <TableRow key={key} 
                                                                        getData={data}
                                                                        onClickUpdate={this.handleUpdateJasa} 
                                                                        onClickDelete={this.handleDeleteJasa} />
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

                {/* Modal Add New / Update Jasa */}
                <Modal isOpen={this.state.showModalAddJasa}>
                    <ModalHeader>{this.state.isUpdateCate? `Update Service ${this.state.category_name}` : 'Add New Service'}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleEmail">Service Name</Label>
                            <Input type="text" name="name" id="exampleEmail" value={this.state.jasaName} onChange={e => this.setState({jasaName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="desc">Service Description</Label>
                            <Input type="textarea" name="desc" id="desc" value={this.state.jasaDesc} onChange={e => this.setState({jasaDesc: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Service Price</Label>
                            <Input type="number" name="desc" id="examplePassword" value={this.state.jasaPrice} onChange={e => this.setState({jasaPrice: e.target.value})} />
                        </FormGroup>
                        {
                            !this.state.isUpdateJasa?
                                <FormGroup style={{display: 'flex', flexDirection: 'column'}}>
                                    <Label for="exampleSelect">Select Sub Category</Label>
                                    {/* <Input type="select" name="select" id="exampleSelect" onChange={(e) => console.log(e.target.value)} value={this.state.subCategoryId}> */}
                                    <select name="select" id="exampleSelect" onChange={(e) => this.setState({subCategoryId: e.target.value})}
                                    style={{marginTop: 3, borderRadius: 5, borderColor: '#ccc', height: 45}}>
                                        {
                                            this.state.dataSubCate !== [] || this.state.dataSubCate !== null || this.state.dataSubCate.length > 0?
                                                this.state.dataSubCate.map((data, key) => {
                                                    return <option key={key} value={data.sub_category_id}>{data.sub_category_name}</option>
                                                }) : null
                                        }
                                    </select>
                                    {/* </Input> */}
                                </FormGroup> : null

                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSaveJasa}>Save</Button>
                        <Button color="secondary" onClick={this.handleCloseModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Services