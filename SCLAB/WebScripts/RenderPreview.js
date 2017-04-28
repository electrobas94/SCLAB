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
    RenderPreview.prototype.UpdatePositionInScene = function (sceneMap, meshList) {
        this._RenderEngineService.EngineModules.DataModule.cleanup();
        this._RenderEngineService.LoadSceneList(meshList, UpdateTransform);
        var _this = this;
        function UpdateTransform() {
            var objList = _this._RenderEngineService.EngineModules.ScenesModule.get_all_objects();
            for (var i = 0; i < sceneMap.length; i++) {
                for (var j = 0; j < sceneMap.length; j++)
                    if (objList[j].vj == sceneMap[i].id) {
                        _this._RenderEngineService.EngineModules.TransformModule.set_tsr(objList[j], sceneMap[i].tsr);
                        break;
                    }
            }
        }
    };
    return RenderPreview;
}());
//# sourceMappingURL=RenderPreview.js.map