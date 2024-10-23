import { Component, onMount, createEffect } from 'solid-js';
import * as BABYLON from '@babylonjs/core';
import styles from './App.module.css';
import { useStore } from './stores/store';
import { config } from '../vircadia.config';

const App: Component = () => {
  let canvas: HTMLCanvasElement | undefined;
  const store = useStore();

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

      store.setDebugMode(true);
      store.connectToWorld({ url: config.defaultWorldSupabaseUrl, key: config.defaultWorldSupabaseAnonKey });

      createEffect(() => {
        console.log('Debug mode:', store.state.debugMode);
        console.log('World connection:', store.state.world);
      });

      return () => {
        window.removeEventListener("resize", resizeHandler);
        engine.dispose();
        store.disconnectFromWorld();
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
