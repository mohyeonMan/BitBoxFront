import React from 'react';
import QRcode from 'react-qr-code';



const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header,closeBtn, viewReservation, reservationCancel} = props;
  
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
              <QRcode
                  size={256}
                  style={{ height: "150px", width: "150px" }}
                  value={'https://www.naver.com'}
                  viewBox={`0 0 256 256`}
              />
              <p>{viewReservation.movie_title}</p>
              <p>{viewReservation.movie_cinema} {viewReservation.movie_theater}</p>
              <p>{viewReservation.movie_date} {viewReservation.movie_time}</p>
              <p>{viewReservation.movie_seat.filter(item=>item.customer==='adult').length===0? '':`성인: ${viewReservation.movie_seat.filter(item=>item.customer==='adult').length} `}
                {viewReservation.movie_seat.filter(item=>item.customer==='child').length===0? '':`청소년: ${viewReservation.movie_seat.filter(item=>item.customer==='child').length} `}
              {
                  viewReservation.movie_seat.map((item1,index)=>(
                      <span key= {item1.id}>{item1.number}{index===viewReservation.movie_seat.length-1? '':','}</span>
                  ))
              }
              </p>
              <p>{viewReservation.reserve_time}</p>
              <button onClick={()=>reservationCancel(viewReservation)}>예약취소</button>
          </main>
          <footer>
            <button className="close" onClick={close}>
              {closeBtn}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;