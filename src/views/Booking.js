import React from "react";
import { Container, Row, Button, Modal,
	Card,
	CardHeader,
	CardFooter,
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
    Col,
    DropdownItem,
    Media
} from "reactstrap";

import Header from "../components/Headers/Header";

// API
import { getAllBooking, getBookingListByUserId, getBookingByInvoice } from "../api/ApiTransaction";
import { updatePaymentStatus } from "../api/ApiTransaction";

// IMAGE
import NoPhoto from "../assets/img/theme/nophoto.png"


// Table Row
const TableRow = (props) => {
	return(
		// <tr onClick={() => props.onClickRow(props.getData.invoice_no)} className="custom-row">
		<tr>
			<th scope="row">#{props.getData.invoice_no}</th>
            <td>{props.getData.jasa_id}</td>
            <td>
                <span className="icon-hover" onClick={() => props.onClickListUser(props.getData.user_id)}>{props.getData.user_id}</span>
            </td>
			<td>
                <span style={{marginRight: '50%', fontWeight: 'bolder', color: props.getData.payment_status === "PAID"? '#0f0' : '#f22'}}>{props.getData.payment_status}</span>
                {
                    props.getData.payment_status !== "PAID"?
                    <span className="icon-hover" style={{padding: 5}} onClick={() => props.onClickUpdatePayment(props.getData.invoice_no)}>
                        <i className="ni ni-curved-next text-black"></i>
                    </span> : null
                }
            </td>
			<td>{props.getData.createdAt}</td>
            <td style={{width: '8%'}}>
                <span className="icon-hover" style={{padding: 10}} onClick={() => props.onClickDetail(props.getData.invoice_no)}>
                    <i className="ni ni-align-left-2"></i>
                </span>
            </td>
		</tr>
	)
}



class Booking extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showModalDetail : false,

            dataBooking: null,
            dataBookingByUserId : null,
            dataBookingByInvoice: null,
            name: "",
            username: "",
            password: "",
            email: "",
        }
    }

    componentDidMount(){
        this.handleGetBookingList()
    }

    handleGetBookingList = async () => {
        const res = await getAllBooking()
        
        console.log("Get All Booking :", res)
        
        if(res.data){
            if(res.data.code !== 0){
                alert(res.data.message)
                if(res.data.code === 99){
                    localStorage.clear()
                }
            }else{
                this.setState({dataBooking : res.data.data})
            }
        }else{
            alert(res.message)
        }
    }


    handleDetailBooking = async (invoiceNo) => {
        const res = await getBookingByInvoice(invoiceNo)

        console.log("Get Booking by Invoice :", res)

        this.setState({dataBookingByInvoice: res.data.data, showModalDetail: true})
    }


    handleUpdatePaymentStatus = async (invoiceNo) => {
        var confirm = await window.confirm('Are you sure to change payment status to PAID?');

        if(confirm){
            const bodyRaw = {
                "invoice_no": invoiceNo
            }
    
            const res = await updatePaymentStatus(bodyRaw)
    
            if(!res.data){
                alert(res)
            }else{
                if(res.data.code !== 0){
                    alert(res.data.message)
                }
            }
    
            console.log("Update Payment Status :", res)
        }

        await this.handleGetBookingList()
    }

    handleGetBookingByUserId = async (userId) => {
        const res = await getBookingListByUserId(userId)

        console.log("Get List Booking by UserID :", res)
        if(res.data){
            this.setState({dataBookingByUserId: res.data.data})
        }
    }


    handleCloseModal = async () => {
        this.setState({
            showModalDetail: false,
            dataBookingByInvoice : null
        })
    }

    render(){
        return(
            <>
                <Header />
                <Container className="mt--7" fluid>

                    {/* Dark table */}
                    {/* List Booking */}
					<Row className="mt-5">
						<div className="col">
                            <Card className="bg-default shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <h3 className="text-white mb-0">Booking List</h3>
                                </CardHeader>
                                <Table className="align-items-center table-dark table-flush" responsive>
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col"># Invoice</th>
                                        <th scope="col">Jasa ID</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Booking At</th>
                                        <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataBooking !== null? 
                                                this.state.dataBooking.map((data, key) => {
                                                    return <TableRow key={key} 
                                                                        getData={data}
                                                                        onClickListUser={this.handleGetBookingByUserId}
                                                                        onClickUpdatePayment={this.handleUpdatePaymentStatus} 
                                                                        onClickDetail={this.handleDetailBooking} />
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


                    {/* List booking by User ID */}
                    {
                        this.state.dataBookingByUserId !== null?
                        <Row className="mt-6">
                            <div className="col">
                                <h3>Booking List By User ID {this.state.dataBookingByUserId[0].User.user_id}</h3>
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Media className="align-items-center">
                                            <a className="avatar rounded-circle mr-3" href={this.state.dataBookingByUserId[0].User.Profil.user_img !== null? this.state.dataBookingByUserId[0].User.Profil.user_img : null} >
                                                <img alt="..." src={this.state.dataBookingByUserId[0].User.Profil.user_img !== null? this.state.dataBookingByUserId[0].User.Profil.user_img : NoPhoto} />
                                            </a>
                                            <Media><span className="mb-0 text-sm">{this.state.dataBookingByUserId[0].User.name}</span></Media>
                                        </Media>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                            <th scope="col"># Invoice</th>
                                            <th scope="col">Jasa ID</th>
                                            <th scope="col">User ID</th>
                                            <th scope="col">Payment Status</th>
                                            <th scope="col">Booking At</th>
                                            <th scope="col" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.dataBookingByUserId !== null? 
                                                    this.state.dataBookingByUserId.map((data, key) => {
                                                        return <TableRow key={key} 
                                                                            getData={data}
                                                                            onClickListUser={() => alert('User : ' + data.User.name)}
                                                                            onClickUpdatePayment={this.handleUpdatePaymentStatus} 
                                                                            onClickDetail={this.handleDetailBooking} />
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
                        : 
                        null
                    }

                </Container>

                {/* Modal Add New User */}
                {
                this.state.dataBookingByInvoice !== null?
                    <Modal contentClassName="custom-modal" isOpen={this.state.showModalDetail}>
                        <ModalHeader>Detail Booking</ModalHeader>
                        <ModalBody>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label>Invoice Number</Label>
                                        <Input type="text" defaultValue={this.state.dataBookingByInvoice.invoice_no} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label>Paymet Status</Label>
                                        <Input type="text" style={{fontWeight: 'bolder', color: this.state.dataBookingByInvoice.payment_status === "PAID"? '#0f0' : '#f22'}} 
                                                defaultValue={this.state.dataBookingByInvoice.payment_status} readOnly/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Date</Label>
                                        <Input type="text" defaultValue={this.state.dataBookingByInvoice.createdAt} readOnly />
                                    </FormGroup>  
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleCity">Service</Label>
                                        <Input type="text" defaultValue={this.state.dataBookingByInvoice.Jasa.jasa_name} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleState">Prices</Label>
                                        <Input type="text" defaultValue={this.state.dataBookingByInvoice.Jasa.jasa_price} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={7}>
                                    <FormGroup>
                                        <Label for="exampleCity">Sub Category</Label>
                                        <Row form>
                                            <Col md={3}>
                                                <img style={{width: '100%', borderRadius: 20}} src={this.state.dataBookingByInvoice.Jasa.Sub_category.img_url} alt={this.state.dataBookingByInvoice.Jasa.Sub_category.sub_category_name} />
                                            </Col>
                                            <Col md={9}>
                                                <Input type="text" defaultValue={this.state.dataBookingByInvoice.Jasa.Sub_category.sub_category_name} readOnly />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label for="exampleState">Category</Label>
                                        <Input type="text" defaultValue={this.state.dataBookingByInvoice.Jasa.Sub_category.Category.category_name} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <DropdownItem divider />
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleCity">User</Label>
                                        <Input type="text" defaultValue={this.state.dataBookingByInvoice.User.name} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleState">Email</Label>
                                        <Input type="text" defaultValue={this.state.dataBookingByInvoice.User.email} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.handleCloseModal}>Close</Button>
                        </ModalFooter>
                    </Modal> : null

                }
            </>
        )
    }
}

export default Booking