(this["webpackJsonpe-commerce"]=this["webpackJsonpe-commerce"]||[]).push([[15],{488:function(e,t,a){"use strict";var c=a(2),r=a(4),n=a(0),i=a(5),s=a(240),o=a(8),l=n.forwardRef((function(e,t){var a=e.classes,o=e.className,l=e.raised,u=void 0!==l&&l,d=Object(r.a)(e,["classes","className","raised"]);return n.createElement(s.a,Object(c.a)({className:Object(i.a)(a.root,o),elevation:u?8:1,ref:t},d))}));t.a=Object(o.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(l)},494:function(e,t,a){"use strict";var c=a(103),r=a(428),n=a(12),i=a(9),s=(a(0),a(488)),o=a(162),l=a(15),u=a(1),d=Object(c.a)((function(e){return{card:{width:200,height:250,cursor:"pointer","&:hover":{boxShadow:"5px 10px 18px #888888"},padding:15,textAlign:"center"},categoryImage:{height:200,width:200}}})),g=function(e){var t=e.category,a=d(),c=Object(l.g)();return Object(u.jsxs)(s.a,{variant:"outlined",className:a.card,onClick:function(){return c.push("/category/".concat(t.path))},children:[Object(u.jsx)(o.a,{src:t.description[0].categoryImage,alt:t.name,className:a.categoryImage}),Object(u.jsx)(n.a,{component:"p",variant:"subtitle1",children:t.name.toUpperCase()})]})},j=Object(c.a)((function(){return{container:{width:"90%",padding:10},categoryTitle:{padding:10,textTransform:"uppercase"}}}));t.a=function(e){var t=e.categories,a=e.label,c=j();return Object(u.jsxs)(r.a,{className:c.container,children:[Object(u.jsx)(n.a,{component:"h5",variant:"h5",className:c.categoryTitle,children:a}),Object(u.jsx)(i.a,{container:!0,alignItems:"center",spacing:2,children:t.map((function(e){return e.subCategories.map((function(e){return Object(u.jsx)(i.a,{item:!0,xs:12,sm:5,lg:3,md:4,children:Object(u.jsx)(g,{category:e})},e._id)}))}))})]})}},536:function(e,t,a){"use strict";a.r(t);a(0);var c=a(22),r=a(494),n=a(1);t.default=function(){var e=Object(c.d)((function(e){return e.categoryListReducer})),t=e.loading,a=e.categories;return Object(n.jsx)(n.Fragment,{children:a&&!t&&Object(n.jsx)(r.a,{categories:a,label:"All Categories"})})}}}]);
//# sourceMappingURL=15.4b11a6d8.chunk.js.map