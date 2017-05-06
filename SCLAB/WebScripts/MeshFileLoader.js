var MeshFileLoaderUI = (function () {
    function MeshFileLoaderUI() {
        this.nameElement = "New element";
        this.descriptionElement = "Description is empty";
        this.SelectElem = null;
        this.MeshList = [];
        this.ElementList = [];
        this.showMeshUploadPanel = false;
        this.showLestElementPanel = true;
    }
    return MeshFileLoaderUI;
}());
var MeshFileLoader = (function () {
    function MeshFileLoader(renderPreview) {
        this.id = -1;
        this._RenderPreview = renderPreview;
        var _this = this;
        this._MeshFileLoaderModule = angular.module('ElementEditor', ['angularFileUpload']);
        _this._MeshFileLoaderModule.controller("MeshLoaderController", ['$scope', '$http', '$httpParamSerializer', 'FileUploader',
            function ($scope, $http, $httpParamSerializer, FileUploader) {
                // set def value
                $scope.RemoveElement = function () { _this.RemoveElement(); };
                $scope.SetActiveTool = function (tool) { _this._RenderPreview._RenderEngineService.ActiveTool = tool; };
                $scope.SetActiveAxis = function (axis) { _this._RenderPreview.SetActiveAxis(axis); };
                $scope.StartUploading = function () { _this.StartUploading(); };
                $scope.ElementSave = function () { _this.ElementSave(); };
                $scope.ElementOpen = function () { _this.ElementOpen(); };
                _this._HttpService = $http;
                _this._HttpParamSerializer = $httpParamSerializer;
                _this.ui = new MeshFileLoaderUI();
                $scope.ui = _this.ui;
                //_this.ui.MeshList = _this._RenderPreview._RenderEngineService.MeshFileList;
                _this._FileUploader = $scope.uploader = new FileUploader({ url: '/ElementEditor/UploadModelFile' });
                // a sync filter
                _this._FileUploader.filters.push({
                    name: 'syncFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        return this.queue.length < 10;
                    }
                });
                // an async filter
                _this._FileUploader.filters.push({
                    name: 'asyncFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                        setTimeout(deferred.resolve, 1e3);
                    }
                });
                // CALLBACKS
                _this._FileUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) { };
                _this._FileUploader.onAfterAddingFile = function (fileItem) { };
                _this._FileUploader.onAfterAddingAll = function (addedFileItems) { };
                _this._FileUploader.onBeforeUploadItem = function (item) { };
                _this._FileUploader.onProgressItem = function (fileItem, progress) { };
                _this._FileUploader.onProgressAll = function (progress) { };
                _this._FileUploader.onSuccessItem = function (fileItem, response, status, headers) { };
                _this._FileUploader.onErrorItem = function () { _this.CompleteUploadFiles(false); };
                _this._FileUploader.onCancelItem = function () { _this.CompleteUploadFiles(false); };
                _this._FileUploader.onCompleteItem = function (fileItem, response, status, headers) { };
                _this._FileUploader.onCompleteAll = function () { _this.CompleteUploadFiles(true); };
            }]);
        setTimeout(function () { _this.ElementsLoad(); }, 200);
    }
    MeshFileLoader.prototype.ElementOpen = function () {
        this.ui.MeshList.length = 0;
        var _this = this;
        _this._HttpService.get("/ElementEditor/GetElementById?id=" + _this.ui.SelectElem.Id).then(function (response) {
            _this.ui.SelectElem = response.data;
            _this.id = _this.ui.SelectElem.Id;
            _this.ui.nameElement = _this.ui.SelectElem.Name;
            if (_this.ui.SelectElem.JsonMapScene != undefined) {
                var tmp = JSON.parse(_this.ui.SelectElem.JsonMapScene); //.objects;
                _this._RenderPreview.UpdatePositionInScene(tmp.objects, tmp.meshFiles);
                for (var i = 0; i < tmp.meshFiles.length; i++) {
                    var tmpStr = tmp.meshFiles[i].split("/");
                    _this.ui.MeshList.push(tmpStr[tmpStr.length - 1]);
                }
            }
        });
    };
    MeshFileLoader.prototype.RemoveElement = function () {
        var _this = this;
        _this._HttpService.get("/ElementEditor/RemoveElementById?id=" + _this.ui.SelectElem.Id).then(function (response) {
            _this.ui.SelectElem = null;
            _this.ElementsLoad();
        });
    };
    MeshFileLoader.prototype.StartUploading = function () {
        var _this = this;
        _this._HttpService.get("/ElementEditor/UploadModelFilesStart").then(function (response) {
            _this._FileUploader.uploadAll();
        });
    };
    MeshFileLoader.prototype.ElementsLoad = function () {
        var _this = this;
        if (_this._HttpService) {
            _this._HttpService.get("/ElementEditor/GetElementList").then(function (response) {
                console.log(response.data);
                _this.ui.ElementList = response.data;
            });
        }
    };
    // If element = new elem id -> -1
    // After save server return new id
    MeshFileLoader.prototype.ElementSave = function () {
        var _this = this;
        //{ 'data': JSON.stringify({ id: 0, sceneMap: "asdasd" }) }
        //$httpParamSerializer({param:val,secondParam:secondVal})
        this._HttpService.post("/ElementEditor/ElementSave?", JSON.stringify({
            id: _this.id, name: _this.ui.nameElement,
            description: _this.ui.descriptionElement,
            sceneMap: _this._RenderPreview.GetSceneObjectMap()
        }))
            .then(function (response) {
            if (response.data)
                _this.id = parseInt(response.data);
        });
        this.ElementsLoad();
    };
    MeshFileLoader.prototype.CompleteUploadFiles = function (isSuccess) {
        var _this = this;
        this._HttpService.get("/ElementEditor/UploadModelFilesFinish?isSuccess=" + isSuccess).then(function (response) {
            var str = response.data;
            if (str != "") {
                var strList = str.split('/');
                _this.ui.MeshList.push(strList[strList.length - 1]);
                _this._RenderPreview._RenderEngineService.appendMeshIn(str);
            }
        });
    };
    return MeshFileLoader;
}());
//# sourceMappingURL=MeshFileLoader.js.map