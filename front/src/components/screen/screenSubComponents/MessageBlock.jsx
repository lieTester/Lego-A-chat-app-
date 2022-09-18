import { useContext, useEffect } from "react";
import ChatInfoContext from "../../../context/ChatInfoProvider";

function MessageBlock({ data }) {
  const { chatInfo } = useContext(ChatInfoContext);
  useEffect(() => {
    // currentMsg.current.scrollToView();
  });
  return (
    <div
      className={
        "w-full  flex " +
        (data.is_me
          ? "  justify-end [&>*]:rounded-l-[6px] [&>*]:rounded-tr-[6px] "
          : " [&>*]:rounded-r-[6px] [&>*]:rounded-tl-[6px]  ")
      }
    >
      <ul
        className={
          " !max-w-[70%]  overflow-hidden " +
          (chatInfo.group ? " !min-w-[70px] " : " !min-w-[40px] ")
        }
      >
        <li
          className={
            "flex " +
            (chatInfo.group && !data.is_me ? "justify-between" : "justify-end")
          }
        >
          {chatInfo.group && !data.is_me && (
            <span className="text-prim3 mt-[-2px] font-bold text-[13px] mr-3">
              {data.name}~
            </span>
          )}
          <span className="text-[10px]  text-prim2  ">{data.time}</span>
        </li>
        <li className="mr-2 break-words mt-[-4px] ">{data.text}</li>
      </ul>
    </div>
  );
}

export default MessageBlock;
