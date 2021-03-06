import { connect, useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { registerNewUser } from "../actions/auth";
import { validateFields } from "../utils/common";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetErrors } from "../actions/errors";

function Register() {
  const [regisInfo, setRegisInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    cpassword: "",
    successMsg: "",
    errorMsg: "",
    isSubmitted: false,
  });
  const dispatch = useDispatch();
  let backerrors = useSelector((state) => state.errors);

  useEffect(() => {
    if (backerrors.signup_error) {
      setRegisInfo({ ...regisInfo, errorMsg: backerrors });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backerrors]);

  const registerUser = (event) => {
    event.preventDefault();
    const { first_name, last_name, email, password, cpassword } = regisInfo;

    const fieldsToValidate = [
      { first_name },
      { last_name },
      { email },
      { password },
      { cpassword },
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);

    if (!allFieldsEntered) {
      dispatch(resetErrors());
      let error = { signup_error: "Please enter all the fields." };
      setRegisInfo({ ...regisInfo, errorMsg: error });
    } else {
      if (password !== cpassword) {
        dispatch(resetErrors());
        setRegisInfo({
          ...regisInfo,
          errorMsg: {
            signup_error: "Password and confirm password does not match.",
          },
        });
      } else {
        setRegisInfo({ ...regisInfo, isSubmitted: true });
        dispatch(
          registerNewUser({ first_name, last_name, email, password })
        ).then((response) => {
          if (response.success) {
            setRegisInfo({
              isSubmitted: true,
              successMsg: "User registered successfully.",
              errorMsg: "",
            });
          }
        });
      }
    }
  };

  const handleChange = ({ target }) => {
    setRegisInfo({
      ...regisInfo,
      [target.name]: target.value,
    });
  };

  return (
    <div className="login-page">
      <h2>Register User</h2>
      <div className="login-form">
        <Form onSubmit={registerUser}>
          {regisInfo.errorMsg && regisInfo.errorMsg.signup_error ? (
            <p className="errorMsg centered-message">
              {regisInfo.errorMsg.signup_error}
            </p>
          ) : (
            regisInfo.isSubmitted && (
              <p className="successMsg centered-message">
                {regisInfo.successMsg}
              </p>
            )
          )}
          <Form.Group controlId="first_name">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Enter first name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Enter last name"
              onChange={handleChange}
            />
          </Form.Group>
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
          <Form.Group controlId="cpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </Form.Group>
          <div className="action-items">
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Link to="/" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default connect()(Register);
