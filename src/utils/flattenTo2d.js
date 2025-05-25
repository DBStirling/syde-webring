import * as THREE from 'three';

export const getScreenCoordinates = (node, camera, renderer) => {
    const vector = new THREE.Vector3(node.x, node.y, node.z);
    vector.project(camera); // Projects the vector from world to normalized device coordinates

    const widthHalf = 0.5 * renderer.domElement.clientWidth;
    const heightHalf = 0.5 * renderer.domElement.clientHeight;

    return {
        x: vector.x * widthHalf + widthHalf,
        y: -vector.y * heightHalf + heightHalf
    };
};
