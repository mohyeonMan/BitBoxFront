import React, {useEffect, useState} from 'react';
import axios from "axios";
function Test(props) {
    const [data,setData] = useState([]);
    const [moviecdNum,setMoviecdNum] = useState('');
    /* useEffect(()=>{
        const url = '"https://openapi.naver.com/v1/search/movie.json"';

        axios.get( url,{
            params:{query: moviecdNum},
            headers: {
                "X-Naver-Client-Id": '_g6JfZzkITAmkjoExZi8',
                "X-Naver-Client-Secret": 'SqBOobPA63',
            },
        })
            .then((res) =>setData(...data,res.data))

    },[]); */

    const mo = () =>{
        const ID_KEY = 'eU4Ovj922C0R4HbxeRnV';
        const SECRET_KEY = 'l4lR7UKZhF';
        const search = moviecdNum;
        try {
            if (search === "") {
                this.setState({movies: [], isLoading: false})
            } else {
                const {data: {
                    items
                }} = await axios.get('https://openapi.naver.com/v1/search/movie.json',{
                    params:{
                        query: search,
                        display: 20
                    },
                    headers: {
                        'X-Naver-Client-Id': ID_KEY,
                        'X-Naver-Client-Secret': SECRET_KEY
                    }
                });

                this.setData({movies: items, isLoading: false});
            }
        } catch (error) {
            console.log(error);
        }

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
                            <button onClick={mo} >1234</button>
                </tbody>
            </table>
        </div>
    );
}

export default Test;