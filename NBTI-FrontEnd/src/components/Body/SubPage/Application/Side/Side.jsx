import { useEffect, useState } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import { useApprovalLine, useDocFormStore, useReferLine } from "../../../../../store/store";
import SecondModal from "../../Approval/Content/SecondModal/SecondModal";
import axios from 'axios'; // axios import
import { host } from "../../../../../config/config"; // API 주소 import

export const Side = () => {
  const [memberLevel, setMemberLevel] = useState(''); // memberLevel 상태
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); // 모달 상태
  const { setDocForm } = useDocFormStore();
  const { resetReferLine } = useReferLine();
  const { resetApprovalLine } = useApprovalLine();
  const navi = useNavigate();

  // 외부 스타일시트 추가
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // 사용자 레벨 가져오기
  useEffect(() => {
    const fetchUserLevel = async () => {
      try {
        const response = await axios.get(`${host}/members/memberInfo`);
        setMemberLevel(response.data.member_level);
      } catch (error) {
        console.error("Error fetching user level:", error);
      }
    };

    fetchUserLevel();
  }, []);

  const handleModal = (data) => {
    resetReferLine();
    resetApprovalLine();
    if (data === 'vacation') {
      setDocForm({ name: "휴가신청서", id: "3", period: "1년" });
    } else if (data === 'leave') {
      setDocForm({ name: "휴직신청서", id: "2", period: "10년" });
    }
    setIsSecondModalOpen(true);
  }

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainBtn}>
        <button onClick={() => { handleModal('vacation') }}>
          <i className="fa-solid fa-plus"></i>
          <p>휴가 신청</p>
        </button>
      </div>
      <div className={styles.mainBtn}>
        <button onClick={() => { handleModal('leave') }}>
          <i className="fa-solid fa-plus"></i>
          <p>휴직 신청</p>
        </button>
      </div>
      <div className={styles.menus}>
        <ul>
          <li onClick={() => { navi("/application/myvacation") }}>
            휴가 현황
          </li>
        </ul>
        {(memberLevel === '2' || memberLevel === '3') && (
          <ul>
            <li onClick={() => { navi("/application/allvacation") }}>
              전체 휴가 신청 현황
            </li>
          </ul>
        )}

      </div>
      {/* 결재선 모달 */}
      <SecondModal
        isOpen={isSecondModalOpen}
        onClose={closeSecondModal}
      />
    </div>
  );
};
