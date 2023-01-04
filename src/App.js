import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./Main/Main";
import Adminindex from "./adminindex";
import Member from "./member/Member";
import JoinForm from "./member/JoinForm";
import LoginForm from "./member/LoginForm";
import AuthPopUpPage from "./member/memberComponents/AuthPopUpPage";
import MyPage from "./member/MyPage";
// import AuthContext from "./member/store/auth-context";

const App = () => {

    // const authCtx = useContext(AuthContext);

    return (
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/adminindex/*' element={<Adminindex/>}/>
            <Route path='/member' element={<Member/>}/>
            <Route path='/member/joinForm' element={<JoinForm/>}/>
            <Route path='/member/loginForm' element={<LoginForm/>}/>
            <Route path='/member/memberComponents/AuthPopUpPage' element={<AuthPopUpPage/>}/>
            <Route path='/member/myPage' element={<MyPage/>}/>
        </Routes>
    );
};

export default App;
