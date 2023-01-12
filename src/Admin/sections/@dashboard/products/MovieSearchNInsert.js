import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import {useEffect, useState} from "react";
import axios from "axios";

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});
// ----------------------------------------------------------------------
/*  String movie_number = page 이동할때 number부여로 페이지이동
String movie_title = 영화제목 네이버
String movie_subtitle = 영화 부제목 네이버
String movie_poster_url = 전체영화, 영화소개에 들어가는 영화poster https://www.themoviedb.org/ poster_path
String movie_header_url = 영화소개에 들어가는 background poster https://www.themoviedb.org/ backdrop_path
int movie_already_released = 영화 개봉중/개봉예정을 구분 https://www.themoviedb.org/ status Released
String movie_release_start = 영화개봉날짜 https://www.themoviedb.org/ release_date
String movie_release_end = 영화개봉종료 https://www.themoviedb.org/ release_date+1month
String movie_class = class로 나눠서 타입별 영화탭 구분. default
String movie_agegrade = 영화나이제한 https://www.themoviedb.org/ adult
int movie_like = 좋아요 갯수 (쓰지않을 예정이지만 추가는 해놓음)
String movie_reserve_rate = 예매율 순위대로 리스트나열예정 // 예매테이블
String movie_score = 영화소개부분의 영화평점 네이버 userRating
String movie_ranking = 영화소개부분의 영화순위 score 값으로 순위
String movie_totalspactators = 영화소개부분의 총관람인원 //ㅇㅖ매 횟수로 해야될듯함
String movie_info_title = 영화소개부분의 영화소개 부분1 https://www.themoviedb.org/ overview
String movie_info_title2 = 영화소개부분의 영화소개 부분2 https://www.themoviedb.org/ overview
--영화소개를 1,2로 나눈 이유는 각 들어가는 css가 다름--
String movie_info_type = 영화소개부분의 영화 타입 https://www.themoviedb.org/
String movie_info_point = 영화소개에 들어갈그래프의 일종.  데이터가있어야 그래프가 완성됨.  */
export default function MovieSearchNInsert() {
    const [status,setStatus] = useState(false)
    const [moviecdNum,setMoviecdNum] = useState('')
    const [movieSearchData,setMovieSearchData] = useState([])
    const [setQuery, setSetQuery] = useState('')
    const[imgUrl,setImgUrl] = useState('')
    const {title}  = movieSearchData;
    const[findname,setFindname]=useState('')
    const url = '../movieapi/v1/search/movie.json';
    const url1 = '../moviesearch/movie?api_key=574ef45c366822b07b3a7f5799a6b116';
    const url2 = `../movieapp/${setQuery}?api_key=574ef45c366822b07b3a7f5799a6b116`;
    //네이버 영화 api
    const onSearch = () =>{
        axios.get(url,{
            params:{query: moviecdNum,language: "ko"},
            headers: {
                'X-Naver-Client-Id': '_g6JfZzkITAmkjoExZi8',
                'X-Naver-Client-Secret': 'SqBOobPA63',
                'Accept': '*/*',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
         }).then(res => res.data.items.length === 0 ? alert("데이터 없음")|| setStatus(false)
                                                    : setMovieSearchData(res.data.items)||setStatus(true)
                )


    }

    // 이미지 불러오기
    useEffect(()=>{
    axios.get(url1, {
        params: {query: moviecdNum,language: "ko"},
        headers: {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
        },
    }).then((res) => {
            if (res.data.results.length > 0) {
                setSetQuery(res.data.results[0].id)
            }
            else {
                alert("다시검색")
            }
        }
    )},[movieSearchData])

    useEffect(()=>{
        axios.get(url2, {
            params:{language: "ko"},
            headers: {
                'Accept': '*!/!*',
                'Access-Control-Allow-Origin': '*',
            },
       }).then(res => setImgUrl(`https://www.themoviedb.org/t/p/w600_and_h900_bestv2`+res.data.poster_path))
    },[setQuery])
    const insertMovie = () => {
        axios.post()
    }


    return (
        <>
            {/* status === true ? movieSearchData[0].title.replace('<b>','').replace('</b>','') : "" */}
            <div id={findname} >{JSON.stringify(movieSearchData)}</div>
            {   status === true ?
        <Card sx={{width:300,height:500}}>
            <Box sx={{ position: 'relative'}}>
                <Label
                variant="filled"
                color={(status === 'sale' && 'error') || 'info'}
                sx={
                    {
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                    }
                    }
                >
                </Label>
                <StyledProductImg alt={name} src={imgUrl} sx={{
                    display: 'inline-block',
                    width: '100%',
                    height: '500px',
                    overflow: 'hidden',
                    objectFit: 'cover',
                    borderRadius: '5px'
                }}/>
                </Box>
            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                    <Typography variant="subtitle2" noWrap>
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {/* <ColorPreview colors={colors} /> */}
                    <Typography variant="subtitle1">
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                                textDecoration: 'line-through',
                            }}
                        >
                        </Typography>
                        &nbsp;
                    </Typography>
                </Stack>
            </Stack>
        </Card>
                : ""}

        <input id={moviecdNum} onChange={(e)=>setMoviecdNum(e.target.value)}/>
            <button onClick={onSearch}>검색</button>
            <button onClick={insertMovie}>추가</button>
        </>
    );
}
