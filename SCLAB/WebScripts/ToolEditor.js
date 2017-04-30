var ToolEditorUI = (function () {
    function ToolEditorUI() {
    }
    return ToolEditorUI;
}());
var ToolEditor = (function () {
    function ToolEditor() {
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
                $scope.AddElementInScene = function () { _this.AddElementInScene(); };
                setTimeout(function () { _this.ElementsLoad(); }, 600);
            }]);
        setTimeout(function () { document.getElementsByTagName('canvas')[0].addEventListener('drop', function (event) { alert('asdasd'); }); }, 700);
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
    ToolEditor.prototype.AddElementInScene = function () {
        var _this = this;
        _this._HttpService.get("/ElementEditor/GetElementById?id=" + _this.ui.selectedElement.Id).then(function (response) {
            _this.ui.selectedElement = response.data;
            if (_this.ui.selectedElement.JsonMapScene != undefined) {
                var tmp = JSON.parse(_this.ui.selectedElement.JsonMapScene); //.objects;
                _this._RenderPreview.AppendElement(tmp.objects, tmp.meshFiles);
            }
        });
    };
    return ToolEditor;
}());
var toolEditor = new ToolEditor();
