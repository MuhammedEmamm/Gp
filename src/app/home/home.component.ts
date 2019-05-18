import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import * as d3 from "d3";
import * as d3_queue from "d3-queue";
import * as topojson from "topojson";
import { OrbitControls } from 'three-orbitcontrols-ts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  mesh = null;
  loader = new THREE.TextureLoader();
  spotLight = new THREE.Light(0xffffff);
  controls = new OrbitControls(this.camera, this.renderer.domElement);
  light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
 

  constructor() {
    this.initSphere();
  }
  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }
  initSphere() {
    this.camera.position.z = 1000;

    const geometry = new THREE.SphereGeometry(500, 32, 32, 6, 6.3, 0, 3.2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: this.loader.load('assets/img/1_earth_16k.jpg') });
    //  material.bu
    this.mesh = new THREE.Mesh(geometry, material);
    this.spotLight.position.set(100, 100, 1000);

    this.spotLight.castShadow = true;


    this.scene.add(this.spotLight);
    this.scene.add(this.light);
    this.scene.add(this.mesh);
    this.scene.background = new THREE.TextureLoader().load('assets/img/Star-field-hubble-deep.jpg');
  }
  animate() {
    window.requestAnimationFrame(() => this.animate());
    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.02;


    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
