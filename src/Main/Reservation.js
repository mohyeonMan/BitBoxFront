import React, { useState } from 'react';
import Header from './Header';
import reservations from './Reservation.module.css';


const Reservation = () => {

    const [ toggle, setToggle ] = useState(false)

    const onToggle =() => {
        console.log(toggle)
        setToggle (!toggle)
    }
    
    return (
        <>
        <Header/>
        <div className={reservations.reservations_first} >
        <div className={`${reservations.container} ${reservations.has_lnb}`}>
        <div className={reservations.inner_wrap}>
        <div id="contents" className="" style={{width: '800px'}}>
        <h2 className={reservations.tit}>예매/구매 내역</h2>
        <div className={reservations.tab_cont_wrap}>
          {/* 예매내역 */}
          <div id="myBokdArea" className={`${reservations.tab_cont} ${reservations.on}`}>
            <a href="" className={reservations.ir}>
              예매 탭 화면 입니다.
            </a>
          </div>


          {/* 구매내역 영역 */}
          <div id="myPurcArea" className="tab-cont">
            <a href="" className={reservations.ir} />
            {/* 구매 조회 조건 */}
            <div className={`${reservations.board_list_search} ${reservations.mt20}`}>
              <table className={reservations.tables} summary="구매 조회 조건">
                <colgroup>
                  <col style={{ width: 75 }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">구분</th>
                    <td>
                            <input
                            type="radio"
                            name="radPurc"
                            id="radPurc01"
                            defaultValue=""
                            defaultChecked="checked"
                            />
                            <label htmlFor="radPurc01">&nbsp;&nbsp;전체</label>
                            <input
                            type="radio"
                            name="radPurc"
                            id="radPurc02"
                            defaultValue="P"
                            />
                            <label htmlFor="radPurc02">&nbsp;&nbsp;예매 내역</label>
                            <input
                            type="radio"
                            name="radPurc"
                            id="radPurc03"
                            defaultValue="C"
                            />
                            <label htmlFor="radPurc03">&nbsp;&nbsp;스토어 구매내역</label>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                {/* 구매 조회 조건 End */}


                {/* 구매 목록  */}
                <div className={`${reservations.board_list_util} ${reservations.mb10}`}>
                    <p className={`${reservations.result_count} ${reservations.pt00}`}>
                    <strong>
                        전체 <b className={reservations.font_gblue}>0</b>건
                    </strong>
                    </p>
                </div>
                <div className={reservations.table_wrap}>
                    <table
                    className={`${reservations.board_list} ${reservations.tables}`}
                    summary="결제일시, 구분, 상품명, 결제금액, 상태 항목을 가진 결제내역 목록 표"
                    >
                    <caption>
                        결제일시, 구분, 상품명, 결제금액, 상태 항목을 가진 결제내역 목록 표
                    </caption>
                    <colgroup>
                        <col style={{ width: 160 }} />
                        <col style={{ width: 150 }} />
                        <col />
                        <col style={{ width: 120 }} />
                        <col style={{ width: 120 }} />
                    </colgroup>
                    <thead>
                        <tr>
                        <th scope="col">결제일시</th>
                        <th scope="col">구분</th>
                        <th scope="col">상품명</th>
                        <th scope="col">결제금액</th>
                        <th scope="col">상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" className={reservations.a_c}>결제내역이 없습니다.</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <nav className={reservations.pagination} id="navPurc" />
                {/* 구매 안내상황  */}
                <div className={`${reservations.box_pulldown} ${reservations.mt30}`}>
                    <div className={reservations.tit}>
                    <button type="button" className={reservations.btn_toggle} onClick={onToggle}>
                        이용안내
                        <i className={`${reservations.iconset} ${reservations.ico_arr_toggle_down}`}/>
                    </button>
                    </div>

                    { toggle &&
                    <div className={reservations.cont}>
                    <strong>[예매 안내]</strong>
                        <ul className={reservations.dot_list}>
                            <li>
                            만 4세(48개월) 이상부터는 영화티켓을 반드시 구매하셔야 입장 가능합니다.
                            </li>
                            <li>예매 변경은 불가능하며, 취소 후 재 예매를 하셔야만 합니다.</li>
                            <li>
                            메가박스 모바일앱을 이용할 경우 티켓출력없이 모바일티켓을 통해 바로
                            입장하실 수 있습니다.
                            </li>
                        </ul>
                        <br />
                        <strong>[티켓교환 안내]</strong>
                        <ul className={reservations.dot_list}>
                            <li>
                            극장의 무인발권기(KIOSK)를 통해 예매번호 또는
                            고객확인번호(생년월일+휴대폰번호)를 입력하여 편리하게 티켓을 발권하실 수
                            있습니다.
                            </li>
                            <li>
                            무인발권기 이용이 어려우신경우, 티켓교환권을 출력하여 매표소에 방문하시면
                            티켓을 발권하실 수 있습니다.
                            </li>
                            <li>
                            (티켓교환권 출력이 어려운경우 예매번호와 신분증을 지참하여 매표소에
                            방문하시면 티켓을 발권하실 수 있습니다)
                            </li>
                        </ul>
                        <br />
                        <strong>[예매취소 안내]</strong>
                        <ul className={reservations.dot_list}>
                            <li>온라인(홈페이지/모바일) 예매 취소는 상영시간 20분전까지 입니다.</li>
                            <li>
                            위탁 예매 사이트 이용 시 취소 및 환불 규정은 해당 사이트 규정을 따릅니다.
                            </li>
                            <li>
                            LIVE 공연 콘텐트는 취소 기준은 아래와 같습니다.
                            <ul className={reservations.dot_list}>
                                <li>관람 4일전 : 취소 가능</li>
                                <li>관람 3일 ~ 1일전 : 취소 수수료 부담 후 취소 가능</li>
                                <li>관람 당일 : 취소 및 환불 불가</li>
                            </ul>
                            </li>
                            <li>공연 관람시 시작 시간 이후에는 입장이 제한 됩니다.</li>
                            <li>발권된 티켓은 상영시간 전까지 현장 방문 시에만 취소가 가능합니다.</li>
                        </ul>
                        <br />
                        <strong>[스토어 구매/취소 안내]</strong>
                        <ul className={`${reservations.dot_list} ${reservations.mb30}`}>
                            <li>
                            스토어 상품은 구매 후 취소가능기간 내 100% 환불이 가능하며,
                            부분환불은 불가 합니다.{" "}
                            </li>
                            <li>
                            (ex. 3개의 쿠폰을 한 번에 구매하신 경우, 3개 모두 취소만 가능하며
                            그 중 사용하신 쿠폰이 있는 경우 환불이 불가합니다)
                            </li>
                            <li>스토어 교환권은 MMS로 최대 1회 재전송 하실 수 있습니다.</li>
                        </ul>
                   
                    </div>
                    }
                </div>
                {/* 구매 안내상황  End */}
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      </>
    );
};

export default Reservation;