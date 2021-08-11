import { useState } from 'react';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import {validateFields} from '../utils/common';
import { Link } from 'react-router-dom'

function Login() {
    const [loginInfo, setLoginInfo] = useState({email: '',
        password: '',
        errorMsg: ''
    })

    const handleLogin = (event) => {
        event.preventDefault();
        const { email, password } = loginInfo;
        const fieldsToValidate = [{email}, {password}];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            setLoginInfo({
                errorMsg: {
                    signin_error: 'Please enter all the fields'
                }
            });
        } else {
            setLoginInfo({
                errorMsg: {
                    signin_error: ''
                }
            });
        }
    }

    const handleChange = ({target}) => {
        setLoginInfo({
            [target.name]: target.value
        });
    }
        
    return (
        <div className="login-page">
            <h1>RK Banking</h1>
            <div className="login-form">
                <Form onSubmit={handleLogin}>
                    {loginInfo.errorMsg && loginInfo.errorMsg.signin_error && (
                        <p className="errorMsg centered-message">
                            {loginInfo.errorMsg.signin_error}
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