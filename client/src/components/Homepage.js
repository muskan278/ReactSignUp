import React from "react";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";

const Homepage = () => {
  return (
    <ParentContainer>
      <Typography component="h1" variant="h5">
        Click a button to proceed
      </Typography>
      <ChooseButton
        href="/register"
        type="submit"
        variant="contained"
        color="primary"
      >
        {"Don't have an account? Register here"}
      </ChooseButton>
      <ChooseButton
        href="/verify"
        type="submit"
        variant="contained"
        color="primary"
      >
        {"Already have an account? Verify here"}
      </ChooseButton>
    </ParentContainer>
  );
};
export default Homepage;

const ParentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const ChooseButton = styled(Button)`
  &&& {
    background: rgb(0, 125, 254);
    margin-top: 2rem;
    width: 50vw;
  }
`;
