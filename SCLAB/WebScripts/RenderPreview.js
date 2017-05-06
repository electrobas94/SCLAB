var RenderPreview = (function () {
    function RenderPreview() {
        this._RenderEngineService = new RenderEngineService();
    }
    RenderPreview.prototype.SetActiveAxis = function (axis) {
        if (axis == 0) {
            this._RenderEngineService.ActiveAxis[0] = false;
            this._RenderEngineService.ActiveAxis[1] = false;
            this._RenderEngineService.ActiveAxis[2] = false;
        }
        else
            this._RenderEngineService.ActiveAxis[axis - 1] = true; // this._RenderEngineService.ActiveAxis[axis - 1] ? false : true;
    };
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
        this._RenderEngineService.MeshFileList.length = 0;
        this.AppendElement(sceneMap, meshList);
    };
    RenderPreview.prototype.AppendElement = function (sceneMap, meshList, field, fieldValue) {
        if (field === void 0) { field = "emptyField"; }
        if (fieldValue === void 0) { fieldValue = 0; }
        this._RenderEngineService.LoadSceneList(meshList, UpdateTransform);
        var _this = this;
        function UpdateTransform() {
            var objList = _this._RenderEngineService.EngineModules.ScenesModule.get_all_objects("MESH");
            //console.log(objList);
            for (var i = 0; i < sceneMap.length; i++) {
                for (var j = 0; j < objList.length; j++)
                    if (typeof objList[j] != "undefined") {
                        if (objList[j].vj == sceneMap[i].id && objList[j].name != "Camera" && typeof objList[j].elementId == "undefined" &&
                            _this._RenderEngineService.EngineModules.ObjectsModule.is_dynamic(objList[j])) {
                            //console.log(objList[j]);
                            _this._RenderEngineService.EngineModules.TransformModule.set_tsr(objList[j], sceneMap[i].tsr);
                            objList[j][field] = fieldValue;
                            break;
                        }
                    }
            }
        }
    };
    return RenderPreview;
}());
//# sourceMappingURL=RenderPreview.js.map