(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{19:function(e,t,a){e.exports=a(43)},43:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(15),c=a.n(r);a(24);function u(e){var t={borderRadius:"0.1rem",backgroundColor:"".concat(e.color),textAlign:"right",padding:"20px",marginTop:"200px",left:"0",bottom:"0",height:"60px",width:"100%"};return l.a.createElement("div",{className:"container grid-lg",style:t},e.children)}var i=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(u,{color:"#4c4c4e"},l.a.createElement("span",{role:"img","aria-label":"muscle",style:{color:"white"}},"Created By zmomen \xa9 2020 \ud83d\udcaa\ud83c\udffc")))},m=a(1),o=(a(5),a(16)),s=(a(25),a(17)),d={headers:{"Access-Control-Allow-Origin":"*"}},E=a.n(s).a.create({baseURL:"http://192.168.0.27:8080"});var b=function(e){var t=Object(n.useState)([]),a=Object(m.a)(t,2),r=a[0],c=a[1];Object(n.useEffect)((function(){E.get("/media",d).then((function(e){var t=e.data;c(t)})).catch((function(e){return console.warn("error",e)}))}),[]);var u={duration:4e3,transitionDuration:500,infinite:!0,indicators:!0,arrows:!0,pauseOnHover:!0};return l.a.createElement("div",{className:"slide-container",style:{height:"450px"}},l.a.createElement(o.Slide,u,r.map((function(e,t){return l.a.createElement("div",{key:t,style:{paddingTop:"10px",paddingLeft:"30px"}},l.a.createElement("img",{height:"400",width:"900",key:t,src:e.mediaUrl,alt:e.title}))}))))},f=a(3),p=function(e,t){switch(t.type){case"SET_GLOBAL_USER":return Object(f.a)(Object(f.a)({},e),{},{userId:t.payload});default:return e}},v={userId:3},g=Object(n.createContext)(v),h=function(e){var t=e.children,a=Object(n.useReducer)(p,v),r=Object(m.a)(a,2),c=r[0],u=r[1];return l.a.createElement(g.Provider,{value:[c,u]},t)},O=function(){var e=Object(n.useContext)(g),t=Object(m.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)([]),u=Object(m.a)(c,2),i=u[0],o=u[1];Object(n.useEffect)((function(){E.get("/users",d).then((function(e){var t=e.data;o(t)})).catch((function(e){return console.warn("error",e)}))}),[]);return l.a.createElement("div",{className:"side-menu"},l.a.createElement("ul",{className:"menu"},l.a.createElement("li",null,"Who's Watching"),l.a.createElement("li",{className:"divider"}),i.map((function(e,t){return l.a.createElement("li",{key:t,className:"menu-item"},l.a.createElement("div",{className:"".concat(a.userId===e.id?"selected-user":""," c-hand"),onClick:function(){return t=e.id,void r({type:"SET_GLOBAL_USER",payload:t});var t}},l.a.createElement("figure",{className:"avatar avatar-sm bg-white"},l.a.createElement("img",{src:e.profileUrl,alt:"couple_img"})),"\xa0",e.name))}))))},y=a(4),j=function(e){var t=e.handleSubmit,a={title:"",media:"",genre:"",mediaUrl:"",notes:""},r=Object(n.useState)(a),c=Object(m.a)(r,2),u=c[0],i=c[1],o=Object(n.useState)(!1),s=Object(m.a)(o,2),d=s[0],E=s[1],b=function(e){E(!1);var t=e.target.value;i(Object(f.a)(Object(f.a)({},u),{},Object(y.a)({},e.target.name,t)))};return l.a.createElement("div",{className:"add-row"},l.a.createElement("table",{className:"table"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("label",null,"Title",l.a.createElement("br",null)),l.a.createElement("input",{type:"text",name:"title",value:u.title,onChange:b})),l.a.createElement("td",null,l.a.createElement("label",null,"Type",l.a.createElement("br",null)),l.a.createElement("input",{type:"text",name:"media",value:u.media,onChange:b})),l.a.createElement("td",null,l.a.createElement("label",null,"Genre",l.a.createElement("br",null)),l.a.createElement("input",{type:"text",name:"genre",value:u.genre,onChange:b})),l.a.createElement("td",null,l.a.createElement("br",null),l.a.createElement("button",{className:"btn btn-success",onClick:function(e){e.preventDefault(),""!==u.title&&""!==u.genre&&""!==u.media&&""!==u.mediaUrl&&""!==u.notes?(t(e,u),i(a)):E(!0)}},"Add"))),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("label",null,"Media Url",l.a.createElement("br",null)),l.a.createElement("input",{type:"text",name:"mediaUrl",value:u.mediaUrl,onChange:b})),l.a.createElement("td",null,l.a.createElement("label",null,"Notes",l.a.createElement("br",null)),l.a.createElement("input",{type:"text",name:"notes",value:u.notes,onChange:b}))))),d&&l.a.createElement("div",{style:{color:"red"}},"Error: missing data"))},N=a(18),x=function(){var e=Object(n.useContext)(g),t=Object(m.a)(e,1)[0],a=Object(n.useState)([]),r=Object(m.a)(a,2),c=r[0],u=r[1],i=Object(n.useState)(),o=Object(m.a)(i,2),s=o[0],b=o[1],f=Object(n.useState)(!1),p=Object(m.a)(f,2),v=p[0],h=p[1];Object(n.useEffect)((function(){var e;(e=t.userId,E.get("/users/".concat(e),d)).then((function(e){var t=e.data;b(t)})).catch((function(e){return console.warn("error",e)})),function(e){return E.get("/users/".concat(e,"/preferences"),d)}(t.userId).then((function(e){var t=e.data;u(t)})).catch((function(e){return console.warn("error",e)}))}),[t]);return l.a.createElement("div",{className:"main-body"},l.a.createElement("ul",{className:"menu"},l.a.createElement("li",null,l.a.createElement("div",{className:"d-flex",style:{justifyContent:"space-between",alignItems:"center"}},l.a.createElement("div",null,"Currently Playing for ",l.a.createElement("b",null,s&&s.name)),l.a.createElement("button",{className:"btn",onClick:function(){return h((function(e){return!e}))}},l.a.createElement("i",{className:"icon ".concat(v?"icon-minus":"icon-plus")})))),l.a.createElement("li",{className:"divider"}),l.a.createElement("li",null,l.a.createElement("table",{className:"table table-hover"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Title"),l.a.createElement("th",null,"Type"),l.a.createElement("th",null,"Genre"),l.a.createElement("th",null,"Notes"),l.a.createElement("th",null))),l.a.createElement("tbody",null,c.map((function(e,t){return l.a.createElement("tr",{key:t,className:"".concat((t+1)%2===0?"active":"")},l.a.createElement("td",null,e.title),l.a.createElement("td",null,e.media),l.a.createElement("td",null,e.genre),l.a.createElement("td",null,e.notes),l.a.createElement("td",null,l.a.createElement(C,{data:e})))})))),v&&l.a.createElement(j,{handleSubmit:function(e,a){e.preventDefault(),function(e,t){return E.post("/users/".concat(e,"/preferences"),t,d)}(t.userId,a).then((function(e){var t=e.data;u(c.concat(t))})).catch((function(e){return console.warn("error",e)}))}}))))},C=function(e){var t=e.data;return l.a.createElement(N.a,{trigger:l.a.createElement("button",{className:"btn"}," Edit "),modal:!0,closeOnDocumentClick:!0},l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("ul",null,l.a.createElement("li",null,"Title"),l.a.createElement("input",{value:t.title}),l.a.createElement("li",null,"Media Type"),l.a.createElement("input",{value:t.media}),l.a.createElement("li",null,"Genre"),l.a.createElement("input",{value:t.genre}),l.a.createElement("li",null,"Notes"),l.a.createElement("input",{value:t.notes}))),l.a.createElement("div",{className:"update-btn"},l.a.createElement("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault()}},"Update"))))},w=function(){return l.a.createElement(h,null,l.a.createElement("div",{className:"container grid-lg"},l.a.createElement(b,null),l.a.createElement("div",{className:"d-flex mt-2"},l.a.createElement(O,null),l.a.createElement(x,null)),l.a.createElement(i,null)))};c.a.render(l.a.createElement(w,null),document.getElementById("root"))},5:function(e,t,a){}},[[19,1,2]]]);
//# sourceMappingURL=main.b3e682ca.chunk.js.map