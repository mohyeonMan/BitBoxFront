import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setRefreshToken} from "src/member/storage/Cookie";

const theme = createTheme();


const LoginForm = () => {


    const initKakao = () => {
        const jsKey = "8645acd0e5c87d5d3a9ec02a6ab65543";
        const Kakao = window.Kakao;
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init(jsKey);
            console.log(Kakao.isInitialized());
        }
    };

    useEffect(() => {
        initKakao();
    }, []);


    const kakaoLogin = () => {
        window.Kakao.Auth.login({
            success() {
                window.Kakao.API.request({
                    url: "/v2/user/me",
                    success(res) {
                        alert(JSON.stringify(res));
                        const kakaoAccount = res.kakao_account;
                        const aaa = {
                            name: kakaoAccount.profile.nickname,
                            birth: '90'+kakaoAccount.birthday,
                            phoneNumber: '',
                            username:  kakaoAccount.email,
                            password: '1q2w3e4r',
                            email: kakaoAccount.email
                        }

                        axios.get(`http://localhost:3000/member/existName?name=${kakaoAccount.profile.nickname}`)
                            .then(res => {
                                if (res.data === 'exist') {


                                    axios.post(`http://localhost:3000/auth/login`,{
                                        username: aaa.username,
                                        password: aaa.password
                                    }).then(res => {
                                        if (res.data) {
                                            alert(JSON.stringify(res.data));
                                            setRefreshToken(res.data.refreshToken);
                                            localStorage.setItem("accessToken", res.data.accessToken);
                                            navi("/");
                                        }
                                    }).catch(error => {
                                        console.log(error.response);
                                        alert("아이디 또는 비밀번호가 틀렸습니다");
                                    })

                                } else {

                                    axios.post('http://localhost:3000/auth/signup', null, {params: aaa})
                                        .then(() => {

                                            axios.post(`http://localhost:3000/auth/login`,{
                                                username: aaa.username,
                                                password: aaa.password
                                            }).then(res => {
                                                if (res.data) {
                                                    alert(JSON.stringify(res.data));
                                                    setRefreshToken(res.data.refreshToken);
                                                    localStorage.setItem("accessToken", res.data.accessToken);
                                                    navi("/");
                                                }
                                            }).catch(error => {
                                                console.log(error.response);
                                                alert("아이디 또는 비밀번호가 틀렸습니다");
                                            })
                                        })
                                        .catch(error => console.log(error));

                                }
                            })
                            .catch(error => console.log(error));


                    },
                    fail(error) {
                        console.log(error);
                    },
                });
            },
            fail(error) {
                console.log(error);
            },
        });
    };

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const inputValue = (e) => {

        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        });

    }

    const {username, password} = form;

    const navi = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post(`http://localhost:3000/auth/login`,{
            username: form.username,
            password: form.password
        }).then(res => {
            if (res.data) {
                alert(JSON.stringify(res.data));
                setRefreshToken(res.data.refreshToken);
                localStorage.setItem("accessToken", res.data.accessToken);
                navi("/");
            }
        }).catch(error => {
            console.log(error.response);
            alert("아이디 또는 비밀번호가 틀렸습니다");
        })

    };

    return (
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
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoFocus={true}
                            id="username"
                            label="아이디"
                            name="username"
                            value={username}
                            onChange={inputValue}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={inputValue}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 1}}
                        >
                            로그인
                        </Button>
                        <Button
                            onClick={kakaoLogin}
                            fullWidth

                            >
                           <img className=''
                                src="../img_member/kakao_login_medium_wide.png"
                                alt="카카오 로그인 버튼"
                            />

                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    아이디 또는 비밀번호 찾기
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LoginForm;