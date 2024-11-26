import { FC, useEffect, useState, useRef } from "react";

import ScrollIcon from "../scroll-icon/scroll-icon";
// import videoSmoke from "../../assets/video/smoke.mp4"
import './welcome.scss'
import * as THREE from 'three';

const Welcome : FC = () => {


  const [screenClass, setScreenClass] = useState(window.innerWidth < 767 ? 'align-end' : 'center');

  useEffect(() => {
    const handleResize = () => {
        setScreenClass(window.innerWidth < 767 ? 'align-end' : 'center');
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);


  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const tex = pmremGenerator.fromScene(scene, 0.02).texture;
    scene.environment = tex;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 500);
    camera.position.z = 5;

    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    const mouse = new THREE.Vector2(0.5, 0.5);
    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    const handlePointerMove = (e: PointerEvent) => {
      mouseTarget.set(
        e.clientX / window.innerWidth,
        1 - (e.clientY / window.innerHeight)
      );
    };

    window.addEventListener('pointermove', handlePointerMove);

    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.ShaderMaterial({
      depthTest: false,
      uniforms: {
        up: { value: new THREE.Vector3(0, 1, 0) },
        time: { value: 0 },
        uMouse: { value: mouse },
        uResolution: { value: resolution }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          gl_Position.z = gl_Position.w; // set z to camera.far
        }
      `,
      fragmentShader: `
        uniform vec3 up;
        uniform float time;
        uniform vec2 uResolution;

        varying vec3 vWorldPosition;
        varying vec2 vUv;

        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){ 
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 =   v - i + dot(i, C.xxx) ;

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );

          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1. + 3.0 * C.xxx;

          i = mod(i, 289.0 ); 
          vec4 p = permute( permute( permute( 
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

          float n_ = 1.0/7.0;
          vec3  ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );

          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );

          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                        dot(p2,x2), dot(p3,x3) ) );
        }

        #define OCTAVES 8

        float fbm(vec3 direction) {
          float value = 0.0;
          float amplitude = 0.5;

          for (int i = 0; i < OCTAVES; i++) {
            value += amplitude * snoise(direction);
            direction *= 2.0;
            amplitude *= 0.5;
          }

          return value;
        }

        #define PI 3.1415926
        #define HP (PI * 0.5)

        void main() {
          vec3 smokeCol = vec3(1.0);
          vec3 bgCol = vec3(0.0);
          
          vec2 uv = vUv * vec2(uResolution.x / uResolution.y, 1.0);
          
          vec3 direction = normalize(vWorldPosition - cameraPosition);
          float zenithAngle = acos(dot(up, direction));

          direction.xz += time * 0.00005;

          float intensity = smoothstep(HP - 0.7, HP + 0.4, zenithAngle);
          vec3 smokeDir = up * time * -0.0001;
          float noise = (fbm(direction + smokeDir) * 0.5 + 0.5) * intensity;
          vec3 col = mix(smokeCol, bgCol, smoothstep(1.0, 0.125, noise));
          
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });

    const plane = new THREE.Mesh(geo, mat);
    plane.position.z = -100;
    plane.scale.setScalar(100);
    camera.add(plane);
    scene.add(camera);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      resolution.set(window.innerWidth, window.innerHeight);
      
      const ar = resolution.x / resolution.y;
      camera.aspect = ar;
      camera.updateProjectionMatrix();
      
      plane.scale.set(ar, 1.0, 1.0);
      plane.scale.multiplyScalar(100);
    };

    resize();
    window.addEventListener('resize', resize);

    const seed = Math.random() * 360000;
    const fps = 1000 / 60;
    let lastFrame = performance.now();
    const animate = () => {
      const now = performance.now();
      const elapsed = now - lastFrame;
      const frameTime = fps / elapsed;
      lastFrame = now;
      
      mouse.lerp(mouseTarget, 0.05 / frameTime);
      
      const time = performance.now() + seed;
      
      // mesh.rotation.x = (performance.now() * 0.00125) % (Math.PI * 2);
      // mesh.rotation.z = (performance.now() * 0.0006125) % (Math.PI * 2);
      mat.uniforms.time.value = time;
      
      camera.position.x = Math.cos((mouse.x - 0.5) * Math.PI * 0.25) * 5.0;
      camera.position.y = Math.sin(-(mouse.y - 0.5) * Math.PI * 0.25) * 5.0;
      camera.position.z = Math.sin((mouse.x - 0.5) * Math.PI * 0.25) * 5.0;
      // camera.lookAt(mesh.position);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      };
  }, []);

    return (
        <section className="section welcome">
          <div ref={ mountRef }  className="section-content welcome-content">
            <h1 className={`text-title ${screenClass}`}>
              <div className="word">
                <span>B</span>
                <span>i</span>
                <span>e</span>
                <span>n</span>
                <span>v</span>
                <span>e</span>
                <span>n</span>
                <span>i</span>
                <span>d</span>
                <span>o</span>
                <span>s</span>
              </div>
              <div className="word">
                <span></span><span></span><span></span><span></span>
                <span>a</span>
                <span>l</span>
                <span></span><span></span><span></span><span></span>
              </div>
              <div className="word">
                <span>A</span>
                <span>n</span>
                <span>t</span>
                <span>r</span>
                <span>o</span>
                <span>p</span>
                <span>o</span>
                <span>c</span>
                <span>e</span>
                <span>n</span>
                <span>o</span>
              </div>
            </h1>
            {/* <video src={ videoSmoke } autoPlay muted></video> */}
            <ScrollIcon />
          </div>
        </section>
    );
}

export default Welcome;