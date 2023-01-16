import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import emptySeat from './emptySeat';
import Modal from './Modal.js';
import styles from '../css/Get.module.css';
import axios from 'axios';





const Get = () => {
    const {pk} = useParams();

    
    //빈배열
    var empty=emptySeat;
    //pk값을 이용해 가져온 상영정보
    const [showDTO,setShowDTO]=useState({});
    //현재 좌석현황
    const [filler,setFiller]=useState([]) 
    //빈배열 + 현재좌석현황
    const [roomStatus,setRoomStatus] = useState([]);
    
    //상영정보 + 현재좌석현황 가져오기.
    useEffect(()=>{
        seatGetter()
    },[])
    const seatGetter =()=>{
        axios.get(`http://localhost:8080/book/getSeat?pk=${pk}`)
        .then(res=>{
            var copy = res.data;
            setShowDTO(copy)
            setFiller(JSON.parse(copy.movie_seat))
        }).catch(err=>console.log(err))
    }
    
    //상영관 예약현황 덮어쓰기
    useEffect(()=>{
        var copyStatus=[]; 
        empty.map((item,index)=>{
            var small=[]
            empty[index].map((item)=>{
                    var exist= false
                    filler.map(fitem=>{
                        exist = item!==null && item.id===fitem.id? true:exist;
                    })
                    small.push(exist? {...item,isReserved:true}:item);
                })
                copyStatus[index]=small
            })
            setRoomStatus(copyStatus)
        },[filler])
        
    const navigate = useNavigate();
     //최대 예약 인원
     const [quantity,setQuantity] = useState(8);
     //현재 선택 좌석
     const [selectedSeat,setSelectedSeat] = useState([]);
     //현재 선택 연령
     const [customerLevel,setCustomerLevel] = useState('adult')
     //총 가격
     const [price,setPrice]=useState(0);
     //할인예정가
     const [discount,setDiscount]=useState(0);
     
     //좌석선택시 입력
     const changeStatus=(id)=>{
         const copyStatus = roomStatus.map((item,index)=>roomStatus[index].map((item)=>{
                 if(item &&item.id==id){
                     if(!item.isReserved){
                         if(!item.customer){
                             if(selectedSeat.length===quantity){
                                 alert('최대 좌석수를 넘어섰습니다.')
                                 return item
                             }else
                                 return {...item, customer:customerLevel}
                         }else{
                             return { id:item.id,number:item.number}
                         }
                     }else{
                         return item
                     }
                 }else{
                     return  item
                 }
             })
         )
         setRoomStatus(copyStatus)
     }
 
     //선택한 좌석을 selectedSeat에 추가
     useEffect(()=>{
         const copyStatus=[]
         roomStatus.map((item,index)=>roomStatus[index].map((item,index)=>{
             if(item&& item.customer){
                 copyStatus.push({
                     id:item.id,
                     number:item.number,
                     customer: item.customer
                 })
             }
         }))
         setSelectedSeat(copyStatus)
     },[roomStatus])
     useEffect(()=>{
         setPrice((selectedSeat.filter(item=>item.customer==='adult').length*10000)+(selectedSeat.filter(item=>item.customer==='child').length*5000))
        
     },[selectedSeat])
 
     //radio버튼 선택시 customer 주입값 변경.
     const customerLevelTarget=(e)=>{
         setCustomerLevel(e.target.id)
     }
 
     //좌석 초기화
     const reset=()=>{
         seatGetter()
     }
     
 
 
     //결제버튼 입력시
     const payment = () => {
         var merchant_seq;
         //마지막 시퀀스값++ 가져와서 merchant_uid로 활용.
         axios.get('http://localhost:8080/reservation/getSeq')
         .then(res=>{merchant_seq=(res.data+1)}).catch(err=>console.log(err))
 
 
         const { IMP } = window;
         IMP.init('imp16543357')
         // IMP.request_pay(param, callback) 결제창 호출  
 
         IMP.request_pay(
             {
                 // param
                 pg: 'html5_inicis',
                 pay_method: 'card',
                 merchant_uid: 999999999,
                 name: 'beatBox 영화예매',
                 amount: 100,
                 buyer_email: 'qkrwlgns0510@naver.com',
                 buyer_name: '박지훈',
                 buyer_tel: '010-1234-5678',
                 buyer_addr: '서울시 강남구',
                 buyer_postcode: '12345',
             },
             res => {
                 if (res.success) {
                     // 결제 성공 시 로직,
                     paymentComplete()
                     
                 } else {
                     // 결제 실패 시 로직,
                     alert('결제에 실패하였습니다.');
                 }
             },
             );
         };
     //결제완료시
     const paymentComplete=()=>{
         //DB에 좌석갱신
         const copy = filler.concat()
         selectedSeat.map(item=>{
             copy.push({id:item.id})
         })
         var addData={...showDTO,movie_seat:JSON.stringify(copy)}
         axios.post('http://localhost:8080/book/addSeat',addData,{
             headers:{
                 'Content-Type': 'application/json'
             }
         }).then(res=>{
             addReservation();
         }).catch(err=>alert(err))
     }
 
     const addReservation=()=>{
         //예약 테이블 추가
         const copy = [];
         selectedSeat.map(item=>{
             copy.push({
                 id:item.id,
                 number:item.number,
                 customer:item.customer
             })
         })
         const reserveData={...showDTO,selectedSeat:JSON.stringify(copy),book_pk:Number(pk),user_id:id}
         console.log(reserveData)
         axios.put('http://localhost:8080/reservation/reservation',reserveData,{
             headers:{
                 'Content-Type': 'application/json'
             }
         }).then(res=> {
             alert('예매를 성공했습니다. 마이페이지로 이동합니다.')
             navigate("/myPage/reservation");
          }).catch(err=>console.log(err))
     }
    
    
    
    
    
    //modal 관련 method
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
     };
    const closeModal = () => {
        setModalOpen(false);
    };


    const id = sessionStorage.getItem('userName');
    
    
    return (
        <>
           <div className={styles.info}><h2>빠른예매</h2></div>
            <br/>
            <hr/>
            <br/>

            <div className={styles.container}>
                <div className={styles.seats}>
                <div className={styles.screen}>screen</div><br/>
                    
                    {
                        roomStatus.map((item,index)=>(
                            <div key={index} className={styles.part}>
                                {
                                    roomStatus[index].map((item,smallIndex)=>(
                                    <div key={smallIndex} className ={item===null? styles.noSeat:item.isReserved? styles.alreadyReserved:!item.customer?styles.oneSeat:item.customer==='adult'? styles.adultSelected:styles.childSelected} id={item?item.id:''} onClick={(e)=>changeStatus(e.target.id)}> 
                                    {item?item.number:''}<br/>
                                    </div>
                                ))
                            }
                            </div>
                        ))       
                    }
                    <br/>
                    <button className={styles.button} onClick={reset} disabled={selectedSeat.length===0? 'disable':''}>초기화</button>
                </div>  {/* seats */}
                <div className={styles.reserveTable}>
                    <div className={styles.movie}>
                        <img className={styles.movieImg} src="../img/1.jpg"></img>
                        <div className={styles.movieInfo}>
                        {showDTO.movie_age}/{showDTO.movie_title}<br/> {showDTO.movie_cinema} {showDTO.movie_theater}<br/>{showDTO.movie_date} <br/> {showDTO.movie_time}
                        </div>
                        
                    </div>

                    <div className={styles.selectTable}>
                        <span style={{color:'red',fontSize:'0.8em'}}>예약은 최대 8명까지 가능합니다.</span>
                        {/* 인원선택 */}
                        <label id='adult'>
                        <input type='radio' name="customerLevel" id='adult' defaultChecked onChange={(e)=>customerLevelTarget(e)}></input>
                        일반 : 10000원
                        <span style={{color:'gray',fontSize:'0.8em'}}> 현재 {selectedSeat.filter(item=>item.customer==='adult').length}명</span>
                        </label>

                        <label id='child'>
                        <input type='radio' name="customerLevel" id='child' onChange={(e)=>customerLevelTarget(e)}></input>
                        청소년 : 5000원
                        <span style={{color:'gray',fontSize:'0.8em'}}> 현재 {selectedSeat.filter(item=>item.customer==='child').length}명</span>
                        </label>
                    </div> {/* selectTable */}
                    {/* <span style={{fontSize:'0.8em', margin:'3px',fontWeight:'bold'}}>선택 좌석</span> */}
                    <div className={styles.selectedSeatDisplay}>
                        {
                            selectedSeat.length===0?
                            <span style={{fontSize:'1.3em', color:'green'}}>좌석을 선택해주세요!    </span>
                            :
                            selectedSeat.map((item,index) => (
                                <div key={index} className={item.customer==='adult'? styles.adultSelected:styles.childSelected} id={item.id} onClick={(e)=>changeStatus(e.target.id)}>
                                {item.number}
                            </div>
                            ))
                        
                        }
                    </div>{/* selectedSeatDisplay */}
                    <div className={styles.selectComplete}>
                        <div className={styles.amount} style={selectedSeat.length===0? {visibility:'hidden'}:{visibility:'visible'}}>금액 : {price}원</div>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={()=>{navigate("/user/calendar")}}>이전으로</button>
                            <button className={styles.button} onClick={paymentComplete} disabled={selectedSeat.length===0? 'disable':''}>좌석 선택 완료</button>
                        </div>
                    </div>
                </div>
            </div> {/* container*/}
            <div className={styles.footer}></div>
            <Modal open={modalOpen} close={closeModal} header="결재" closeBtn="좌석선택">
               <div className='paymentModal'>
                    <div className='paymentSelect'>
                        <div className='pointInfo'>

                        </div>
                    </div>
                    <div className='reservationInfo'>
                        <div className='movieInfo'>
                            <span>{showDTO.movie_title}</span>
                            <span>{showDTO.movie_cinema}/{showDTO.movie_theater}</span>
                            <span>{showDTO.movie_date} | {showDTO.movie_time}</span>
                        </div>
                        <div className='paymentBox'>
                            {
                                selectedSeat.filter(item=>item.customer==='adult').length===0?
                                '':<div>
                                     <span style={{display:'flex',justifyContent:'start',width:'40%'}}>일반 (10000) x {selectedSeat.filter(item=>item.customer==='adult').length}</span>
                                     <span style={{display:'flex',justifyContent:'end',width:'40%'}}> {selectedSeat.filter(item=>item.customer==='adult').length*10000}</span>
                                </div>
                            }
                            {
                                selectedSeat.filter(item=>item.customer==='child').length===0?
                                '':<div> 
                                    <span style={{display:'flex',justifyContent:'start',width:'40%'}}>청소년(5000) x {selectedSeat.filter(item=>item.customer==='child').length}</span>
                                    <span style={{display:'flex',justifyContent:'end',width:'40%'}}> {selectedSeat.filter(item=>item.customer==='child').length*5000}</span>
                                </div>                           
                            }
                            <div style={{borderTop:'2px dotted gray',padding:'5px 0'}}>합계 : {price}원</div>
                        </div>
                        <div className='paymentBox'>
                            {

                            }
                            <div style={{borderTop:'2px dotted gray',padding:'5px 0'}}>할인금액 : {discount}원</div>
                        </div>
                        <div className='payment'>
                            최종 결제 금액 : {price-discount}원
                        </div>
                        <div className='paymentBtn' onClick={payment}>
                            결제
                        </div>
                    </div>
               </div>
            </Modal>
        </>
    );
};

export default Get;