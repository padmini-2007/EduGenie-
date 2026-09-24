import defaultData from "../assets/default_loader.json";
import readData from "../assets/read_loader.json";
import showData from "../assets/show_loader.json";
import Lottie from "lottie-react";

export default function PageLoader({ type }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-80">
      <div
        className={`${
          type === "read" ? "w-50 h-50" : "w-100 h-100"
        } flex flex-col justify-center items-center`}
      >
        <Lottie
          animationData={
            type === "default"
              ? defaultData
              : type === "read"
              ? readData
              : showData
          }
          loop={true}
        />
      </div>
    </div>
  );
}
