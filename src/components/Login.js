import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { initiateLogin } from "../actions/auth";
import { resetErrors } from "../actions/errors";
import { validateFields } from "../utils/common";
import { Link } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    errorMsg: "",
  });
  const dispatch = useDispatch();
  let errors = useSelector((state) => state.errors);

  useEffect(() => {
    if (errors) setLoginInfo({ errorMsg: errors });
  }, [errors]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(resetErrors());
    const { email, password } = loginInfo;

    const fieldsToValidate = [{ email }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    console.log(allFieldsEntered);
    if (!allFieldsEntered) {
      setLoginInfo({
        errorMsg: {
          signin_error: "Please enter all the fields",
        },
      });
    } else {
      setLoginInfo({
        errorMsg: {
          signin_error: "",
        },
      });
    }
    dispatch(initiateLogin(email, password));
  };

  const handleChange = ({ target }) => {
    setLoginInfo({
      ...loginInfo,
      [target.name]: target.value,
    });
  };

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
            <Button varient="primary" type="submit">
              Login
            </Button>
            <Link to="/register" className="btn btn-secondary">
              Create account
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(Login);
