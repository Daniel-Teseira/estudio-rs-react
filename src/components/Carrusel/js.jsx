import React, { useState } from 'react'
import gsap from "gsap";
const App = () => {
const [htmlContent, setHtmlContent] = useState({
  even: 
  <body>
    <div class="indicator"></div>

    
    <div id="demo"></div>

    <div class="details" id="details-even">
      <div class="place-box">
        <div class="text">Switzerland Alps</div>
      </div>
      <div class="title-box-1"><div class="title-1">SAINT</div></div>
      <div class="title-box-2"><div class="title-2">ANTONIEN</div></div>
      <div class="desc">
        Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It's a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.
      </div>
      <div class="cta">
        <button class="bookmark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button class="discover">Discover Location</button>
      </div>
    </div>

    <div class="details" id="details-odd">
      <div class="place-box">
        <div class="text">Switzerland Alps</div>
      </div>
      <div class="title-box-1"><div class="title-1">SAINT </div></div>
      <div class="title-box-2"><div class="title-2">ANTONIEN</div></div>
      <div class="desc">
        Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It's a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.
      </div>
      <div class="cta">
        <button class="bookmark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button class="discover">Discover Location</button>
      </div>
    </div>

    <div class="pagination" id="pagination">
      <div class="arrow arrow-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div class="arrow arrow-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div class="progress-sub-container" >
        <div class="progress-sub-background" >
            <div class="progress-sub-foreground" ></div>
        </div>
    </div>
    <div class="slide-numbers" id="slide-numbers"></div>
    </div>

    <div class="cover" ></div>  
  </body>  ,
  odd:  
  <div></div>,
});

const cambiarContenido = () => {
  const nuevoContenido = {
    ...htmlContent,
    even: new Promise((resolve) => {
      order.push(order.shift());
      detailsEven = !detailsEven;
  
      const detailsActive = detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  
      document.querySelector(`${detailsActive} .place-box .text`).textContent =
        data[order[0]].place;
      document.querySelector(`${detailsActive} .title-1`).textContent =
        data[order[0]].title;
      document.querySelector(`${detailsActive} .title-2`).textContent =
        data[order[0]].title2;
      document.querySelector(`${detailsActive} .desc`).textContent =
        data[order[0]].description;
  
      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
      gsap.to(`${detailsActive} .text`, {
        y: 0,
        delay: 0.1,
        duration: 0.7,
        ease,
      });
      gsap.to(`${detailsActive} .title-1`, {
        y: 0,
        delay: 0.15,
        duration: 0.7,
        ease,
      });
      gsap.to(`${detailsActive} .title-2`, {
        y: 0,
        delay: 0.15,
        duration: 0.7,
        ease,
      });
      gsap.to(`${detailsActive} .desc`, {
        y: 0,
        delay: 0.3,
        duration: 0.4,
        ease,
      });
      gsap.to(`${detailsActive} .cta`, {
        y: 0,
        delay: 0.35,
        duration: 0.4,
        onComplete: resolve,
        ease,
      });
      gsap.set(detailsInactive, { zIndex: 12 });
  
      const [active, ...rest] = order;
      const prv = rest[rest.length - 1];
  
      gsap.set(getCard(prv), { zIndex: 10 });
      gsap.set(getCard(active), { zIndex: 20 });
      gsap.to(getCard(prv), { scale: 1.5, ease });
  
      gsap.to(getCardContent(active), {
        y: offsetTop + cardHeight - 10,
        opacity: 0,
        duration: 0.3,
        ease,
      });
      gsap.to(getSliderItem(active), { x: 0, ease });
      gsap.to(getSliderItem(prv), { x: -numberSize, ease });
      gsap.to(".progress-sub-foreground", {
        width: 500 * (1 / order.length) * (active + 1),
        ease,
      });
  
      gsap.to(getCard(active), {
        x: 0,
        y: 0,
        ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
          gsap.set(getCard(prv), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });
  
          gsap.set(getCardContent(prv), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
          });
          gsap.set(getSliderItem(prv), { x: rest.length * numberSize });
  
          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`${detailsInactive} .text`, { y: 100 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .title-2`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });
          clicks -= 1;
          if (clicks > 0) {
            step();
          }
        },
      });
  
      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = offsetLeft + index * (cardWidth + gap);
          gsap.set(getCard(i), { zIndex: 30 });
          gsap.to(getCard(i), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1),
          });
  
          gsap.to(getCardContent(i), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
        }
      });
    })
  }
  setHtmlContent(nuevoContenido);
};

 
  return (
    <div>
      {/* Mostrar el contenido HTML para detalles pares */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent.even }} />

      {/* Mostrar el contenido HTML para detalles impares */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent.odd }} />

      {/* Botón para cambiar el contenido HTML */}
      <button onClick={cambiarContenido}>Cambiar Contenido</button>
    </div>
  );
};

export default App;
