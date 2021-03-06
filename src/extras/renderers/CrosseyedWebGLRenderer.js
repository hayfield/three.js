/**
 * @author alteredq / http://alteredqualia.com/
 */

if ( THREE.WebGLRenderer ) {

	THREE.CrosseyedWebGLRenderer = function ( parameters ) {

		THREE.WebGLRenderer.call( this, parameters );

		this.autoClear = false;

		var _this = this, _setSize = this.setSize, _render = this.render;

		var _width, _height;
	
		var _cameraL = new THREE.Camera(), 
			_cameraR = new THREE.Camera();

		_this.separation = 10;
		if ( parameters && parameters.separation !== undefined ) _this.separation = parameters.separation;

		var SCREEN_WIDTH  = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;
		var HALF_WIDTH = SCREEN_WIDTH / 2;
	
		var _camera = new THREE.Camera( 53, HALF_WIDTH / SCREEN_HEIGHT, 1, 10000 );
		_camera.position.z = -10;
	

		this.setSize = function ( width, height ) {

			_setSize.call( _this, width, height );

			_width = width/2;
			_height = height;

		};

		this.render = function ( scene, camera, renderTarget, forceClear ) {
		
			this.clear();

			_cameraL.fov = camera.fov;
			_cameraL.aspect = 0.5 * camera.aspect;
			_cameraL.near = camera.near;
			_cameraL.far = camera.far;
			_cameraL.updateProjectionMatrix();
		
			_cameraL.position.copy( camera.position );
			_cameraL.target.position.copy( camera.target.position );
			_cameraL.translateX( _this.separation );

			_cameraR.projectionMatrix = _cameraL.projectionMatrix;

			_cameraR.position.copy( camera.position );
			_cameraR.target.position.copy( camera.target.position );
			_cameraR.translateX( - _this.separation );

			this.setViewport( 0, 0, _width, _height );
			_render.call( _this, scene, _cameraL );
		
			this.setViewport( _width, 0, _width, _height );
			_render.call( _this, scene, _cameraR, false );

		};

	};
	
}
