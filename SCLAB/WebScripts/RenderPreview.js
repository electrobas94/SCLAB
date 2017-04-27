var RenderPreview = (function () {
    function RenderPreview() {
        this._RenderEngineService = new RenderEngineService();
    }
    RenderPreview.prototype.GetSceneObjectMap = function () {
        var mapFile = { objects: [], meshFiles: [] };
        var objectString = this._RenderEngineService.EngineModules.ScenesModule.get_all_objects();
        for (var i = 0; i < objectString.length; i++) {
            mapFile.objects.push({ name: objectString[i].name, id: objectString[i].vj, tsr: this._RenderEngineService.EngineModules.TransformModule.get_tsr(objectString[i]) });
        }
        mapFile.meshFiles = this._RenderEngineService.MeshFileList;
        console.log(mapFile);
        return JSON.stringify(mapFile);
    };
    return RenderPreview;
}());
//# sourceMappingURL=RenderPreview.js.map