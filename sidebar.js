(function(){
/* الصق هنا إعدادات Firebase الخاصة بك */
var CFG={apiKey:"AIzaSyAcekD3uOnosbFcC7bLAERqpuL-uGGAc8o",authDomain:"mizanj-15728.firebaseapp.com",projectId:"mizanj-15728",appId:"1:1020983482594:web:fee2356150d832253fe6bb"};


var css=".au{position:fixed;inset:0;z-index:100;background:var(--bg);display:grid;place-items:center;padding:20px;overflow:auto}.au.h{display:none}"+
".au-c{width:100%;max-width:380px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:24px;padding:26px 22px}"+
".au-c h2{font:700 24px 'Readex Pro',Tahoma,sans-serif;margin:0 0 4px}"+
".au-l{font:700 28px 'Readex Pro',Tahoma,sans-serif;color:var(--green);margin-bottom:10px}"+
".au-c p{color:var(--mute);margin:0 0 16px;font-size:15px}"+
".au-c input{width:100%;direction:ltr;text-align:left;font:inherit;font-size:16px;color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:10px}"+
".au-c input:focus-visible,.au-c button:focus-visible{outline:3px solid var(--amber);outline-offset:2px}"+
".au-b{width:100%;font:600 17px 'IBM Plex Sans Arabic',Tahoma,sans-serif;background:var(--green);color:var(--onacc);border:0;border-radius:12px;padding:13px;cursor:pointer;margin-top:4px}"+
".au-t{background:none;border:0;color:var(--green);font:600 15px 'IBM Plex Sans Arabic',Tahoma,sans-serif;cursor:pointer;padding:8px 0}"+
".au-r{display:flex;justify-content:space-between;flex-wrap:wrap;margin-top:6px}"+
".au-m{min-height:1.6em;font-size:14px;color:var(--coral);margin:4px 0}.au-m.ok{color:var(--green)}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

var ov=document.createElement("div");ov.className="au h"

  
ov.innerHTML='<form class="au-c" id="auf" novalidate><div class="au-l">ميزاني</div><h2 id="aut"></h2><p id="aus"></p>'+
'<input id="aue" type="email" autocomplete="email" placeholder="البريد الإلكتروني" aria-label="البريد الإلكتروني">'+
'<input id="aup" type="password" autocomplete="current-password" placeholder="كلمة المرور" aria-label="كلمة المرور">'+
'<div class="au-m" id="aum" role="alert"></div><button class="au-b" id="aub" type="submit"></button>'+
'<div class="au-r"><button type="button" class="au-t" id="aum2"></button><button type="button" class="au-t" id="aur">نسيت كلمة المرور؟</button></div></form>';
document.body.appendChild(ov);
var $=function(i){return document.getElementById(i)};
var mode="in",auth=null,pend=null;


function view(){
  var i=mode==="in";
  $("aut").textContent=i?"تسجيل الدخول":"إنشاء حساب";
  $("aus").textContent=i?"سجّل دخولك عشان تكمل.":"سجّل بريدك وكلمة مرور (6 أحرف على الأقل).";
  $("aub").textContent=i?"دخول":"إنشاء الحساب";
  $("aum2").textContent=i?"ما عندك حساب؟ سجّل":"عندك حساب؟ ادخل";
  $("aup").autocomplete=i?"current-password":"new-password";
  msg("")}
function msg(t,ok){var m=$("aum");m.textContent=t;m.className="au-m"+(ok?" ok":"")}
var ERR={"auth/invalid-email":"البريد غير صحيح.","auth/invalid-credential":"البريد أو كلمة المرور غير صحيحة.","auth/wrong-password":"البريد أو كلمة المرور غير صحيحة.","auth/user-not-found":"البريد أو كلمة المرور غير صحيحة.","auth/email-already-in-use":"هذا البريد مسجّل من قبل، سجّل دخولك.","auth/weak-password":"كلمة المرور ضعيفة (6 أحرف على الأقل).","auth/too-many-requests":"محاولات كثيرة، جرّب بعد شوي.","auth/network-request-failed":"تأكد من اتصال الإنترنت."};
function fail(e){msg(ERR[e&&e.code]||"صار خطأ، حاول مرة ثانية.")}

$("aum2").onclick=function(){mode=mode==="in"?"up":"in";view()};
$("aur").onclick=function(){
  if(!auth)return;var e=$("aue").value.trim();if(!e)return msg("اكتب بريدك أول.");
  auth.sendPasswordResetEmail(e).then(function(){msg("أرسلنا لك رابط استعادة كلمة المرور على بريدك.",1)}).catch(fail)};
$("auf").addEventListener("submit",function(ev){
  ev.preventDefault();if(!auth)return msg("لحظة، جاري التحميل…");
  var e=$("aue").value.trim(),p=$("aup").value;if(!e||!p)return msg("عبّ البريد وكلمة المرور.");
  msg("");$("aub").disabled=true;
  (mode==="in"?auth.signInWithEmailAndPassword(e,p):auth.createUserWithEmailAndPassword(e,p)).catch(fail).then(function(){$("aub").disabled=false})});

function logoutBtn(){
  if($("lgo"))return;var hd=document.querySelector(".hd");if(!hd)return;
  var b=document.createElement("button");b.className="ic";b.id="lgo";b.textContent="⏻";b.setAttribute("aria-label","تسجيل الخروج");b.title="تسجيل الخروج";
  b.onclick=function(){push().then(function(){try{localStorage.removeItem(typeof KEY!=="undefined"?KEY:"mizani3")}catch(e){}return auth&&auth.signOut()}).then(function(){location.reload()})};hd.insertBefore(b,hd.firstChild)}

function load(src,cb){var s=document.createElement("script");s.src=src;s.onload=cb;s.onerror=function(){msg("تعذّر تحميل خدمة الدخول، تأكد من الإنترنت.")};document.head.appendChild(s)}

/* مزامنة البيانات مع Firestore: كل حساب يحفظ بياناته في users/{uid} */
var db=null,uid=null,ready=false,timer=null,vis=false;
function push(){
  clearTimeout(timer);
  if(!ready||!db||!uid||!window.S)return Promise.resolve();
  return db.collection("users").doc(uid).set({data:JSON.stringify(window.S),updated:firebase.firestore.FieldValue.serverTimestamp()}).catch(function(e){console.error(e)})}
function hook(){
  if(window.__sh)return;window.__sh=1;var o=window.save;
  window.save=function(){o.apply(this,arguments);clearTimeout(timer);timer=setTimeout(push,800)}}
function sync(id){
  uid=id;ready=false;db=firebase.firestore();hook();
  if(!vis){vis=true;document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")push()})}
  db.collection("users").doc(id).get().then(function(d){
    if(d.exists&&d.data().data){
      try{var r=JSON.parse(d.data().data);for(var k in r)window.S[k]=r[k]}catch(e){console.error(e)}
      ready=true;if(typeof theme==="function")theme();if(typeof go==="function")go()}
    else{ready=true;push()}
  }).catch(function(e){console.error(e);alert("تعذّر تحميل بياناتك من الحساب. تأكد من الإنترنت وحدّث الصفحة.")})}

view();
if(CFG.apiKey.indexOf("PASTE")===0){msg("لم يتم ضبط Firebase بعد. الصق الإعدادات في أول ملف auth.js.");return}
var V="10.12.2",B="https://www.gstatic.com/firebasejs/"+V+"/";
load(B+"firebase-app-compat.js",function(){load(B+"firebase-auth-compat.js",function(){load(B+"firebase-firestore-compat.js",function(){
  firebase.initializeApp(CFG);auth=firebase.auth();
  auth.onAuthStateChanged(function(u){
    if(u){ov.classList.add("h");logoutBtn();$("aup").value="";sync(u.uid)}
    else{var l=$("lgo");l&&l.remove();ov.classList.remove("h")}})})})});
})();var pend=null,want=false;
function openLogin(){want=true;ov.classList.remove("h")}
new MutationObserver(function(){
  if(!want&&!ov.classList.contains("h"))ov.classList.add("h");
}).observe(ov,{attributes:true,attributeFilter:["class"]});
function loginBtn(){
  if($("lgi"))return;var hd=document.querySelector(".hd");if(!hd)return;
  var b=document.createElement("button");b.className="sm";b.id="lgi";b.textContent="دخول";
  b.onclick=openLogin;hd.insertBefore(b,hd.firstChild);
}
var cx=document.createElement("button");cx.type="button";cx.textContent="✕";cx.setAttribute("aria-label","إغلاق");
cx.style.cssText="position:absolute;top:16px;inset-inline-end:16px;background:none;border:0;color:var(--mute);font-size:26px;cursor:pointer";
cx.onclick=function(){want=false;pend=null;ov.classList.add("h")};ov.appendChild(cx);
document.addEventListener("click",function(e){
  var b=e.target.closest&&e.target.closest("button");
  if(!b||(auth&&auth.currentUser))return;
  if(b.id==="trial"||b.id==="gadd"||b.dataset.pick!==undefined){
    e.stopPropagation();e.preventDefault();
    pend=function(){b.click()};openLogin();
  }
},true);
var iv=setInterval(function(){
  if(!auth)return;clearInterval(iv);
  auth.onAuthStateChanged(function(u){
    var g=$("lgi");
    if(u){g&&g.remove();want=false;ov.classList.add("h");if(pend){var f=pend;pend=null;setTimeout(f,700)}}
    else{loginBtn()}
  });
},150);


