import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import WriteForm from '../../component/store/WriteForm.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------
// 관리자 페이지 Store List 

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 1000,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const [adminStoreList, setAdminStoreList] =useState([])
  const [storeDel ,setStoreDel] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:8080/store/getStoreList')
      .then((res) => {setAdminStoreList(res.data)})
      .catch((error) => console.log(error))
  }, []);

const adminStoreDel = (storeDel) => {
  const storeSeq = adminStoreList.filter((item)=> item.store_seq !== storeDel)
  setAdminStoreList(storeSeq)
  axios.delete(`http://localhost:8080/store/adminStoreDel?store_seq=${storeDel}`)
        .then(()=>{alert('삭제완료')})
        .catch(error => console.log(error))
}


  return (
    <>
      <Helmet>
        <title> BIT BOX | STORE </title>
      </Helmet>
      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />
        {mdUp && (
          <StyledSection style={{width:300,height:780,textAlign:'center'}}>
            <Typography variant="h3" sx={{ px: 10, mt: 1, mb: 1 }}>
            BIT
            <br/>
            STORE
            </Typography>
            {/* <img src="/assets/illustrations/illustration_login.png" alt="login" /> */}
            <img src="../../img/store22.png" alt="storeProduct" />
            <br/>
            <br/>
          </StyledSection>
        )}
        {/* <Container maxWidth="s"> */}
        <Container maxWidth="sm">
        <StyledSection style={{width:550,height:780}}>
          <WriteForm/>
          </StyledSection>
        </Container>
        <StyledSection>
         <Typography variant="h3" sx={{ px: 1, mt: 1, mb: 3 }} style={{textAlign:'center'}}>
         BIT BOX STORE | LIST
         </Typography>
        <table style={{overflowX:'scroll',height:780}}>
        <thead>
          <tr style={{fontSize:20,textAlign:'center',color:'blue'}}>
            <th>category</th>
            <th >subject</th>
            <th >content</th>
            <th >price</th>
          </tr>
        </thead>
        <tbody>
          {adminStoreList.map((item) => {
            return (
              <>
              <tr key={item.store_seq} style={{fontSize:13,border:'10px solid white' }} >
                <td align="center">{item.category}</td>
                <td align="center">{item.subject}</td>
                <td align="center">{item.content}</td>
                <td align="center">{item.price}</td>
                {/* <button onClick={adminStoreDel} >삭제</button> */}
                &nbsp;&nbsp;
                <button onClick={ () => { if (window.confirm(`${item.subject} 상품을 삭제하시겠습니까?`)){ adminStoreDel(item.store_seq); }} } style={{all:'unset',color:'red',cursor:'pointer'}} >삭제</button>
              </tr>
              </>
            )
          })}
        </tbody>
      </table>
        </StyledSection>
      </StyledRoot>
    </>
  );
}
