var width = window.innerWidth
, height = window.innerHeight
, renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true })
, scene = new THREE.Scene
, camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
// , controls = new THREE.OrbitControls( camera, renderer.domElement )
, config = {
    height: 4000,
    width: 4000,
    linesHeight: 25,
    linesWidth: 25
}
, linematerial = new THREE.LineDashedMaterial({
    color: 0xffff00,
    linewidth: 1,
    scale: 1,
    dashSize: 30,
    gapSize: 30,
})
, gridObject = new THREE.Object3D()
, gridObject2 = new THREE.Object3D()
, stepw = 2 * config.width / config.linesWidth
, steph = 2 * config.height / config.linesHeight
, geometry = new THREE.SphereGeometry( 10, 4, 4 )
, material = new THREE.MeshBasicMaterial( {color: 0x23afcb} )
, dotmeshLineGeometry = new THREE.Geometry()
, dotmeshLineGeometry2 = new THREE.Geometry()
, dotmeshLineGeometry3 = new THREE.Geometry()
, dotmeshLineGeometry4 = new THREE.Geometry()
, line
, line2
, line3
, line4
, meshLinePoints = [
  {x: -4000, y: -4000, z: 0},
  {x: -3000, y: -2800, z: 0},
  {x: -2300, y: -2300, z: 0},
  {x: -2200, y: -2100, z: 0},
  {x: -1900, y: -1900, z: 0},
  {x: -1800, y: -1600, z: 0},
  {x: -1700, y: -1500, z: 0},
  {x: -1600, y: -1300, z: 0},
  {x: -1500, y: -1200, z: 0},
  {x: -1400, y: -1100, z: 0},
  {x: -1100, y: -600, z: 0},
  {x: -1000, y: -1000, z: 0},
  {x: -900, y: -900, z: 0},
  {x: -800, y: -800, z: 0},
  {x: -700, y: -500, z: 0},
  {x: -500, y: -300, z: 0},
  {x: -400, y: -100, z: 0},
  {x: -200, y: -50, z: 0},
  {x: -100, y: 0, z: 0},
  {x: 0, y: 200, z: 0},
  {x: 200, y: 200, z: 0},
  {x: 300, y: 0, z: 0},
  {x: 400, y: -400, z: 0},
  {x: 500, y: -600, z: 0},
  {x: 600, y: -300, z: 0},
  {x: 700, y: -200, z: 0},
  {x: 1000, y: 300, z: 0},
  {x: 1500, y: 700, z: 0},
  {x: 1600, y: 900, z: 0},
  {x: 1900, y: 1200, z: 0},
  {x: 2200, y: 1600, z: 0},
  {x: 2300, y: 1400, z: 0},
  {x: 3000, y: 1200, z: 0},
  {x: 3500, y: 1000, z: 0},
  {x: 4000, y: 1700, z: 0},
]
, dottedLinePoints = [
  {x: -4000, y: 3500, z: 0},
  {x: -3000, y: 2000, z: 0},
  {x: -2300, y: 1400, z: 0},
  {x: -2200, y: 1200, z: 0},
  {x: -1900, y: 800, z: 0},
  {x: -1800, y: 600, z: 0},
  {x: -1700, y: 500, z: 0},
  {x: -1600, y: 1300, z: 0},
  {x: -1500, y: 1200, z: 0},
  {x: -1400, y: 900, z: 0},
  {x: -1100, y: 600, z: 0},
  {x: -1000, y: 400, z: 0},
  {x: -900, y: 200, z: 0},
  {x: -800, y: 400, z: 0},
  {x: -700, y: -500, z: 0},
  {x: -500, y: -300, z: 0},
  {x: -400, y: -100, z: 0},
  {x: -200, y: -500, z: 0},
  {x: -100, y: -1000, z: 0},
  {x: 0, y: -1200, z: 0},
  {x: 200, y: -1000, z: 0},
  {x: 300, y: -1200, z: 0},
  {x: 400, y: -400, z: 0},
  {x: 500, y: -600, z: 0},
  {x: 600, y: -700, z: 0},
  {x: 700, y: -800, z: 0},
  {x: 1000, y: -900, z: 0},
  {x: 1500, y: -700, z: 0},
  {x: 1600, y: -900, z: 0},
  {x: 1900, y: -1200, z: 0},
  {x: 2200, y: -1600, z: 0},
  {x: 2300, y: -1200, z: 0},
  {x: 2700, y: -1000, z: 0},
  {x: 3500, y: -700, z: 0},
  {x: 4000, y: -400, z: 0},
]
, plusLinePoints = [
  {x: -4000, y: 3000, z: 0},
  {x: -3500, y: 2600, z: 0},
  {x: -3000, y: 2000, z: 0},
  {x: -2700, y: 1700, z: 0},
  {x: -2300, y: 1400, z: 0},
  {x: -2200, y: 1200, z: 0},
  {x: -1900, y: 800, z: 0},
  {x: -1800, y: 600, z: 0},
  {x: -1700, y: 500, z: 0},
  {x: -1600, y: 500, z: 0},
  {x: -1500, y: 500, z: 0},
  {x: -1400, y: 400, z: 0},
  {x: -1100, y: 600, z: 0},
  {x: -1000, y: 400, z: 0},
  {x: -900, y: 200, z: 0},
  {x: -800, y: 400, z: 0},
  {x: -700, y: -500, z: 0},
  {x: -500, y: -300, z: 0},
  {x: -400, y: -400, z: 0},
  {x: -200, y: -500, z: 0},
  {x: -100, y: -1000, z: 0},
  {x: 0, y: -1200, z: 0},
  {x: 200, y: -1200, z: 0},
  {x: 300, y: -1200, z: 0},
  {x: 400, y: -1000, z: 0},
  {x: 500, y: -900, z: 0},
  {x: 600, y: -700, z: 0},
  {x: 700, y: -800, z: 0},
  {x: 1000, y: -900, z: 0},
  {x: 1500, y: -700, z: 0},
  {x: 1600, y: -900, z: 0},
  {x: 1900, y: -1200, z: 0},
  {x: 2200, y: -1600, z: 0},
  {x: 2300, y: -1200, z: 0},
  {x: 2700, y: -1000, z: 0},
  {x: 3500, y: -1000, z: 0},
  {x: 4000, y: -600, z: 0},
]
, volLinePoints = [
  {x: -4000, y: 2000, z: 0},
  {x: -3500, y: 1800, z: 0},
  {x: -3000, y: 1600, z: 0},
  {x: -2700, y: 1400, z: 0},
  {x: -2300, y: 1400, z: 0},
  {x: -2200, y: 1600, z: 0},
  {x: -1900, y: 1500, z: 0},
  {x: -1800, y: 1400, z: 0},
  {x: -1700, y: 1000, z: 0},
  {x: -1600, y: 800, z: 0},
  {x: -1500, y: 1200, z: 0},
  {x: -1400, y: 1000, z: 0},
  {x: -1100, y: 1000, z: 0},
  {x: -1000, y: 1200, z: 0},
  {x: -900, y: 1200, z: 0},
  {x: -800, y: 1200, z: 0},
  {x: -700, y: 1000, z: 0},
  {x: -500, y: 800, z: 0},
  {x: -400, y: 700, z: 0},
  {x: -200, y: 500, z: 0},
  {x: -100, y: 1000, z: 0},
  {x: 0, y: 800, z: 0},
  {x: 200, y: 1200, z: 0},
  {x: 300, y: 1200, z: 0},
  {x: 400, y: 1000, z: 0},
  {x: 500, y: 900, z: 0},
  {x: 600, y: 700, z: 0},
  {x: 700, y: 800, z: 0},
  {x: 1000, y: 900, z: 0},
  {x: 1500, y: 700, z: 0},
  {x: 1600, y: 900, z: 0},
  {x: 1900, y: 1200, z: 0},
  {x: 2200, y: 1600, z: 0},
  {x: 2300, y: 1200, z: 0},
  {x: 2700, y: 1000, z: 0},
  {x: 3500, y: 1000, z: 0},
  {x: 4000, y: 600, z: 0},
]
, meshLineGeometry = new THREE.Geometry()
, meshLineVertices = []
, dotmeshLineArr = []
, dotmeshLineArr2 = []
, dotmeshLineArr3 = []
, dotmeshLineArr4 = []
, resolution = new THREE.Vector2( width, height )
, meshLineMaterial = new MeshLineMaterial( {
    color: new THREE.Color( 0x23afcb ),
    opacity: 0.9,
    resolution: resolution,
    sizeAttenuation: false,
    lineWidth: 10,
    transparent: true
})
, lineMesh
, inc = {value:1}
, plusShape = new THREE.Shape()
, plusLineArr = []
, plusMeshArr = []
, plusVertices = []
, plusLineGeometry = new THREE.Geometry()
, volLineArr = []
, volMeshArr = []
, volVertices = []
, volLineGeometry = new THREE.Geometry()
;

function init(){

    // Setup Renderer
    renderer.setClearColor( 0x010101 , 0.7 );
    renderer.setSize(width, height);
    renderer.domElement.style.opacity = 0;
    renderer.domElement.style.zIndex = -2;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    $("#section0 .main-content").append(renderer.domElement);

    // Setup Camera
    camera.position.z = 5000;

    // Setup Controls
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = true;

    // Create left grid from spheres
    for (var i = -config.width; i <= config.width; i += stepw) {
      for (var j = -config.height; j <= config.height; j += steph) {
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = i;
        sphere.position.y = j;
        gridObject.add(sphere);
      }
    }

    // Code for creating set of 4 dotted lines
    dottedLinePoints.forEach(function(obj){
      dotmeshLineArr.push(new THREE.Vector3(obj.x, obj.y + 500, obj.z) );
      dotmeshLineArr2.push(new THREE.Vector3(obj.x, obj.y + 540, obj.z) );
      dotmeshLineArr3.push(new THREE.Vector3(obj.x, obj.y + 520, obj.z + 20) );
      dotmeshLineArr4.push(new THREE.Vector3(obj.x, obj.y + 520, obj.z - 20) );
    })

    dotmeshLineGeometry.vertices = new THREE.CatmullRomCurve3( dotmeshLineArr ).getPoints(200);
    dotmeshLineGeometry2.vertices = new THREE.CatmullRomCurve3( dotmeshLineArr2 ).getPoints(200);
    dotmeshLineGeometry3.vertices = new THREE.CatmullRomCurve3( dotmeshLineArr3 ).getPoints(200);
    dotmeshLineGeometry4.vertices = new THREE.CatmullRomCurve3( dotmeshLineArr4 ).getPoints(200);

    line = new THREE.Line( dotmeshLineGeometry, linematerial );
    line2 = new THREE.Line( dotmeshLineGeometry2, linematerial );
    line3 = new THREE.Line( dotmeshLineGeometry3, linematerial );
    line4 = new THREE.Line( dotmeshLineGeometry4, linematerial );
  
    line.computeLineDistances();
    line2.computeLineDistances();
    line3.computeLineDistances();
    line4.computeLineDistances();

    gridObject.add(line);
    gridObject.add(line2);
    gridObject.add(line3);
    gridObject.add(line4);

    gridObject.position.x = -2000;
    gridObject.rotation.y = 1;
    
    // Code for creating Mesh Line (thick)
    meshLinePoints.forEach(function(obj){
      meshLineVertices.push(new THREE.Vector3(obj.x, obj.y, obj.z) );
    })
    meshLineGeometry.vertices = new THREE.CatmullRomCurve3( meshLineVertices ).getPoints(100);
    meshLine = new MeshLine();
    meshLine.setGeometry( meshLineGeometry, function( p ) { return 2 + Math.sin( 50 * p ) } );
    
    lineMesh = new THREE.Mesh( meshLine.geometry, meshLineMaterial );
    gridObject.add(lineMesh)
    scene.add(gridObject); 
    
    //Right grid
    for (var i = -config.width; i <= config.width; i += stepw) {
      for (var j = -config.height; j <= config.height; j += steph) {
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = i;
        sphere.position.y = j;
        gridObject2.add(sphere);
      }
    }

    gridObject2.position.x = 2500;
    gridObject2.rotation.y = -1;

    //Creating plus like shape
    plusShape.moveTo( 0, 150 );
    plusShape.lineTo( 25, 150 );
    plusShape.lineTo( 25, 80 );
    plusShape.lineTo( 80, 80 );
    plusShape.lineTo( 80, 25 );
    plusShape.lineTo( 120, 25 );
    plusShape.lineTo( 120, -25 );
    plusShape.lineTo( 80, -25 );
    plusShape.lineTo( 80, -80 );
    plusShape.lineTo( 25, -80 );
    plusShape.lineTo( 25, -150 );
    plusShape.lineTo( -25, -150 );
    plusShape.lineTo( -25, -80 );
    plusShape.lineTo( -80, -80 );
    plusShape.lineTo( -80, -25 );
    plusShape.lineTo( -120, -25 );
    plusShape.lineTo( -120, 25 );
    plusShape.lineTo( -80, 25 );
    plusShape.lineTo( -80, 80 );
    plusShape.lineTo( -25, 80 );
    plusShape.lineTo( -25, 150 );

    var plusMesh = new THREE.Mesh( new THREE.ExtrudeGeometry( plusShape, { amount: 1, bevelEnabled: !true } ), new THREE.MeshBasicMaterial({transparent:true, opacity:1, color:0x5dd36d}) );
    plusMesh.scale.x = 0.35;
    plusMesh.scale.y = 0.6;
    
    //Creating points for placing each plus shape
    plusLinePoints.forEach(function(obj){
      plusLineArr.push(new THREE.Vector3(obj.x, obj.y, obj.z) );      
    })

    plusVertices = new THREE.CatmullRomCurve3( plusLineArr ).getPoints(50);   

    //Placing each plus shape on the points on the line
    plusVertices.forEach(function(obj){
      var newmesh = plusMesh.clone();
      newmesh.position.x = obj.x;
      newmesh.position.y = obj.y;
      newmesh.position.z = obj.z;
      plusMeshArr.push(newmesh);
      gridObject2.add(newmesh);
    })

    //Creating single planes for volume
    var pgroup = new THREE.Object3D();
    var plane = new THREE.Mesh( new THREE.PlaneGeometry( 10, 300 ), new THREE.MeshBasicMaterial( {color: 0x64d9e6} ) );
    var plane2 = new THREE.Mesh( new THREE.PlaneGeometry( 30, 200 ), new THREE.MeshBasicMaterial( {color: 0x64d9e6} ) );
    pgroup.add(plane);
    pgroup.add(plane2);

    //Creating volume vertices
    volLinePoints.forEach(function(obj){
      volLineArr.push(new THREE.Vector3(obj.x, obj.y, obj.z) );      
    })
    
    volVertices = new THREE.CatmullRomCurve3( volLineArr ).getPoints(80);   
    
    //Placing each volume shape on the volume vertices    
    volVertices.forEach(function(obj){
      var newmesh = pgroup.clone();
      var currScale = randomNum(0.1, 1.2);  
      newmesh.children[0].scale.y = currScale;  
      newmesh.children[1].scale.y = currScale;  
      newmesh.position.x = obj.x;
      newmesh.position.y = obj.y;
      newmesh.position.z = obj.z;
      volMeshArr.push(newmesh);
      gridObject2.add(newmesh);
    })

    scene.add(gridObject2);
    window.addEventListener( 'resize', onWindowResize, false );        
}

function randomNum(min,max){
    return Math.random()*(max-min+1)+min;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

function animateTweens(){
    TweenLite.ticker.addEventListener("tick", render);
    plusMeshArr.forEach(function(obj, i){
        TweenMax.to(obj.position, 0.5, {delay:i*0.05, repeat:-1, repeatDelay:1, yoyo:true, y:"+=100",x:"+=10", ease:Linear.easeNone})
    })

    volMeshArr.forEach(function(obj, i){
        TweenMax.to(obj.children[1].scale, 0.5, {delay:i*0.01, repeat:-1, repeatDelay:1, yoyo:true, y:"-=0.5",ease:Linear.easeNone})
        TweenMax.to(obj.children[0].position, 0.5, {delay:i*0.02, repeat:-1, repeatDelay:1, yoyo:true, y:"-=100",ease:Linear.easeNone})
        TweenMax.to(obj.children[1].position, 0.5, {delay:i*0.03, repeat:-1, repeatDelay:1, yoyo:true, y:"-=50",ease:Linear.easeNone})
    })

    TweenMax.to(inc, 5, {value:300, repeat:-1, repeatDelay:1, yoyo:true, ease:Linear.easeNone})    
    TweenMax.to(camera.rotation, 5, {x:0.1,y:0.1, repeat:-1, yoyo:true, ease:Back.easeInOut})
    TweenMax.to(".ticker-contain", 10, {delay:1, x:-window.innerWidth, repeat:-1, repeatDelay:1, yoyo:true, ease:Linear.easeNone})
}

function render() {
    meshLine.geometry.setDrawRange(0 , 2*inc.value);
    if(typeof line.geometry._bufferGeometry !== "undefined"){
      line.geometry._bufferGeometry.setDrawRange(0 , inc.value);
      line2.geometry._bufferGeometry.setDrawRange(0 , inc.value);
      line3.geometry._bufferGeometry.setDrawRange(0 , inc.value);
      line4.geometry._bufferGeometry.setDrawRange(0 , inc.value);
    }
    renderer.render(scene, camera);
}

// function animate(){  
//     requestAnimationFrame(animate);
//     render();
// }

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

init();

inc.value = 300;
render();
if(isEdge || isIE){
  TweenMax.to(".ticker-contain", 10, {delay:1, x:-window.innerWidth, repeat:-1, repeatDelay:1, yoyo:true, ease:Linear.easeNone})  
}else{
  // animateTweens();
}
// animate();

// gridObject.rotation.y += .0125;
// bot.rotation.y += .0125;
// if(inc.value > 500)
//   inc.value = 2;
// else
//   inc.value+=2;

// Code for text

// var loader = new THREE.FontLoader();
// var txtmaterials = [
//   new THREE.MeshBasicMaterial( { color: 0xffff00} ), // front
//   new THREE.MeshPhongMaterial( { color: 0xffffff, transparent:true, opacity:0 } ) // side
// ];
// loader.load( 'stock.json', function ( font ) {

//   var txtgeometry = new THREE.TextGeometry( 'Hello three.js!', {
//     font: font,
//     size: 80,
//     height: 5,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 10,
//     bevelSize: 8,
//     bevelSegments: 5
//   } );
//   var textMesh1 = new THREE.Mesh( txtgeometry, new THREE.MeshFaceMaterial(txtmaterials) );
//   gridObject.add(textMesh1)
// } );
    

//Adding the AI bot

// loader = new THREE.JSONLoader();
// loader.load( 'bot.json', function( geometry, materials ) {
//     bot = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffff00, wireframe: true, opacity:0.2, transparent:true}));    
//     // bot.position.y = -500;
//     bot.position.x = 0;
//     bot.position.z = 0;    
//     bot.rotation.y = 1;
//     bot.scale.set(300,300,300);     
//   camera.lookAt(bot.position);  
//     scene.add( bot );
// });   