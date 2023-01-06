import React, {useEffect, useState} from 'react';
import axios from "axios";

const MyPage = () => {

    const [status, setStatus] = useState({});

    const tokenVal = localStorage.getItem('token');
    const expireTime = localStorage.getItem('expirationTime');
    useEffect(()=> {

        axios.get("/member/me", {
            headers: {
                Authorization: `Bearer ${tokenVal}`
            }
        }).then(res => {
            console.log(res.data)
            setStatus(res.data)
        })

    }, [])

    return (
        <div>
            <h1>마이페이지</h1>
            <h1>토큰값 : {tokenVal}</h1>
            <h1>토큰 만료시간 : {expireTime}</h1>
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