(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[567],{6735:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/TodoList",function(){return n(3727)}])},3727:function(e,t,n){"use strict";n.r(t);var r=n(1527),i=n(7197),a=n(959),l=n(7031),d=n(2782),s=n(7024),o=n(4690),c=n(8836),u=n(3648),x=n(4945),m=n(3568),h=n.n(m);function g(e){var t;let{todo:n,index:i,setTodos:s}=e,{text:o,isChecked:c}=n,x=(0,a.useRef)(null),m={...n,index:i},[,g]=(0,l.L)({accept:"todo",hover(e,t){var n;if(!x.current)return;let r=e.index;if(r===i)return;let a=t.getClientOffset();if(!a)return;let l=null===(n=x.current)||void 0===n?void 0:n.getBoundingClientRect(),d=(l.bottom-l.top)/2,s=a.y-l.top;r<i&&s<d||r>i&&s>d||(v(r,i),e.index=i)}},[m]),[,f]=(0,d.c)({type:"todo",item:m},[m]);f(g(x));let p=(e,t)=>{s(n=>{let r=[...n];return r.map(n=>(n.id===e&&(n.isChecked=t.target.checked),n)),r})},v=(e,t)=>{s(n=>{let r=[...n];if(r[t]&&r[e]){let n=r[t];r[t]=r[e],r[e]=n}return r})},b=e=>{s(t=>t.filter(t=>t.id!==e))};return(0,r.jsx)("div",{ref:x,className:"".concat(null!==(t=h().todoitem)&&void 0!==t?t:""),children:(0,r.jsx)("div",{className:"flex items-center rounded-md hover:bg-gray-800",children:(0,r.jsxs)("div",{className:"flex grow ",children:[(0,r.jsx)("div",{className:"flex items-center px-1",children:(0,r.jsx)("input",{checked:null!=c&&c,id:"checked-checkbox",type:"checkbox",value:"",className:"h-4 w-4 rounded bg-gray-200 accent-green-600",onChange:e=>{p(n.id,e)}})}),(0,r.jsx)("div",{className:"grow border-gray-300 px-1 py-2 text-start text-gray-200 ".concat(c?"line-through":""," cursor-pointer"),children:o}),(0,r.jsx)("button",{type:"button",className:"rounded-md px-1 py-2 text-lg text-gray-200 hover:bg-gray-800",onClick:()=>{b(n.id)},children:(0,r.jsx)(u.Xm5,{})})]})})})}function f(e){let{children:t,className:n}=e,[,i]=(0,l.L)(()=>({accept:"todo"}));return(0,r.jsx)("div",{ref:i,className:n,children:t})}x.z.object({id:x.z.string(),index:x.z.number()}),t.default=function(){let[e,t]=(0,a.useState)([]),[n,l]=(0,a.useState)(""),d=e=>{let t=e.target.value.trimStart();n!==t&&l(t)},u=(0,a.useCallback)(e=>{e.preventDefault(),0!==n.length&&(t(e=>[...e,{id:(0,i.x0)(),text:n,isChecked:!1}]),l(""))},[n]),x=(0,a.useMemo)(()=>(0,r.jsx)(f,{className:"list-container max-h-[32rem]",children:e.map((e,n)=>(0,r.jsx)(g,{index:n,setTodos:t,todo:e},e.id))}),[e]);return(0,r.jsxs)("div",{className:"mx-auto max-w-2xl rounded-md bg-gray-900 p-2 text-gray-800",children:[(0,r.jsx)("div",{children:(0,r.jsx)("h1",{className:"mb-2 text-2xl font-bold text-gray-300",children:"Todo List"})}),(0,r.jsx)("form",{className:"flex gap-2 outline-0 ".concat(e[0]?"mb-4":""),onSubmit:u,children:(0,r.jsxs)("div",{className:"relative flex grow",children:[(0,r.jsx)("div",{className:"absolute-center-y left-2 text-gray-300",children:(0,r.jsx)(c.lnn,{})}),(0,r.jsx)("input",{type:"text",value:n,placeholder:"Add a task",className:"reset-input flex-1 rounded-md bg-gray-600 p-2 pl-8 text-gray-200 placeholder-gray-500",onChange:d})]})}),(0,r.jsx)(s.W,{backend:o.PD,children:x})]})}},3568:function(e){e.exports={todoitem:"TodoList_todoitem__tONUg","fade-in":"TodoList_fade-in__qWRoY"}}},function(e){e.O(0,[219,368,914,522,774,888,179],function(){return e(e.s=6735)}),_N_E=e.O()}]);