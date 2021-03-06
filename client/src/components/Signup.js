import React from 'react';
// import { Container, Box, Heading, Text, TextField} from 'gestalt';
import { setToken } from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Button, Form, FormGroup, Input, Container, Card } from 'reactstrap';
import './App.css';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class Signup extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        toast: false,
        toastMessage: '',
        loading: false
    };

    handleChange = ({ event, value }) => {
        event.persist();
        this.setState({ [event.target.name]: value });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    handleSubmit = async event => {
        event.preventDefault();
        const { username, email, password } = this.state;

        if (this.isFormEmpty(this.state)) {
            this.showToast('Fill in all fields');
            return;
        }
        // console.log('submitted')

        // Sign up users
        try {
            this.setState({ loading: true });
            // make request to register user with strapi
            const response = await strapi.register(username, email, password);
            this.setState({ loading: false });
            // put token (to manage user session) in local storage
            setToken(response.jwt);
            // console.log(response);
            this.redirectUser('/');
        } catch (err) {
            this.setState({ loading: false });
            // show error message with toast message
            this.showToast(err.message);
        }
    };

    redirectUser = path => this.props.history.push(path);

    isFormEmpty = ({ username, email, password }) => {
        return !username || !email || !password;
    }

    showToast = toastMessage => {
        this.setState({ toast: true, toastMessage });
        setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
    }

    render() {
        const { toastMessage, toast, loading } = this.state;

        return (
            <Container style={{marginBottom:"-49px"}}>
                <Card className="auth-cards">
                <Form onSubmit={this.handleSubmit}>
                    <div style={{textAlign:"center"}}>
                        <h1>Sign Up</h1>
                    </div>
                    <FormGroup className="form-inputs">
                        {/* <Label>Username</Label> */}
                        <Input id="username" name="username" type="text" className="form-control" placeholder="Username" onChange={this.onChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup className="form-inputs">
                        {/* <Label>Email</Label> */}
                        <Input id="email" name="email" type="text" className="form-control" placeholder="Email" onChange={this.onChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup className="form-inputs">
                        {/* <Label>Password</Label> */}
                        <Input id="password" name="password" type="password" className="form-control" placeholder="Password" onChange={this.onChange} />
                    </FormGroup>
                    {' '}
                    <Button type="submit" color="blue" className="auth-btn btn-primary btn-block" disabled={loading}>Submit</Button>
                </Form>
                    <ToastMessage show={toast} message={toastMessage}></ToastMessage>
                </Card>
        </Container>
        )
    }
}

export default Signup;