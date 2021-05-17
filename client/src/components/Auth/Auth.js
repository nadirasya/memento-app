import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj; 
        const token = res?.tokenId; 

        try {
            dispatch({ type: 'AUTH', data: { result, token }})
            //console.log('try')
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = (error) => {
        console.log('login failed because ', error);
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ?  'Sign up':'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" handleShowPassword={handleShowPassword}/> }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {  isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin 
                            clientId="836108614689-qk8ti792e193ksmfcbg8or89a6g1s42j.apps.googleusercontent.com" 
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                  Google Sign In
                                </Button>
                              )}
                              onSuccess={googleSuccess}
                              onFailure={googleError}
                              cookiePolicy="single_host_origin"
                            />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;