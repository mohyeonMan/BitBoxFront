import React, { useEffect, useState } from 'react';
import StoreHeader from './StoreHeader';
import payStyles from '../../css/StorePayment.module.css'
import axios from 'axios';
import Header from 'src/Main/Header';

const StorePay = () => {
        const [ list, setList ] = useState([])
    
        useEffect(() => {
            axios.get(`http://localhost:8080/store/getCartList?userName=${sessionStorage.getItem("userName")}`)
                 .then(res => setList(res.data))
                 .catch(error => console.log(error))
        }, [])

        const getTotalPrice = list => {
            let sum = 0;
            for (let i = 0; i < list.length; i++) {
                sum += list[i].count * list[i].price;
            }
            return sum;
          };


    return (
        <>
            <Header/>
            <StoreHeader/>

            <div className={payStyles.cart_step_wrap}>
            {/* step_unit3 */}
                <ul className={payStyles.cart_step}>
                    <li className={payStyles.step0}>
                        <span>STEP 01</span>
                        <strong>장바구니</strong>
                    </li>
                    {/* active */}
                    <li className={payStyles.active}>
                        <span>STEP 02</span>
                        <strong>결제하기</strong>
                    </li>
                    <li className={payStyles.step3}>
                        <span>STEP 03</span>
                        <strong>결제완료</strong>
                    </li>
                </ul>
            </div>



            <div className={payStyles.com_cart_list_wrap}>
                <strong className={payStyles.com_box_design_title}>구매상품 정보</strong>
                <p className={payStyles.cart_allchecker_wrap}>
                    <strong className={payStyles.com_custom_checkbox_product_name}>상품명</strong>
                    <strong className={payStyles.com_custom_checkbox_sel_price}>판매금액</strong>
                    <strong className={payStyles.com_custom_checkbox_cnt}>수량</strong>
                    <strong className={payStyles.com_custom_checkbox_price}>구매금액</strong>
                </p>
                
                <ul className={payStyles.com_list_style1}>

                    {
                        list.map((item, index) => {
                            return (
                                <li key={ index }>
                                    <div className={payStyles.product_info_img}>
                                        <img src={`../storage/${ item.img }`} alt={ item.subject }/>
                                        <strong className={payStyles.product_info_name}>{ item.subject }</strong>
                                        <span className={payStyles.product_info_origin}>{ item.subSubject }</span>
                                    </div>
                                    <div className={payStyles.product_info_wrap}>
                                        <span className={payStyles.product_info_one_price}>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                    </div>
                                    <div className={payStyles.product_info_cnt_wrap}>{ item.count }개</div>
                                    <span className={payStyles.product_info_price}>{[item.price * item.count].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                </li>
                            )
                        })
                    }
                </ul>

                <table className={payStyles.com_cart_total_price_wrap}>
                    <thead>
                        <tr>
                            <th>
                                총 결제 예정금액
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong className={payStyles.cart_total_price}>{ getTotalPrice(list).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>     




            <div className={payStyles.com_box_design_wrap}>
                <strong className={payStyles.com_box_design_title}>주문자 정보 확인</strong>
                <ul className={payStyles.com_box_design}>
                    <li>
                        <label>이름</label>
                        <input type="text" id="user_info_name" placeholder="이름" value="이용식" readOnly="" style={{width:'128px'}}/>
                        <label>휴대전화 번호</label>
                        <input type="tel" id="user_info_phonenum" placeholder="휴대전화 번호" value="010-2202-6441" readOnly="" style={{width:'228px'}}/>
                    </li>
                </ul>
                <p className={payStyles.com_box_design_olist}>
                    구매하신 CGV 기프트콘은 주문자 정보에 입력된 휴대전화 번호로 MMS로 발송됩니다.<br/>
                    입력된 휴대전화 번호가 맞는지 꼭 확인하세요.</p>
            </div>




            <div className={payStyles.com_box_design_wrap}>
                <strong className={payStyles.com_box_design_title}>결제 수단</strong>
                <ul className={payStyles.com_box_design}>
                    <li id="liCard">
                        <input type="radio" name="radio" className={payStyles.com_custom_radio} id="payment_card"/>
                        <label>신용카드</label>
                        <div className={payStyles.com_custom_selectbox_wrap}>
                            <dl className={payStyles.com_custom_selectbox}>
                                <dt>
                                    <a href="#none" className={payStyles.com_custom_selectbox_btn} >카드를 선택하세요.</a>
                                </dt>
                                
                                <dd>
                                    <a href="#none" className={payStyles.btn_select0} >KB카드</a>
                                </dd>
                                
                                <dd>
                                    <a href="#none" className={payStyles.btn_select0} >BC카드</a>
                                </dd>
                                
                                <dd>
                                    <a href="#none" className={payStyles.btn_select0} >삼성카드</a>
                                </dd>
                                
                                <dd>
                                    <a href="#none" className={payStyles.btn_select0} >신한카드</a>
                                </dd>
                                
                                <dd>
                                    <a href="#none" className={payStyles.btn_select0} >외환카드</a>
                                </dd>
                                
                                <dd>
                                    <a href="#none" className={payStyles.btn_select0} >하나카드</a>
                                </dd>
                                
                                <dd>
                                    <a href="#none" className={payStyles.btn_select0} >롯데카드</a>
                                </dd>
                            </dl>
                        </div>
                    </li>
                    
                    <li>
                        <input type="radio" name="radio" className={payStyles.com_custom_radio} id="payment_kakaopay"/>
                        <label>
                            <img src="./../../../CDN/R2014/images/giftstore/common/btn_kakaopay.png" alt="kakaopay"/>
                        </label>
                    </li>
                </ul>
                
                <p className={payStyles.com_box_design_olist} id="pKKO">
                    카카오페이는 신용카드 선할인과 카드사 포인트는 이용하실 수 없으며 신용카드별 청구 할인은 이용하실 수 있습니다.</p>
                <div className={payStyles.com_agree_wrap}>
                    <p className={payStyles.com_list_style1_title}>
                    {/* com_all_checker */}
                        <input type="checkbox" id="check00" className={payStyles.com_custom_checkbox}/>
                        <label>주문정보/결제 대행 서비스 약관 모두 동의</label>
                    </p>
                    <dl className={payStyles.com_custom_checkbox1}>
                        <dt>
                        {/* com_all_particle_checker */}
                            <input type="checkbox" id="check10" className={payStyles.com_custom_checkbox} data-required="true"/>
                            <label>기프트콘 구매 동의</label>
                        </dt>
                        <dd>
                            <p className={payStyles.txtBox}>기프트콘 발송 및 CS처리 등을 이해 수신자로부터 CJCGV에 수신자의 휴대전화번호를 제공하는 것에 대한 적합한 동의를 받습니다.</p>
                        </dd>
                        <dt>
                        {/* com_all_particle_checker */}
                            <input type="checkbox" id="check11" className={payStyles.com_custom_checkbox} data-required="true" data-group="g0"/>
                            <label>결제 대행 서비스 약관 모두 동의</label>
                        </dt>
                        <dd>
                            <input type="checkbox" id="check20" className={payStyles.com_custom_checkbox2} data-required="true" data-group="g0"/>
                            <label>전자금융거래 이용약관</label>
                            <a href="#none" target="_blank">전문확인</a>
                        </dd>
                        <dd>
                            <input type="checkbox" id="check21" className={payStyles.com_custom_checkbox2} data-required="true" data-group="g0"/>
                            <label>개인정보 수집 이용약관</label>
                            <a href="#none" target="_blank">전문확인</a>
                        </dd>
                        <dd>
                            <input type="checkbox" id="check22" className={payStyles.com_custom_checkbox2} data-required="true" data-group="g0"/>
                            <label>개인정보 제공 및 위탁안내</label>
                            <a href="#none" target="_blank">전문확인</a>
                        </dd>
                    </dl>
                </div>
                <div className={payStyles.com_btn_wrap}>
                    <a href="#none" className={payStyles.btn_style0} style={{width:'500px'}}>결제하기</a> 
                    {/* <a href="#none" className={payStyles.btn_prev} onClick="javascript:location.replace('http://www.cgv.co.kr/culture-event/popcorn-store/user-cart.aspx');">
                        <img src="./../../../CDN/R2014/images/giftstore/common/btn_prev.png" alt="이전화면으로 이동"/>이전화면
                    </a> */}
                </div>
            </div>

        </>
    );
};

export default StorePay;