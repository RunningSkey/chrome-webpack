

import React from 'react';
import { render } from 'react-dom';
import Popup from './Popup';
console.log(chrome, "popup");//他在右上角扩展的里 3竖线里的 审计弹出内容的控制台打印 同backgorund
render(<Popup />,document.getElementById("chrome-extension-popup"));