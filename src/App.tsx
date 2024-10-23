import { Component, onMount } from 'solid-js';
import * as BABYLON from '@babylonjs/core';
import styles from './App.module.css';

const App: Component = () => {
  let canvas: HTMLCanvasElement | undefined;

  onMount(() => {
    if (canvas) {
      const engine = new BABYLON.Engine(canvas, true);
      const scene = new BABYLON.Scene(engine);

      // Create a basic Babylon.js scene
      const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
      camera.setTarget(BABYLON.Vector3.Zero());
      const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
      const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

      engine.runRenderLoop(() => {
        scene.render();
      });

      const resizeHandler = () => {
        engine.resize();
      };

      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        engine.dispose();
      };
    }
  });

  return (
    <div class={styles.App}>
      <div class={styles.header}>
        <canvas 
          ref={canvas} 
        />
      </div>
    </div>
  );
};

export default App;
