import React, {useEffect, useState} from 'react';
import axios from "axios";
function Test(props) {
    const [moviecdNum, setMoviecdNum] = useState('');
    const [data, setData] = useState([])
    const [setQuery, setSetQuery] = useState('')
    const[imgUrl,setImgUrl] = useState('')
    const url = '../moviesearch/movie?api_key=574ef45c366822b07b3a7f5799a6b116';
    const url2 = `../movieapp/${setQuery}?api_key=574ef45c366822b07b3a7f5799a6b116`;
    const te = () => {
        axios.get(url, {
            params: {query: moviecdNum},
            headers: {
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
            },
        }).then((res1) => {
                if (res1.data.results.length === 1) {
                    setSetQuery(res1.data.results[0].id)
                }else if(res1.data.results.length > 1){
                    setSetQuery(res1.data.results[0].id)
                }
                else {
                    alert("다시검색")
                }
            }
            )
    }
    useEffect(()=>{
        axios.get(url2, {
            params:{language: "ko"},
            headers: {
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => console.log(JSON.stringify(res.data)))
    },[setQuery])
    /* movieapi */

        /* axios.get(url2, {
             params:{query: res1.data[0].results[0].id},
             headers: {
                 'Accept': '*!/!*',
                 'Access-Control-Allow-Origin': '*',
             },
         }).then((res) => setSrc(res.data))*/


        /* /!*      {const url = '../movieapp/all?api_key=574ef45c366822b07b3a7f5799a6b116';
         axios.get( url,{
                 headers: {
                     'Accept': '*!/!*',
                     'Access-Control-Allow-Origin':'*',
                 },
         }).then((res) => alert(JSON.stringify(res.data)))
     }   */
        return (
            <div>
                <table border={13}>
                    <tr>
                        <input id={moviecdNum} onChange={(e) => setMoviecdNum(e.target.value)}/>{setQuery}
                        <br/>
                        {/*<img src={data} alt="d"/>*/}
                        <img src={imgUrl} alt=""/>
                    </tr>
                </table>
                <button onClick={te}>클릭</button>
            </div>
        );

}
export default Test;

/* as been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. */