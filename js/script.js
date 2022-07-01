$(document).ready(function() {
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

	// Firefox 1.0+
	, isFirefox = typeof InstallTrigger !== 'undefined'

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	, isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))

	// Internet Explorer 6-11
	, isIE = /*@cc_on!@*/false || !!document.documentMode

	// Edge 20+
	, isEdge = !isIE && !!window.StyleMedia

	// Chrome 1+
	, isChrome = !!window.chrome && !!window.chrome.webstore

	// Blink engine detection
	, isBlink = (isChrome || isOpera) && !!window.CSS

	// Overall FullPage Settings
	$('#fullpage').fullpage({
		sectionsColor: ['#272525', '#272525', '#0c2b50', '#7a95e1', '#2a2759', '#2a7e98'],
		navigation: true,
		navigationPosition: 'right',
		navigationColor : '#ffffff',
		navigationTooltips: ['HOME', 'ABOUT', 'FEATURES', 'ROADMAP', 'PARTNERS', 'SOCIAL MEDIA'],
		
		onLeave: function(index, nextIndex, direction){
			console.log(index, nextIndex, direction);
			switch(nextIndex){
				case 1 :
					// setTimeout(function(){
					// }, 1000)
					if(!(isEdge || isIE))
						animateScene0()
					stopScene1()
					stopScene2()
					stop();
				break;

				case 2 :
					stopScene0()
					stopScene1()
					stopScene2()
					tlSection1.play()
					stop();
				break;

				case 3 :
					// setTimeout(function(){
					// }, 5000)
					setTimeout(function(){
						animate();
					}, 1000)
					// animateScene1()
					stopScene0()
					stopScene2()
					tlSection2.play()
					// tlSection1.play()
				break;

				case 4 :
					stopScene1()
					stopScene0()
					stopScene2()
					tlSection3.play()
					stop();
				break;

				case 5 :
					//animateScene1()
					animateScene2()
					stopScene0()
					stopScene1()
					stop();
				break;
			}
		}
	});

	// Init all variables

	// Timelines
	var tlSection0 = new TimelineMax({
		delay:0.5,
		onComplete: function(){
			if(isEdge || isIE){
			  	// TweenMax.to(".ticker-contain", 10, {delay:1, x:-window.innerWidth, repeat:-1, repeatDelay:1, yoyo:true, ease:Linear.easeNone})  
			}else{
			  	animateScene0();
			}
		}
	})
	, tlSection1 = new TimelineMax({delay:1})
	, tlSection2 = new TimelineMax({delay:1})
	, tlSection3 = new TimelineMax({delay:1})
	, scrambleText = new ScrambleText(document.getElementById("scrTxt1"), {
		timeOffset:30
	}).stop()
	// , scrambleText2 = new ScrambleText(document.getElementById("scrTxt4"), {
	// 	timeOffset:10
	// }).stop()

	// WebGL Scene 0 Variables
	, width = window.innerWidth
	, height = window.innerHeight
	, renderer0 = new THREE.WebGLRenderer({ antialias: true, alpha:true })
	, scene0 = new THREE.Scene
	, camera0 = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
	, renderer1 = new THREE.WebGLRenderer({ antialias: true, alpha:true })
	, scene1 = new THREE.Scene
	, camera1 = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
	, renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha:true })
	, scene2 = new THREE.Scene
	, camera2 = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
	// , controls = new THREE.OrbitControls( camera2, renderer2.domElement )
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
	, earthGr = new THREE.Object3D()
	, botGr = new THREE.Object3D()
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
	, inc = {value: 300}
	, plusShape = new THREE.Shape()
	, plusLineArr = []
	, plusMeshArr = []
	, plusVertices = []
	, plusLineGeometry = new THREE.Geometry()
	, pgroup = new THREE.Object3D()
    , plane = new THREE.Mesh( new THREE.PlaneGeometry( 10, 300 ), new THREE.MeshBasicMaterial( {color: 0x64d9e6} ) )
    , plane2 = new THREE.Mesh( new THREE.PlaneGeometry( 30, 200 ), new THREE.MeshBasicMaterial( {color: 0x64d9e6} ) )
	, volLineArr = []
	, volMeshArr = []
	, volVertices = []
	, volLineGeometry = new THREE.Geometry()
	//Scene 2 Variables
	, earthSphere
	, loader = new THREE.TextureLoader()
	, curvesArr = []
	, latLngArr = [
		{from:[19.0760, 72.8777], to:[40.7128, -74.0060]},
		{from:[-26.2041, 28.0473], to:[35.6895, 139.6917]},
		{from:[8.593303, -7.337500], to:[-22.744466, -50.579687]},
		{from:[-26.577419, 118.170313], to:[38.913524, -119.881686]},
		{from:[-40.312495, -67.133309], to:[52.062145, -89.259848]},
		{from:[-44.903129, 170.369058], to:[39.258754, 99.333993]},
		{from:[28.179671, 77.888681], to:[-7.502839, -46.000656]},
		{from:[36.200975, 127.319657], to:[37.884520, -97.680343]},
		{from:[47.421507, 2.163407], to:[21.484914, 59.468094]},
		{from:[53.872707, -2.406906], to:[44.666843, -121.586593]},
		{from:[19.412393, -100.141281], to:[-38.738931, 177.593094]},
		{from:[49.223111, 16.225907], to:[-35.944496, -59.711593]},
		{from:[11.619419, 80.190558], to:[38.625027, 102.514777]},
	]
	, scene2anim = {
		t:0,
		r:0
	}
	, headRot = { value:0 }

	function createTls(){

		//Section 0 timelines
		tlSection0
		.to([".curtain"], 0.1, {opacity:"0"})
		.to([".curtain"], 0.1, {display:"none"})
		.to(["#logo-circ","#logo-line"], 1, {strokeDashoffset:0})
		.to(["#logo-line"], 1, {strokeDashoffset:350})
		.to(["#logo-circ"], 1, {strokeDashoffset:320})
		.to(["#section0 .main-content"], 1, {opacity:1}, "showCanvas1")
		.to(["#section0 canvas"], 1, {opacity:1}, "showCanvas1")
		.to(["#scrTxt1"], 1, {opacity:1}, "unscramble")
		.add( function(){ scrambleText.play().start() }, "unscramble")
		.staggerFromTo(["#scrTxt2", "#scrTxt3"], 0.5, {
			left:-50
		},{
			left:0, opacity:1, ease:Back.easeOut
		}, 0.5, "showContent")
		.fromTo([".right-box"], 0.5, {
			left:50
		},{
			left:0, opacity:1, rotationY:360, ease:Back.easeOut
		}, "showContent")
		.staggerFromTo($(".contact-box .txtAnim").toArray(), 0.3, {
			left:50
		},{
			left:0, opacity:1, ease:Back.easeOut
		}, 0.2, "showContent+=0.3")
		.fromTo(".header svg", 0.3, {
			left:-200
		},{
			left:0, opacity:1, ease: Back.easeOut
		}, "showContent+=0.3")
		.staggerFromTo($(".header .txtAnim").toArray(), 0.7, {
			top:-50
		},{
			top:0, opacity:1, ease:Back.easeOut
		}, 0.3, "showContent+=0.3")
		.fromTo(".footer", 1, {
			bottom:-200,
			opacity:0
		},{
			bottom:-10,
			opacity:1,
			ease:Power4.easeOut
		}, "showContent+=0.5")

		TweenMax.to(".down-btn", 0.45, {
			top:"-=10",
			repeat:-1,
			yoyo:true,
			ease:Power4.easeOut
		})		    

		//Section 1 timelines
		tlSection1
		.fromTo("#section1 .page-title", 1, {
			left:-200,
			opacity:0
		},{
			left:50,
			opacity:1,
			ease: Back.easeOut
		}, "unscramble")
		.fromTo(["#scrTxt4"], 1, {
			opacity:0
		},{
			opacity:1
		}, "unscramble")
		.staggerFromTo($(".service-box").toArray(), 0.5, {
			opacity:0,
			left: 50
		},{
			opacity:1,
			left: 0
		}, 0.3, "unscramble")
		.to($(".service-box svg path")[0], 0.5, {
			strokeDashoffset: 435
		}, "unscramble+=0.4")
		.to($(".service-box svg path")[1], 0.5, {
			strokeDashoffset: 545
		}, "unscramble+=0.8")
		.to($(".service-box svg path")[2], 0.5, {
			strokeDashoffset: 700
		}, "unscramble+=1.2")
		.to($(".service-box svg path")[3], 0.5, {
			strokeDashoffset: 500
		}, "unscramble+=1.6")
		.to($(".service-box svg path")[4], 0.5, {
			strokeDashoffset: 550
		}, "unscramble+=0.4")
		.to($(".service-box svg path")[5], 0.5, {
			strokeDashoffset: 700
		}, "unscramble+=0.8")
		.to($(".service-box svg path")[6], 0.5, {
			strokeDashoffset: 600
		}, "unscramble+=1.2")
		.to($(".service-box svg path")[7], 0.5, {
			strokeDashoffset: 600
		}, "unscramble+=1.6")
		.to("#section1 .main-content", 0.1, {
			zIndex:1	
		})
		.stop()

		tlSection2
		.fromTo("#section2 .page-title", 1, {
			right:-200,
			opacity:0
		},{
			right:50,
			opacity:1,
			ease: Back.easeOut
		}, "unscramble")
		.fromTo("#section2 .canvas-ctn", 1, {
			left:"-50%",
			opacity:0
		},{
			left:0,
			opacity:1,
			// ease: Back.easeOut
		}, "unscramble+=0.3")
		.fromTo("#section2 .wrap", 1, {
			left:-50,
			opacity:0
		},{
			left:0,
			opacity:1,
			// ease: Back.easeOut
		}, "unscramble+=0.6")
		.stop()

		tlSection3
		.fromTo("#section3 .page-title", 1, {
			top:-700
		},{			
			top:50,
			ease: Back.easeOut
		}, "enter0")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:1000
		}, "enter0")
		.fromTo([$(".roadmap-svg text")[0], $(".roadmap-svg rect")[0]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter0+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:900
		}, "enter1")		
		.fromTo([$(".roadmap-svg text")[1], $(".roadmap-svg rect")[1]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter1+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:800
		}, "enter2")		
		.fromTo([$(".roadmap-svg text")[2], $(".roadmap-svg rect")[2]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter2+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:690
		}, "enter3")		
		.fromTo([$(".roadmap-svg text")[3], $(".roadmap-svg rect")[3]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter3+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:590
		}, "enter4")		
		.fromTo([$(".roadmap-svg text")[4], $(".roadmap-svg rect")[4]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter4+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:470
		}, "enter5")		
		.fromTo([$(".roadmap-svg text")[5], $(".roadmap-svg rect")[5]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter5+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:380
		}, "enter6")		
		.fromTo([$(".roadmap-svg text")[6], $(".roadmap-svg rect")[6]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter6+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:280
		}, "enter7")		
		.fromTo([$(".roadmap-svg text")[7], $(".roadmap-svg rect")[7]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter7+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:160
		}, "enter8")		
		.fromTo([$(".roadmap-svg text")[8], $(".roadmap-svg rect")[8]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter8+=0.1")
		.to("path.roadmap", 0.5, {
			strokeDashoffset:0
		}, "enter9")		
		.fromTo([$(".roadmap-svg text")[9], $(".roadmap-svg rect")[9]], 0.5, {
			opacity:0
		}, {			
			opacity:1
		}, "enter9+=0.1")
		.stop()
		// TweenMax.to("#section1 .page-title", 2, {
		// 	left:"+=100",
		// 	repeat:-1,
		// 	yoyo:true,
		// 	ease:Back.easeOut
		// })

		// TweenMax.to("#section2 .page-title", 2, {
		// 	right:"+=100",
		// 	repeat:-1,
		// 	yoyo:true,
		// 	ease:Back.easeOut
		// })
	}

	function initScene0(){

	    // Setup Renderer
	    renderer0.setClearColor( 0x010101 , 0.7 );
	    renderer0.setSize(width, height);
	    renderer0.domElement.style.opacity = 0;
	    renderer0.domElement.style.zIndex = -2;
	    renderer0.domElement.style.position = "absolute";
	    renderer0.domElement.style.top = 0;
	    renderer0.domElement.style.left = 0;
	    $("#section0 .main-content").append(renderer0.domElement);

	    // Setup Camera
	    camera0.position.z = 5000;

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
	    scene0.add(gridObject); 
	    
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

	    scene0.add(gridObject2);
	}

	function initScene1(){

	    // Setup Renderer
	    renderer1.setSize(width, height);
	    $("#section2 .canvas-ctn").append(renderer1.domElement);

	    // Setup Camera
	    camera1.position.z = 200;

    	earthGr.rotation.x = -0.05;
    	earthGr.position.y = -10;
    	earthGr.position.x = -75;
	    
		    // Create earth sphere and curves between cities
			loader.load( 'world.jpg', function ( texture ){
	        earthSphere = new THREE.Mesh( 
	        	new THREE.SphereGeometry(50,32,32), 
	        	new THREE.MeshBasicMaterial({map: texture, overdraw:0.5}) 
	    	);
		    earthGr.add(earthSphere);

		    curvesArr = getPathsAndAddCurves(50);
	    	scene1.add(earthGr);
		    console.log(curvesArr);
			})
	}

	function initScene2(){
		renderer2.setSize(width, height);
	    $("#section4 .canvas-ctn").append(renderer2.domElement);

	    // Setup Camera
	    camera2.position.z = 200;
	    // Setup Controls
	    // controls.enableDamping = true;
	    // controls.dampingFactor = 0.25;
	    // controls.enableZoom = true;
	    jsonLoader = new THREE.JSONLoader();
		jsonLoader.load( 'head2.json', function( geometry, materials ) {
		    bot = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffff00, wireframe: true, opacity:0.5, transparent:true}));    
		    // bot.position.y = -500;
		    bot.position.x = 0;
		    bot.position.y = 30;    
		    bot.scale.set(15,15,15);     
		    // bot.rotation.y = 100;
		    botGr.add( bot );
			tmpSphere = new THREE.Mesh( 
	        	new THREE.SphereGeometry(25,32,32), 
				new THREE.MeshBasicMaterial({color:0xffff00, wireframe: true, opacity:0.5, transparent:true})
	    	);
	    	// botGr.position.x = 70;
	    	// botGr.position.y = 30;
	    	// botGr.rotation.x = 0.1;
		    botGr.add( tmpSphere );
		});   

	    scene2.add(botGr);
	}

	function animateScene0(){
	    TweenLite.ticker.addEventListener("tick", renderScene0);	    
	    plusMeshArr.forEach(function(obj, i){
	        TweenMax.to(obj.position, 0.5, {delay:i*0.05, repeat:-1, repeatDelay:1, yoyo:true, y:"+=100",x:"+=10", ease:Linear.easeNone})
	    })

	    volMeshArr.forEach(function(obj, i){
	        TweenMax.to(obj.children[1].scale, 0.5, {delay:i*0.01, repeat:-1, repeatDelay:1, yoyo:true, y:"-=0.5",ease:Linear.easeNone})
	        TweenMax.to(obj.children[0].position, 0.5, {delay:i*0.02, repeat:-1, repeatDelay:1, yoyo:true, y:"-=100",ease:Linear.easeNone})
	        TweenMax.to(obj.children[1].position, 0.5, {delay:i*0.03, repeat:-1, repeatDelay:1, yoyo:true, y:"-=50",ease:Linear.easeNone})
	    })

	    TweenMax.fromTo(inc, 5, {value:300}, {value:1, repeat:-1, repeatDelay:1, yoyo:true, ease:Linear.easeNone})    
	    TweenMax.to(".ticker-contain", 10, {delay:1, x:-window.innerWidth, repeat:-1, repeatDelay:1, yoyo:true, ease:Linear.easeNone})
	    TweenMax.fromTo(camera0.rotation, 5, {x:0,y:0},{x:0.1,y:0.1, repeat:-1, yoyo:true, ease:Back.easeInOut})
	}	
	
	function stopScene0(){
	    TweenLite.ticker.removeEventListener("tick", renderScene0);
	}

	function renderScene0() {
	    meshLine.geometry.setDrawRange(0 , 2*inc.value);
	    if(typeof line.geometry._bufferGeometry !== "undefined"){
	      line.geometry._bufferGeometry.setDrawRange(0 , inc.value);
	      line2.geometry._bufferGeometry.setDrawRange(0 , inc.value);
	      line3.geometry._bufferGeometry.setDrawRange(0 , inc.value);
	      line4.geometry._bufferGeometry.setDrawRange(0 , inc.value);
	    }
	    renderer0.render(scene0, camera0);
	}

	function renderScene1() {
	    if(typeof earthGr !== "undefined"){
	    	earthGr.rotation.y = scene2anim.r;
		    for( var i = 0; i < curvesArr.length; i ++ ) {
	    		var movingGuy = curvesArr[i].pt;
			  	pt = curvesArr[i].curve.getPoint( scene2anim.t );
			  	movingGuy.position.set( pt.x, pt.y, pt.z );			   

			  	// var movingGuy2 = curvesArr[i].pt2;
			  	// pt2 = curvesArr[i].curve.getPoint( 1 - scene2anim.t );
			  	// movingGuy2.position.set( pt2.x, pt2.y, pt2.z );			   
			}
	    }
	    renderer1.render(scene1, camera1);
	}

	function renderScene2() {
	  //   if(typeof earthGr !== "undefined"){
	  //   	earthGr.rotation.y = scene2anim.r;
		 //    for( var i = 0; i < curvesArr.length; i ++ ) {
	  //   		var movingGuy = curvesArr[i].pt;
			//   	pt = curvesArr[i].curve.getPoint( scene2anim.t );
			//   	movingGuy.position.set( pt.x, pt.y, pt.z );			   

			//   	// var movingGuy2 = curvesArr[i].pt2;
			//   	// pt2 = curvesArr[i].curve.getPoint( 1 - scene2anim.t );
			//   	// movingGuy2.position.set( pt2.x, pt2.y, pt2.z );			   
			// }
	  //   }
	  	if(botGr.children.length > 0){
	  		botGr.children[0].rotation.y=headRot.value;
	  		// botGr.children[1].rotation.y+=0.02;
	  	}
	    renderer2.render(scene2, camera2);
	}
	
	function animateScene1(){
	    TweenLite.ticker.addEventListener("tick", renderScene1);
	    TweenMax.fromTo(scene2anim, 10, {r:0}, {r:Math.PI, repeat:-1, yoyo:true, repeatDelay:2, ease:Back.easeInOut})    
	    TweenMax.fromTo(scene2anim, 1, {t:0}, {t:1, repeat:-1, yoyo:true})    
	}
	
	function animateScene2(){
	    TweenLite.ticker.addEventListener("tick", renderScene2);
	    TweenMax.fromTo(headRot, 1, {value:0}, {value:Math.PI, repeat:-1, yoyo:true})    
	    // TweenMax.fromTo(scene2anim, 10, {r:0}, {r:Math.PI, repeat:-1, yoyo:true, repeatDelay:2, ease:Back.easeInOut})    
	}

	function stopScene1(){
	    TweenLite.ticker.removeEventListener("tick", renderScene1);
	}	

	function stopScene2(){
	    TweenLite.ticker.removeEventListener("tick", renderScene2);
	}
	
	function map( x,  in_min,  in_max,  out_min,  out_max){
	  	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	function getPathsAndAddCurves(radius){
		var retArr = [];

		latLngArr.forEach(function(obj){
		    var vF = lonLatToVector3(obj.from[0], obj.from[1], radius)
			, tmpColor = getRandomColor()
		    , point = new THREE.Mesh( 
	        	new THREE.SphereGeometry(1,0,1), 
	        	new THREE.MeshBasicMaterial({color: tmpColor, opacity:0.5, transparent:true}) 
	    	)
		    , vT = lonLatToVector3(obj.to[0], obj.to[1], radius)
	    	// , point2 = new THREE.Mesh( 
	     //    	new THREE.SphereGeometry(1,0,1), 
	     //    	new THREE.MeshBasicMaterial({color: tmpColor, wireframe: true, opacity:1, transparent:true}) 
	    	// )
			, dist = vF.distanceTo(vT)

			// here we are creating the control points for the first ones.
			// the 'c' in front stands for control.
			, cvT = vT.clone()
			, cvF = vF.clone()

			// then you get the half point of the vectors points.
			, xC = ( 0.5 * (vF.x + vT.x) )
			, yC = ( 0.5 * (vF.y + vT.y) )
			, zC = ( 0.5 * (vF.z + vT.z) )
			 
			// then we create a vector for the midpoints.
			, mid = new THREE.Vector3(xC, yC, zC)
			, smoothDist = map(dist, 0, 10, 0, 15/dist )
			, curve = new THREE.CubicBezierCurve3( vF, cvF, cvT, vT )
	    	, geometry2 = new THREE.Geometry()
	 		, material2 = new THREE.LineBasicMaterial( { color : tmpColor } )
	    	
	    	point.position.set(
	    		vF.x*1,
	    		vF.y*1,
	    		vF.z*1
	    	)

	    	// point2.position.set(
	    	// 	vT.x*1,
	    	// 	vT.y*1,
	    	// 	vT.z*1
	    	// )

			mid.setLength( 50 * smoothDist );
			 
			cvT.add(mid);
			cvF.add(mid);
			 
			cvT.setLength( 50 * smoothDist );
			cvF.setLength( 50 * smoothDist );

		    geometry2.vertices = curve.getPoints( 50 );	 
		    retArr.push({		    	
		    	pt: point,
		    	// pt2: point2,
		    	color: tmpColor,
		    	curve: curve
		    });
		    
		    // Create the final Object3d to add to the scene
		    var curveObject = new THREE.Line( geometry2, material2 );		    

		    earthGr.add(point)
		    // earthGr.add(point2)
		    earthGr.add(curveObject);
		})
	    
		loader.load( 'glo2.png', function ( texture ){
			retArr.forEach(function(obj){				
				var spriteMaterial = new THREE.SpriteMaterial({ 
					map: texture, 
					color: obj.color, 
					transparent: false, 
					blending: THREE.AdditiveBlending
				});
				var sprite = new THREE.Sprite( spriteMaterial );
				sprite.scale.set(5,5,5);

				// var sprite2 = new THREE.Sprite( spriteMaterial.clone() );
				// sprite2.scale.set(5,5,5);

				obj.pt.add(sprite);
				// obj.pt2.add(sprite2);
			})
	    })

		return retArr;
	}

    function lonLatToVector3( lat, lng, radius ){
		var phi   = (90-lat)*(Math.PI/180),
		theta = (lng+180)*(Math.PI/180),
		x = -((radius) * Math.sin(phi)*Math.cos(theta)),
		z = ((radius) * Math.sin(phi)*Math.sin(theta)),
		y = ((radius) * Math.cos(phi));

		return new THREE.Vector3(x,y,z);
	}

	function getRandomColor(){
		var r = getRandomInt(0, 255),
			g = getRandomInt(0, 255),
			b = getRandomInt(0, 255)
		return new THREE.Color("rgb(" + r +", " + g + "," + b + ")");
	} 

	function randomNum(min,max){
	    return Math.random()*(max-min+1)+min;
	}
	
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function onWindowResize() {
	    camera0.aspect = window.innerWidth / window.innerHeight;
	    camera0.updateProjectionMatrix();

	    renderer0.setSize( window.innerWidth, window.innerHeight );
	    renderScene0();

	    camera1.aspect = window.innerWidth / window.innerHeight;
	    camera1.updateProjectionMatrix();

	    renderer1.setSize( window.innerWidth, window.innerHeight );
	    renderScene1();

	    camera2.aspect = window.innerWidth / window.innerHeight;
	    camera2.updateProjectionMatrix();

	    renderer2.setSize( window.innerWidth, window.innerHeight );
	    renderScene2();
	}

	initScene0();
	renderScene0();
	// initScene1();
	// renderScene1();	
	// initScene2();
	// renderScene2();	
	// animateScene2();
	createTls();

	// Event Listeners
	$(".service-box").on("mouseenter", function(){
		TweenMax.to($(this).find("img"), 0.5, {rotationZ:360,scaleX:"-=0.1", scaleY:"-=0.1", boxShadow:"0px 0px 20px 5px rgba(0,0,0,1)"})
		TweenMax.to($(this).find("path"), 1, {strokeDashoffset:0})
	})

	$(".service-box").on("mouseleave", function(){
		TweenMax.to($(this).find("img"), 1, {rotationZ:0,scaleX:"+=0.1", scaleY:"+=0.1", boxShadow:"0px 0px 20px 5px rgba(0,0,0,0)",ease:Back.easeOut})
		if($(this).hasClass("sq1")){
			TweenMax.to($(this).find("path")[0], 0.5, {strokeDashoffset:435})
			TweenMax.to($(this).find("path")[1], 0.5, {strokeDashoffset:545})
		}
		else if($(this).hasClass("sq2")){
			TweenMax.to($(this).find("path")[0], 0.5, {strokeDashoffset:700})
			TweenMax.to($(this).find("path")[1], 0.5, {strokeDashoffset:500})
		}
		else if($(this).hasClass("sq3")){
			TweenMax.to($(this).find("path")[0], 0.5, {strokeDashoffset:550})
			TweenMax.to($(this).find("path")[1], 0.5, {strokeDashoffset:700})
		}
		else if($(this).hasClass("sq4")){
			TweenMax.to($(this).find("path"), 0.5, {strokeDashoffset:600})
		}
	})

    window.addEventListener( 'resize', onWindowResize, false );
});
