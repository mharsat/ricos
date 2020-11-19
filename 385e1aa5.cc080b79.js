(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{67:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return r})),a.d(t,"metadata",(function(){return c})),a.d(t,"rightToc",(function(){return i})),a.d(t,"default",(function(){return p}));var n=a(2),l=a(6),b=(a(0),a(128)),r={id:"theming",title:"Theming",sidebar_label:"Theming"},c={unversionedId:"ricos/theming",id:"ricos/theming",isDocsHomePage:!1,title:"Theming",description:"| Name          | Type                                   | Default | Short Description                                  |",source:"@site/docs/ricos/Theming.mdx",slug:"/ricos/theming",permalink:"/rich-content/docs/ricos/theming",version:"current",sidebar_label:"Theming",sidebar:"ricos",previous:{title:"Introducing the rich content viewer",permalink:"/rich-content/docs/ricos/adding-a-viewer"},next:{title:"Preview",permalink:"/rich-content/docs/ricos/preview"}},i=[{value:"<code>palette</code>",id:"palette",children:[]},{value:"<code>parentClass</code>",id:"parentclass",children:[]},{value:"<code>typography</code>",id:"typography",children:[]},{value:"<code>customStyles</code>",id:"customstyles",children:[]}],o={rightToc:i};function p(e){var t=e.components,a=Object(l.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},o,a,{components:t,mdxType:"MDXLayout"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Short Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"palette?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Palette ","|"," WixPalette ","|"," PalettePreset"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Colors definition for Ricos")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"parentClass?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"A parent css className that wraps a ricos instance")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"typography?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"RicosTypography"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Colors definition for Ricos")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"customStyles?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"RicosCustomTheme"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Customize specific textual elements within Ricos")))),Object(b.b)("h3",{id:"palette"},Object(b.b)("inlineCode",{parentName:"h3"},"palette")),Object(b.b)("p",null,"Defines the palette of colors that will be used."),Object(b.b)("h4",{id:"palette-1"},Object(b.b)("inlineCode",{parentName:"h4"},"Palette")),Object(b.b)("p",null,"3-Color object, representing the color layout for Ricos."),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Short Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"bgColor"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string (HEX Formatted Color)"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Background Color")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"textColor"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string (HEX Formatted Color)"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Text Color")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"actionColor"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"string (HEX Formatted Color)"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Action Color")))),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"const palette = {\n  bgColor: 'transparent',\n  textColor: '#111111',\n  actionColor: 'rgb(132, 84, 252)',\n};\n// ...\n<RicosEditor theme={{ palette }} />;\n")),Object(b.b)("h4",{id:"palettepreset-work-in-progress"},Object(b.b)("inlineCode",{parentName:"h4"},"PalettePreset")," (Work in Progress)"),Object(b.b)("p",null,"Pick a palette preset by its name. Currently supports 'darkTheme' only."),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"<RicosEditor theme={{ palette: 'darkTheme' }} />\n")),Object(b.b)("h4",{id:"wixpalette"},Object(b.b)("inlineCode",{parentName:"h4"},"WixPalette")),Object(b.b)("p",null,"A Palette given & defined by Wix."),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"<RicosEditor theme={{ palette: wixPalette }} />\n")),Object(b.b)("h3",{id:"parentclass"},Object(b.b)("inlineCode",{parentName:"h3"},"parentClass")),Object(b.b)("p",null,"A parent css className that wraps a ricos instance.\nWith this defined, dynamic styles will be wrapped by ",Object(b.b)("inlineCode",{parentName:"p"},"parentClass")," for CSS specifity."),Object(b.b)("p",null,"You'll have to specify ",Object(b.b)("em",{parentName:"p"},"parentClass")," if you plan to apply different palettes for multiple Ricos instances living next to each other."),Object(b.b)("p",null,"Otherwise, you can ignore this field."),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"<div className='class1'>\n  <RicosEditor theme={{ parentClass: 'class1', palette: lightPalette }} />\n</div>\n<div className='class2'>\n  <RicosEditor theme={{ parentClass: 'class2', palette: darkPalette }} />\n</div>\n")),Object(b.b)("h3",{id:"typography"},Object(b.b)("inlineCode",{parentName:"h3"},"typography")),Object(b.b)("p",null,"Provide typography definitions into Ricos Instance."),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Short Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"fontFamily?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['fontFamily']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Font Family for Ricos")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"wixTypography"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"WixTypography"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Ineffective atm (WIP). WixSiteObject of Fonts")))),Object(b.b)("h5",{id:"fontfamily---affects-every-textual-element-including-body-text-menus--modals"},Object(b.b)("inlineCode",{parentName:"h5"},"fontFamily")," - affects every textual element, including body text, menus & modals."),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"const typography = { fontFamily: 'Arial' };\n// ...\n<RicosEditor theme={{ typography }} />;\n")),Object(b.b)("h5",{id:"wixtypography---work-in-progress-this-field-is-ineffective-at-the-moment"},Object(b.b)("inlineCode",{parentName:"h5"},"wixTypography")," - Work in progress. This field is ineffective at the moment."),Object(b.b)("h3",{id:"customstyles"},Object(b.b)("inlineCode",{parentName:"h3"},"customStyles")),Object(b.b)("p",null,"As of consumers requests, you're able to customize several textual elements of Ricos in terms of font and color."),Object(b.b)("h4",{id:"example"},"Example"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-tsx"}),"const customStyles: RicosCustomTheme = {\n  h2: {\n    fontFamily: 'Times',\n    fontSize: '40px',\n    color: 'red',\n    textDecoration: 'underline',\n  },\n  quote: {\n    lineHeight: '40px',\n    fontWeight: 'bold',\n    fontStyle: 'italic',\n  },\n};\n// ...\n<RicosEditor theme={{ customStyles }} />;\n")),Object(b.b)("h4",{id:"ricoscustomtheme"},"RicosCustomTheme"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Short Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"h2?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"h3?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"h4?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"h5?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"h6?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"p?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"quote?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"link?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"hashtag?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CustomTextualStyle"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Textual Style of element")))),Object(b.b)("h4",{id:"customtextualstyle"},"CustomTextualStyle"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Short Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"fontSize?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['fontSize']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"fontFamily?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['fontFamily']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"fontWeight?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['fontWeight']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"fontStyle?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['fontStyle']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"textDecoration?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['textDecoration']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"lineHeight?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['lineHeight']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"minHeight?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['minHeight']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"color?"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSSProperties","['color']"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"CSS Property Value")))))}p.isMDXComponent=!0}}]);