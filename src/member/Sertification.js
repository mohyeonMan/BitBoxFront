import React from 'react';
import joinForm from './JoinForm.module.css';
import {useNavigate} from "react-router-dom";

const Sertification = () => {

    const navi = useNavigate();

        const onClickCertificate = () => {

            const {IMP} = window;
            IMP.init('imp10391932');

            const data = {
                merchant_uid: `mid_${new Date().getTime()}`,
                company: 'bitBox',
                carrier: '',
                name: '',
                phone: ''
            };

            IMP.certification(data, callback);
        }

        const callback = (response) => {
            const {
                success,
                merchantUid,
                errorMsg,
            } = response;

            if (success) {
                alert('success');
                navi('/member/joinForm/agreement');
            } else {
                alert(`fail : ${errorMsg}`);
            }
        }


        return (
            <>
                <div className={joinForm.page_info_txt}>
                    <strong>
                        회원가입을 위한 본인인증 단계입니다.
                        {/*회원가입을 위한 본인인증 단계입니다.*/}
                    </strong>
                    <span>
                    원하시는 인증방법을 선택해주세요.{/*원하시는 인증방법을 선택해주세요.*/}
                    </span>
                </div>
                <div className={`${joinForm.join_chk_me} ${joinForm.col_2}`}>  {/* col-2 */}
                    <a
                        href="javaScript:fn_mblpCertSubmit()"
                        title="휴대폰 인증 선택"
                        id="btnMblpCert"
                        style={{width: '300px'}}
                        onClick={onClickCertificate}
                    >

                        <i className={`${joinForm.ico_member_phone} ${joinForm.iconset}`}/> {/* iconset */}
                        <span>휴대폰 인증{/*휴대폰 인증*/}</span>
                    </a>
                </div>
                <ul className={`${joinForm.dot_list} ${joinForm.mt20}`}> {/* gray mt20 */}
                    <li>
                        본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며, 인증 이외의
                        용도로 이용 또는 저장되지 않습니다.
                    </li>
                </ul>
            </>
        );
    }
    ;

    export default Sertification;