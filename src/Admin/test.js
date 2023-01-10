import React, {useState} from 'react';
import axios from "axios";
function Test(props) {
    const [list,setList] = useState([]);
    const [moviecdNum,setMoviecdNum] = useState('');
    /* movieapi */
const te = () =>{
    const url = 'movieapi/v1/search/movie.json';
    axios.get( url,{
            params:{query: moviecdNum},
            headers: {
                'X-Naver-Client-Id': '_g6JfZzkITAmkjoExZi8',
                'X-Naver-Client-Secret': 'SqBOobPA63',
                'Accept': '*/*',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
        }).then((res) => setList(res.data.items))
}
    return (
        <div>
            <table border={13}>
                <tr>
                    <input id={moviecdNum} onChange={(e)=>setMoviecdNum(e.target.value)}/>
                </tr>
                <tbody>
                {
                    list.map((item)=>{
                        return(
                            <tr key={item.title}>
                                <td>{item.title}</td>
                                <img src={item.image} alt={item.title}></img>
                            </tr>
                            )

                        }

                    )
                }
                </tbody>
            </table>
            <button onClick={te} >클릭</button>
        </div>
    );
}

export default Test;

/* as been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. */