//页面加载时 就会执行
// "run_at": "document_start" 不能获取dom
// "run_at": "document_end" 能获取dom
// "run_at": "document_idle" 保证在 DOMContentLoaded 事件之后执行脚本，该事件表示所有静态DOM内容都已解析并可用
console.log('init content-scripts');//执行了3次

//初始化重置为false
chrome.storage.local.set({
  isMount: false,
});

chrome.runtime.onMessage.addListener(function (request, sender, sendReponse) {
  console.log({
    request,
    sender,
    sendReponse,
  });
  console.log(chrome, "content-scripts");
  const { data } = request;
  chrome.storage.local.set({
    isMount: data,
  });

  document.body.style.backgroundColor = data ? "green" : "";
  sendReponse("change success")
});



