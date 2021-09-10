(()=>{"use strict";var e,t,n,o,r,c,a,l,u,i,s,v,d,m,f,h,p,g,y,S,q,L,E,b,A;(function(e){var t=document.querySelector("#timer-hours"),n=document.querySelector("#timer-minutes"),o=document.querySelector("#timer-seconds");function r(e){var t=(new Date(e).getTime()-(new Date).getTime())/1e3,n=Math.floor(t%60),o=Math.floor(t/60%60);return{timeRemaining:t,hours:Math.floor(t/3600),minutes:o,seconds:n}}a();var c=setInterval((function(){a()}),1e3);function a(){var a=r(e);t.textContent=a.hours/10<1?"0"+a.hours:a.hours,n.textContent=a.minutes/10<1?"0"+a.minutes:a.minutes,o.textContent=a.seconds/10<1?"0"+a.seconds:a.seconds,a.timeRemaining<=0&&(t.textContent="00",n.textContent="00",o.textContent="00",clearInterval(c))}setTimeout((function(){var t=r(e),n=(t.hours,t.minutes,r("10 september 2021"));n.hours,n.minutes}),3e3)})("13 september 2021"),A=document.querySelector("menu"),document.querySelector("body").addEventListener("click",(function(e){e.target.closest("a[href]")||e.target.closest(".menu")?function(e){(e.target.closest(".menu")||e.target.closest("menu"))&&A.classList.toggle("active-menu");var t=e.target.closest("a[href]");t&&(e.preventDefault(),function(e){try{var t=document.querySelector(e.getAttribute("href"));t&&t.scrollIntoView({block:"start",behavior:"smooth"})}catch(e){return}}(t))}(e):A.classList.contains("active-menu")&&!e.target.closest("menu")&&A.classList.remove("active-menu")})),q=document.querySelector(".popup"),L=document.querySelectorAll(".popup-btn"),E=document.querySelector(".popup-content"),b=function e(){y=requestAnimationFrame(e),S>39?(S-=5-.073*(105-S),E.style.left=S+"%"):cancelAnimationFrame(y)},L.forEach((function(e){e.addEventListener("click",(function(){q.style.display="block",window.screen.width>=768&&(S=105,E.style.left=S+"%",y=requestAnimationFrame(b))}))})),q.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup-close")?q.style.display="none":(t=t.closest(".popup-content"))||(q.style.display="none")})),f=document.querySelector(".service-header"),h=f.querySelectorAll(".service-header-tab"),p=document.querySelectorAll(".service-tab"),(g=function(e){for(var t=0;t<p.length;t++)e===t?(h[t].classList.add("active"),p[t].classList.remove("d-none")):(h[t].classList.remove("active"),p[t].classList.add("d-none"))})(0),f.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&h.forEach((function(e,n){e===t&&g(n)}))})),a=document.querySelector(".portfolio-dots"),l=document.querySelector(".portfolio-content"),u=document.querySelectorAll(".portfolio-item"),i=0,s=function(e,t,n){e[t].classList.remove(n)},v=function(e,t,n){e[t].classList.add(n)},d=function(){s(u,i,"portfolio-item-active"),s(c,i,"dot-active"),i=(i+1)%u.length,v(u,i,"portfolio-item-active"),v(c,i,"dot-active")},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;r=setInterval((function(){return d()}),e)},l.addEventListener("click",(function(e){e.preventDefault();var t=e.target;t.matches(".portfolio-btn, .dot")&&(s(u,i,"portfolio-item-active"),s(c,i,"dot-active"),t.matches("#arrow-right")?i=(i+1)%u.length:t.matches("#arrow-left")?i=(i-1+u.length)%u.length:t.matches(".dot")&&c.forEach((function(e,n){e===t&&(i=n)})),v(u,i,"portfolio-item-active"),v(c,i,"dot-active"))})),l.addEventListener("mouseover",(function(e){e.target.matches(".portfolio-btn, .dot")&&clearInterval(r)})),l.addEventListener("mouseout",(function(e){e.target.matches(".portfolio-btn, .dot")&&m()})),function(){var e='<li class="dot dot-active"></li>';if(u.length>0){for(var t=1;t<u.length;t++)e+='<li class="dot"></li>';a.insertAdjacentHTML("afterbegin",e)}}(),c=document.querySelectorAll(".dot"),m(1500),n=document.querySelector("#command"),o=function(e){if(e.target.matches(".command__photo")){var t=e.target.src;e.target.src=e.target.dataset.img,e.target.dataset.img=t}},n.addEventListener("mouseover",(function(e){return o(e)})),n.addEventListener("mouseout",(function(e){return o(e)})),function(){var e=/[^0-9]/;document.querySelectorAll(".calc-block>input").forEach((function(t){t.oninput=function(){t.value=t.value.replace(e,"")}}));var t=/[^А-Яа-яЁё\s-]/g,n=/[^А-Яа-яЁё\s-\.\!\?\,\:\;"]/g,o=document.querySelectorAll('[placeholder="Ваше имя"]'),r=document.querySelector('[placeholder="Ваше сообщение"]');o.forEach((function(e){e.oninput=function(){e.value=e.value.replace(t,"")},e.onchange=function(){e.value=e.value.replace(/ +/g," ").trim(),e.value=e.value.replace(/- /g,"-"),e.value=e.value.replace(/ -/g,"-"),e.value=e.value.replace(/-+/g,"-");for(var t=e.value,n="",o=0;o<t.length;o++){if(0===o||o===t.length-1){if("-"===t[o])continue;if(0===o){n=t[o].toLocaleUpperCase();continue}}" "===t[o-1]||"-"===t[o-1]?n+=t[o].toLocaleUpperCase():n+=t[o].toLocaleLowerCase()}e.value=n}})),r.oninput=function(){r.value=r.value.replace(n,"")};var c=/[^A-Za-z0-9\@\_\!\~\*\'\-\.]/g;document.querySelectorAll('[type="email"]').forEach((function(e){e.oninput=function(){e.value=e.value.replace(c,"")},e.onchange=function(){e.value=e.value.match(/\S+@\S+\.\w{2,3}/)}}));var a=/[^0-9\(\)-\+]/g;document.querySelectorAll('[type="tel"]').forEach((function(e){e.oninput=function(){e.value=e.value.replace(a,"")}}))}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=document.querySelector(".calc-block"),n=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),r=document.querySelector(".calc-day"),c=document.querySelector(".calc-count"),a=document.getElementById("total"),l=function(){var t,l=1,u=1,i=n.options[n.selectedIndex].value,s=o.value;c.value>1&&(l+=(c.value-1)/10),r.value&&r.value<5?u*=2:r.value&&r.value<10&&(u*=1.5),t=i&&s?e*i*s*l*u:0;var v=0,d=setInterval((function(){.95*t>v||1.05*t<v?(v=t>v?v+(t-v)/3:v-(v-t)/3,a.textContent=Math.ceil(v)):(clearInterval(d),a.textContent=Math.ceil(t))}),20)};t.addEventListener("change",(function(e){var t=e.target;t.matches("select")?(""===n.options[n.selectedIndex].value&&(o.value="",r.value="",c.value=""),l()):t.matches("input")&&l()}))}(),e=document.querySelectorAll("form"),(t=document.createElement("div")).style.cssText="font-size: 2rem;",e.forEach((function(e){var n=e.querySelectorAll("input");e.addEventListener("submit",(function(o){if(o.preventDefault(),e.appendChild(t),function(e){var t=!0;return e.forEach((function(e){e.value.length<2||e.closest(".form-phone")&&!(12===e.value.length&&"+"===e.value[0]||11===e.value.length&&"+"!==e.value[0])?(e.style.border="2px solid red",t=!1):e.style.border="none"})),t}(n)){"form3"===e.id&&(t.style.color="white"),t.textContent="Загрузка...";var r=new FormData(e),c={};r.forEach((function(e,t){c[t]=e})),function(e){return fetch("./server.php",{method:"POST",mode:"same-origin",credentials:"same-origin",headers:{"Content-type":"aplication/json"},redirect:"follow",referrer:"client",body:JSON.stringify(e)})}(c).then((function(e){if(200!==e.status)throw new Error("status network not 200");t.textContent="Отлично! Ответ получен!!!",setTimeout((function(){t.remove(),document.querySelector(".popup").style.display="none"}),2500),n.forEach((function(e){return e.value=""}))})).catch((function(e){t.textContent="Что-то пошло не так:(",console.error(e)}))}else t.textContent="Поле заполнено неверно"}))}))})();