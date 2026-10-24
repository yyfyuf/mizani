/* لوحة الشركة: دعوة الموظفين */
(function () {
  var base = window.renderAdmin;
  if (typeof base !== "function") return;

  window.renderAdmin = function () {
    base.apply(this, arguments);
    try { addInvite(); } catch (e) { console.error(e); }
  };

  function addInvite() {
    var old = document.getElementById("inv");
    if (old) old.remove();

    var cards = document.querySelectorAll("#v-admin .card");
    var last = cards[cards.length - 1];
    var code = (window.company && window.company.joinCode) || "";
    var name = (window.company && window.company.name) || "";
    var seats = (window.company && Number(window.company.seats)) || 0;

    var box = document.createElement("div");
    box.className = "card";
    box.id = "inv";
    box.innerHTML =
      '<b>دعوة الموظفين</b>' +
      '<p class="sub" style="margin:4px 0 10px">أعطِ موظفينك الرمز. يدخلون صفحة الانضمام ويكتبونه.</p>' +
      '<div class="big" id="invc" style="direction:ltr;text-align:center;letter-spacing:6px"></div>' +
      '<button class="btn" id="invcp" type="button">نسخ الرمز</button>' +
      '<a class="btn" id="invwa" target="_blank" rel="noopener" style="background:#25D366;color:#06231A">شارك بالواتساب</a>' +
      '<div class="row" style="margin-top:14px"><span>الموظفين المنضمين</span><b id="invn">...</b></div>';

    if (last) last.parentNode.insertBefore(box, last);
    else document.getElementById("v-admin").appendChild(box);

    if (last) last.innerHTML = '<b>قريبًا</b><p class="sub" style="margin:4px 0 0">تقارير الاستخدام الإجمالية (بدون أي بيانات شخصية).</p>';

    var codeEl = document.getElementById("invc");
    if (!code) {
      codeEl.textContent = "—";
      document.getElementById("invcp").style.display = "none";
      document.getElementById("invwa").style.display = "none";
      document.getElementById("invn").textContent = "—";
      return;
    }
    codeEl.textContent = code;

    var link = new URL("join2.html", location.href).href;
    var msg = "انضم لميزاني" + (name ? " عبر " + name : "") + "\n" + link + "\nرمز الشركة: " + code;
    document.getElementById("invwa").href = "https://wa.me/?text=" + encodeURIComponent(msg);

    var cp = document.getElementById("invcp");
    cp.onclick = function () {
      var done = function () { cp.textContent = "تم النسخ ✓"; setTimeout(function () { cp.textContent = "نسخ الرمز"; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(done, function () { window.prompt("انسخ الرمز:", code); });
      } else {
        window.prompt("انسخ الرمز:", code);
      }
    };

    var n = document.getElementById("invn");
    db.collection("memberships").where("code", "==", code).get().then(function (s) {
      var c = 0;
      s.forEach(function (d) { if (d.data().role === "employee") c++; });
      n.textContent = seats ? c + " من " + seats : String(c);
    }).catch(function () { n.textContent = "—"; });
  }
})();
