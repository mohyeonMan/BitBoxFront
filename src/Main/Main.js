import React,{ useState, useEffect } from 'react'
import Layout from './Layout';
import SlideBox from './SlideBox';
import './Main.css';


const Main = () => {

    const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
    const [ScrollActive, setScrollActive] = useState(false);
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
    const [mutedVideo, setMutedVideo] = useState(true);
    const video = document.getElementById('video'); 
    
    return (
        <Layout>
            <main>
                <article>
                    <div className="movie-wrap">
                        <video id="video" src="https://adimg.cgv.co.kr/images/202212/PussinBoots/1080x608.mp4" autoPlay muted={mutedVideo}>
                            <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions"/>
                        </video>

                        <div className="movieSelection_video_controller_wrap">
                            <a href="http://ad.cgv.co.kr/click/CGV/CGV_201401/main@MovieSelection2021?ads_id%3d47137%26creative_id%3d66867%26click_id%3d87230%26maid%3D%26event%3d" id="ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL" className="btn_movieSelection_detailView">상세보기</a>
                            <a href="#none" id="pause" className="btn_movieSelection_pause" onClick={() => video.pause()}>Pause</a>
                            <a href="#none" id="play" className="btn_movieSelection_play" onClick={() => video.play()}>Play</a>
                            {mutedVideo === true?
                            <a href="#none" id="mute" className="btn_movieSelection_soundOn" onClick={() => setMutedVideo(false)}>Sound On</a>:
                            <a href="#none" id="mute" className="btn_movieSelection_soundOff" onClick={() => setMutedVideo(true)}>Sound Off</a>}
                            <input name="ctl00$PlaceHolderContent$AD_CNT_URL" type="hidden" id="ctl00_PlaceHolderContent_AD_CNT_URL" value="http://ad.cgv.co.kr/NetInsight/imp/CGV/CGV_201401/main@MovieSelection2021?ads_id%3d47137%26creative_id%3d66867"/>
                        </div>
                    </div>
                    
                    <div className="container">
                        <header>
                            <div className="tabBtn_wrap">
                                <h3><a href="#none" className="active" id="btnMovie">무비차트</a></h3>
                                <h3><a href="#none" id="btnReserMovie">상영예정작</a></h3>
                            </div>
                            <a>전체보기</a>
                        </header>
                        
                        <SlideBox />
                    </div>
                </article>

                <div className="container">
                
                <div className="event_title_wrap">
                    <h3>EVENT</h3>
                    <a href="/culture-event/event/defaultNew.aspx" id="btn_allView_Event" className="btn_allView">전체보기</a>
                    <a href="#none" className="btn_eventControl active">playStop</a>
                </div>
                
                
                    <div className="event_list_wrap">
                        <div className="article-contents">
                            <img src="https://img.cgv.co.kr/WebApp/contents/eventV4/36039/16710664376680.jpg" alt={""} width="300px"/>
                            <strong>[아바타: 물의 길]필름마크</strong>
                            <span>2022.12.16~2023.01.08</span>
                        </div>
                        <div className="article-contents">
                            <img src="https://img.cgv.co.kr/WebApp/contents/eventV4/36040/16710665279180.jpg" alt={""} width="300px"/>
                            <strong>[영웅]필름마크</strong>
                            <span>2022.12.16~2023.01.08</span>
                        </div>
                        <div className="article-contents">
                            <img src="https://img.cgv.co.kr/WebApp/contents/eventV4/35945/16698866520870.jpg" alt={""} width="300px"/>
                            <strong>BITBOX VIP PLAY</strong>
                            <span>2022.12.16~2023.02.08</span>
                        </div>
                        
                    </div>
                    </div>

                    <div className="specialHall_wrap">
                        <div className="contents">
                            <div className="specialHall_title_wrap">
                                <h3>특별관</h3>
                                <a href="http://www.cgv.co.kr/theaters/special/defaultNew.aspx" id="btn_allView_Special" className="btn_allView">전체보기</a>
                            </div>

                            <div className="specialHall_content">
                                <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=8" id="ctl00_PlaceHolderContent_specialHall_link" className="specialHall_link">
                                    <div className="img_wrap" data-scale="false">
                                        <img src="https://img.cgv.co.kr//Front/Main/2021/1130/16382612660560.png" id="ctl00_PlaceHolderContent_specialHall_img" alt="CINE de CHEF"/>

                                    </div>
                                </a>
                                
                                <ul className="specialHall_list">
                                    
                                    <li className="">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=7">
                                            <strong>SUITE CINEMA</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#호텔 컨셉의 프리미엄관</span>
                                            </div>
                                        </a>
                                    </li>
                                    
                                    <li className="">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=14">
                                            <strong>CINE &amp; LIVINGROOM</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#신개념 소셜 상영관</span>
                                            </div>
                                        </a>
                                    </li>
                                    
                                    <li className="">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=2">
                                            <strong>4DX</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#모션시트 #오감체험</span>
                                            </div>
                                        </a>
                                    </li>
                                    
                                    <li className="active">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=8">
                                            <strong>CINE de CHEF</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#쉐프가 있는 영화관</span>
                                            </div>
                                        </a>
                                    </li>                                   
                                </ul>                               
                            </div>
                            {/* <img src={"./img/CGV.png"} alt="cgv" id="cgv"/> */}
                        </div>
                    </div>

                    <div className={ScrollActive ? "fixedBox fixed" : "fixedBox"}>
                        {ScrollActive ? 
                                <div className="fixedBtn_wrap">
                                    <a href="/ticket/" className="btn_fixedTicketing">예매하기</a>
                                    <a href="#none" className="btn_gotoTop">
                                        <img src="https://img.cgv.co.kr/R2014/images/common/btn/gotoTop.png" alt="최상단으로 이동"/></a>
                                </div> 
                                : 
                                <div className="fixedBtn_wrap topBtn">
                                    <a href="/ticket/" className="btn_fixedTicketing">예매하기</a>
                                    <a href="#none" className="btn_gotoTop">
                                    <img src="https://img.cgv.co.kr/R2014/images/common/btn/gotoTop.png" alt="최상단으로 이동"/></a>
                                </div>}
                    </div>
            </main>
            <footer>
                <div className="img-wrapper">     
                    <img src="http://adimg.cgv.co.kr/images/202212/heydealer/980x240.png" alt="광고-CGV 기프트 카드" border="0"/>
                </div> 
                <ul className="policy_list">
                    <li><a href="http://corp.cgv.co.kr/company/" rel="noreferrer" target="_blank">회사소개</a></li>
                    <li><a href="http://corp.cgv.co.kr/company/ir/financial/financial_list.aspx" rel="noreferrer" target="_blank">IR</a></li>
                    <li><a href="http://corp.cgv.co.kr/company/recruit/step/default.aspx" rel="noreferrer" target="_blank">채용정보</a></li>
                    <li><a href="http://corp.cgv.co.kr/company/advertize/ad_Default.aspx" rel="noreferrer" target="_blank">광고/제휴/출점문의</a></li>
                    <li><a href="http://www.cgv.co.kr/rules/service.aspx">이용약관</a></li>
                    <li><a href="http://www.cgv.co.kr/rules/organized.aspx">편성기준</a></li>
                    <li><a href="http://www.cgv.co.kr/rules/privacy.aspx"><strong>개인정보처리방침</strong></a></li>
                    <li><a href="http://www.cgv.co.kr/rules/disclaimer.aspx">법적고지</a></li>
                    <li><a href="http://www.cgv.co.kr/rules/emreject.aspx">이메일주소무단수집거부</a></li>
                    <li><a href="http://corp.cgv.co.kr/company/ethicalManagement/ceoMessage.aspx" rel="noreferrer" target="_blank">윤리경영</a></li>
                    <li><a href="/company/cyberAudit.aspx" className="empha-red">사이버감사실</a></li>
                </ul>

                <article className="company_info_wrap">
                    <section className="company_info">
                        <address>(04377)서울특별시 용산구 한강대로 23길 55, 아이파크몰 6층(한강로동)</address>
                        <dl className="company_info_list">
                            <dt>대표이사</dt>
                            <dd>허민회</dd>
                            <dt>사업자등록번호</dt>
                            <dd>104-81-45690</dd>
                            <dt>통신판매업신고번호</dt>
                        </dl>
                        <dl className="company_info_list">
                            <dt>호스팅사업자</dt>
                            <dd>CJ올리브네트웍스</dd>
                            <dt>개인정보보호 책임자</dt>
                            <dd>심준범</dd>
                            <dt>대표이메일</dt>
                            <dd>cjcgvmaster@cj.net</dd>
                            
                        </dl>
                        <p>© CJ CGV. All Rights Reserved</p>
                    </section>
                </article>
            </footer>
        </Layout>
    );
};

export default Main;
