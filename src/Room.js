const THREE = require('three')
const BoxLineGeometry = require('./BoxLineGeometry')

/**
 * Basic testing 3D room
 */
const Room = function () {
  const geometry = new BoxLineGeometry(6, 6, 6, 10, 10, 10)
  const material = new THREE.LineBasicMaterial({
    color: 0x808080
  })

  THREE.LineSegments.call(this, geometry, material)
}

Room.prototype = Object.create(THREE.LineSegments.prototype)
Room.prototype.constructor = Room

module.exports = Room