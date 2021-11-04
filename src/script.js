import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//axes
const axesHelper = new THREE.AxesHelper()

scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/5.png')
console.log(matcapTexture)

// font
const fontLoader = new THREE.FontLoader();

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',

    (font) => {
        const textGeometry = new THREE.TextBufferGeometry('Hello World',
            {
                font,
                size: .5,
                height: .2,
                curveSegments: 3,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3,
            })

        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - .02) * .5,
        //     -(textGeometry.boundingBox.max.y - .02) * .5,
        //     -(textGeometry.boundingBox.max.z - .03) * .5,
        // )
        // textGeometry.computeBoundingBox();
        // console.log(textGeometry.boundingBox)

        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial();
        material.matcap = matcapTexture;
        const textMesh = new THREE.Mesh(textGeometry, material)
        // textMaterial.wireframe = true;
        scene.add(textMesh)

        console.time('donuts')
        const donutsGeometry = new THREE.TorusBufferGeometry(.3, .2, 20, 45);
        // const donutsMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture2})

        for (let i = 0; i < 400; i++) {

            const donut = new THREE.Mesh(donutsGeometry, material)

            donut.position.set((Math.random() - .5) * 10, (Math.random() - .5) * 10, (Math.random() - .5) * 10)
            donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

            const scaleRandom = Math.random();
            donut.scale.set(scaleRandom, scaleRandom, scaleRandom);
            scene.add(donut)
        }
        console.timeEnd('donuts')
    },
    (xhr) => {
        console.log(xhr.loaded / xhr.total * 100 + '% loaded')
    },
    (err) => {
        console.log(err)
    }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
//
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()