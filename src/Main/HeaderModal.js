import { useNavigate } from 'react-router-dom';
import modalces from './Modal.module.css';



const HeaderModal = ({ setModalOpen}) => {

    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    const navigate = useNavigate()
    const showReservation = () => {
        navigate('/myPage/reservation')
    };
    const showEditProfile = () => {
        navigate('/myPage/editProfile')
    };

    return (
        <>
            <div className={modalces.head} >
            <div className={modalces.container} style={{ width: 400, height: 250, marginLeft: "-100px", marginTop: "-700px" }}>                <button className={modalces.close} onClick={closeModal}>
                    X
                </button>
                <section
                id="layer_select"
                className={`${modalces.modal_layer} ${modalces.on}`}
                style={{ zIndex: 501 }}
                >
                    <div className={modalces.login_input_area}>
                        <div className={modalces.reservation}>
                        <a>
                            <button
                                id="btnReservation"
                                type="button"
                                className={modalces.button}
                                onClick={showReservation} > 예매/구매내역 </button>
                               
                        </a>
                        </div>
                        <div className={modalces.editprofile}>
                        <a>
                            <button
                                id="btnEditprofile"
                                type="button"
                                className={modalces.button}
                                onClick={showEditProfile}
                                 > 개인 정보 수정 </button>
                        </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    );
};


export default HeaderModal;