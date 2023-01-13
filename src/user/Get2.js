import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import emptySeat from './emptySeat';
import Modal from './Modal.js';
import styles from '../css/Get.module.css';
import axios from 'axios';

const Get2 = () => {
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

    const navigate = useNavigate
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
            navigate(`/success`);
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

    const [id,setId] = useState('박지훈');


    return (
        <>

            <div className={styles.container2}>
                <div className={styles.seats2}>
                    <div className={styles.screen2}>screen</div><br/>

                    {
                        roomStatus.map((item,index)=>(
                            <div key={index} className={styles.part}>
                                {
                                    roomStatus[index].map((item,smallIndex)=>(
                                        <div key={smallIndex} className ={item===null? styles.noSeat2:item.isReserved? styles.alreadyReserved2:!item.customer?styles.oneSeat2:item.customer==='adult'? styles.adultSelected2:styles.childSelected2} id={item?item.id:''}/>

                                    ))
                                }
                            </div>
                        ))
                    }
                    <br/>
                </div>  {/* seats */}

            </div>

        </>
    );
};

export default Get2;