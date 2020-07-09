const THREE = require('three')
const Room = require('./Room')

let renderer, camera, scene
let room

function init() {

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('webgl2')

    let parent
    if (document.getElementById('experiment')) {
        parent = document.getElementById('experiment')
    } else {
        parent = document.body
    }

    parent.appendChild(canvas)

    canvas.style.display = 'block'

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        context: ctx
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    camera.lookAt(0, 0, 0)
    camera.position.y = 0
    camera.position.z = 1

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x606060)

    // lighting
    scene.add(new THREE.HemisphereLight(0x606060, 0x404040))

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1)
    scene.add(light)

    room = new Room()
    scene.add(room)

    window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
    // check render calls
    // console.debug(renderer.info.render.calls)
    // controls.update()
    renderer.render(scene, camera)
}

function animate() {
    renderer.setAnimationLoop(render)
}

init()
animate()