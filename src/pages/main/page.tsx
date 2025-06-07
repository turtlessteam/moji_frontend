import Bottom from "@/containers/ui/button";
import { Alarm, Friend, Message } from "./container/Asset";
import google from "@/pages/main/container/google.png";
import note from "@/pages/main/container/note.png";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

export function Main() {
  useEffect(() => {
    mixpanel.track("랜딩페이지 접속");
  }, []);
  const reservBtnClick = () => {
    mixpanel.track("사전예약버튼 클릭");
  };

  return (
    <div className="main">
      <div className="main_content">
        <div className="main_container">
          <div className="title_container">
            <div className="title text-left">
              해야할일, 까먹지 마세요<br></br>메모하고, 알림 받고,<br></br>
              간단히 확인하세요
            </div>
            <div className="mt-[63px]">
              <button onClick={reservBtnClick} className="reserv_btn">
                지금 사전예약하기
              </button>
            </div>
          </div>
          <div className="mockup_container">
            <div className="mockup_img"></div>{" "}
          </div>
        </div>
        <div className="notice_container">
          <div>
            <div className="flex justify-center">
              <Alarm />
            </div>
            <div className="notice_title">알림설정</div>
            <div className="notice">
              내가 할일을<br></br>간단히 알림 설정
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <Message />
            </div>
            <div className="notice_title">리마인드</div>
            <div className="notice">
              할일을 정한<br></br>시간에 리마인드
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img style={{ width: "75px" }} src={google}></img>
            </div>
            <div className="notice_title">구글 연동</div>
            <div className="notice">
              구글 캘린더와<br></br>연동해 사용
            </div>
          </div>
          <div>
            {" "}
            <div className="flex justify-center">
              <img style={{ width: "75px" }} src={note}></img>{" "}
            </div>
            <div className="notice_title">바로 메모</div>
            <div className="notice">
              급한 메모는<br></br>빠르게 바로
            </div>
          </div>
          <div>
            {" "}
            <div className="flex justify-center">
              <Friend />
            </div>
            <div className="notice_title">친구 추가</div>
            <div className="notice">
              친구에게<br></br>메모를 공유
            </div>
            <div className="bottom_margin"></div>
          </div>
        </div>

        <div className="mobile_btn">
          <Bottom />
        </div>
      </div>
    </div>
  );
}
