var RaboPortletBehavior={};RaboPortletBehavior.VERSION="maven.header.version";RaboPortletBehavior.REVISION="$Rev: 12345$";
function setGUIstate(c){var b="rabobank_gui_state",a="";document.cookie=b+"="+c+a+"; path=/"
}function getGUIstate(){var d="rabobank_gui_state",f=d+"=",b=document.cookie.split(";"),e=null,g=null,a=null;
for(e=0;e<b.length;e+=1){g=b[e];while(g.charAt(0)===" "){g=g.substring(1,g.length)}if(g.indexOf(f)===0){a=g.substring(f.length,g.length)
}}return a}function init_advisorInfo(g){var b=g.getElementsByTagName("img"),e=null,a=null,f=null,d=null,c;
if(b.length>0){e=g.getElementsByTagName("span");a=b[0].cloneNode(false);if(e!==null&&e[0].parentNode===g){f=document.createElement("a");
f.className="img-wrapper";g.replaceChild(f,e[0]);f.appendChild(a);cssjs("add",b[0].parentNode,"b_hasImg");
d=document.createElement("span");d.className="min-icon";b[0].parentNode.appendChild(d);addbhEvent(f,"click",click_advisorInfo);
EventCache.add(f,"click",click_advisorInfo,true);c=getGUIstate();if(c==="false"){cssjs("add",g,"close")
}else{if(c===null){cssjs("add",g,"close");setGUIstate(false)}else{if(cssjs("check",g,"close")){cssjs("remove",g,"close")
}}}}}}function click_advisorInfo(){var a=getGUIstate();if(a==="true"){if(!(cssjs("check",this.parentNode,"close"))){cssjs("add",this.parentNode,"close")
}a="false"}else{if(cssjs("check",this.parentNode,"close")){cssjs("remove",this.parentNode,"close")
}a="true"}setGUIstate(a)}bh120=pM.addBehavior({name:"myAdvisor",owner:"pif"});bh120.scope=["pa_content","ph_varia"];
bh120.nodeTags="div";bh120.nodeClass="ra_bh_advisorinfo";bh120.initElms=init_advisorInfo;bh120.preventMultipleBind=true;
function click_doNoSubmit(a){if(a===undefined){a=window.event}a.cancelBubble=true;a.returnValue=false;
if(a.stopPropagation){a.stopPropagation();a.preventDefault()}}bhaccordioninputbutton=pM.addBehavior({name:"disabling accordion click event",owner:"pif"});
bhaccordioninputbutton.scope=["rb_accordion"];bhaccordioninputbutton.nodeTags="input";bhaccordioninputbutton.nodeClass="rb_bh_disable_submit";
bhaccordioninputbutton.click=click_doNoSubmit;