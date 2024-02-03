(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[209],{2416:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/dashboard/content",function(){return r(6865)}])},778:function(e,t,r){"use strict";r.r(t);var a=r(5893),s=r(1664),n=r.n(s),d=r(1163);r(7294);var c=r(7696);t.default=e=>{let{children:t}=e,r=(0,d.useRouter)();return(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsxs)("div",{className:"bg-white pl-4 pt-4 pr-3 shadow-md border-r-0",style:{width:"15%",minHeight:"100vh"},children:[(0,a.jsxs)("ul",{className:" text-white flex flex-col gap-2",children:[(0,a.jsx)(n(),{href:"/admin/dashboard",children:(0,a.jsx)("li",{className:" hover:bg-primary hover:text-white py-2 rounded-md px-4 ".concat("/admin/dashboard"===r.asPath?"bg-primary text-white":"text-black"),children:"Image"})}),(0,a.jsx)(n(),{href:"/admin/dashboard/content",children:(0,a.jsx)("li",{className:" hover:bg-primary hover:text-white py-2 rounded-md px-4 ".concat("/admin/dashboard/content"===r.asPath?"bg-primary text-white":"text-black"),children:"Content"})})]}),(0,a.jsxs)("button",{onClick:()=>{localStorage.clear(),r.replace("/admin")},className:"bg-red-500 text-white px-4 py-1 rounded-md mt-[30vh] flex items-center justify-between gap-2",children:["Logout",(0,a.jsx)(c.Opj,{})]})]}),(0,a.jsx)("div",{id:"content",className:"w-full",children:t})]})}},6865:function(e,t,r){"use strict";r.r(t);var a=r(5893),s=r(7294),n=r(778),d=r(4668),c=r(9828),i=r(9532),l=r(1664),o=r.n(l),h=r(9041),m=r(1163);t.default=()=>{let e=(0,m.useRouter)(),[t,r]=(0,s.useState)([]),[l,x]=(0,s.useState)(!0),u=e=>new Date(1e3*e.seconds).toLocaleString(),p=e=>{let t=e.getCurrentContent().getPlainText();return t.slice(0,50)+(t.length>50?"...":"")},g=async()=>{try{let e=await (0,c.PL)((0,c.hJ)(i.db,"news")),t=[];e.forEach(e=>{let r=e.data();try{let e;e="string"==typeof r.content?(0,h.convertFromRaw)(JSON.parse(r.content)):(0,h.convertFromRaw)(r.content),r.content=h.EditorState.createWithContent(e)}catch(t){console.error("Error parsing content for document ID "+e.id+": ",t),r.content=h.EditorState.createEmpty()}t.push({id:e.id,...r})}),t.sort((e,t)=>t.created.toDate()-e.created.toDate()),r(t)}catch(e){console.error("Error reading documents: ",e)}finally{x(!1)}};(0,s.useEffect)(()=>{e.isReady&&g()},[e.isReady]);let b=async e=>{x(!0);try{await (0,c.oe)((0,c.JU)(i.db,"news",e))}catch(e){console.error("Error deleting document: ",e)}finally{g(),x(!1)}};return(0,a.jsx)(d.Z,{children:(0,a.jsx)(n.default,{children:(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsxs)("div",{id:"heading",className:"flex justify-between items-center mb-4",children:[(0,a.jsx)("h1",{className:"text-2xl font-semibold",children:"Content"}),(0,a.jsx)(o(),{href:"/admin/dashboard/content/create",children:(0,a.jsx)("button",{className:"bg-green-600 py-1 px-4 rounded-md text-white",children:"Buat Baru"})})]}),l?(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center",id:"loadingData",style:{margin:"20px auto",textAlign:"center",height:300},children:[(0,a.jsx)("img",{src:"/images/loading-animation.gif",alt:"loading",width:120}),(0,a.jsx)("p",{className:"mt-[-20px]",children:"Sedang memuat data"})]}):(0,a.jsxs)("table",{className:"w-full",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"w-full bg-slate-300",children:[(0,a.jsx)("th",{className:"border border-gray-300 p-2 w-2/12",children:"Date"}),(0,a.jsx)("th",{className:"border border-gray-300 p-2 w-3/12",children:"Judul"}),(0,a.jsx)("th",{className:"border border-gray-300 p-2 w-4/12",children:"Isi Berita"}),(0,a.jsx)("th",{className:"border border-gray-300 p-2 w-2/12",children:"Gambar"}),(0,a.jsx)("th",{className:"border border-gray-300 p-2",children:"Actions"})]})}),(0,a.jsx)("tbody",{children:t.length>0?t.map((e,t)=>(0,a.jsxs)("tr",{className:"",children:[(0,a.jsx)("td",{className:"border border-gray-300 p-2",children:(0,a.jsx)("p",{children:u(e.created)})}),(0,a.jsx)("td",{className:"border border-gray-300 p-2",children:(0,a.jsx)("p",{children:e.title})}),(0,a.jsx)("td",{className:"border border-gray-300 p-2",children:(0,a.jsx)("p",{children:p(e.content)})}),(0,a.jsx)("td",{className:"border border-gray-300 p-2",children:(0,a.jsx)("img",{src:e.image[0],alt:"image",style:{objectFit:"cover",height:100,width:200}})}),(0,a.jsx)("td",{className:"border border-gray-300 p-2",children:(0,a.jsxs)("div",{id:"actions",className:"flex items-center justify-center gap-2 text-sm",children:[(0,a.jsx)(o(),{href:"/admin/dashboard/content/".concat(e.id),children:(0,a.jsx)("button",{className:"bg-blue-600 py-1 px-4 rounded-md text-white",children:"Edit"})}),(0,a.jsx)("button",{onClick:()=>b(e.id),className:"bg-red-600 py-1 px-4 rounded-md text-white",children:"Delete"})]})})]},t)):(0,a.jsx)(a.Fragment,{})})]})]})})})}},9532:function(e,t,r){"use strict";let a;r.d(t,{I:function(){return c},db:function(){return i}});var s=r(3977),n=r(1259),d=r(9828);a=(0,s.C6)().length?(0,s.Mq)():(0,s.ZF)({apiKey:"AIzaSyCBmWeArUtxaBRQaYL88OpGKwaL_0EgrtY",authDomain:"pokjar-9ff33.firebaseapp.com",projectId:"pokjar-9ff33",storageBucket:"pokjar-9ff33.appspot.com",messagingSenderId:"549660388056",appId:"1:549660388056:web:520937479bd1e023e405ad"});let c=(0,n.v0)(a),i=(0,d.ad)(a)},4668:function(e,t,r){"use strict";var a=r(5893),s=r(1163),n=r(7294);t.Z=e=>{let{children:t}=e,r=(0,s.useRouter)(),[d,c]=(0,n.useState)("");return((0,n.useEffect)(()=>{let e=localStorage.getItem("tokenPokjar");c(e||""),e||r.replace("/")},[d,r.isReady]),d)?(0,a.jsx)(a.Fragment,{children:t}):(0,a.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,a.jsx)("p",{children:"Redirecting..."})})}}},function(e){e.O(0,[16,211,317,368,913,41,888,774,179],function(){return e(e.s=2416)}),_N_E=e.O()}]);