import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import TextFieldInput from "../components/TextField";
import Person2Icon from "@mui/icons-material/Person2";
import MailIcon from "@mui/icons-material/Mail";
import PasswordField from "../components/PasswordField";
import AuthButtons from "../components/AuthButtons";
import { useGlobalContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const Authentication = () => {
  const { registerUser, loginUser } = useGlobalContext();
  const [openReg, setOpenReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (openReg) {
        if (details.password !== details.cpassword) {
          setLoading(false);
          return toast.error("Mismatch Passwords", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }

        const data = await registerUser(details);
        if (data.success) {
          toast.success("Registered Successfully!!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });

          setDetails(initialState);
          setOpenReg(false);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } else {
        const data = await loginUser(details);
        if (data.success) {
          toast.success("Loggedin Successfully!!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });

          setDetails(initialState);
          localStorage.setItem("dobby-ads-user", JSON.stringify(data.user));
          navigate("/");
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box>
        <Typography
          textAlign="center"
          fontSize={28}
          color="secondary"
          fontWeight="bold"
        >
          {openReg ? "Register" : "Login"}
        </Typography>
        {openReg && (
          <TextFieldInput
            type="text"
            title="Name"
            others="name"
            value={details.name}
            onChange={handleChange}
            autoFocus={openReg & true}
            icon={<Person2Icon className="fs-5" />}
          />
        )}

        <TextFieldInput
          type="email"
          title="Email"
          others="email"
          value={details.email}
          onChange={handleChange}
          autoFocus={!openReg & true}
          icon={<MailIcon className="fs-5" />}
        />
        <PasswordField
          title="Password"
          others="password"
          value={details.password}
          onChange={handleChange}
        />

        {openReg && (
          <PasswordField
            title="Repeat Password"
            others="cpassword"
            value={details.cpassword}
            onChange={handleChange}
          />
        )}

        <AuthButtons
          openReg={openReg}
          setOpenReg={setOpenReg}
          loading={loading}
          handleSubmit={handleSubmit}
        />

        {!openReg && <ForgotPassword />}
      </Box>
    </Container>
  );
};

export default Authentication;
