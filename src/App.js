import React from 'react';
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

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/adminindex/*' element={<Adminindex />} />
            <Route path='/member' element={<Member />} />
            <Route path='/member/joinForm/*' element={<JoinForm />} />
            <Route path='/member/loginForm' element={<LoginForm />} />
            <Route path='/member/memberComponents/AuthPopUpPage' element={<AuthPopUpPage />} />
            <Route path='/member/myPage' element={<MyPage />} />
            <Route path='/user/calendar' element={<Calendar />} />
            <Route path="/user/get/:selectedDate/:movieName/:cityName/:cinemaName/:time/:theater/:pk" element={<Get/>} />
            <Route path='/test' element={<Test/>}/>


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
