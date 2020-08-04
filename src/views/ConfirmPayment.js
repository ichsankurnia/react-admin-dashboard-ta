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
import { getAllConfirmPayment } from "../api/ApiTransaction";
import { getConfirmPaymentByInvoice } from "../api/ApiTransaction";
import { updatePaymentStatus } from "../api/ApiTransaction";


// Table Row
const TableRow = (props) => {
	return(
		// <tr onClick={() => props.onClickRow(props.getData.invoice_no)} className="custom-row">
		<tr>
			<th scope="row">#{props.getData.invoice_no}</th>
            <td>{props.getData.name}</td>
            <td>{props.getData.email}</td>
            <td>{props.getData.payment_date.toString().substring(0, 10)}</td>
            <td>{props.getData.payment_method}</td>
            <td>{props.getData.total_price}</td>
			<td>{props.getData.description}</td>
            <td>
                <Media className="align-items-center">
					<a href={props.getData.img_pay}>
                        <img className="img-confirm-payment" alt="..." src={props.getData.img_pay}/>
					</a>
				</Media>
            </td>
            <td style={{width: '8%'}} >
                <span  className="icon-hover" style={{padding: 10}} onClick={() => props.onClickDetail(props.getData.invoice_no)}>
                    <i className="ni ni-align-left-2"></i>
                </span>
            </td>
		</tr>
	)
}



class ConfirmPayment extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showModalDetail : false,

            dataConfirmPayment: [],
            dataConfirmPaymentByInvoice: null,
            name: "",
            username: "",
            password: "",
            email: "",
        }
    }

    componentDidMount(){
        this.handleGetConfirmPaymentList()
    }

    handleGetConfirmPaymentList = async () => {
        const res = await getAllConfirmPayment()
        
        if(res.data){
            this.setState({dataConfirmPayment : res.data.data})
        }else{
            alert(res.message)
        }
        
        console.log("Get All ConfirmPayment :", res)
    }


    handleDetailConfirmPayment = async (invoiceNo) => {
        const res = await getConfirmPaymentByInvoice(invoiceNo)

        console.log("Get ConfirmPayment by Invoice :", res)

        this.setState({dataConfirmPaymentByInvoice: res.data.data, showModalDetail: true}, () => {
            console.log(this.state.dataConfirmPaymentByInvoice.Booking.Jasa.Sub_category)
        })
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

        await this.handleGetConfirmPaymentList()
    }


    handleCloseModal = async () => {
        this.setState({
            showModalDetail: false,
            dataConfirmPaymentByInvoice : null
        })
    }

    closeButton = () => {
        return (
            <button onClick={this.handleCloseModal}>&times;</button>
        )
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
                                    <h3 className="text-white mb-0">Confirm Payment List</h3>
                                </CardHeader>
                                <Table className="align-items-center table-dark table-flush" responsive>
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col"># Invoice</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Transfer Date</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Image</th>
                                        <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataConfirmPayment.length !== 0 || this.state.dataConfirmPayment !== null || this.state.dataConfirmPayment !== undefined? 
                                                this.state.dataConfirmPayment.map((data, key) => {
                                                    return <TableRow key={key} 
                                                                        getData={data}
                                                                        onClickUpdatePayment={this.handleUpdatePaymentStatus} 
                                                                        onClickDetail={this.handleDetailConfirmPayment} />
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
                {
                this.state.dataConfirmPaymentByInvoice !== null?
                    <Modal contentClassName="custom-modal" isOpen={this.state.showModalDetail}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h4 style={{padding: 15}}>Detail Confirm Payment</h4>
                                <Button color="secondary" onClick={this.handleCloseModal}>Close</Button>
                            </div>
                        <ModalBody>
                            <FormGroup>
                                <Row form>
                                    <Col md={3}>
                                        <Label>Invoice Number</Label>
                                    </Col>
                                    <Col md={9}>
                                        <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.invoice_no} readOnly />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.name} readOnly/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type="email" defaultValue={this.state.dataConfirmPaymentByInvoice.email} readOnly />
                                    </FormGroup>  
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Payment Date</Label>
                                        <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.payment_date.toString().substring(0, 10)} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Payment Method</Label>
                                        <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.payment_method} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Amount</Label>
                                        <Input type="number" defaultValue={this.state.dataConfirmPaymentByInvoice.total_price} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={3}>
                                    <Label>Description</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="textarea" defaultValue={this.state.dataConfirmPaymentByInvoice.description} readOnly />
                                </Col>
                            </Row>
                            <DropdownItem divider />
                            <FormGroup>
                                <Label>Booking Detail</Label>
                            </FormGroup>
                            <Row form>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label>Booking Date</Label>
                                        <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.Booking.createdAt} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Service</Label>
                                        <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.Booking.Jasa.jasa_name} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label>Price</Label>
                                        <Input type="number" defaultValue={this.state.dataConfirmPaymentByInvoice.Booking.Jasa.jasa_price} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={7}>
                                    <FormGroup>
                                        <Label>Sub Category</Label>
                                        <Row form>
                                            <Col md={3}>
                                                <img style={{width: '100%', borderRadius: 20}} src={this.state.dataConfirmPaymentByInvoice.Booking.Jasa.Sub_category.img_url} alt="..." />
                                            </Col>
                                            <Col md={9}>
                                                <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.Booking.Jasa.Sub_category.sub_category_name} readOnly />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label>Category</Label>
                                        <Input type="text" defaultValue={this.state.dataConfirmPaymentByInvoice.Booking.Jasa.Sub_category.Category.category_name} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={2}>
                                    <Label>Image</Label>
                                </Col>
                                <Col md={9}>
                                    <a href={this.state.dataConfirmPaymentByInvoice.img_pay}>
                                        <img width="30%" className="img-modal" src={this.state.dataConfirmPaymentByInvoice.img_pay} alt="..." />
                                    </a>
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal> : null

                }
            </>
        )
    }
}

export default ConfirmPayment