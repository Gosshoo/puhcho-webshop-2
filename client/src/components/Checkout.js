import React, { useState } from 'react';
import { Elements, StripeProvider, CardElement, injectStripe} from 'react-stripe-elements';
import ToastMessage from './ToastMessage';
import { getCart, calculatePrice, clearCart, calculateAmount } from '../utils';
import { withRouter } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Button, Form, FormGroup, Input, Container, Row, Col, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class _CheckoutForm extends React.Component {
    state = {
        cartItems: [],
        address: '',
        postalCode: '',
        city: '',
        confirmationEmailAddress: '',
        toast: false,
        toastMessage: '',
        orderProcessing: false,
        modal: false
    }

    componentDidMount() {
        this.setState({ cartItems: getCart() });
    }

    handleChange = ({ event, value }) => {
        event.persist();
        this.setState({ [event.target.name]: value });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    handleConfirmOrder = async event => {
        event.preventDefault();

        if (this.isFormEmpty(this.state)) {
            this.showToast('Fill in all fields');
            return;
        }

        this.setState({ modal : true }); 
    };

    handleSubmitOrder = async () => {
        const { cartItems, city, address, postalCode } = this.state;
        
        const amount = calculateAmount(cartItems);
        // Process order
        this.setState({ orderProcessing: true });
        let token;
        try {
            // Create stripe token
            const response = await this.props.stripe.createToken();
            token = response.token.id;
            // Create order with strapi sdk (make request to backend)
            await strapi.createEntry('orders', {
                amount,
                toys: cartItems,
                city,
                postalCode,
                address,
                token
            });
            // set orderProcessing to false, set modal to false
            this.setState({ orderProcessing: false, modal: false });
            // Clear user cart of toys
            clearCart();
            // Show success toast
            this.showToast('Your order has been successfully submitted!', true);
        } catch (err) {
            // Set orderProcessing to false, modal to false
            this.setState({ orderProcessing: false, modal: false });
            // Show error toast
            this.showToast(err.message);
        }
    };

    isFormEmpty = ({ address, postalCode, city, confirmationEmailAddress }) => {
        return !address || !postalCode || !city || !confirmationEmailAddress;
    }

    showToast = (toastMessage, redirect = false) => {
        this.setState({ toast: true, toastMessage });
        setTimeout(() => this.setState({ toast: false, toastMessage: '' },
        // if true passed to 'redirect' argument, redirect home 
            () => redirect && this.props.history.push('/')
        ), 5000);
    };

    closeModal = () => this.setState({ modal: false});
    
    render() {
        const { toast, toastMessage, cartItems, modal, orderProcessing } = this.state;

        return (
            <Container className="checkoutContainer">
                <div>
                    {/* Checkout form heading */}
                    <div style={{textAlign:"center"}}>
                        <h1>Checkout</h1>
                    </div>
                    {cartItems.length > 0 ? <React.Fragment>
                        {/* User cart */}
                        <div>
                            <FormText color="darkGray" italic="true" style={{textAlign:"center"}}>{cartItems.lenght} Items for Checkout</FormText>
                            <div padding={2}>
                                {cartItems.map(item => (
                                    <div key={item._id} padding={1}>
                                        <FormText color="midnight" style={{fontSize:"medium", textAlign:"center"}}>
                                            {item.name} x {item.quantity} - ${item.quantity} * {item.price}
                                        </FormText>
                                    </div>
                                ))}
                            </div>
                                <FormText bold="true" style={{fontSize:"large", fontWeight:"bolder", textAlign:"center"}}>Total Amount: {calculatePrice(cartItems)}</FormText>
                        </div>
                {/* Checkout form */}
                <Form onSubmit={this.handleConfirmOrder} style={{marginBottom:"-320px"}}>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                {/* <Label for="address">Address</Label> */}
                                <Input type="text" name="address" id="address" placeholder="Shipping address" onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                {/* <Label for="postalCode">Postal Code</Label> */}
                                <Input type="text" name="postalCode" id="postalCode" placeholder="Postal Code" onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                {/* <Label for="city">City of Residence</Label> */}
                                <Input type="text" name="city" id="city" placeholder="City of Residence" onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                {/* <Label for="confirmationEmailAddress">Confirmation Email Address</Label> */}
                                <Input type="email" name="confirmationEmailAddress" id="confirmationEmailAddress" placeholder="Confirmation Email Address" onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <CardElement id="stripe__input" onReady={input => input.focus()}></CardElement>
                            <Button id="stripe__button" text="Submit" type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                </React.Fragment> : (
                        <div padding={4}>
                            <h2 align="center" color="watermelon" size="sm">Your cart is empty</h2>
                            <FormText align="center" italic="true" color="green">Add some toys!</FormText>
                        </div>
                    )}
                </div>
                {modal && (
                    <ConfirmationModal
                        orderProcessing={orderProcessing}
                        cartItems={cartItems}
                        closeModal={this.closeModal}
                        handleSubmitOrder={this.handleSubmitOrder}>
                    </ConfirmationModal>
                )}
                <ToastMessage show={toast} message={toastMessage}></ToastMessage>
            </Container>
        );
    }
}

const ConfirmationModal = (props ) => {
  const { className } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Confirm your order</ModalHeader>
        <ModalBody>
            {props.cartItems.map(item => (
                <div key={item._id}>
                        {item.name} * {item.quantity} - {item.quantity} * {item.price}
                </div>
            ))}
            <FormText style={{fontWeight:"bold", fontSize:"large"}}>
                Total: {calculatePrice(props.cartItems)}
            </FormText>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.handleSubmitOrder}>Confirm</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
  );
}

const CheckoutForm = withRouter(injectStripe(_CheckoutForm));

const Checkout = () => (
    <StripeProvider apiKey="pk_test_I6H5OIDzxJKe3AI98vA3eF3j0064dTox6x">
        <Elements>
            <CheckoutForm></CheckoutForm>
        </Elements>
    </StripeProvider>
)

export default Checkout;