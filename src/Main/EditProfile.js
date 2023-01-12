import React, {useEffect, useState} from 'react';
import Header from './Header';
import editProfile from './EditProfile.module.css';
import axios from 'axios';
import { id } from 'date-fns/locale';




const EditProfile = () => {

    useEffect (() => {
        axios.get('http://localhost:8080/myPage/getEditProfile?username=bk123').then(
            res => setForm(res.data)
        ).catch(err => console.log(err))
    }, [])

   // 회원가입 세팅
   const [form, setForm] = useState({
    name: '',
    birth: '',
    phoneNumber: '',
    username: '',
    password: '',
    repassword: '',
    email: ''
    });

    // input 값 setForm
    const inputValue = (e) => {

        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        });

    }

    const {name, username, password, repassword, birth, email, phoneNumber, pwdChkVal} = form;

    // 유효성 검사 후 회원가입 버튼 활성화
    const [disable, setDisable] = useState(false);
    // 비밀번호 체크
    const [inputPwdChk, setInputPwdChk] = useState("");
    // 비밀번호 확인 체크
    const [inputRePwdChk, setInputRePwdChk] = useState("");

    const [pwdDiv, setPwdDiv] = useState('')
    const [certifOk, setCertifOk] = useState(1);

    const [text, setText] = useState("");

    const displayText = (e) => {
      setText(e.target.value);
    };
  
    const onReset = (e) => {
      setText("");
      setForm({
        ...form,
       password: '',
       repassword: ''
    });
    };

    return (
        <>
        <Header />
            <div>
                <div id="contents" className={editProfile.editProfile_first}>
                    <h2 className={editProfile.tit}>개인정보 수정</h2>
                    <ul className={`${editProfile.board_list_util} ${editProfile.mb10}`}>
                        <li>회원님의 정보를 정확히 입력해주세요.</li>
                    </ul>
                    <div className={`${editProfile.tit_util} ${editProfile.mt40} ${editProfile.mb10}`}>
                        <h3 className={editProfile.tit}>기본정보</h3>
                        <div className={editProfile.right} >
                        <p className={editProfile.reset} >
                            <em className={editProfile.font_orange} >*</em> 필수
                        </p>
                        </div>
                    </div>
                    <form name="mbInfoForm" className={editProfile.mbInfoForm}>
                        <input type="hidden" name="id" defaultValue="" />
                        <input type="hidden" name="mbNo" defaultValue={12788089} />
                        <input type="hidden" name="phoneNo" defaultValue="010-0000-0000" />
                        <input type="hidden" name="mbProfilFileNo" defaultValue="" />
                        <input type="hidden" id="mbByymmdd" defaultValue={19900000} />
                        <div className={`${editProfile.table_wrap} ${editProfile.mb40}`}>
                        <table className={editProfile.board_form}>
                            <caption>
                            이름, 생년월일, 휴대폰, 이메일, 비밀번호, 주소 항목을 가진 기본정보 표
                            </caption>
                            <colgroup>
                            <col style={{ width: 180 }} />
                            <col />
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">아이디  <em className={editProfile.font_orange} >*</em>
                                </th>
                                <td>{username}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                이름 <em className={editProfile.font_orange} >*</em>
                                </th>
                                <td>
                                <span className={editProfile.mbNmClass}>{name}</span>
                                <a
                                    href="#layer_name"
                                    className={`${editProfile.button} ${editProfile.small} ${editProfile.gray_line} ${editProfile.ml10} ${editProfile.mr10} ${editProfile.btn_modal_open}`}
                                    title="이름변경"
                                >
                                    이름변경
                                </a>
                                ※ 개명으로 이름이 변경된 경우, 회원정보의 이름을 변경하실 수
                                있습니다.
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                생년월일 <em className={editProfile.font_orange}>*</em>
                                </th>
                                <td>{birth}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                <label htmlFor="num">휴대폰</label>{" "}
                                <em className={editProfile.font_orange}>*</em>
                                </th>
                                <td>
                                <div className={editProfile.clearfix}>
                                <input
                                    type="email"
                                    id="email"
                                    name="mbEmail"
                                    className={`${editProfile.input_text} ${editProfile.w500px}`}
                                    onChange={displayText} value={text}
                                />
                                <button
                                    type="button"
                                    className={`${editProfile.button} ${editProfile.small} ${editProfile.gray_line} ${editProfile.change_phone_num}`}
                                    id="phoneChgBtn"
                                    title="휴대폰번호 변경"
                                >
                                    휴대폰번호 변경
                                </button>
                                </div>
                                <div className={editProfile.change_phone_num_area}>
                                    <div className={editProfile.position} >
                                        <label htmlFor="chPhone" className={editProfile.label}>
                                            변경할 휴대폰
                                        </label>
                                        <input
                                            type="text"
                                            id="chPhone"
                                            className={`${editProfile.input_text} ${editProfile.w160px} ${editProfile.numType}`}
                                            placeholder="'-'없이 입력해 주세요"
                                            title="변경할 휴대폰 번호 입력"
                                            maxLength={11}
                                        />
                                    </div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                <label htmlFor="email">이메일</label>{" "}
                                <em className={editProfile.font_orange} >*</em>
                                </th>
                                <td>
                                <input
                                    type="email"
                                    id="email"
                                    name="mbEmail"
                                    className={`${editProfile.input_text} ${editProfile.w500px}`}
                                    defaultValue=""
                                    onChange={displayText} value={text}
                                    
                                />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                비밀번호 <em className={editProfile.font_orange} >*</em>
                                </th>
                                <td>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`${editProfile.input_text} ${editProfile.w500px}`}
                                    onChange={inputValue}
                                    onBlur={(e) => {
                                        if (!e.target.value) {
                                            setInputPwdChk("필수 입력정보입니다");
                                        } else {
                                            setInputPwdChk("");
                                        }
                                    }}
                                />
                                <div style={{width: "auto" }}>
                                <div id="editpwdDiv" style={{
                                    marginLeft: "5px",
                                    color: "#B20710",
                                    fontSize: "10pt",
                                    textAlign: "left"
                                }}>{inputPwdChk} </div>
                            </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    비밀번호 확인 <em className={editProfile.font_orange} >*</em>
                                </th>
                                <td>
                                    <input
                                        type="password"
                                        id="repassword"
                                        name="repassword"
                                        value={repassword}
                                        className={`${editProfile.input_text} ${editProfile.w500px}`}
                                        onChange={inputValue}
                                        onBlur={(e) => {
                                            if (password !== e.target.value) {
                                                setInputRePwdChk("비밀번호가 일치하지 않습니다");
                                                setDisable(true)
                                            } else {
                                                setInputRePwdChk("");
                                                setDisable(false)
                                            }
                                        }}
                                    
                                    />
                                    <a
                                        href="/on/oh/ohh/Mypage/userPwdChangePage.do"
                                        className={`${editProfile.button} ${editProfile.small} ${editProfile.gray_line}`}
                                        title="비밀번호 변경"
                                    >
                                        비밀번호 변경
                                    </a>
                                    <div style={{width: "auto"}}>
                                        <div id="editpwdDiv" style={{
                                            marginLeft: "5px",
                                            color: "#B20710",
                                            fontSize: "10pt",
                                            textAlign: "left"
                                        }}>{inputRePwdChk} </div>
                                        
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </form>
                    <div className={`${editProfile.btn_group} ${editProfile.mt40}`}>
                        <button className={`${editProfile.button} ${editProfile.large}`} id="cancelBtn" onClick={onReset}>
                        취소
                        </button>
                        <button className={`${editProfile.button} ${editProfile.purple} ${editProfile.large}`} id="updateBtn">
                        수정
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;