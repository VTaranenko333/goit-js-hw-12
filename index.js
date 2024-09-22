import{a as w,i as d,S}from"./assets/vendor-mdVVRe9K.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const E="46068756-c5f919e10572d3f09e9540b43",q="https://pixabay.com/api/",k=15;async function u(t,o=1){const a={key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:k,page:o};try{return(await w.get(q,{params:a})).data}catch{throw new Error("Failed to fetch images")}}function P(t){return t.map(({webformatURL:o,largeImageURL:a,tags:n,likes:e,views:r,comments:s,downloads:L})=>`
      <div class="photo-card">
            <div class="photo-card-img">
              <a href="${a}" class="gallery-link">
                <img src="${o}" alt="${n}" loading="lazy" />
              </a>
            </div>
            <div class="info">
              <div class="info-item">
                <b>Likes</b>
                <p>${e}</p>
              </div>
              <div class="info-item">
                <b>Views</b>
                <p>${r}</p>
              </div>
              <div class="info-item">
                <b>Comments</b>
                <p>${s}</p>
              </div>
              <div class="info-item">
                <b>Downloads</b>
                <p>${L}</p>
              </div>
            </div>
          </div>
    `).join("")}const g=document.querySelector("#search-form"),y=document.querySelector(".gallery"),i=document.querySelector(".load-more"),h=document.querySelector("#search-loader"),m=document.querySelector("#load-more-loader");let l="",c=1,p=0,f;const x=15;i.classList.add("hidden");h.classList.add("hidden");m.classList.add("hidden");g.addEventListener("submit",$);i.addEventListener("click",M);async function $(t){if(t.preventDefault(),l=g.query.value.trim(),!l){d.warning({message:"Please enter a search query!"});return}c=1,y.innerHTML="",i.classList.add("hidden"),h.classList.remove("hidden");try{const o=await u(l,c);if(p=o.totalHits,p===0){d.info({message:"No images found for your search!"});return}b(o.hits),p>x&&i.classList.remove("hidden")}catch{d.error({message:"Failed to fetch images!"})}finally{h.classList.add("hidden")}}async function M(){c+=1,i.classList.add("hidden"),m.classList.remove("hidden");try{const t=await u(l,c);b(t.hits),c*x>=p?(d.info({message:"We're sorry, but you've reached the end of search results."}),i.classList.add("hidden")):i.classList.remove("hidden"),z()}catch{d.error({message:"Failed to load more images!"})}finally{m.classList.add("hidden")}}function b(t){const o=P(t);y.insertAdjacentHTML("beforeend",o),f?f.refresh():f=new S(".gallery-link")}function z(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}const A=`
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

p:last-child {
  margin-bottom: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: currentColor;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

body {
  font-family: 'Montserrat', sans-serif;
}

.container {
padding: 24px 156px;
}

.search-form {
  margin: 20px;
  text-align: center;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 24px;
  padding: 20px;
}

.photo-card {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.photo-card-img {
  width: 100%;
  height: auto;
  flex: 1;
}

.loader {
  position: fixed;
  top: 100;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 64px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.loader:after {
  content: '';
  position: absolute;
  inset: 8px;
  margin: auto;
  background: #222b32;
}
.loader:before {
  content: '';
  position: absolute;
  inset: -15px;
  margin: auto;
  background: #de3500;
  animation: diamondLoader 2s linear infinite;
}
@keyframes diamondLoader {
  0%  ,10% {
    transform: translate(-64px , -64px) rotate(-45deg)
  }
  90% , 100% {
    transform: translate(0px , 0px) rotate(-45deg)
  }
}

#search-form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4e75ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
}

.load-more:hover {
  background-color: #6c8cff;
  }

.hidden {
  display: none;
}

.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: auto;
  height: 48px;
  padding: 4px 0;
}

input {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.04em;
  color: #2e2f42;
  border: 1px solid #808080;
  border-color: #808080;
  border-radius: 4px;
  min-width: 274px;
  height: 40px;
  padding: 0px 16px;
  margin-right: 20px;
}

input:hover {
  border-color: #000;
}

input:focus {
  border-color: #4e75ff;
}

.search-btn {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  width: auto;
  height: 40px;
  background: #4e75ff;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.04em;
  color: #fff;
}

.search-btn:hover {
  border: none;
  background: #6c8cff;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.04em;
  color: #fff;
}

`,v=document.createElement("style");v.innerText=A;document.head.appendChild(v);
//# sourceMappingURL=index.js.map
