import Bottom from "@/containers/ui/button";
import { Alarm, Friend, Message } from "./container/Asset";
import google from "@/pages/main/container/google.png";
import note from "@/pages/main/container/note.png";
import mixpanel from "mixpanel-browser";
import { useEffect, useState } from "react";

export function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    mixpanel.track("랜딩페이지 접속");
  }, []);

  const reservBtnClick = () => {
    mixpanel.track("사전예약버튼 클릭");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmail(""); // 입력 초기화
  };

  const handleEmailSubmit = () => {
    const trimmedEmail = email.trim().toLowerCase();

    if (submittedEmails.has(trimmedEmail)) {
      alert("이미 제출된 이메일입니다.");
      return;
    }

    // 1. Mixpanel 사용자 식별
    mixpanel.identify(trimmedEmail); // 이메일로 유저 추적

    // 2. 속성 설정 (선택)
    mixpanel.people.set({
      $email: trimmedEmail,
      submitted_at: new Date().toISOString(),
    });

    // 3. 이벤트 트래킹
    mixpanel.track("이메일 제출", { email: trimmedEmail });

    // 4. 상태 업데이트
    setSubmittedEmails((prev) => new Set(prev).add(trimmedEmail));
    alert(`제출된 이메일: ${trimmedEmail}`);
    handleCloseModal();
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
          <Bottom onClick={reservBtnClick} />
        </div>

        {/* 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-md flex justify-center items-center ">
            <div className="bg-white bg-opacity-80 p-10 rounded-xl w-100  shadow-lg backdrop-blur-sm border border-white/30">
              <div className="text-3xl font-semibold mb-4 text-center">
                이메일 입력
              </div>
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="w-full border px-3 py-2 rounded-md mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleEmailSubmit}
                  disabled={submittedEmails.has(email.trim().toLowerCase())}
                  style={{
                    display: "flex",
                    width: "200px",
                    height: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "15px",
                    background: submittedEmails.has(email.trim().toLowerCase())
                      ? "#ccc"
                      : "#1781f4",
                    color: "#fff",
                    border: "none",
                    outline: "none",
                    cursor: submittedEmails.has(email.trim().toLowerCase())
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  제출
                </button>
              </div>
              <button
                onClick={handleCloseModal}
                className="appearance-none px-4 py-2 bg-gray-300 text-black rounded-md
             border-none outline-none focus:outline-none focus:ring-0
             hover:bg-gray-300 hover:shadow-none hover:text-black"
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
