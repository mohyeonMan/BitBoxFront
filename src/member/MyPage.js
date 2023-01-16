import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {removeCookieToken} from "src/member/storage/Cookie";

const MyPage = () => {

    const navi = useNavigate();

    const [status, setStatus] = useState({});

    const tokenVal = localStorage.getItem('accessToken');
    const expireTime = localStorage.getItem('expirationTime');

    useEffect(()=> {

        axios.get("/member/me", {
            headers: {
                Authorization: `Bearer ${tokenVal}`
            }
        }).then(res => {
            console.log(res.data)
            setStatus(res.data)

        }).catch(error => {
            console.log(error.response);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expireTime');
            removeCookieToken();
            navi("/member/loginForm");
        })

    }, [])

    return (
        <div>
            <h1>마이페이지</h1>
            <input type='text' value={status.id} /><br/>
            <input type='text' value={status.username} /><br/>
            <input type='text' value={status.name} /><br/>
            <input type='text' value={status.email} /><br/>
            <input type='text' value={status.phoneNumber} /><br/>
            <input type='text' value={status.roleType} /><br/>

        </div>
    );
};

export default MyPage;