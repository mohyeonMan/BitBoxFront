import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./Main/Main";
import Adminindex from "./adminindex";
import Member from "./member/Member";
import JoinForm from "./member/JoinForm";
import LoginForm from "./member/LoginForm";
import AuthPopUpPage from "./member/memberComponents/AuthPopUpPage";
import MyPage from "./member/MyPage";
import Calendar from "./user/Calendar";
import Test from "./Admin/test";
import Get from "src/user/Get";
import axios from "axios";
import {getCookieToken, removeCookieToken, setRefreshToken} from "src/member/storage/Cookie";
import WriteForm from './component/store/WriteForm';
import List from './component/store/List';
import View from './component/store/View';
import StoreCart from './component/store/StoreCart';
import StorePayment from './component/store/StorePayment';
import PayComplete from './component/store/PayComplete';
import StorePay from './component/store/StorePay';
import Movielist_master from './Movie/Moviecomponent/main/Movielist_master';
import Movielist_master_write from './Movie/Moviecomponent/nav/Movielist_master_write';
import Movielist_master_list from './Movie/Moviecomponent/nav/Movielist_master_list';
import Movielist_master_delete from './Movie/Moviecomponent/nav/Movielist_master_delete';
import Movielistmain from './Movie/Moviecomponent/main/Movielistmain';
import FindIdPasswordRoutes from "src/member/FindIdPasswordRoutes";
import FindPwdAndChange from "src/member/FindPwdAndChange";
import Success from './user/Success';
import Get2 from "src/user/Get2";
import LoginForm2 from "src/member/LoginForm2";
import Reservation from './Main/Reservation';
import EditProfile from './Main/EditProfile';

const App = () => {

    const accessTokenVal = localStorage.getItem('accessToken');
    const refreshTokenVal = getCookieToken();

    // 토큰재발급
    useEffect(() => {
        axios.post("/auth/reIssue", {
            accessToken: accessTokenVal,
            refreshToken: refreshTokenVal
        }).then(res => {
            if (res.data) {
                setRefreshToken(res.data.refreshToken); // 쿠키에 리프레시토큰 저장
                localStorage.setItem("accessToken", res.data.accessToken); // 로컬스토리지에 엑세스 토큰 저장
                localStorage.setItem("expireTime", res.data.tokenExpiresIn); // 엑세스토큰 만료시간 저장
            }
        }).catch(error => {
            console.log("토큰 재발급 에러(로그인하면 안떠요)" + error.response);
        })
    }, [])


    // 토큰 만료시간 체크
    useEffect(()=> {

        axios.get("/member/me", {
            headers: {
                Authorization: `Bearer ${accessTokenVal}`
            }
        }).then(res => {
            sessionStorage.setItem("userName", res.data.username);
            sessionStorage.setItem("birth", res.data.birth);
            console.log(res.data.name)
        }).catch(error => {
            console.log("(토큰 만료시간(10분)되면 자동 로그아웃)에러 로그인하면 사라져요! " + error.response);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expireTime');
            removeCookieToken();
        })

    }, [])

    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/adminindex/*' element={<Adminindex />} />
            <Route path='/member' element={<Member />} />
            <Route path='/member/joinForm/*' element={<JoinForm />} />
            <Route path='/member/loginForm' element={<LoginForm />} />
            <Route path='/member/loginForm2' element={<LoginForm2/>} />
            <Route path='/myPage/reservation' element={<Reservation />} />
            <Route path='/myPage/editProfile' element={<EditProfile />} />
            <Route path='/member/FindIdPasswordRoutes/*' element={<FindIdPasswordRoutes />} />
            <Route path='/member/findPwdAndChange' element={<FindPwdAndChange />} />
            <Route path='/member/memberComponents/AuthPopUpPage' element={<AuthPopUpPage />} />
            <Route path='/member/myPage' element={<MyPage />} />
            <Route path='/user/calendar' element={<Calendar />} />
            <Route path="/user/get/:pk" element={<Get/>} />
            <Route path="/user/get2/:pk" element={<Get2/>} />


            <Route path='/test' element={<Test/>}/>
            <Route path='/success' element={<Success/>}/>


            {/* store */}
            <Route path='/store/writeForm' element={<WriteForm/>}></Route>
            <Route path='/store/*' element={<List/>}></Route>
            <Route path='/store/view/:store_seq' element={<View/>}></Route>
            <Route path='/store/cart' element={<StoreCart/>}></Route>
            <Route path='/store/pay/:store_seq' element={<StorePayment/>}></Route>
            <Route path='/store/paycomplete/:orderNumber' element={<PayComplete/>}></Route>
            <Route path='/store/pay' element={<StorePay/>}></Route>

            {/* movie */}
            <Route path='/movielistmain' element={ <Movielistmain/>}/>
            <Route path='/master' element={ <Movielist_master/>}/>
            <Route path='/master/write' element={ <Movielist_master_write/>}/>
            <Route path='/master/list' element={<Movielist_master_list/>}/>
            <Route path='/master/delete' element={<Movielist_master_delete/>}/>

        </Routes>
    );
};

export default App;
