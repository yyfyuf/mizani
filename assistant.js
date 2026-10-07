(function(){
function init(){try{
var g=function(i){return document.getElementById(i)};
var css=document.createElement("style");
css.textContent=`
#cb{position:fixed;bottom:96px;inset-inline-start:14px;z-index:60;width:52px;height:52px;border-radius:50%;border:1px solid #17453F;background:linear-gradient(135deg,#3DDC97,#2FC48A);font-size:24px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.4)}
#cw{position:fixed;inset:0;z-index:70;display:none;flex-direction:column;background:var(--bg);padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
#cw.on{display:flex}
#ch{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #17453F;font-size:20px}
#cx{background:none;border:0;color:var(--mute);font-size:26px;cursor:pointer}
#cm{flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.mb{max-width:85%;padding:10px 14px;border-radius:18px;font-size:16px;line-height:1.7;white-space:pre-line}
.mb.b{background:rgba(61,220,151,.1);border:1px solid #17453F;align-self:flex-start}
.mb.u{background:linear-gradient(135deg,#3DDC97,#2FC48A);color:#06231A;align-self:flex-end}
#cq{display:flex;gap:8px;overflow-x:auto;padding:8px 16px;scrollbar-width:none}
#cq button{flex:0 0 auto;background:rgba(61,220,151,.08);border:1px solid #17453F;color:var(--ink);border-radius:999px;padding:8px 14px;font:inherit;font-size:14px;cursor:pointer}
#cf{display:flex;gap:8px;padding:10px 16px 16px}
#cf input{flex:1}`;
document.head.appendChild(css);
var btn=document.createElement("button");btn.id="cb";btn.textContent="🤖";btn.setAttribute("aria-label","المساعد المالي");
var w=document.createElement("div");w.id="cw";
w.innerHTML='<div id="ch"><b>المساعد المالي</b><button id="cx" aria-label="إغلاق">✕</button></div><div id="cm"></div><div id="cq"></div><form id="cf"><input id="ci" placeholder="اكتب سؤالك..." autocomplete="off"><button class="btn" type="submit">إرسال</button></form>';
document.body.appendChild(btn);document.body.appendChild(w);
function num(t){var m=t.replace(/[٠-٩]/g,function(d){return "٠١٢٣٤٥٦٧٨٩".indexOf(d)}).match(/\d+(\.\d+)?/);return m?+m[0]:0}
function st(){var B=base(),sp=A(mex(MK)),td=A(S.ex.filter(function(e){return e.d===TD})),dm=new Date(NOW.getFullYear(),NOW.getMonth()+1,0).getDate(),dl=Math.max(1,dm-NOW.getDate()+1),rem=B.V-sp;return{B:B,sp:sp,td:td,rem:rem,dl:dl,pd:rem/dl}}
function reply(q){var s=st(),B=s.B;
if(/أشتري|اشتري|شراء/.test(q)){var n=num(q);if(!n)return "اكتب المبلغ، مثل: هل أقدر أشتري بـ 300؟";return n<=s.rem?"نعم تقدر. المبلغ "+fmt(n)+" ريال وبيبقى لك "+fmt(s.rem-n)+" ريال هذا الشهر.":"الأفضل لا، المبلغ أكبر من المتبقي لك ("+fmt(Math.max(0,s.rem))+" ريال)."}
if(/وين|أكثر|اكثر|فئة|تصنيف/.test(q)){var o={};S.ex.filter(function(e){return e.d.slice(0,7)===MK}).forEach(function(e){o[e.c]=(o[e.c]||0)+e.a});var k=Object.keys(o).sort(function(a,b){return o[b]-o[a]}).slice(0,3);return k.length?"أكثر صرفك هذا الشهر:\n"+k.map(function(c,i){return (i+1)+". "+c+": "+fmt(o[c])+" ريال"}).join("\n"):"ما سجّلت مصاريف هذا الشهر بعد."}
if(/نصيح/.test(q)){var r=B.sal?B.O/B.sal:0;return r>.5?"التزاماتك "+Math.round(r*100)+"% من راتبك وهذا عالي. حاول تخفف التزام أو تأجّل غير الضروري.":s.rem<0?"تجاوزت المتاح هذا الشهر بـ "+fmt(-s.rem)+" ريال. قلّل المصاريف المتغيرة الأيام الجاية.":"وضعك جيد. التزاماتك "+Math.round(r*100)+"% من راتبك، جرّب تزيد الادخار شوي."}
if(/باقي|اليوم|كم/.test(q))return "متبقي لك هذا الشهر "+fmt(s.rem)+" ريال للمصروف المتغير، وبقي "+s.dl+" يوم.\nمعدّلك اليومي المقترح: "+fmt(Math.max(0,s.pd))+" ريال، وصرفت اليوم "+fmt(s.td)+".";
return "أقدر أجاوبك عن: المتبقي اليوم، أكثر صرفك، هل تقدر تشتري بمبلغ، ونصيحة للشهر. اختر من الأزرار تحت."}
function add(t,me){var d=document.createElement("div");d.className="mb "+(me?"u":"b");d.textContent=t;g("cm").appendChild(d);g("cm").scrollTop=1e9}
function ask(q){if(!q)return;add(q,1);try{add(reply(q))}catch(e){console.error(e);add("ما قدرت أحسب الحين، جرّب بعد ما تدخل راتبك ومصاريفك.")}}
["كم باقي لي اليوم؟","وين أصرف أكثر؟","هل أقدر أشتري بـ 300؟","نصيحة لهذا الشهر"].forEach(function(q){var b=document.createElement("button");b.type="button";b.textContent=q;b.onclick=function(){ask(q)};g("cq").appendChild(b)});
btn.onclick=function(){w.classList.add("on");if(!g("cm").children.length)add("أهلاً! أنا مساعدك المالي. اسألني عن ميزانيتك.")};
g("cx").onclick=function(){w.classList.remove("on")};
g("cf").onsubmit=function(e){e.preventDefault();var v=g("ci").value.trim();g("ci").value="";ask(v)};
}catch(e){console.error("assistant",e)}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
