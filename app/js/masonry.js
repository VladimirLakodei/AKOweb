// window.addEventListener("load", () => {
//   // set up our WebGL context and append the canvas to our wrapper
//   const planeElements = Array.from(document.querySelectorAll(".plane"));

//   console.log('planeElements', planeElements)
//   console.log('planeElements', planeElements.length)

//   for (var i = 0; i < planeElements.length; i++) {
//     console.log('for i', i)
//     console.log('planeElements', planeElements[i + 1])
//     console.log(`masonry__canvas${i + 1}`)

//     // get our plane element
//     const curtains = new Curtains({
//       container: `masonry__canvas${i + 1}`
//     });
    
//     // set our initial parameters (basic uniforms)
//     const params = {
//     vertexShaderID: "plane-vs", // our vertex shader ID
//     fragmentShaderID: "plane-fs", // our fragment shader ID
//     uniforms: {
//     time: {
//     name: "uTime", // uniform name that will be passed to our shaders
//     type: "1f", // this means our uniform is a float
//     value: 0,
//     },
//     },
//     };
//     // create our plane using our curtains object, the HTML element and the parameters
//     const plane = new Plane(curtains, planeElements[i], params);
//     plane.onRender(() => {
//     // use the onRender method of our plane fired at each requestAnimationFrame call
//     plane.uniforms.time.value++; // update our time uniform value
//     });
//   }

//   setTimeout(function() {
//     const canvases = Array.from(document.querySelectorAll(".masonry__canvas"));
//     for (var i = 0; i < canvases.length; i++) {
//       canvases[i].classList.add('masonry__canvas_hidden')
//     }
//   }, 2000);
// });

(function() {
  let timerId = null;
  const items = Array.from(document.querySelectorAll(".masonry__item"));

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("mouseout", (event) => {
      timerId = setTimeout(() => {
      console.log("mouseout")

      clearTimeout(timerId);
      
        // console.log('event', event.target.dataset.masonry)

        // const masonryIndex = event.target.dataset.masonry
        

        // console.log('masonryIndex', masonryIndex)
        // console.log('items', items)
        console.log('i', i)
        // console.log('items[i]', items[i])
        const imageCanvas = items[i].querySelector('canvas');
        console.log('imageCanvas', imageCanvas)


        if (imageCanvas) {
          imageCanvas.style.display = 'none'
        }

       // curtains.clear()

       // console.log('plane', plane)
       // console.log('curtains', curtains)
     }, 10)
    }, false);
 
    items[i].addEventListener("mouseover", (event) => {
      clearTimeout(timerId);
      console.log("mouseover")
      const imageCanvas = items[i].querySelector('canvas');

      timerId = setTimeout(() => {
        if (imageCanvas) {
          imageCanvas.style.display = 'block';
        } else {

          const masonryIndex = i + 1
          const imageWrapper = items[i].querySelector('.plane');
          // console.log('imageWrapper', imageWrapper)

          const curtains = new Curtains({
            container: `masonry__canvas${masonryIndex}`
          });
          
          // set our initial parameters (basic uniforms)
          const params = {
          vertexShaderID: "plane-vs", // our vertex shader ID
          fragmentShaderID: "plane-fs", // our fragment shader ID
          uniforms: {
          time: {
          name: "uTime", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: 0,
          },
          },
          };
          // create our plane using our curtains object, the HTML element and the parameters
          const plane = new Plane(curtains, imageWrapper, params);
          plane.onRender(() => {
          // use the onRender method of our plane fired at each requestAnimationFrame call
          plane.uniforms.time.value++; // update our time uniform value
          });
        }
      }, 10)
    }, false);
  }
})();
