import React, { Component } from 'react';
import './login.css';
import { BASEURL, callApi } from './lib';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      signupData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "Borrower"
      },
      errData: {},
      loginData: {
        email: "",
        password: ""
      }
    };

    // Bindings
    this.signupResponse = this.signupResponse.bind(this);
    this.loginResponse = this.loginResponse.bind(this);
  }

  handleSignUpInput(e) {
    this.setState({
      signupData: {
        ...this.state.signupData,
        [e.target.name]: e.target.value
      }
    });
  }

  handleLoginInput(e) {
    this.setState({
      loginData: {
        ...this.state.loginData,
        [e.target.name]: e.target.value
      }
    });
  }

  validateSignup() {
    const { signupData } = this.state;
    const err = {};

    if (!signupData.firstName.trim()) err.firstName = "First Name is required";
    if (!signupData.lastName.trim()) err.lastName = "Last Name is required";
    if (!signupData.email.trim()) err.email = "Email ID is required";
    if (!signupData.phone.trim()) err.phone = "Phone Number is required";
    if (signupData.password.length < 8) err.password = "Password must have at least 8 characters";
    if (signupData.confirmPassword !== signupData.password) err.confirmPassword = "Passwords do not match";

    this.setState({ errData: err });
    return Object.keys(err).length === 0;
  }

  validateLogin() {
    const { loginData } = this.state;
    const err = {};

    if (!loginData.email.trim()) err.email = "Email ID is required";
    if (!loginData.password.trim()) err.password = "Password is required";

    this.setState({ errData: err });
    return Object.keys(err).length === 0;
  }

  registerUser() {
    if (!this.validateSignup()) return;
    const { signupData } = this.state;
    const data = JSON.stringify(signupData);
    callApi("POST", BASEURL + 'signup', data, this.signupResponse);
  }

  signupResponse(res) {
    let rdata;
    try {
      rdata = JSON.parse(res);
    } catch {
      rdata = { message: res };
    }

    alert(rdata.message || rdata);

    this.setState({
      signupData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "Borrower"
      },
      signup: false
    });
  }

  login() {
    if (!this.validateLogin()) return;
    const { loginData } = this.state;
    const data = JSON.stringify(loginData);
    callApi("POST", BASEURL + "login", data, this.loginResponse);
  }

  loginResponse(res) {
    let rdata;
    try {
      rdata = JSON.parse(res);
    } catch {
      rdata = { message: res };
    }

    if (rdata.role && rdata.user) {
      alert(`Welcome ${rdata.user.firstName}, Role: ${rdata.role}`);

      const role = rdata.role;
      if (role === "Admin") window.location.href = "/admin";
      else if (role === "Lender") window.location.href = "/lender";
      else if (role === "Borrower") window.location.href = "/borrower";
      else if (role === "Analyst") window.location.href = "/analyst";
    } else {
      alert(rdata.message || "Invalid credentials");
    }

    this.setState({
      loginData: { email: "", password: "" }
    });
  }

  render() {
    const { signup, signupData, errData, loginData } = this.state;

    return (
      <div className='login'>
        <div className='leftpanel'>
          <h1>Welcome Back!</h1>
          <p>Access and manage your finances efficiently</p>
        </div>

        <div className='rightpanel'>
          <div className='card'>
            <h2>Login</h2>
            <input
              type='text'
              placeholder='Email'
              name='email'
              value={loginData.email}
              onChange={(e) => this.handleLoginInput(e)}
              style={!errData.email ? {} : { border: "1px solid red" }}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={loginData.password}
              onChange={(e) => this.handleLoginInput(e)}
              style={!errData.password ? {} : { border: "1px solid red" }}
            />
            <button onClick={() => this.login()}>Login</button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => this.setState({ signup: true })}>Sign Up</span>
            </p>
          </div>
        </div>

        {signup && (
          <div className='overlay'>
            <div className='signup'>
              <button className='close' onClick={() => this.setState({ signup: false })}>
                X
              </button>
              <h2>Create an Account</h2>

              <label>First Name *</label>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                value={signupData.firstName}
                onChange={(e) => this.handleSignUpInput(e)}
                autoComplete='off'
                style={!errData.firstName ? {} : { border: "1px solid red" }}
              />

              <label>Last Name *</label>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={signupData.lastName}
                onChange={(e) => this.handleSignUpInput(e)}
                autoComplete='off'
                style={!errData.lastName ? {} : { border: "1px solid red" }}
              />

              <label>Email ID *</label>
              <input
                type='text'
                name='email'
                placeholder='Email ID'
                value={signupData.email}
                onChange={(e) => this.handleSignUpInput(e)}
                autoComplete='off'
                style={!errData.email ? {} : { border: "1px solid red" }}
              />

              <label>Phone Number *</label>
              <input
                type='text'
                name='phone'
                placeholder='Phone Number'
                value={signupData.phone}
                onChange={(e) => this.handleSignUpInput(e)}
                autoComplete='off'
                style={!errData.phone ? {} : { border: "1px solid red" }}
              />

              <label>Password *</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={signupData.password}
                onChange={(e) => this.handleSignUpInput(e)}
                style={!errData.password ? {} : { border: "1px solid red" }}
              />

              <label>Confirm Password *</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={signupData.confirmPassword}
                onChange={(e) => this.handleSignUpInput(e)}
                style={!errData.confirmPassword ? {} : { border: "1px solid red" }}
              />

              <label>Select Role *</label>
              <select
                id='roleSelect'
                name='role'
                value={signupData.role}
                onChange={(e) => this.handleSignUpInput(e)}
              >
                <option value='Admin'>Admin</option>
                <option value='Lender'>Lender</option>
                <option value='Borrower'>Borrower</option>
                <option value='Analyst'>Financial Analyst</option>
              </select>

              <button className='regButton' onClick={() => this.registerUser()}>
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
