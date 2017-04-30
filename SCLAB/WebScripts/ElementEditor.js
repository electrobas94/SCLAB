var ElementEditor = (function () {
    function ElementEditor() {
        this._RenderPreview = new RenderPreview();
        this._MeshFileLoader = new MeshFileLoader(this._RenderPreview);
    }
    return ElementEditor;
}());
var _ElementEditor = new ElementEditor();
