class ElementEditor
{
	 public _RenderPreview: RenderPreview;
	 public _MeshFileLoader: MeshFileLoader;

	 constructor() {
		  this._RenderPreview = new RenderPreview();
		  this._MeshFileLoader = new MeshFileLoader(this._RenderPreview);
	 }
}

var _ElementEditor = new ElementEditor();