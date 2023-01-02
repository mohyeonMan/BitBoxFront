import React, { useState } from 'react';
import AdminModal from './AdminModal';

function AdminBoardModalPage(){
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <button onClick={openModal}>view all</button>
    {/* header 부분에 텍스트를 입력한다. */}
    <AdminModal open={modalOpen} close={closeModal} header="공지사항 & 게시판">
    {/* AdminModal.js */}
    {/* <main> {props.children} </main> */}
      내용이 입력된다. 리액트 함수형 모달 팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
    </AdminModal>
  </>
  );
};

export default AdminBoardModalPage;