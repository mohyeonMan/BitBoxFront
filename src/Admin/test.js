import React, {useEffect, useState} from 'react';
import axios from "axios";
function Test(props) {
    const [data,setData] = useState([]);
    const [moviecdNum,setMoviecdNum] = useState('');
    /* movieapi */
const te = () =>{
    const url = 'https://openapi.naver.com/v1/search/movie.json';
    axios.get( url,{
            params:{query: moviecdNum},
            headers: {
                'X-Naver-Client-Id': '_g6JfZzkITAmkjoExZi8',
                'X-Naver-Client-Secret': 'SqBOobPA63',
                'Accept': '*/*'
            },
        })
            .then((res) =>alert(res.data))
}
    return (
        <div>
            <table border={13}>
                <tr>
                    <input id={moviecdNum} onChange={(e)=>setMoviecdNum(e.target.value)}/>
                </tr>
                <tbody>
                            <tr>
                                <td >{JSON.stringify(data)}</td>
                            </tr>
                </tbody>
            </table>
            <button onClick={te} >클릭</button>
        </div>
    );
}

export default Test;
