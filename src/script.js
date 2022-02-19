import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry' 
import gsap from 'gsap'




/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

// Fonts

const fontLoader = new FontLoader()

fontLoader.load(
    "/fonts/helvetiker_regular.typeface.json",
    (font) => {
        const textGeometry = new TextGeometry(
            "Kemon acho? Mashrur Bolchi.",
            {
                font,
                size: .5,
                height: .2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: .02,
                bevelSize: .02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        );

        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - .02) * .5,
        //     -(textGeometry.boundingBox.max.y - .02) * .5,
        //     -(textGeometry.boundingBox.max.z - .03) * .5,
        // )

        textGeometry.center()
            
        const material = new THREE.MeshNormalMaterial({});
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)


        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        for(let i = 0; i < 300; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 30
            donut.position.y = (Math.random() - 0.5) * 30
            donut.position.z = (Math.random() - 0.5) * 30
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            scene.add(donut)
        }
    }
);

// axes helper 
// const axesHelper = new THREE.AxesHelper();

// scene.add(axesHelper)


/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.z = 1;

gsap.fromTo(camera.position,{
    z: 32,
    delay: 1,
    duration: 1,
}, {
    z: 6,
    delay: 1,
    duration: 1,
});

gsap.fromTo(camera.position,{
    x: 32,
    delay: 1,
    duration: 1,
}, {
    x: 2,
    delay: 1,
    duration: 3,
});
gsap.fromTo(camera.position,{
    y: 32,
    delay: 1,
    duration: 1,
}, {
    y: 0,
    delay: 1,
    duration: 3,
});

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()