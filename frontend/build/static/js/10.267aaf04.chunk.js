(this["webpackJsonpe-commerce"]=this["webpackJsonpe-commerce"]||[]).push([[10],{475:function(e,t,n){var r=n(478),a=n(479),o=n(476),i=n(481);e.exports=function(e,t){return r(e)||a(e,t)||o(e,t)||i()},e.exports.__esModule=!0,e.exports.default=e.exports},476:function(e,t,n){var r=n(480);e.exports=function(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},478:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},479:function(e,t){e.exports=function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(c){s=!0,a=c}finally{try{i||null==n.return||n.return()}finally{if(s)throw a}}return o}},e.exports.__esModule=!0,e.exports.default=e.exports},480:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.__esModule=!0,e.exports.default=e.exports},481:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},486:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var r=n(475),a=n.n(r),o=n(165),i=n.n(o),s=n(0),c=n(433);function u(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"===typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var l={};function p(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"===typeof t[0]&&l[t[0]]||("string"===typeof t[0]&&(l[t[0]]=new Date),u.apply(void 0,t))}function d(e,t,n){e.loadNamespaces(t,(function(){if(e.isInitialized)n();else{e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}}))}function f(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return p("i18n.languages were undefined or empty",t.languages),!0;var r=t.languages[0],a=!!t.options&&t.options.fallbackLng,o=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var i=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!i(t.isLanguageChangingTo,e))&&(!!t.hasResourceBundle(r,e)||(!t.services.backendConnector.backend||!(!i(r,e)||a&&!i(o,e))))}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,r=Object(s.useContext)(c.a)||{},o=r.i18n,i=r.defaultNS,u=n||o||Object(c.d)();if(u&&!u.reportNamespaces&&(u.reportNamespaces=new c.b),!u){p("You will need to pass in an i18next instance by using initReactI18next");var l=function(e){return Array.isArray(e)?e[e.length-1]:e},m=[l,{},!1];return m.t=l,m.i18n={},m.ready=!1,m}u.options.react&&void 0!==u.options.react.wait&&p("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var g=b(b(b({},Object(c.c)()),u.options.react),t),j=g.useSuspense,y=g.keyPrefix,h=e||i||u.options&&u.options.defaultNS;h="string"===typeof h?[h]:h||["translation"],u.reportNamespaces.addUsedNamespaces&&u.reportNamespaces.addUsedNamespaces(h);var v=(u.isInitialized||u.initializedStoreOnce)&&h.every((function(e){return f(e,u,g)}));function O(){return u.getFixedT(null,"fallback"===g.nsMode?h:h[0],y)}var x=Object(s.useState)(O),w=a()(x,2),N=w[0],S=w[1],E=Object(s.useRef)(!0);Object(s.useEffect)((function(){var e=g.bindI18n,t=g.bindI18nStore;function n(){E.current&&S(O)}return E.current=!0,v||j||d(u,h,(function(){E.current&&S(O)})),e&&u&&u.on(e,n),t&&u&&u.store.on(t,n),function(){E.current=!1,e&&u&&e.split(" ").forEach((function(e){return u.off(e,n)})),t&&u&&t.split(" ").forEach((function(e){return u.store.off(e,n)}))}}),[u,h.join()]);var P=Object(s.useRef)(!0);Object(s.useEffect)((function(){E.current&&!P.current&&S(O),P.current=!1}),[u]);var I=[N,u,v];if(I.t=N,I.i18n=u,I.ready=v,v)return I;if(!v&&!j)return I;throw new Promise((function(e){d(u,h,(function(){e()}))}))}},548:function(e,t,n){"use strict";n.r(t);var r=n(32),a=n(246),o=n(12),i=n(68),s=n(8),c=(n(0),n(107)),u=n(166),l=n(22),p=n(163),d=n(429),f=n(243),m=n(104),b=n(51),g="REGISTER_PAGE.SIGN_IN",j="REGISTER_PAGE.REGISTER",y="REGISTER_PAGE.EXISTING_CUSTOMER",h=n(486),v=n(1),O=Object(m.a)((function(e){return{input:{width:"90%",margin:10},alert:{width:"80%",margin:10},button:{margin:10,width:"90%",padding:10},title:{margin:10}}})),x=function(e){var t=e.className,n=e.meta,o=e.input,i=e.label,s=e.type,c=e.autoComplete,u=void 0===c?"off":c;return Object(v.jsx)(a.a,Object(r.a)(Object(r.a)({error:n.touched&&void 0!==n.error,label:i,helperText:n.touched&&n.error,size:"small"},o),{},{type:s,variant:"filled",autoComplete:u,className:t}))};t.default=Object(d.a)({form:"registerForm",validate:function(e){var t={email:"",password:"",confirmPassword:""},n=e.email,r=e.password,a=e.confirmPassword;return["email","password","name","confirmPassword"].forEach((function(n){e[n]||(t[n]="".concat(n[0].toUpperCase()+n.substr(1)," is Required"))})),n&&!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(n)&&(t.email="Invalid email address"),r&&r.length<8&&(t.password="Password must have atleast 8 characters"),r&&a&&r!==a&&(t.confirmPassword="Passwords dont match"),t}})((function(e){var t=O(),n=Object(l.c)(),r=Object(h.a)().t,a=g,d=j,m=y,w=Object(l.d)((function(e){return e.userRegister})).error;return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)(u.a,{justifyContent:"center",alignItems:"center",direction:"column",lg:3,md:3,sm:5,xs:12,children:[Object(v.jsx)(o.a,{variant:"h4",component:"h4",className:t.title,children:r(a)}),w?Object(v.jsx)(f.a,{severity:"error",className:t.alert,children:w.data.message}):null,Object(v.jsxs)("form",{onSubmit:e.handleSubmit((function(e){var t=e.email,r=e.password,a=e.name;n(Object(b.d)(t,r,a))})),children:[Object(v.jsx)(p.a,{id:"email-input",name:"email",label:"Email Address",type:"email",autoComplete:"on",component:x,className:t.input}),Object(v.jsx)(p.a,{id:"name-input",name:"name",label:"Name",type:"text",autoComplete:"on",component:x,className:t.input}),Object(v.jsx)(p.a,{id:"password-input",name:"password",label:"Password",type:"password",component:x,className:t.input}),Object(v.jsx)(p.a,{id:"password-confirm-input",name:"confirmPassword",label:"Confirm Password",type:"password",component:x,className:t.input}),Object(v.jsx)(i.a,{color:"primary",type:"submit",variant:"contained",className:t.button,children:r(d)})]}),Object(v.jsx)(s.a,{container:!0,children:Object(v.jsx)(s.a,{item:!0,xs:12,children:Object(v.jsxs)(o.a,{variant:"body1",component:"p",className:t.title,children:[r(m)," ",Object(v.jsx)(c.b,{to:"/login",children:r(a)})]})})})]})})}))}}]);
//# sourceMappingURL=10.267aaf04.chunk.js.map