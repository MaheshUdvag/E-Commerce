(this["webpackJsonpe-commerce"]=this["webpackJsonpe-commerce"]||[]).push([[1],{491:function(e,t,a){"use strict";var n=a(22);t.a=function(){var e=Object(n.d)((function(e){return e.userProfile}));return{user:e.user,error:e.error}}},537:function(e,t,a){"use strict";a.r(t);var n=a(28),s=a(23),r=a(32),i=a(14),c=a.n(i),o=a(246),l=a(9),m=a(12),u=a(68),d=a(0),p=a(164),j=a(22),b=a(160),x=a(429),O=a(243),h=a(103),f=a(60),y=a(64),g=a(15),N=a(51),v=a(491),C=a(1),q=Object(h.a)((function(e){return{input:{width:"95%",margin:10},alert:{width:"80%",margin:10},button:{margin:10,width:"100%",padding:10},title:{margin:10}}})),z=function(e){var t=e.className,a=e.meta,n=e.input,s=e.label,i=e.type,c=e.required,l=void 0!==c&&c,m=e.autoComplete,u=void 0===m?"off":m;return Object(C.jsx)(o.a,Object(r.a)(Object(r.a)({error:a.touched&&void 0!==a.error,label:s,helperText:a.touched&&a.error,size:"small"},n),{},{type:i,required:l,variant:"filled",autoComplete:u,className:t}))};t.default=Object(j.b)((function(e,t){return{initialValues:t.location.state?t.location.state.initialValues:{}}}))(Object(x.a)({form:"addressForm",validate:function(e){var t={firstName:"",lastName:"",street1:"",street2:"",city:"",state:"",country:"",zipcode:"",phone:""};return["lastName","street1","city","state","country","zipcode","phone"].forEach((function(a){e[a]||(t[a]="".concat(a[0].toUpperCase()+a.substr(1)," is Required"))})),e.lastName&&e.lastName.length<3&&(t.lastName="Name must have atleast 3 characters"),e.zipcode&&e.zipcode.length<5&&(t.zipcode="Zipcode must have atleast 5 characters"),t},enableReinitialize:!0})((function(e){var t=q(),a=Object(j.c)(),r=Object(g.g)(),i=Object(d.useState)(!1),o=Object(s.a)(i,2),x=o[0],h=o[1],k=Object(y.a)().user.token,w=Object(v.a)().user;Object(d.useEffect)((function(){var t=e.location.state?e.location.state.initialValues:{};t&&Object.keys(t).length>0&&h(!0)}),[a,e.location.state]);var S=function(){var t=Object(n.a)(c.a.mark((function t(n){var s,i,o;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s={status:404},!0!==x){t.next=11;break}return i=e.location.state.initialValues,n.addressType=i.addressType,n.isPrimary=i.isPrimary,n._id=i._id,t.next=8,Object(f.e)(n,k);case 8:s=t.sent,t.next=17;break;case 11:return n.addressType="SB",n.isPrimary="0",0===w.address.length&&(n.isPrimary="1"),t.next=16,Object(f.a)(n,k);case 16:s=t.sent;case 17:200===s.status&&(a(Object(N.a)()),o=e.location.state.redirect||"/profile/adderss",r.push(o));case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),P=Object(j.d)((function(e){return e.userUpdate})).error;return Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)(p.a,{justifyContent:"center",alignItems:"center",direction:"column",lg:6,md:8,sm:12,xs:12,children:[P?Object(C.jsx)(O.a,{severity:"error",className:t.alert,children:P.data.message}):null,Object(C.jsx)("form",{onSubmit:e.handleSubmit(S),children:Object(C.jsxs)(l.a,{container:!0,spacing:0,children:[Object(C.jsx)(l.a,{item:!0,lg:12,md:12,sm:12,xs:12,children:Object(C.jsx)(m.a,{className:t.input,variant:"h4",children:"ADDRESS"})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"first-name-input",name:"firstName",label:"firstName",type:"text",autoComplete:"on",component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"last-name-input",name:"lastName",label:"lastName",type:"text",required:!0,autoComplete:"on",component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"street1-input",name:"street1",label:"street1",type:"text",autoComplete:"on",required:!0,component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"street2-input",name:"street2",label:"street2",type:"text",autoComplete:"on",component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"city-input",name:"city",label:"city",type:"text",autoComplete:"on",required:!0,component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"state-input",name:"state",label:"state",type:"text",autoComplete:"on",required:!0,component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"country-input",name:"country",label:"country",type:"text",autoComplete:"on",required:!0,component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"zipcode-input",name:"zipcode",label:"zipcode",type:"text",autoComplete:"on",required:!0,component:z,className:t.input})}),Object(C.jsx)(l.a,{item:!0,lg:6,md:6,sm:6,xs:12,children:Object(C.jsx)(b.a,{id:"phone-input",name:"phone",label:"phone",type:"text",autoComplete:"on",required:!0,component:z,className:t.input})}),Object(C.jsx)(u.a,{color:"primary",type:"submit",variant:"contained",className:t.button,children:x?"Update":"Create"})]})})]})})})))}}]);
//# sourceMappingURL=1.c5841120.chunk.js.map