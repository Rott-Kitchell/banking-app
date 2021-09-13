import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { resetErrors } from "../actions/errors";
import { validateFields } from "../utils/common";
import { initiateUpdateProfile } from "../actions/profile";

function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    errorMsg: "",
    isSubmitted: false,
  });
  const dispatch = useDispatch();
  let userProfile = useSelector((state) => state.profile);
  let backerrors = useSelector((state) => state.errors);

  useEffect(() => {
    if (backerrors.signup_error) {
      setProfileInfo({ ...profileInfo, errorMsg: backerrors });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backerrors]);

  useEffect(() => {
    if (userProfile) {
      const { first_name, last_name, email } = userProfile;
      setProfileInfo({ first_name, last_name, email });
    }
  }, [userProfile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetErrors());
    const { first_name, last_name } = profileInfo;
    const profileData = {
      first_name,
      last_name,
    };

    const fieldsToValidate = [{ first_name }, { last_name }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      setProfileInfo({
        ...profileInfo,
        errorMsg: {
          update_error: "Please enter all the fields.",
        },
      });
    } else {
      setProfileInfo({
        ...profileInfo,
        isSubmitted: true,
        errorMsg: "",
      });
      dispatch(initiateUpdateProfile(profileData));
    }
  };

  const handleChange = ({ target }) => {
    setProfileInfo({
      ...profileInfo,
      [target.name]: target.value,
    });
  };
  return (
    <div className="col-md-6 offset-md-3">
      <Form onSubmit={handleSubmit} className="profile-form">
        {profileInfo.errorMsg && profileInfo.errorMsg.update_error ? (
          <p className="errorMsg centered-message">
            {profileInfo.errorMsg.update_error}
          </p>
        ) : (
          profileInfo.isSubmitted && (
            <p className="successMsg centered-message">
              Profile successfully updated.
            </p>
          )
        )}
        <Form.Group controlId="email">
          <Form.Label>Email address:</Form.Label>
          <span className="label-value">{profileInfo.email}</span>
        </Form.Group>
        <Form.Group controlId="first_name">
          <Form.Label>First name:</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            value={profileInfo.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="alst_name">
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            value={profileInfo.last_name}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps)(Profile);
