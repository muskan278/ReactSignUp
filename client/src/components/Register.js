import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Avatar,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleToClose = () => {
    setOpen(false);
    setData(null);
  };
  const onCheck = (e) => {
    e.preventDefault();
    verify();
    console.log("Check function called");
  };
  const verify = () => {
    const { email } = user;
    console.log(email);
    fetch("/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setData(error);
        setOpen(true);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    register();
    console.log("Register function called");
  };
  const register = () => {
    const { name, email, password } = user;
    if (name && email && password) {
      console.log(name, email, password);
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data.message);
          setOpen(true);
        })
        .catch((error) => {
          console.log(error);
          setData(error);
          setOpen(true);
        });
    } else {
      setData("Invalid input");
      setOpen(true);
    }
  };
  return (
    <>
      <SignuppageContainer
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid container item lg={6} md={12}>
          <SignupContainer>
            <Container maxWidth="xs">
              <FormContainer>
                <UserAvatar>
                  <AccountCircleIcon />
                </UserAvatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <SignupForm onSubmit={onSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Username"
                    name="name"
                    value={user.name}
                    placeholder="Username"
                    onChange={handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <CheckButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onCheck}
                  >
                    Check
                  </CheckButton>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="password"
                  />

                  <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </SubmitButton>

                  <Grid container>
                    <Grid item>
                      <FormLink href="/verify" variant="body2">
                        {"Already have an account? Verify here"}
                      </FormLink>
                    </Grid>
                  </Grid>
                </SignupForm>
              </FormContainer>
            </Container>
          </SignupContainer>
          {/* <Typography component="h1" variant="h5">
              {!data ? "Loading..." : data}
            </Typography> */}
        </Grid>

        <Snackbar
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          open={data !== null ? true : false}
          autoHideDuration={5000}
          message={data}
          onClose={handleToClose}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <Grid container item lg={6} md={12}>
          <ImageContainer src="./vector.jpg" />
        </Grid>
      </SignuppageContainer>
    </>
  );
};
export default Register;

const SignuppageContainer = styled(Grid)`
  height: 100vh;
`;

const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 5px solid rgb(216, 216, 216);
  border-radius: 2rem;
  padding: 2rem 3rem;
  margin: 0 auto;
  height: 70vh;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  margin: 10px;
  &&& {
    background-color: rgb(0, 125, 254);
  }
`;

const SignupForm = styled.form`
  width: 100%;
  margin-top: 1rem;
`;

const SubmitButton = styled(Button)`
  &&& {
    background: rgb(0, 125, 254);
  }
`;

const FormLink = styled(Link)`
  &&& {
    color: rgb(27, 46, 53);
  }
`;

const CheckButton = styled(Button)`
  &&& {
    background: rgb(0, 125, 254);
  }
  &&&:hover {
    box-shadow: 3px 3px #c5c6d0;
  }
`;

const ImageContainer = styled.img`
  background: transparent;
  height: 100vh;
  margin-left: 0;
`;
