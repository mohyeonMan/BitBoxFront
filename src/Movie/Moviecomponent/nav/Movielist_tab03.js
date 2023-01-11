import axios from 'axios';
import React, { useState , useEffect} from 'react';
import search_icon from '../img/search_icon.png';

const Movielist_tab03 = () => {

    const [movie_count, setMovie_count] = useState(0);    
    const [list, setList] = useState([]);
    const [searchOption, setSearchOption] = useState('movie_title');
    const [keyword, setKeyword] = useState('');
    const [already_released, setAlready_released] = useState(false);

    const movie_already_released_check = () => {
        setAlready_released(!already_released)
    }

    useEffect(() => {
        axios.get(already_released ? 'http://localhost:8080/movielist/getMovieList_already_on_special' : 'http://localhost:8080/movielist/getMovieList_special')
        .then(res => {setList(res.data) 
            setMovie_count(res.data.length)})
        .catch(err => console.log(err))
    },[already_released])


    const onSearch = (e) => {
        e.preventDefault();
        axios
            .get('http://localhost:8080/movielist/Movie_search_special', {
                    params : {
                        searchOption : searchOption,
                        keyword: keyword
                    }})
            .then(res => {setList(res.data) 
                setMovie_count(res.data.length)})
            .catch(error => console.log(error))
    }
    const onSubmitSearch = (e) => {
        //키를 눌렀을 때 동작할 코드
        if (e.key === "Enter") {
        }
      };


      return (
        <div>
            <div className="Movielist_checksearch">
                <div className='Movielist_checkbox'>
                    <input type="checkbox" id="Movielist_toggle" onClick={movie_already_released_check} hidden /> 
                    <label htmlFor="Movielist_toggle" className="Movielist_toggleSwitch">
                        <span className="Movielist_toggleButton"></span>
                        <div className='Movielist_checkbox_only'>개봉작만 &nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </label>
                        <div className='Movielist_moviecount'>{movie_count} 개의 영화가 검색되었습니다.</div>
                    <div>
                        <input type="text" id='Movielist_search' name='Movielist_search' value={keyword}
                                onChange={e=> setKeyword(e.target.value)} onKeyDown={onSubmitSearch} placeholder="&nbsp;영화명 검색"/>
                        <img src={search_icon} name='search_icon' id='search_icon' alt='검색돋보기' onClick={onSearch}/>
                    </div>
                </div>
            </div>

            <div className='Movielist_movietitle'>
                {
                    list.map ((item, index) => {
                        return (
                            <ol className='Movielist_seq' key={item.movie_title}>
                                <li >
                                    <div className='Movielist_title_num'>{index+1}</div>
                                    <img className='Movielist_title_img' src={`../storage/${item.img_url}`}/>
                                    <div className='Movielist_title_area'>
                                        <img className='Movielist_grade_age' src={`../storage/${item.movie_grade}`}/>
                                        <p className='Movielist_title_maintitle'>{item.movie_title}</p>
                                    </div>
                                    <div className='Movielist_title_ratedate'>
                                        <span className='Movielist_title_rate'> 예매율 {item.movie_reserve_rate}% &nbsp; | &nbsp;</span>
                                        <span className='Movielist_title_date'> 개봉일 {item.movie_release_start}</span>
                                    </div>
                                    <div className='Movielist_Btnlist'>
                                        <button type='button' className='Movielike_Btn'> {item.movie_like}</button>
                                        <button type='button' className='Movie_Btn_reserve'> 예매 </button>
                                    </div>
                                </li>
                            </ol>
                        ) 
                    })
                }
            </div>
            
        </div>
    );
};

export default Movielist_tab03;