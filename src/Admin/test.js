import React, {useEffect, useState} from 'react';
import axios from "axios";
function Test(props) {
    const [data,setData] = useState([]);
    const [moviecdNum,setMoviecdNum] = useState(20124079)
    useEffect(()=>{
        const url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo';
        const key =  '?key=e158fbf9e424c0450708c4ea3e5bbdda';
        const movieCd = `&movieCd=${moviecdNum}`;

        axios.get( url+key+movieCd)
            .then((res) =>setData(...data,res.data.movieInfoResult.movieInfo))

    },[moviecdNum]);

    const mo =()=>{
        setMoviecdNum(moviecdNum+1)
    }
    return (
        <div>
            <table border={13}>
                {
                    console.log(data)
                }
                <thead>
                <tr>
                    <th>영화코드</th>
                    <th>영화제목</th>
                    <th>상영시간</th>
                    <th>주연</th>
                </tr>
                </thead>
                <tbody>
                            <tr>
                                <td >{JSON.stringify(data)}</td>
                            </tr>
                <button onClick={mo}>asd</button>
                </tbody>
            </table>
        </div>
    );
}

export default Test;