import { useEffect, useState } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // 필요한 경우 axios를 import
import { host } from "../../../../../config/config";

export const Side = () => {
  const [memberLevel, setMemberLevel] = useState(''); // memberLevel 상태
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 여부
  const navi = useNavigate();

  useEffect(() => {
    // 로그인 ID를 통해 사용자 정보를 가져오는 로직
    const fetchMemberLevel = async () => {
      try {
        const response = await axios.get(`${host}/members/memberInfo`);
        const level = response.data.member_level;
        setMemberLevel(level);

        // Check if user is admin based on level
        if (level === '2' || level === '3') {
          axios.get(`${host}/members/selectLevel`)
            .then((response1) => {
              const hrstatus = response1.data[parseInt(level) - 1]?.hr;
              if (hrstatus === 'y') {
                setIsAdmin(true); // Adjust if necessary
              }
            });
        }
      } catch (error) {
        console.error('Error fetching member level:', error);
      }
    };

    fetchMemberLevel();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.menus}>
        <ul>
          <li onClick={() => { navi("/attendance/myattendance") }}>
             근무 현황
          </li>
        </ul>
        <ul>
          <li onClick={() => { navi("/attendance/monthlystats") }}>
            월간 근무 현황
          </li>
        </ul>
        {memberLevel === '2' || memberLevel === '3' ? (
          <ul>
            <li onClick={() => { navi("/attendance/allattendance") }}>
              부서 근무 현황
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};
