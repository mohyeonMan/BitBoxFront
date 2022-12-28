import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthPopUpPage from "./memberComponents/AuthPopUpPage";

const theme = createTheme();

const JoinForm = () => {
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        birth: '',
        email: '',
        phoneNumber: ''
    });


    // 페이지 이동
    const navi = useNavigate();

    const [nameDiv, setNameDiv] = useState('');
    const [phoneNumDiv, setPhoneNumDiv] = useState('');
    const [birthDiv, setBirthDiv] = useState('');
    const [userNameDiv, setUserNameDiv] = useState('');
    const [pwdDiv, setPwdDiv] = useState('');
    const [emailDiv, setEmailDiv] = useState('');
    const [pwdChkDiv, setPwdChkDiv] = useState('');

    // input 값 setForm
    const inputValue = (e) => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value
        });
    }

    const {name, username, password, birth, email, phoneNumber, pwdChkVal} = form;

    // 유효성검사
    const handleSubmit = (e) => {
        e.preventDefault();

        var a = 1;

        if (!name) {
            setNameDiv('필수 입력정보입니다!');
            a = 0;
        } else if (!phoneNumber) {
            setPhoneNumDiv('필수 입력정보입니다!');
            a = 0;
        } else if (!birth) {
            setBirthDiv('필수 입력정보입니다!');
            a = 0;
        } else if (!username) {
            setUserNameDiv('필수 입력정보입니다!');
            a = 0;
        } else if (!password) {
            setPwdDiv('필수 입력정보입니다!');
            a = 0;
        } else if (!email) {
            setEmailDiv('필수 입력정보입니다!');
            a = 0;
        }
        if (a === 1) {
            axios.post('http://localhost:8080/member/join', null, {params: form})
                .then(() => {
                    alert('계정이 등록되었습니다. 감사합니다.');
                    navi("/");
                })
                .catch(error => console.log(error));
        }
    }


    // username 중복체크
    const checkId = () => {
        setUserNameDiv('');
        axios.get(`http://localhost:8080/member/duplicationChk?username=${username}`)
            .then(res => {
                setUserNameDiv(res.data === 'duplicate' ? '중복된 아이디입니다!' : '')
            })
            .catch(error => console.log(error));
    }

    // 비밀번호 재확인 후 submit 활성화
    const [disable, setDisable] = React.useState(false);


    useEffect(()=>{


    },[]);


    /////////////////////////////////////////////////////////////////////////////

    // 화면구성 시작
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src="../img_member/mainLogo.png" alt="logo" width="50%"/>
                        <Avatar sx={{m: 1, backgroundColor: "#B20710"}}>
                            <AccountCircleIcon fontSize={"large"} style={{backgroundColor: "#B20710"}}/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            정보입력
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="이름"
                                        name="name"
                                        value={name}
                                        onChange={inputValue}
                                        //value="휴대폰 인증정보 추출"
                                        // inputProps={
                                        //     { readOnly: true, }
                                        // }
                                        onBlur={() => {
                                            if (name) {
                                                setNameDiv('');
                                            }
                                        }}
                                    />
                                </Grid>
                                <div style={{width: "90%"}}>
                                    <div id="nameDiv" style={{
                                        marginLeft: "60px",
                                        color: "#B20710",
                                        fontSize: "10pt",
                                        textAlign: "center"
                                    }}>{nameDiv}</div>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        label="휴대폰"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={inputValue}
                                        // inputProps={
                                        //     { readOnly: true, }
                                        // }
                                        onBlur={() => {
                                            if (name) {
                                                setPhoneNumDiv('');
                                            }
                                        }}
                                    />
                                </Grid>
                                <div style={{width: "90%"}}>
                                    <div id="phoneNumDiv" style={{
                                        marginLeft: "60px",
                                        color: "#B20710",
                                        fontSize: "10pt",
                                        textAlign: "center"
                                    }}>{phoneNumDiv}</div>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="birth"
                                        label="생년월일"
                                        name="birth"
                                        value={birth}
                                        onChange={inputValue}
                                        // inputProps={
                                        //     { readOnly: true, }
                                        // }
                                        onBlur={() => {
                                            if (name) {
                                                setBirthDiv('');
                                            }
                                        }}
                                    />
                                </Grid>
                                <div style={{width: "90%"}}>
                                    <div id="birthDiv" style={{
                                        marginLeft: "60px",
                                        color: "#B20710",
                                        fontSize: "10pt",
                                        textAlign: "center"
                                    }}>{birthDiv}</div>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="username"
                                        label="아이디"
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={inputValue}
                                        onBlur={checkId}
                                        autoComplete="id" // 최근에 입력한거 보여줌
                                    />
                                </Grid>
                                <div style={{width: "90%"}}>
                                    <div id="userNameDiv" style={{
                                        marginLeft: "60px",
                                        color: "#B20710",
                                        fontSize: "10pt",
                                        textAlign: "center"
                                    }}>{userNameDiv}</div>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="비밀번호"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={inputValue}
                                        onBlur={() => {
                                            if (name) {
                                                setPwdDiv('');
                                            }
                                        }}
                                    />
                                </Grid>
                                <div style={{width: "90%"}}>
                                    <div id="pwdDiv" style={{
                                        marginLeft: "60px",
                                        color: "#B20710",
                                        fontSize: "10pt",
                                        textAlign: "center"
                                    }}>{pwdDiv}</div>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="passwordChk"
                                        label="비밀번호 확인"
                                        type="password"
                                        id="passwordChk"
                                        value={pwdChkVal}
                                        onChange={(e) => {
                                            if (password !== e.target.value) {
                                                setPwdChkDiv('비밀번호가 일치하지 않습니다.');
                                                setDisable(true);
                                            } else {
                                                setPwdChkDiv('');
                                                setDisable(false);
                                            }
                                        }}
                                    />
                                </Grid>
                                <div style={{width: "90%"}}>
                                    <div id="pwdChkDiv" style={{
                                        marginLeft: "60px",
                                        color: "#B20710",
                                        fontSize: "10pt",
                                        textAlign: "center"
                                    }}>{pwdChkDiv}</div>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="이메일"
                                        name="email"
                                        value={email}
                                        onChange={inputValue}
                                        autoComplete="email"
                                        onBlur={() => {
                                            if (name) {
                                                setEmailDiv('');
                                            }
                                        }}
                                    />
                                </Grid>
                                <div style={{width: "90%"}}>
                                    <div id="emailDiv" style={{
                                        marginLeft: "60px",
                                        color: "#B20710",
                                        fontSize: "10pt",
                                        textAlign: "center"
                                    }}>{emailDiv}</div>
                                </div>
                            </Grid>
                            <Button
                                id="joinBtn"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, backgroundColor: "#B20710"}}
                                disabled={disable}
                            >
                                회원가입
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        등록하신 계정이 있나요?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default JoinForm;