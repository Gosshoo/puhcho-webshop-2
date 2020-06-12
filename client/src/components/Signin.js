import React from 'react';
import { setToken } from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Button, Form, FormGroup, Input, Container, Card } from 'reactstrap';
import './App.css';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class Signin extends React.Component {
    state = {
        username: '',
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
        const { username, password } = this.state;

        console.log(this.state);

        if (this.isFormEmpty(this.state)) {
            this.showToast('Fill in all fields');
            return;
        }
        
        //console.log(username);

        // Sign up users
        try {
            this.setState({ loading: true });
            // make request to register user with strapi
            const response = await strapi.login(username, password);
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

    isFormEmpty = ({ username, password }) => {
        return !username || !password;
    }

    showToast = toastMessage => {
        this.setState({ toast: true, toastMessage });
        setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
    }

    render() {
        const { toastMessage, toast, loading } = this.state;

        return (
            <Container style={{marginBottom:"30px"}}>
                <Card className="auth-cards">
                <Form onSubmit={this.handleSubmit} >
                    <div style={{textAlign:"center"}}>
                        <h1>Sign In</h1>
                    </div>
                    <FormGroup className="form-inputs">
                        {/* <Label>Username</Label> */}
                        <Input id="username" name="username" type="text" className="form-control" placeholder="Username" onChange={this.onChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup className="form-inputs">
                        {/* <Label>Password</Label> */}
                        <Input id="password" name="password" type="password" className="form-control" placeholder="Password" onChange={this.onChange} />
                    </FormGroup>
                    {' '}
                    <Button type="submit" color="blue" className="auth-btn btn-primary btn-block" disabled={loading}>Submit</Button>
                </Form>
                </Card>
                <ToastMessage show={toast} message={toastMessage}></ToastMessage>
            </Container>
        )
    }
}

export default Signin;