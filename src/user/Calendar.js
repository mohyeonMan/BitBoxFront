import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../css/calendar.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ko } from "date-fns/esm/locale";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import {useNavigate} from "react-router-dom";
import Hours from "./Hours";
import '../css/hour.css'






const Calendar = () => {

    const navigate = useNavigate();

    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [movieName, setMovieName] = useState();
    const [cityName, setCityName] = useState();
    const [cinemaName, setCinemaName] =useState();
    const [hidden, setHidden] =useState(false);


    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];


    const[ list4, setList4]=useState([])
    const findTime = (e) => {
        setHidden(true)
        const cinemaName = e.target.id
        setCinemaName(cinemaName)
        axios.post(`http://localhost:8080/book/timeList?movie_date=${dsd}&movie_title=${movieName}&movie_city=${cityName}&movie_cinema=${cinemaName}`)
            .then(res=>setList4(res.data))
            .catch(error => console.log(error))
    }



    const[ list3, setList3]=useState([])
    const result3 = list3.filter((item1, idx1)=>{
        return list3.findIndex((item2, idx2)=>{
            return item1.movie_cinema === item2.movie_cinema;
        }) === idx1;
    });

    const findCinema = (e) => {
        setHidden(false)
        const cityName = e.target.id
        setCityName(cityName)
        axios.post(`http://localhost:8080/book/cinemaList?movie_date=${dsd}&movie_title=${movieName}&movie_city=${cityName}`)
            .then(res=>setList3(res.data))
            .catch(error => console.log(error))
    }
    function isSeoul(element)  {
        if(element.movie_city === '서울')  {
            return true;
        }
    }

    function isGyung(element)  {
        if(element.movie_city === '경기')  {
            return true;
        }
    }

    const[ list2, setList2]=useState([])

    const result2 = list2.filter((item1, idx1)=>{
        return list2.findIndex((item2, idx2)=>{
            return item1.movie_city === item2.movie_city;
        }) === idx1;
    });

    const result4 = list2.filter((item1, idx1)=>{
        return list2.findIndex((item2, idx2)=>{
            return item1.movie_cinema === item2.movie_cinema;
        }) === idx1;
    });
    const seoul = result4.filter(isSeoul)
    const gyung = result4.filter(isGyung)
    const findCity = (e) => {
        setHidden(false)
        const movieName = e.target.id
        setMovieName(movieName)
        axios.post(`http://localhost:8080/book/cityList?movie_date=${dsd}&movie_title=${movieName}`)
            .then(res=>setList2(res.data))
            .catch(error => console.log(error))
    }





    const offset = selectedDate.getTimezoneOffset()*60000
    const dateOffset = new Date(selectedDate.getTime()-offset)
    const dsd = dateOffset.toISOString().split("T",1)
    const[ list, setList]=useState([])

    const result = list.filter((item1, idx1)=>{
        return list.findIndex((item2, idx2)=>{
            return item1.movie_title === item2.movie_title;
        }) === idx1;
    });

    useEffect(()=>{
        setHidden(false)
        axios.post(`http://localhost:8080/book/movieList?movie_date=${dsd}`)
        .then(res=>{

            setList(res.data)
        })
        .catch(error => console.log(error))
    },[selectedDate])

    const renderHeader = () => {
        return (
            <div className="calendar-header">

                <div className="calendar-week">
                    {currentWeek.getFullYear()}년 {months[currentWeek.getMonth()]} {currentWeek.getDate()}일 -&nbsp;
                    {new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 9).getFullYear()}년 {months[new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 9).getMonth()]} {new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 9).getDate()}일
                </div>

            </div>
        );
    }

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < 10; i++) {
            const day = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + i);
            days.push(
                <button

                    className={`calendar-day ${day.toDateString() === selectedDate?.toDateString() ? 'on' : ''} ${day.getDay() === 6 ? 'blue' : ''} ${day.getDay() === 0 ? 'red' : ''}` }
                    key={day.toDateString()}
                    onClick={() => {
                        setSelectedDate(day)

                    }
                    }

                >
                    {day.getDate()} {daysOfWeek[day.getDay()]}
                </button>
            );
        }



        return<div className="calendar-days"> <button
            className='calendar-day'
            onClick={() =>{
                if(currentWeek> new Date())
                    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - 1))
            }}>
            {'<'}
            </button>

            {days}

            <button
                className='calendar-day'
                onClick={() =>{

                    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 1))
                }}>
                {'>'}
            </button>

           </div>;
    }

    return (


        <div className="container">
            <h2 className='tit2'>빠른예매</h2>
            {renderHeader()}
            <div className="calendar">
                {renderDays()}
               <DatePicker
                    locale={ko}    // 언어설정 기본값은 영어
                    dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
                    className=""    // 클래스 명 지정 css주기 위해
                    minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정
                    closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                    selected={selectedDate}
                    onChange={date => {
                        setCurrentWeek(date)
                        setSelectedDate(date)
                    }}
                />


            </div>
            <div className="box-1">
                    <p className='tit'>영화</p>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="전체">
                        {
                            result.map(item=> {
                                return (
                                    <div key={item.pk}><Badge bg={item.movie_age}>{item.movie_age}</Badge>
                                        <button
                                            id={item.movie_title}
                                            onClick={findCity}
                                        >{item.movie_title}</button></div>

                                )
                            })
                        }


                    </Tab>
                    <Tab eventKey="profile" title="큐레이션">
                        <div><button><Badge bg="12">12</Badge> 아바타: 물의길</button></div>
                        <div><button><Badge bg="12">12</Badge> 영웅</button></div>
                        <div><button><Badge bg="All">All</Badge> 러브레터</button></div>
                        <div><button><Badge bg="15">15</Badge> 올빼미</button></div>
                        <div><button><Badge bg="12">12</Badge> 스위치</button></div>
                        <div><button><Badge bg="18">18</Badge> 본즈 앤올</button></div>
                        <div><button><Badge bg="12">12</Badge> 가가린</button></div>
                        <div><button><Badge bg="15">15</Badge> 코르사주</button></div>
                        <div><button><Badge bg="15">15</Badge> 드라이브마이카</button></div>
                        <div><button><Badge bg="15">15</Badge> 견왕:이누오</button></div>
                        <div><button><Badge bg="12">12</Badge> 메모리아</button></div>

                    </Tab>

                </Tabs>

            </div>
            <div className="box-2">
                     <p className='tit'>극장</p>

                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="전체">
                        <div className='cinema-1'>
                            {
                                result2.map(item=> {
                                    return (
                                        <div key={item.pk}>
                                            <button
                                                id={item.movie_city}
                                                onClick={findCinema}
                                            >{item.movie_city}({item.movie_city === '서울'? seoul.length : gyung.length})</button></div>

                                    )
                                })
                            }
                        </div>

                        <div className='cinema-2'>
                            {
                                result3.map(item=> {
                                    return (
                                        <div key={item.pk}>
                                            <button
                                                id={item.movie_cinema}
                                                onClick={findTime}
                                            >{item.movie_cinema}</button></div>

                                    )
                                })
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="특별관">
                        <div className='cinema-1'>
                           <div><button>DOLBY CINEMA(5)</button></div>
                            <div><button>THE BOUTIGUE(9)</button></div>
                            <div> <button>MX(9)</button></div>
                        </div>
                        <div className='cinema-2'>
                        </div>
                    </Tab>

                </Tabs>





            </div>
            <div className="box-3">
                <p className='tit'>시간</p>
                <Hours />
                <div className='result' hidden={!hidden}>



                        {
                            list4.map(item=> {
                                return (
                                    <div key={item.pk}>
                                        <button
                                            id={item.movie_time}
                                            onClick={() => {

                                                navigate(`/user/get/${dsd}/${movieName}/${cityName}/${cinemaName}/${item.movie_time}/${item.movie_theater}/${item.pk}`)
                                            }}
                                        >{item.movie_time} {movieName} {cinemaName} {item.movie_theater} </button></div>

                                )
                            })
                        }




                </div>
               <div className='no-result' hidden={hidden}>
                <div className='ico-movie-time'></div>
                   <br/>
                    <p>영화와 극장을선택하시면<br/>
                    상영시간표를 비교하여볼수있습니다.</p>
               </div>



            </div>
        </div>

    );
}

export default Calendar;