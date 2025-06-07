import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mixpanel from "mixpanel-browser";

interface BottomSectionProps {
  animate?: "highlight" | "initial";
  bgColor?: string;
}

const Bottom: React.FC<BottomSectionProps> = ({ animate }) => {
  const [buttonAnimate, setButtonAnimate] = useState<"initial" | "highlight">(
    "initial"
  );

  const reservBtnClick = () => {
    mixpanel.track("사전예약버튼 클릭");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setButtonAnimate((prevAnimate) =>
        prevAnimate === "highlight" ? "initial" : "highlight"
      );
    }, 600);

    return () => clearInterval(intervalId);
  }, []);

  const buttonVariants = {
    initial: { scale: 1 },
    highlight: {
      scale: 1.05,
      x: [0, -5, 5, -3, 3, 0],
      rotate: [0, -5, 5, -3, 3, 0],
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  return (
    <div className="button_container_style pt-1">
      <div className="flex justify-center gap-2 mt-1 mb-4">
        <motion.button
          style={{
            display: "flex",
            width: "300px",
            height: "60px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "15px",
            background: "#1781f4",
            color: "#fff",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
          variants={buttonVariants}
          onClick={reservBtnClick}
          initial="initial"
          animate={animate === "highlight" ? buttonAnimate : "initial"}
          whileTap={{ scale: 0.95 }}
        >
          <div className="font-[Pretendard] text-xl font-semibold">
            사전예약하기
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Bottom;
