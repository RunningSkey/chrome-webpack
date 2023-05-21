import React, { useState, useEffect } from "react";
import style from './index.module.less';
export default () => {
  const [mount, setMount] = useState(false);
  const toggle = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log(chrome,'chrome');
    
    chrome.storage.local.get("isMount", ({ isMount }) => {
      setMount(!isMount);
      chrome.tabs.sendMessage(tab.id, {
        type: "init",
        data: !isMount,
        function(res) {
          console.log(res, "pop 获取到其他地方回应");
        },
      });
      chrome.action.setIcon({
        tabId: tab.id,
        path: !isMount
          ? {
              16: `icons/16.png`,
              48: "icons/48.png",
              128: "icons/128.png",
            }
          : {
              16: "icons/16-gray.png",
              48: "icons/48-gray.png",
              128: "icons/128-gray.png",
            },
      });
    });
  };
  useEffect(() => {
    chrome.storage.local.get("isMount", ({ isMount }) => {
      setMount(isMount);
    });
  }, []);
  return <div className={style.cursor} onClick={toggle}>{mount ? "OFF" : "ON"}</div>;
};
