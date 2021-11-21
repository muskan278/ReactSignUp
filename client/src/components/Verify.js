import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
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

const Verify = () => {
  const [user, setUser] = useState({
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

  const onSubmit = (e) => {
    e.preventDefault();
    verify();
    console.log("Verify function called");
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <VerifyPageContainer
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid container item lg={6} md={12}>
          <ImageContainer src="./vector2.jpg" />
        </Grid>
        <Grid container item lg={6} md={12}>
          <VerifyContainer>
            <Container maxWidth="xs">
              <FormContainer>
                <UserAvatar>
                  <AccountCircleIcon />
                </UserAvatar>
                <Typography component="h1" variant="h5">
                  Verify your account
                </Typography>
                <VerifyForm onSubmit={onSubmit}>
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

                  <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Verify
                  </SubmitButton>

                  <Grid container>
                    <Grid item>
                      <FormLink href="/register" variant="body2">
                        {"Don't have an account? Register here"}
                      </FormLink>
                    </Grid>
                  </Grid>
                </VerifyForm>
              </FormContainer>
            </Container>
          </VerifyContainer>
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
      </VerifyPageContainer>
    </>
  );
};
export default Verify;

const VerifyPageContainer = styled(Grid)`
  height: 100vh;
`;

const VerifyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 5px solid rgb(216, 216, 216);
  border-radius: 2rem;
  height: 60vh;
  margin: 0 auto;
  padding: 2rem 3rem;
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

const VerifyForm = styled.form`
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

const ImageContainer = styled.img`
  background: transparent;
  height: 100vh;
  margin-right: 0;
`;
