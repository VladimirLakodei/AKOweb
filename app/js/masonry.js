(function() {
  let plane
  let curtains
  let timerId = null;
  const rendered = {}
  const items = Array.from(document.querySelectorAll('.masonry__item'));

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('mouseout', (event) => {
      timerId = setTimeout(() => {
        const imageCanvas = items[i].querySelector('canvas');
        if (rendered[i]) {
          rendered[i].curtains.dispose()
        }
      }, 10)
    }, false);

    items[i].addEventListener("mouseover", (event) => {
      clearTimeout(timerId);
      const imageCanvas = items[i].querySelector('canvas');

      timerId = setTimeout(() => {
        if (imageCanvas) {
          rendered[i] && rendered[i].curtains && rendered[i].curtains.needRender()
        } else {
          const masonryIndex = i + 1
          const imageWrapper = items[i].querySelector('.plane');
          if (!rendered[i]) rendered[i] = {}

          rendered[i].curtains = new Curtains({
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
          rendered[i].plane = new Plane(rendered[i].curtains, imageWrapper, params);

          rendered[i].plane.onRender(() => {
            // use the onRender method of our plane fired at each requestAnimationFrame call
            rendered[i].plane.uniforms.time.value++; // update our time uniform value
          })
        }
      }, 10)
    }, false);
  }
})();
