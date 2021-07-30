<template>
  <section class="projects" id="projects">
    <div class="carousel">
      <router-link
        :to="'/projects/' + img.id"
        class="item"
        v-for="(img, i) in imgs"
        :key="i"
      >
        <h2 class="item__title">{{ img.title }}</h2>
        <div class="item__img">
          <img :src="img.img" alt="img" class="carousel__img" />
        </div>
      </router-link>
    </div>
    <canvas class="webgl"></canvas>
  </section>
</template>

<style>
.projects {
  width: 100%;

  height: calc(var(--vh, 1vh) * 100);
  height: 100vh;
  /* height: 100%; */
  overflow: hidden;

  position: relative;
}

.webgl {
  position: absolute;
  top: 0;
  left: 0;
  outline: none;
}

.carousel {
  position: absolute;

  top: 50%;
  left: 50%;
  overflow-y: hidden;
  overflow-x: scroll;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  height: 70%;
  padding: 1.5rem 0 0rem 2rem;
  height: clamp(200px, 70vw, 500px);
  /* max-width: 94rem; */
  gap: 2rem;

  user-select: none;
}

.item {
  overflow-y: hidden;
  /* width: 350px; */

  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(-50%, -50%);
  /* top: 65%; */
  top: 50%;
  left: 50%;
  transition: all 1s;
}

.item__img {
  position: relative;
  /* width: 744px;
  height: 460px; */
  width: clamp(295px, 70vw, 744px);
  height: clamp(155px, 60vw, 460px);

  transform: scale(0.9);
  border-radius: 13px;
  aspect-ratio: 4/3;
}

.item__title {
  text-align: center;
}

/* .item:nth-of-type(even) {
  top: 45%;
  flex-direction: column-reverse;
} */

.item:nth-of-type(2) {
  transform: translate(85%, -50%);
}
.item:nth-of-type(3) {
  transform: translate(220%, -50%);
}
.item:nth-of-type(4) {
  transform: translate(355%, -50%);
}
.item:nth-of-type(5) {
  transform: translate(490%, -50%);
}
.item:nth-of-type(6) {
  transform: translate(625%, -50%);
  margin-right: 50%;
}

.item img {
  max-width: 100%;
  height: auto;
  height: 100%;
  opacity: 0;
  object-fit: cover;
  object-position: center;
  border-radius: 13px;
  z-index: 10;
}

/* @media (max-width: 400px) {
  .item__img {
    width: 295px;
    height: 155px;
  }

  .item__img img {
    width: 295px;
    height: 155px;
  }
} */
</style>

<script>
import * as THREE from "three"

// import fragmentShader from "./shaders/portal/fragment.glsl"
// import vertexShader from "./shaders/portal/vertex.glsl"
import gsap from "gsap"
export default {
  data() {
    return {
      // imgs: [img1, img2, img3, img4, img5, img6],

      figure: null,
    }
  },

  computed: {
    imgs() {
      return this.$store.getters.getImgs
    },
  },

  mounted() {
    this.$store.dispatch("setLoading", true)
    this.$nextTick(function() {
      function lerp(start, end, t) {
        return start * (1 - t) + end * t
      }

      // Debug
      const debugObj = {
        clearColor: "#201919",
        colorStart: "#ff0000",
        colorEnd: "#0000ff",

        offsetMult: 0.0005,
      }

      const mouse = {
        x: 0,
        y: 0,
      }

      window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
      })

      // Canvas
      const canvas = document.querySelector("canvas.webgl")

      // Scene
      const scene = new THREE.Scene()

      /**
       * Loaders
       */

      const manager = new THREE.LoadingManager(
        () => {
          // setTimeout(() => {
          //   gsap.to(overlay.material.uniforms.uAlpha, { duration: 3, value: 0 });

          //   bar.classList.add("ended");
          //   bar.style.transform = "";
          // }, 500);
          ///this.$store.dispatch("setLoading", false)

          const obj = { val: 0 }
          gsap
            .timeline()
            .to(obj, {
              val: 100,
              duration: 1,
              snap: { val: 1 },
              onUpdate: () => this.$store.dispatch("setPercent", obj.val),
            })
            .to(".loader", {
              y: "-100%",
              delay: 0.3,
              duration: 0.5,
              onComplete: () => {
                document.querySelector(".header").classList.add("active")
                this.$store.dispatch("setLoading", false)
              },
            })

          console.log(121)
        },
        (_, itemsLoaded, itemsTotal) => {
          let ratio = itemsTotal / itemsLoaded
          // bar.style.transform = `scaleX(${ratio})`;

          this.$store.dispatch("setLoading", true)
          // this.$store.dispatch(
          //   "setPercent",
          //   (itemsLoaded / itemsTotal).toFixed(2) * 100
          // )
          console.log(
            `Items total: ${itemsTotal},  ItemsLoaded: ${itemsLoaded},   ratio:  ${ratio}`
          )
        }
      )

      // Texture loader
      const textureLoader = new THREE.TextureLoader(manager)

      class imgFigure {
        constructor(imgs) {
          this.imgs = imgs

          this.section = document.querySelector(".projects")
          this.parent = document.querySelector(".carousel")
          this.initialWidth = this.parent.clientWidth
          this.scrollLeftBResize = 0
          this.parent.scrollLeft = 0
          this.geometry = new THREE.PlaneBufferGeometry(1, 1, 20, 20)
          this.hovered = 1
          this.currentMesh = null
          this.meshes = []
          this.meshesGroup = new THREE.Group()
          /// for parent container scroll
          this.firstEnter = null
          this.scrolled = null
          this.down = false
          this.mouseIsOver = false
          this.lastMove = 0
          this.init()
        }

        init() {
          this.meshes = this.imgs.map((img) => {
            const imgRect = img.getBoundingClientRect()
            const sectionRect = this.section.getBoundingClientRect()
            const relativePos = {}

            ;(relativePos.top = imgRect.top - sectionRect.top),
              (relativePos.right = imgRect.right - sectionRect.right),
              (relativePos.bottom = imgRect.bottom - sectionRect.bottom),
              (relativePos.left = imgRect.left - sectionRect.left)

            const imSizes = new THREE.Vector2(imgRect.width, imgRect.height)
            const imOffset = new THREE.Vector2(
              relativePos.left - window.innerWidth / 2 + imgRect.width / 2,
              -relativePos.top +
                this.section.clientHeight / 2 -
                imgRect.height / 2
            )

            const loadedImg = textureLoader.load(img.src)

            return this.createPlane(imSizes, imOffset, loadedImg)
          })

          //.add(...this.meshes)
          scene.add(this.meshesGroup)

          this.creatingEvents()
        }

        resizing() {
          this.parent.scrollLeft = 0
          this.imgs.forEach((img, i) => {
            const imgRect = img.getBoundingClientRect()

            const sectionRect = this.section.getBoundingClientRect()
            const relativePos = {}

            relativePos.top = imgRect.top - sectionRect.top
            relativePos.right = imgRect.right - sectionRect.right
            relativePos.bottom = imgRect.bottom - sectionRect.bottom
            relativePos.left = imgRect.left - sectionRect.left

            const imSizes = new THREE.Vector2(imgRect.width, imgRect.height)

            // const imOffset = new THREE.Vector2(
            //   relativePos.left - window.innerWidth / 2 + imgRect.width / 2,
            //   -relativePos.top +
            //     sectionRect.clientHeight / 2 -
            //     imgRect.height / 2
            // )

            const imOffset = new THREE.Vector2(
              relativePos.left -
                this.section.clientWidth / 2 +
                imgRect.width / 2,
              -relativePos.top +
                this.section.clientHeight / 2 -
                imgRect.height / 2
            )

            this.meshes[i].position.set(imOffset.x, imOffset.y, 0)
            this.meshes[i].scale.set(imSizes.x, imSizes.y, 1)
            //alert(`${this.meshes[i].scale.x},${this.meshes[i].scale.y}`)
            // gsap
            //   .timeline()
            //   .to(this.meshes[i].scale, {
            //     duration: 0.3,
            //     x: imSizes.x,
            //     y: imSizes.y,
            //     z: 1,
            //   })
            //   .to(
            //     this.meshes[i].position,
            //     {
            //       duration: 0.3,
            //       x: imOffset.x,
            //       y: imOffset.y,
            //       z: 0,
            //     },
            //     "<"
            //   )
          })

          this.parent.scrollLeft =
            (this.parent.clientWidth * this.scrollLeftBResize) /
            this.initialWidth
        }

        get m() {
          return this.meshes
        }

        get mesh() {
          return this.currentMesh
        }

        createPlane(size, offset, loadedImg) {
          const material = new THREE.ShaderMaterial({
            vertexShader: `

varying vec2 vUv;
uniform vec2 uOffset;
uniform float uHover;
uniform float uTime;
uniform float uAnim;


//uniform vec2 uMouse;

float PI = 3.141529;

vec3 deformation(vec3 position, vec2 uv, vec2 offset){
    position.x = position.x + (sin(uv.y *PI ) * offset.x ) ;
    position.y = position.y + (sin(uv.x * PI ) * offset.y ) ;
    return position;
}

void main(){
       vec3 newPos =  position;
//newPos =  deformation(position, uv, uOffset);
    // if(uHover == 1.0){
    //     newPos =  deformation(position, uv, uOffset);
    // }
    vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);
    //vec4 constModelPosition = modelMatrix * vec4(newPos, 1.0);

    //modelPosition.y += sin( uAnim *100.0)*0.1;
   //modelPosition.x += cos(modelPosition.y * uTime * 0.01)*10.0;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}
          `,
            fragmentShader: `
          varying vec2 vUv;

uniform sampler2D uTexture;

uniform float uTime;
uniform float uRandom;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform vec2 uMouse;
uniform vec2 uViewport;uniform float uHover;






vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);

    return 2.2 * n_xyz;
}
float createCircle(){

    vec2 viewportUv = gl_FragCoord.xy / uViewport;
    float viewportAspect = uViewport.x / uViewport.y;


    vec2 mousePoint = vec2(uMouse.x,1.0 - uMouse.y);
    float circleRadius = max(0.0,30.0 / uViewport.x);

    vec2 shapeUv =viewportUv - mousePoint;
   //shapeUv = shapeUv +  cnoise(vec3(shapeUv*100.0,uTime * 0.01));

    shapeUv /= vec2(1.0,viewportAspect);
    shapeUv += mousePoint;
   //
    float dist = distance(shapeUv,mousePoint);
    dist = smoothstep(circleRadius,circleRadius + 0.001,dist);
   return dist;

}

void main(){
 //float circle = createCircle();
 vec2 uv = vUv;
float time = uTime *uRandom;
float offX = uv.x + sin(uv.y + time * 2.0);
float offY = uv.y - time * 0.2 - cos(time * 2.0)*0.1;
  float nc = (cnoise(vec3(offX, offY, time * .5) * 8.)) * uHover;
  float nh = (cnoise(vec3(offX, offY, time * uRandom ) * 2.)) * .03;





//  vec2 newUv = vUv + cnoise(vec3(vUv*7.05,uTime *0.01));
//   float strength = cnoise(vec3(newUv*5.0,uTime*0.2));



    vec4 textureColor = texture2D(uTexture,uv + vec2(nh)*uHover) ;
    //vec4 textureColor = texture2D(uTexture,uv) ;
//uv + vec2(nh) * uHover

   gl_FragColor = textureColor;
   // gl_FragColor =vec4(textureColor.xyz*circle,textureColor.a);
    //gl_FragColor =vec4(vec3(circle),1.0);



// float outerGlow =  distance(vUv, vec2(0.5)) * 5.0 - 1.4;
// vec2 newUv = vUv + cnoise(vec3(vUv*5.0,uTime *0.1));
//     float strength = cnoise(vec3(newUv*5.0,uTime*0.2));
//     strength += outerGlow;
//     strength += step(- 0.2, strength) * 0.8;
//         strength = clamp(strength, 0.0, 1.0);

// vec3 col = mix(uColorStart,uColorEnd,strength);
//      gl_FragColor = vec4(col, 1.0);
}
          `,

            uniforms: {
              uTexture: { value: loadedImg },
              uTime: { value: 0 },
              uAnim: { value: 0 },
              uOffset: { value: offset },
              uRandom: { value: (Math.random() - 0.5) * 2 },
              uHover: { value: +this.hovered },
              uMouse: { value: new THREE.Vector2(0, 0) },
              uViewport: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
              },
            },
          })

          const mesh = new THREE.Mesh(this.geometry, material)
          mesh.position.set(offset.x, offset.y, 0)
          mesh.scale.set(size.x, size.y, 1)
          this.meshesGroup.add(mesh)
          //scene.add(mesh)
          return mesh
        }

        horizontalScroll(e) {
          const maxScr = this.parent.scrollWidth - this.parent.clientWidth
          let scr = e.currentTarget.scrollLeft + e.deltaY * 2
          scr = scr > maxScr ? maxScr : scr
          scr = scr < 0 ? 0 : scr

          //this.parent.scrollLeft = this.firstEnter - e.pageX + this.scrolled
          gsap
            .timeline()
            .to(e.currentTarget, { duration: 0.5, scrollLeft: scr })
            .to(
              this.meshesGroup.position,
              {
                duration: 0.5,
                delay: 0,
                x: -scr,
              },
              "<"
            )
        }

        creatingEvents() {
          this.parent.addEventListener("mousedown", (e) => {
            e.preventDefault()
            this.firstEnter = e.pageX
            this.down = true
            this.scrolled = this.parent.scrollLeft
          })
          this.parent.addEventListener(
            "touchstart",
            (e) => {
              this.firstEnter = e.changedTouches[0].pageX
              this.down = true
              this.scrolled = this.parent.scrollLeft
              //console.log(this.firstEnter)
            },
            { passive: true }
          )

          const func = this.horizontalScroll.bind(this)

          this.parent.addEventListener("mouseleave", (e) => {
            this.down = false
            this.mouseIsOver = false
            document.body.style.overflowY = "scroll"

            e.currentTarget.removeEventListener("wheel", func)
          })

          this.parent.addEventListener("mouseover", (e) => {
            if (this.mouseIsOver) {
              return
            }

            document.body.style.overflowY = "hidden"
            this.mouseIsOver = true
            e.currentTarget.addEventListener("wheel", func)
          })

          this.parent.addEventListener("mouseup", () => {
            this.down = false
            this.scrollLeftBResize = this.parent.scrollLeft
          })
          this.parent.addEventListener(
            "touchend",
            () => {
              this.down = false
              this.scrollLeftBResize = this.parent.scrollLeft
              document.body.style.overflowY = "scroll"
              console.log(1212)
            },
            { passive: true }
          )

          // this.parent.addEventListener("scroll", () => {

          // })

          this.parent.addEventListener("mousemove", (e) => {
            if (!this.down) return
            e.preventDefault()

            const maxScroll = this.parent.scrollWidth - this.parent.clientWidth
            let c = this.firstEnter - e.pageX + this.scrolled

            c = c > maxScroll ? maxScroll : c
            c = c < 0 ? 0 : c

            gsap
              .timeline()
              .to(this.parent, { duration: 1, scrollLeft: c })
              .to(
                this.meshesGroup.position,
                {
                  duration: 1,
                  delay: 0,
                  x: -c,
                },
                "<"
              )
          })
          this.parent.addEventListener("touchmove", (e) => {
            if (!this.down) return
            e.preventDefault()
            // const maxScroll = this.parent.scrollWidth - this.parent.clientWidth
            //   const b = this.firstEnter - e.changedTouches[0].pageX + this.scrolled
            //     let c;
            //   c = b > maxScroll ? maxScroll : b
            //   c = b < 0 ? 0 : b
            if (this.lastMove !== e.changedTouches[0].pageX) {
              const deltaX = e.changedTouches[0].pageX - this.firstEnter

              this.parent.scrollLeft -= deltaX * 0.05
              this.meshesGroup.position.x = -this.parent.scrollLeft
              this.lastMove = e.changedTouches[0].pageX
            }
          })

          this.imgs.forEach((img, index) => {
            img.addEventListener("mouseenter", () => {
              this.hovered = 2
              this.currentMesh = this.meshes[index]
              this.currentMesh.material.uniforms.uHover.value = this.hovered
            })
            img.addEventListener("mouseleave", () => {
              this.hovered = 1
              if (this.currentMesh) {
                this.currentMesh.material.uniforms.uHover.value = this.hovered
              }

              this.currentMesh = null
            })
          })
        }
      }

      /**
       * Sizes
       */
      const sizes = {
        width: window.innerWidth,
        height: document.querySelector(".projects").clientHeight,
      }

      let resizeTimer

      window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = document.querySelector(".projects").clientHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        if (resizeTimer) {
          clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(() => {
          if (this.figure) {
            this.figure.resizing()
          }
        }, 250)
      })

      /**
       * Camera
       */
      // Base camera
      //hack to set 1 unit to 1 pixel
      const perspective = 800
      const fov =
        (180 *
          (2 *
            Math.atan(
              document.querySelector(".projects").clientHeight / 2 / perspective
            ))) /
        Math.PI

      const camera = new THREE.PerspectiveCamera(
        fov,
        sizes.width / sizes.height,
        0.1,
        1000
      )
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = perspective

      camera.lookAt(0, 0, 0)

      this.figure = new imgFigure([
        ...document.querySelectorAll(".carousel__img"),
      ])
      scene.add(camera)

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      })
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      renderer.setClearColor(debugObj.clearColor, 0)

      /**
       * Animate
       */
      const clock = new THREE.Clock()
      let offs = new THREE.Vector2(0, 0)
      const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        // console.log(elapsedTime + (Math.random() + 1))
        if (this.figure.m.length > 0) {
          this.figure.m.forEach((el) => {
            el.material.uniforms.uTime.value = elapsedTime
          })
        }

        if (this.figure.mesh) {
          this.figure.mesh.material.uniforms.uTime.value = elapsedTime
          offs.x = lerp(offs.x, mouse.x, 0.1)
          offs.y = lerp(offs.y, mouse.y, 0.1)
          this.figure.mesh.material.uniforms.uMouse.value.set(
            mouse.x / window.innerWidth,
            mouse.y / window.innerHeight
          )

          this.figure.mesh.material.uniforms.uOffset.value.set(
            (mouse.x - offs.x) * debugObj.offsetMult,
            -(mouse.y - offs.y) * debugObj.offsetMult
          )
        }

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }

      tick()
      setTimeout(() => {
        this.figure.resizing()
      }, 1000)
    })
  },
}
</script>
