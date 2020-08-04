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
	FormGroup,
	Input,
    Label,  
    Col,
    DropdownItem,
    Media
} from "reactstrap";

import Header from "../components/Headers/Header";
import { getAllTransactionComplete } from "../api/ApiTransaction";
import { getTransactionCompleteByInvoice } from "../api/ApiTransaction";


// Table Row
const TableRow = (props) => {
	return(
		// <tr onClick={() => props.onClickRow(props.getData.invoice_no)} className="custom-row">
		<tr>
			<th scope="row">#{props.getData.invoice_no}</th>
            <td>{props.getData.User.name}</td>
            <td>{props.getData.User.email}</td>
			<td>
                <span style={{fontWeight: 'bolder', color: props.getData.Booking.payment_status === "PAID"? '#0f0' : '#f22'}}>
                    {props.getData.Booking.payment_status}
                </span>
            </td>
            <td>{props.getData.ConPayment.payment_method}</td>
            <td>{props.getData.ConPayment.payment_date}</td>
			<td>
                <Media className="align-items-center">
					<a href={props.getData.ConPayment.img_pay}>
                        <img className="img-confirm-payment" alt="..." src={props.getData.ConPayment.img_pay}/>
					</a>
				</Media>
            </td>
			<td>{props.getData.Booking.createdAt.toString().substring(0,10)}</td>
			<td>{props.getData.Booking.Jasa.jasa_name}</td>
			<td>{props.getData.Booking.Jasa.jasa_price}</td>
			<td>
                <Media className="align-items-center">
					<a className="avatar rounded-circle mr-3" href="#pablo" onClick={e => e.preventDefault()}>
                        <img alt="..." src={props.getData.Booking.Jasa.Sub_category.img_url}/>
					</a>
					<Media><span className="mb-0 text-sm">{props.getData.Booking.Jasa.Sub_category.sub_category_name}</span></Media>
				</Media>
            </td>
			<td>{props.getData.Booking.Jasa.Sub_category.Category.category_name}</td>
            <td style={{width: '8%'}} >
                <span  className="icon-hover" style={{padding: 10}} onClick={() => props.onClickDetail(props.getData.invoice_no)}>
                    <i className="ni ni-align-left-2"></i>
                </span>
            </td>
		</tr>
	)
}



class TransactionComplete extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showModalDetail : false,

            dataTransactionComplete: [],
            dataTransactionCompleteByInvoice: null,
            name: "",
            username: "",
            password: "",
            email: "",
        }
    }

    componentDidMount(){
        this.handleGetTransactionCompleteList()
    }

    handleGetTransactionCompleteList = async () => {
        const res = await getAllTransactionComplete()
        
        if(res.data){
            this.setState({dataTransactionComplete : res.data.data})
        }else{
            alert(res.message)
        }
        
        console.log("Get All TransactionComplete :", res)
    }


    handleDetailTransactionComplete = async (invoiceNo) => {
        const res = await getTransactionCompleteByInvoice(invoiceNo)

        console.log("Get TransactionComplete by Invoice :", res)

        this.setState({dataTransactionCompleteByInvoice: res.data.data, showModalDetail: true}, () => {
            console.log(this.state.dataTransactionCompleteByInvoice.Booking.Jasa.Sub_category)
        })
    }


    handleCloseModal = async () => {
        this.setState({
            showModalDetail: false,
            dataTransactionCompleteByInvoice : null
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
                                    <h3 className="text-white mb-0">Transaction Complete</h3>
                                </CardHeader>
                                <Table className="align-items-center table-dark table-flush" responsive>
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col"># Invoice</th>
                                        <th scope="col">User</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Confirm Date</th>
                                        <th scope="col">Confirm Image</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Sub Category</th>
                                        <th scope="col">Category</th>
                                        <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.dataTransactionComplete.length !== 0 || this.state.dataTransactionComplete !== null || this.state.dataTransactionComplete !== undefined? 
                                                this.state.dataTransactionComplete.map((data, key) => {
                                                    return <TableRow key={key} 
                                                                        getData={data}
                                                                        onClickUpdatePayment={this.handleUpdatePaymentStatus} 
                                                                        onClickDetail={this.handleDetailTransactionComplete} />
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
                this.state.dataTransactionCompleteByInvoice !== null?
                    <Modal contentClassName="custom-modal" isOpen={this.state.showModalDetail}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4 style={{padding: 15}}>Transaction Complete</h4>
                            <Button color="secondary" onClick={this.handleCloseModal}>Close</Button>
                        </div>
                        <ModalBody>
                        <Row form>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label>Invoice Number</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.invoice_no} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Payment Status</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.Booking.payment_status} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label>Price</Label>
                                        <Input type="number" defaultValue={this.state.dataTransactionCompleteByInvoice.Booking.Jasa.jasa_price} readOnly />
                                    </FormGroup>
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
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.Booking.createdAt} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Service</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.Booking.Jasa.jasa_name} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label>Price</Label>
                                        <Input type="number" defaultValue={this.state.dataTransactionCompleteByInvoice.Booking.Jasa.jasa_price} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={7}>
                                    <FormGroup>
                                        <Label>Sub Category</Label>
                                        <Row form>
                                            <Col md={3}>
                                                <img style={{width: '100%', borderRadius: 20}} src={this.state.dataTransactionCompleteByInvoice.Booking.Jasa.Sub_category.img_url} alt="..." />
                                            </Col>
                                            <Col md={9}>
                                                <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.Booking.Jasa.Sub_category.sub_category_name} readOnly />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label>Category</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.Booking.Jasa.Sub_category.Category.category_name} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <DropdownItem divider />
                            <FormGroup>
                                <Label>User</Label>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.User.name} readOnly/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type="email" defaultValue={this.state.dataTransactionCompleteByInvoice.User.email} readOnly />
                                    </FormGroup>  
                                </Col>
                            </Row>
                            <DropdownItem divider />
                            <FormGroup>
                                <Label>Confirm Payment</Label>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.ConPayment.name} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.ConPayment.email} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Payment Date</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.ConPayment.payment_date.toString().substring(0, 10)} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Payment Method</Label>
                                        <Input type="text" defaultValue={this.state.dataTransactionCompleteByInvoice.ConPayment.payment_method} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Amount</Label>
                                        <Input type="number" defaultValue={this.state.dataTransactionCompleteByInvoice.ConPayment.total_price} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Row form>
                                    <Col md={3}>
                                        <Label>Description</Label>
                                    </Col>
                                    <Col md={9}>
                                        <Input type="textarea" defaultValue={this.state.dataTransactionCompleteByInvoice.ConPayment.description} readOnly />
                                    </Col>
                                </Row>
                                <br />
                                <Row form>
                                    <Col md={3}>
                                        <Label>Image</Label>
                                    </Col>
                                    <Col md={9}>
                                        <a href={this.state.dataTransactionCompleteByInvoice.ConPayment.img_pay}>
                                            <img width="20%" className="img-modal" src={this.state.dataTransactionCompleteByInvoice.ConPayment.img_pay} alt="..." />
                                        </a>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </ModalBody>
                    </Modal> : null

                }
            </>
        )
    }
}

export default TransactionComplete