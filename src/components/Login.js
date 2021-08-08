import { useState } from 'react';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import {validateFields} from '../utils/common';
import { Link } from 'react-router-dom'

function Login() {
    const [login, setLogin] = useState({email: '',
        password: '',
        errorMsg: ''
    })

    const handleLogin = (event) => {
        event.preventDefault();
        const { email, password } = login;
        const fieldsToValidate = [{email}, {password}];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            setLogin({
                errorMsg: {
                    signin_error: 'Please enter all the fields'
                }
            });
        } else {
            setLogin({
                errorMsg: {
                    signin_error: ''
                }
            });
        }
    }

    const handleChange = ({target}) => {
        setLogin({
            [target.name]: target.value
        });
    }
        
    return (
        <div className="login-page">
            <h1>Banking App</h1>
            <div className="login-form">
                <Form onSubmit={handleLogin}>
                    {login.errorMsg && login.errorMsg.signin_error && (
                        <p className="errorMsg centered-message">
                            {login.errorMsg.signin_error}
                        </p>
                    )}
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                        type="email" 
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="action-items">
                        <Button varient="primary" type="submit">Login</Button>
                        <Link to="/register" className="btn btn-secondary">Create account</Link>
                    </div>
                </Form>
            </div>
        </div>

    )
        

    
};

export default connect()(Login);