var ToolEditorUI = (function () {
    function ToolEditorUI() {
    }
    return ToolEditorUI;
}());
var ToolEditor = (function () {
    function ToolEditor() {
        this.SceneElements = [];
        this._RenderPreview = new RenderPreview();
        this.ui = new ToolEditorUI();
        var _this = this;
        this.ng = angular.module('ToolEditor', ['angularFileUpload']);
        _this.ng.controller("ToolEditorController", ['$scope', '$http', '$httpParamSerializer',
            function ($scope, $http, $httpParamSerializer) {
                // set def value
                _this._HttpService = $http;
                _this._HttpParamSerializer = $httpParamSerializer;
                $scope.ui = _this.ui;
                $scope.SetActiveTool = function (tool) { _this._RenderPreview._RenderEngineService.ActiveTool = tool; };
                $scope.SetActiveAxis = function (axis) { _this._RenderPreview.SetActiveAxis(axis); };
                $scope.AddElementInScene = function () { _this.AddElementInScene(); };
                setTimeout(function () { _this.ElementsLoad(); }, 600);
            }]);
        //setTimeout(() => { document.getElementsByTagName('canvas')[0].addEventListener('drop', (event: any) => { alert('asdasd'); }) }, 700);
    }
    ToolEditor.prototype.ElementsLoad = function () {
        var _this = this;
        if (_this._HttpService) {
            _this._HttpService.get("/ToolEditor/GetElementList").then(function (response) {
                console.log(response.data);
                _this.ui.ElementList = response.data;
            });
        }
    };
    ToolEditor.prototype.AddElementId = function (elemId) {
        var objectList = this._RenderPreview._RenderEngineService.EngineModules.ScenesModule.get_all_objects("MESH");
        //let parentObject: any = null;
        for (var i = 0; i < objectList.length; i++) {
            //console.log("elemid", objectList[i].elementId);
            if (typeof objectList[i].elementId == "undefined" && this._RenderPreview._RenderEngineService.EngineModules.ObjectsModule.is_dynamic(objectList[i])) {
                //console.log(objectList[i]);
                objectList[i].elementId = elemId;
                // if (parentObject == null)
                // parentObject = objectList[i];
                //else
                // objectList[i].parent = objectList[i];
            }
        }
    };
    ToolEditor.prototype.AddElementInScene = function () {
        var _this = this;
        _this._HttpService.get("/ElementEditor/GetElementById?id=" + _this.ui.selectedElement.Id).then(function (response) {
            _this.ui.selectedElement = response.data;
            if (_this.ui.selectedElement.JsonMapScene != undefined) {
                _this.SceneElements.push(_this.ui.selectedElement);
                var tmp = JSON.parse(_this.ui.selectedElement.JsonMapScene); //.objects;
                _this._RenderPreview.AppendElement(tmp.objects, tmp.meshFiles, "elementId", _this.SceneElements.length);
                //setTimeout(() => { _this.AddElementId(_this.SceneElements.length)}, 1000);
            }
        });
    };
    return ToolEditor;
}());
var toolEditor = new ToolEditor();
