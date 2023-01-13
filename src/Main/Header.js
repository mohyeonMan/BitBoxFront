import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Header.css';
import logo from './img/mainLogo.png';
import loginIcon from './img/login.png';
import signupIcon from './img/join.png';
import mypageIcon from './img/my.png';
import supportIcon from './img/service-center.png';
import searchIcon from './img/search.png';
<<<<<<< HEAD
import {useDispatch, useSelector} from "react-redux";
import {getCookieToken, removeCookieToken, setRefreshToken} from "src/member/storage/Cookie";
import {DELETE_TOKEN, SET_TOKEN} from "src/member/store/AccessToken";
import axios from "axios";
import HeaderModal from './HeaderModal';

=======
import {getCookieToken, removeCookieToken} from "src/member/storage/Cookie";
>>>>>>> refs/remotes/origin/develop

const Header = () => {
    const [searchKey, setSearchKey] = useState('');
    const navigate = useNavigate();
    const handleSearchKeyChange = (e) => {
        setSearchKey(e.target.value);
    }

    const handleSearchKeySubmit = (e) => {
        e.preventDefault();
        navigate(`/search?key=${searchKey}`);
    }
    const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
    const [ScrollActive, setScrollActive] = useState(true);

    function handleScroll() {
        if (ScrollY > 200) {
            setScrollY(window.pageYOffset);
            setScrollActive(false);
        } else {
            setScrollY(window.pageYOffset);
            setScrollActive(true);
        }
    }

    useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", handleScroll);
        } //  window 에서 스크롤을 감시 시작
        scrollListener(); // window 에서 스크롤을 감시
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }; //  window 에서 스크롤을 감시를 종료
    });

<<<<<<< HEAD
    
=======
>>>>>>> refs/remotes/origin/develop

    return (
        <div className='asdf1234'>
        <header>
            <div id="title-bar">
                <div className="container55">
                    <div>
                        <a href={'/'}><img src={logo} alt="CGV 로고" /></a>
                        <span>비이트바악스</span>
                    </div>
                    {/* <img src="https://img.cgv.co.kr/WingBanner/2022/0303/16462658373950.png" alt="현대M포인트" width="136px" height="39px"/> */}
                    <UserNavList />
                </div>
            </div>


            <div className={ScrollActive ? "fixedBox fixed" : "fixedBox"}>
<<<<<<< HEAD
                {ScrollActive ?
                    <div id="nav-bar">
                        <nav className="container">
                            <MovieNavList />
                            <form onSubmit={handleSearchKeySubmit}>
                                <input type="text" value={searchKey} onChange={handleSearchKeyChange} placeholder="장화신은 고양이" />
                                <button type="submit">
                                    <img src={searchIcon} alt="검색 아이콘" />
                                </button>
                            </form>
                        </nav>
=======
                        {ScrollActive ? 
                                <div id="nav-bar">
                                <nav className="container55">
                                    <MovieNavList />
                                    <form onSubmit={handleSearchKeySubmit}>
                                        <input type="text" value={searchKey} onChange={handleSearchKeyChange} placeholder="장화신은 고양이"/>
                                        <button type="submit">
                                            <img src={searchIcon} alt="검색 아이콘" />
                                        </button>
                                    </form>
                                </nav>
                            </div>
                                : 
                                <div className="nav-fixed">
                                   <a href={'/'}><img src={logo} alt="CGV" width="130px" /></a>
                                    <ul className="nav_menu">
                                    
                                        <li>
                                            <h2><Link to={"/movielistmain"}>영화</Link></h2>
                                        </li>
                                        <li>
                                            <h2><a>극장</a></h2>                                               
                                        </li>
                                        <li>
                                            <h2><Link to={"/user/calendar"}>예매</Link></h2>
                                        </li>
                                        <li>
                                            <h2><Link to={"/store/"}>스토어</Link></h2>
                                        </li>
                                        <li>
                                            <h2><a>이벤트</a></h2>                                             
                                        </li>
                                        <li>
                                            <h2><a>혜택</a></h2>                                            
                                        </li>
                                    </ul>                                
                                    
                                </div>}
>>>>>>> refs/remotes/origin/develop
                    </div>
                    :
                    <div className="nav-fixed">
                        <a href={'/'}><img src={logo} alt="CGV" width="130px" /></a>
                        <ul className="nav_menu">

                            <li>
                                <h2><a>영화</a></h2>
                            </li>
                            <li>
                                <h2><a>극장</a></h2>
                            </li>
                            <li>
                                <h2><a><strong>예매</strong></a></h2>
                            </li>
                            <li>
                                <h2><a>스토어</a></h2>
                            </li>
                            <li>
                                <h2><a>이벤트</a></h2>
                            </li>
                            <li>
                                <h2><a>혜택</a></h2>
                            </li>
                        </ul>

                    </div>}
            </div>


        </header>
        </div>
    );
};

const UserNavList = () => {

<<<<<<< HEAD
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (getCookieToken()) {
            setIsLogin(true);
        }
    },[])

    // 로그아웃
    const logoutHandler = () => {
        dispatch(DELETE_TOKEN()); // accessToken 삭제
        removeCookieToken(); // refreshToken 삭제
        alert("로그아웃");
        window.location.replace("/");
    }


     const accessToken = useSelector(state => state);
    console.log(accessToken)
    // 서버에 리프레시 토큰을 보내고 엑세스토큰 재발급하기

/*    useEffect(() => {
        axios.post(`http://localhost:3000/auth/reIssue`, {
            refreshToken: getCookieToken()
        }).then(res => {
            if (res.data) {
                console.log("재발급 : " + res.data);
                setRefreshToken(res.data.refreshToken);
                dispatch(SET_TOKEN(res.data.accessToken));
            }
        })
    }, [getCookieToken()]); */



    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };
=======
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (getCookieToken()) {
            setIsLogin(true);
        }
    },[])

    // 로그아웃
    const logoutHandler = () => {
        sessionStorage.removeItem("userName");
        localStorage.removeItem("accessToken"); // 엑세스토큰 삭제
        localStorage.removeItem('expireTime'); // 만료시간 삭제
        removeCookieToken(); // refreshToken 삭제
        alert("로그아웃");
        window.location.replace("/");
    }
>>>>>>> refs/remotes/origin/develop

    return (
        <ul>
            <li>
                {!isLogin &&
                    <a>
                        <img src={loginIcon} alt="로그인 아이콘" />
                        <span><Link to={'/member/loginForm'}>로그인</Link></span>
                    </a>
                }
            </li>
            <li>
                {isLogin &&
                    <a>
                        <img src={loginIcon} alt="로그인 아이콘" />
                        <span><button onClick={logoutHandler}>로그아웃</button></span>
                    </a>
                }
            </li>
            <li>
                <a>
                    <img src={loginIcon} alt="로그인 아이콘" />
                    <span><Link to={'/adminindex/app'}>관리자로그인</Link></span>
                </a>
            </li>
            <li>
<<<<<<< HEAD
                {!isLogin &&
                    <a>
                        <img src={signupIcon} alt="회원가입 아이콘" />
                        <span><Link to={'/member/joinForm'}>회원가입</Link></span>
                    </a>
                }
=======
                <a>
                    <img src={loginIcon} alt="로그인 아이콘"/>
                    <span><Link to={'/test'}>Test</Link></span>
                </a>
>>>>>>> refs/remotes/origin/develop
            </li>
            <li>
<<<<<<< HEAD
                {isLogin &&
                    <a>
                        <img src={mypageIcon} alt="마이페이지 아이콘" />
                        <button onClick={showModal}>MY BITBOX</button>
                        {modalOpen && <HeaderModal setModalOpen={setModalOpen} />}
=======
                {!isLogin &&
                    <a>
                        <img src={signupIcon} alt="회원가입 아이콘" />
                        <span><Link to={'/member/joinForm'}>회원가입</Link></span>
                    </a>
                }
            </li>
            <li>
                {isLogin &&
                    <a>
                        <img src={mypageIcon} alt="마이페이지 아이콘" />
                        <span><Link to={'/member/mypage'}>MY BITBOX</Link></span>
>>>>>>> refs/remotes/origin/develop
                    </a>
                }
            </li>
            <li>
                <a>
                    <img src={supportIcon} alt="고객센터 아이콘" />
                    <span>고객센터</span>
                </a>
            </li>
        </ul>
    );
};

const MovieNavList = () => {
    return (
        <ul>
            <li><Link to={"/movielistmain"}>영화</Link></li>
            <li><a>극장</a></li>
            <li><Link to={"/user/calendar"}>예매</Link></li>
            <li><a>스토어</a></li>
            <li><a>이벤트</a></li>
            <li><a>혜택</a></li>
        </ul>
    );
};

export default Header;
