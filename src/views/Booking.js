import React from "react";
import Header from "components/Headers/Header";
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
    Col
} from "reactstrap";

import { getAllBooking } from "api/ApiTransaction";
import { getBookingByInvoice } from "api/ApiTransaction";
import { updatePaymentStatus } from "api/ApiTransaction";


// Table Row
const TableRow = (props) => {
	return(
		// <tr onClick={() => props.onClickRow(props.getData.invoice_no)} className="custom-row">
		<tr>
			<th scope="row">#{props.getData.invoice_no}</th>
            <td>{props.getData.jasa_id}</td>
            <td>{props.getData.user_id}</td>
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
            <td className="icon-hover" style={{width: '8%'}} onClick={() => props.onClickDetail(props.getData.invoice_no)}>
                <i className="ni ni-align-left-2"></i>
            </td>
		</tr>
	)
}



class Booking extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showModalDetail : false,

            dataBooking: [],
            dataBookingByInvoice: [],
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
        
        console.log(res)
        if(res.data){
            this.setState({dataBooking : res.data.data})
        }else{
            alert(res.message)
        }
        
        console.log("Get All Booking :", res)
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


    handleCloseModal = async () => {
        this.setState({
            showModalDetail: false,
            dataBookingByInvoice : []
        })
    }

    render(){
        return(
            <>
                <Header />
                <Container className="mt--7" fluid>

                    {/* Dark table */}
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
                                            this.state.dataBooking.length !== 0 || this.state.dataBooking !== null || this.state.dataBooking !== undefined? 
                                                this.state.dataBooking.map((data, key) => {
                                                    return <TableRow key={key} 
                                                                        getData={data}
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
                </Container>

                {/* Modal Add New User */}
                <Modal isOpen={this.state.showModalDetail}>
                    <ModalHeader>Detail Booking</ModalHeader>
                    <ModalBody>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="exampleCity">Invoice Number</Label>
                                <Input type="text" name="city" id="exampleCity" defaultValue={this.state.dataBookingByInvoice.invoice_no} readOnly />
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="exampleState">Paymet Status</Label>
                                <Label for="exampleState">{this.state.dataBookingByInvoice.payment_status}</Label>
                            </FormGroup>
                            </Col>
                            <Col md={2}>
                            <FormGroup>
                                <Label for="exampleZip">Zip</Label>
                                <Input type="text" name="zip" id="exampleZip"/>
                            </FormGroup>  
                            </Col>
                        </Row>
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
                        <Button color="secondary" onClick={this.handleCloseModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Booking