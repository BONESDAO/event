(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[313],{7318:(e,t,a)=>{Promise.resolve().then(a.bind(a,5142))},4356:(e,t,a)=>{"use strict";a.d(t,{WalletProvider:()=>n,v:()=>i});var r=a(5109),s=a(46);let o=(0,s.createContext)(void 0),n=e=>{let{children:t}=e,[a,n]=(0,s.useState)(null);return(0,s.useEffect)(()=>{let e=localStorage.getItem("walletAddress");e&&n(e)},[]),(0,s.useEffect)(()=>{a&&localStorage.setItem("walletAddress",a)},[a]),(0,r.jsx)(o.Provider,{value:{walletAddress:a,setWalletAddress:n},children:t})},i=()=>{let e=(0,s.useContext)(o);if(!e)throw Error("useWallet must be used within a WalletProvider");return e}},5142:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>h});var r=a(5109),s=a(46),o=a(8248),n=a(5914),i=a(1593),c=a(4356),l=a(2596);let d=async e=>{try{let t=await fetch("https://api.deworkhub.com/api/users/".concat(e)),a=await t.json();if(a.success&&a.data)return a.data.points;return 0}catch(e){return console.error("获取用户积分失败:",e),0}},u=async(e,t)=>{try{let a=await fetch("https://api.deworkhub.com/api/exchange",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:e,type:t.category,amount:t.amount})});if((await a.json()).success)return!0;return alert("兑换奖励失败！"),!1}catch(e){return console.error("兑换奖励失败:",e),alert("兑换奖励失败！"),!1}},f=async(e,t)=>{try{var a;let r=await fetch("https://api.deworkhub.com/api/users/".concat(e)),s=await r.json(),o=(null==s?void 0:null===(a=s.data)||void 0===a?void 0:a.RemainingTimes)||0;if(!(await fetch("https://api.deworkhub.com/api/users/".concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:e,RemainingTimes:o+t})})).ok)throw Error("更新剩余次数失败")}catch(e){console.error("Error updating remaining times:",e)}},m=async(e,t)=>{try{let a=await fetch("https://api.deworkhub.com/api/users/".concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:e,points:t})});if(a.ok){let e=await a.json();console.log("积分更新成功:",e)}else throw Error("更新积分失败")}catch(e){console.error("更新积分失败:",e)}},p=async(e,t)=>{try{var a;let r=await fetch("https://api.deworkhub.com/api/users/".concat(e)),s=await r.json(),o=(null==s?void 0:null===(a=s.data)||void 0===a?void 0:a.sDWH)||0,n=parseFloat(o);if(isNaN(n))throw Error("当前 sDWH 值无效，无法进行计算");let i=await fetch("https://api.deworkhub.com/api/users/".concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:e,sDWH:n+t})});if(i.ok){let e=await i.json();console.log("sDWH更新成功:",e)}else throw Error("更新sDWH失败")}catch(e){console.error("更新sDWH失败:",e)}};function h(){let{walletAddress:e}=(0,c.v)(),[t,a]=(0,s.useState)(0),[h,g]=(0,s.useState)([]),{toast:y}=(0,l.dj)();(0,s.useEffect)(()=>{e&&(async()=>{a(await d(e))})(),g([{id:"1",name:"骰子",cost:10,amount:1,category:"骰子"},{id:"2",name:"LAT",cost:8,amount:8.88,category:"LAT"},{id:"3",name:"LAT",cost:10,amount:9.99,category:"LAT"},{id:"4",name:"LAT",cost:15,amount:16.88,category:"LAT"},{id:"5",name:"LAT",cost:30,amount:26.88,category:"LAT"},{id:"6",name:"USDT",cost:120,amount:1,category:"USDT"},{id:"7",name:"sDWH",cost:200,amount:1,category:"sDWH"},{id:"8",name:"sDWH",cost:898,amount:5,category:"sDWH"}])},[e]);let x=async r=>{if(!e){alert("请先连接钱包！");return}let s=h.find(e=>e.id===r);if(!s)return;if(t<s.cost){alert("您的积分不足，无法兑换此奖励！");return}let o=t-s.cost;if("LAT"===s.category||"USDT"===s.category){if(!await u(e,s))return;await m(e,o),a(o),y({title:"兑换成功！",description:"你已成功兑换 ".concat(s.amount," ").concat(s.name)})}if("骰子"===s.category){let t=s.amount;await f(e,t),await m(e,o),a(o),y({title:"兑换成功！",description:"你已成功兑换 ".concat(s.amount," ").concat(s.name)})}if("sDWH"===s.category){let t=s.amount;await p(e,t),await m(e,o),a(o),y({title:"兑换成功！",description:"你已成功兑换 ".concat(s.amount," ").concat(s.name)})}},w={骰子:"from-blue-500 to-blue-700",LAT:"from-green-500 to-green-700",USDT:"from-purple-500 to-purple-700",sDWH:"from-yellow-500 to-yellow-700"};return(0,r.jsx)("div",{className:"flex min-h-screen flex-col items-center justify-center",children:(0,r.jsx)("main",{className:"flex-1 container py-6",children:(0,r.jsxs)(i.P.div,{className:"space-y-6",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[(0,r.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold tracking-tight",children:"奖励中心"}),(0,r.jsx)("p",{className:"text-muted-foreground",children:"用你的积分兑换精彩奖励"})]}),(0,r.jsxs)(n.Zp,{children:[(0,r.jsxs)(n.aR,{children:[(0,r.jsx)(n.ZB,{children:"我的积分"}),(0,r.jsx)(n.BT,{children:"你可以用这些积分兑换下方的奖励"})]}),(0,r.jsx)(n.Wu,{children:(0,r.jsxs)("p",{className:"text-2xl font-bold",children:[t," 积分"]})})]}),(0,r.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:h.map(e=>(0,r.jsx)(i.P.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:(0,r.jsxs)(n.Zp,{className:"h-full flex flex-col",children:[(0,r.jsx)(n.aR,{children:(0,r.jsxs)(n.ZB,{className:"text-transparent bg-clip-text bg-gradient-to-r ".concat(w[e.category]),children:[e.amount," ",e.name]})}),(0,r.jsx)(n.Wu,{className:"flex-grow",children:(0,r.jsxs)("p",{className:"text-lg font-semibold",children:["所需积分: ",e.cost]})}),(0,r.jsx)(n.wL,{children:(0,r.jsx)(o.$,{onClick:()=>x(e.id),disabled:t<e.cost,className:"w-full bg-gradient-to-r ".concat(w[e.category]," text-white"),children:"兑换"})})]})},e.id))})]})})})}},8248:(e,t,a)=>{"use strict";a.d(t,{$:()=>l});var r=a(5109),s=a(46),o=a(1744),n=a(9917),i=a(9508);let c=(0,n.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),l=s.forwardRef((e,t)=>{let{className:a,variant:s,size:n,asChild:l=!1,...d}=e,u=l?o.DX:"button";return(0,r.jsx)(u,{className:(0,i.cn)(c({variant:s,size:n,className:a})),ref:t,...d})});l.displayName="Button"},5914:(e,t,a)=>{"use strict";a.d(t,{BT:()=>l,Wu:()=>d,ZB:()=>c,Zp:()=>n,aR:()=>i,wL:()=>u});var r=a(5109),s=a(46),o=a(9508);let n=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:(0,o.cn)("rounded-xl border bg-card text-card-foreground shadow",a),...s})});n.displayName="Card";let i=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:(0,o.cn)("flex flex-col space-y-1.5 p-6",a),...s})});i.displayName="CardHeader";let c=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:(0,o.cn)("font-semibold leading-none tracking-tight",a),...s})});c.displayName="CardTitle";let l=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",a),...s})});l.displayName="CardDescription";let d=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:(0,o.cn)("p-6 pt-0",a),...s})});d.displayName="CardContent";let u=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:(0,o.cn)("flex items-center p-6 pt-0",a),...s})});u.displayName="CardFooter"},2596:(e,t,a)=>{"use strict";a.d(t,{dj:()=>f,oR:()=>u});var r=a(46);let s=0,o=new Map,n=e=>{if(o.has(e))return;let t=setTimeout(()=>{o.delete(e),d({type:"REMOVE_TOAST",toastId:e})},1e6);o.set(e,t)},i=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:a}=t;return a?n(a):e.toasts.forEach(e=>{n(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},c=[],l={toasts:[]};function d(e){l=i(l,e),c.forEach(e=>{e(l)})}function u(e){let{...t}=e,a=(s=(s+1)%Number.MAX_SAFE_INTEGER).toString(),r=()=>d({type:"DISMISS_TOAST",toastId:a});return d({type:"ADD_TOAST",toast:{...t,id:a,open:!0,onOpenChange:e=>{e||r()}}}),{id:a,dismiss:r,update:e=>d({type:"UPDATE_TOAST",toast:{...e,id:a}})}}function f(){let[e,t]=r.useState(l);return r.useEffect(()=>(c.push(t),()=>{let e=c.indexOf(t);e>-1&&c.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>d({type:"DISMISS_TOAST",toastId:e})}}},9508:(e,t,a)=>{"use strict";a.d(t,{cn:()=>o});var r=a(5765),s=a(8816);function o(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,s.QP)((0,r.$)(t))}}},e=>{var t=t=>e(e.s=t);e.O(0,[948,202,572,231,358],()=>t(7318)),_N_E=e.O()}]);