import React from 'react';
import { useNavigate} from "react-router-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import JoinForm from "../member/JoinForm";
import LoginForm from "../member/LoginForm";
import Member from "../member/Member";
import AuthPopUpPage from "../member/memberComponents/AuthPopUpPage";
const Main = () => {
    const navigate = useNavigate();
    const tt = () =>{
        navigate('/adminindex/app')
    }
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path='/' element={<Member/>}/>
                    <Route path='/member/joinForm' element={<JoinForm/>}/>
                    <Route path='/member/loginForm' element={<LoginForm/>}/>
                    <Route path='/member/memberComponents/AuthPopUpPage' element={<AuthPopUpPage/>}/>
                </Routes>
            </>
        <div>
            Index
            <button onClick={tt}>
                rr
            </button>
        </div>
        </BrowserRouter>
    );
};

export default Main;