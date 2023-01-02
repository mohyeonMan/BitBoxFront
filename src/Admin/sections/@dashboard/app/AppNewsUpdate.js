// @mui
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import AdminBoardModalPage from '../../../AdminBoardModal/AdminBoardModalPage'


// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};


// 공지사항 틀
export default function AppNewsUpdate({ title, subheader, list, ...other }) {

  return (
    <Card {...other}>
      {/* 공지사항  */}
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>
      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button  size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'}/>}>
        <AdminBoardModalPage/>
        {/* 모달창 AdminBoardModal */}
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  // const { image, title, description, postedAt } = news;
  // const {title, description, postedAt } = news;
  const [adminlist, setAdminList] = useState([]);

  // adminBoard/adminBoardList (get)
  useEffect(()=>{
    axios.get('http://localhost:8080/adminBoard/adminBoardList')
          .then((res)=>{setAdminList(res.data)})
          .catch((error)=>console.log(error))
  },[])


  return (
    <>
    {adminlist.map((item,index)  => {
      return(
            
        <Stack direction="row" alignItems="center" spacing={2} key={item.adminBoardSeq}>
            
            <Box sx={{ minWidth: 240, flexGrow: 1 }} >
            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
              {item.title}
            </Link>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {item.content}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
              {item.logtime}
            </Typography>
            </Stack>
            )
        })}
        </>

  );
}
