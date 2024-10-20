<template>
    <canvas ref="renderCanvas"></canvas>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
  
  const renderCanvas = ref(null);
  let engine, scene;
  
  onMounted(() => {
    engine = new Engine(renderCanvas.value, true);
    scene = createScene();
  
    engine.runRenderLoop(() => {
      scene.render();
    });
  
    window.addEventListener('resize', onResize);
  });
  
  onUnmounted(() => {
    engine.dispose();
    window.removeEventListener('resize', onResize);
  });
  
  function createScene() {
    const scene = new Scene(engine);
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(renderCanvas.value, true);
    new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
    return scene;
  }
  
  function onResize() {
    engine.resize();
  }
  </script>
  
  <style scoped>
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  </style>