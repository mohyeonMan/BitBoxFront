import React, { useEffect, useState } from 'react';
import StoreHeader from './StoreHeader';
import completeStyles from '../../css/PayComplete.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import crypto from 'crypto-js';
import Header from 'src/Main/Header';

const finErrCode = 404;
const date = Date.now().toString();

const PayComplete = () => {


    const serviceId = 'ncp:sms:kr:299193861317:projectsmssend';
    const secretKey = 'TOrOHYfInT7i38cPqTcDX5ndw2mRV0aJfQBIT6BK';
    const accessKey = 'lzl1ZgUiNNupsSGHFLR9';
    const my_number = '01022026441';
    const phone = '01022026441'
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;
    const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(crypto.enc.Base64);
    

    const data = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01022026441', // 발신자 번호
        content: `문자 내용 부분 입니다.`,
        messages: [
          {
            to: '01022026441', // 수신자 번호
          },
        ],
      };

      const options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': accessKey,
          'x-ncp-apigw-timestamp': Date.now().toString(),
          'x-ncp-apigw-signature-v2': signature,
        },
      };





    
    const params = useParams().orderNumber;
    
    const [pay, setPay] = useState({
        pay_seq: '',
        subject: '',
        totalPrice: '',
        orderNumber: '',
        userName: ''
    })
    const { pay_seq, subject, totalPrice, orderNumber, userName } = pay
    
    useEffect(() => {
        console.log(params)
        axios.get(`http://localhost:8080/store/getPay?orderNumber=${params}`)
             .then(res => setPay(res.data))
             .catch()
        
             
    }, [])

    const sendKakaoMessage = () => {
        window.Kakao.init(process.env.REACT_APP_ORDERNUMBER);
        console.log(process.env.REACT_APP_ORDERNUMBER)

        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: 'BITBOX에서 보내요!',
                description: `상품 결제 내역입니다.\n 주문번호 : ${params}`,
                imageUrl: 'bitbox',
                link: {
                    webUrl: `http://localhost:3000/store/`
                },
            },
            buttons: [
                {
                    title: '주문내역 확인하기',
                    link: {
                        webUrl: `http://localhost:3000/store/paycomplete/${params}`
                    },
                },
            ],
        });

        window.location.replace(`/store/paycomplete/${params}`)
    }


    // const sendSMSMessage = () => {



    // axios.post(url, data, options)
    //      .then(res => {console.log(res.data)})
    //      .catch((err) => {console.error(err)});

    //      return finErrCode;





    // // const serviceId = 'ncp:sms:kr:299193861317:projectsmssend';
    // // const secretKey = 'TOrOHYfInT7i38cPqTcDX5ndw2mRV0aJfQBIT6BK';
    // // const accessKey = 'lzl1ZgUiNNupsSGHFLR9';
    // // const my_number = '01022026441';
    // // const phone = '01022026441'
    // // const method = "POST";
    // // const space = " ";
    // // const newLine = "\n";
    // // const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    // // const url2 = `/sms/v2/services/${serviceId}/messages`;
    // // const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secretKey);
    // // hmac.update(method);
    // // hmac.update(space);
    // // hmac.update(url2);
    // // hmac.update(newLine);
    // // hmac.update(date);
    // // hmac.update(newLine);
    // // hmac.update(accessKey);
    // // const hash = hmac.finalize();
    // // const signature = hash.toString(crypto.enc.Base64);

    // // console.log(serviceId)
    // // console.log(signature)

    //     // axios(
    //     //     {
    //     //         method: method,
    //     //         json: true,
    //     //         url: url,
    //     //         headers: {
    //     //           "Content-type": "application/json; charset=utf-8",
    //     //           "x-ncp-iam-access-key": accessKey,
    //     //           "x-ncp-apigw-timestamp": date,
    //     //           "x-ncp-apigw-signature-v2": secretKey,
    //     //         },
    //     //         body: {
    //     //             type:"SMS",
    //     //             contentType:"COMM",
    //     //             countryCode:"82",
    //     //             from:"01022026441",
    //     //             subject:"테스트",
    //     //             content:"문자발송",
    //     //             messages:[
    //     //                 {
    //     //                     to:"01022026441",
    //     //                     subject:"테스트",
    //     //                     content:"문자발송"
    //     //                 }
    //     //             ],
    //     //         },
    //     //       })
    //     //     .then(res=> console.log(res.data))
    //     //     .catch(error=> console.log(error))
        
      
        
    // }

    return (
        <>
            <Header/>
            <StoreHeader/>
            <div className={completeStyles.cart_step_wrap}>
                <ul className={completeStyles.cart_step}>
                    <li className={completeStyles.step0}><span>STEP 01</span><strong>장바구니</strong></li>
                    <li className={completeStyles.step2}><span>STEP 02</span><strong>결제하기</strong></li>
                    <li className={completeStyles.active}><span>STEP 03</span><strong>결제완료</strong></li>
                </ul>
            </div>


            <div className={completeStyles.payment_complete_wrap}>
                <div className={completeStyles.payment_complete_contents_wrap}>
                    <p>
                        <strong>상품 결제가 완료되었습니다.</strong>
                        <span>{ orderNumber }</span></p>
                    <dl>
                        <dt className={completeStyles.payment_complete_total}>총 결제금액</dt>
                        <dd>
                            <span>{ [totalPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</span></dd>
                    </dl>
                </div>
                <p className={completeStyles.com_box_design_olist}>
                    홈페이지 예매, 어플 예매는 쿠폰 번호 입력 후 이용이 가능하며, 현장 구매 시 상품별 바코드로 결제 가능합니다.</p>
                <p className={completeStyles.com_box_design_olist}>
                    친구에게 선물한 경우 입력하신 수신번호로 상품교환이 가능한 기프트콘이 발송됩니다.</p>
                <div className={completeStyles.com_btn_wrap}>
                    <a href="#none" className={completeStyles.btn_style1}>결제내역</a> 
                    <a href="#" className={completeStyles.btn_style0}>상품 더보기</a>
                    <a href="#" onClick={ sendKakaoMessage } className={completeStyles.btn_style0}>카카오톡으로 보내기</a>
                    <a href="#" className={completeStyles.btn_style0}>문자로 보내기</a>
                </div>
            </div>
        </>
    );
};

export default PayComplete;