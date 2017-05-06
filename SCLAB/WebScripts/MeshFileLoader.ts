class MeshFileLoaderUI
{
	 public nameElement = "New element";
	 public descriptionElement = "Description is empty";
	 public showMeshUploadPanel: boolean;
	 public showLestElementPanel: boolean;
	 public MeshList: Array<string>;
	 public ElementList: Array<string>;
	 public SelectElem: any;

	 constructor()
	 {
		  this.SelectElem = null;
		  this.MeshList = [];
		  this.ElementList = [];
		  this.showMeshUploadPanel = false;
		  this.showLestElementPanel = true;
	 }
}


class MeshFileLoader {

	 private id = -1;
	 private _RenderPreview: RenderPreview;

	 private _MeshFileLoaderModule: angular.IModule;
	 private _FileUploader: any;
	 private _HttpService: ng.IHttpService;
	 private _HttpParamSerializer: ng.IHttpParamSerializer;

	 private ui: MeshFileLoaderUI;

	 public ElementOpen()
	 {
		  this.ui.MeshList.length = 0;
		  let _this = this;
		  _this._HttpService.get("/ElementEditor/GetElementById?id=" + _this.ui.SelectElem.Id).then(function (response) {
				_this.ui.SelectElem = response.data;

				_this.id = _this.ui.SelectElem.Id;
				_this.ui.nameElement = _this.ui.SelectElem.Name;

				if (_this.ui.SelectElem.JsonMapScene != undefined)
				{
					 let tmp = JSON.parse(_this.ui.SelectElem.JsonMapScene);//.objects;
					 _this._RenderPreview.UpdatePositionInScene(tmp.objects, tmp.meshFiles);
					 for (let i = 0; i < tmp.meshFiles.length; i++) {
						  let tmpStr = tmp.meshFiles[i].split("/");
						  _this.ui.MeshList.push(tmpStr[tmpStr.length -1]);
					 }
				}
		  });
	 }

	 public RemoveElement()
	 {
		  let _this = this;
		  _this._HttpService.get("/ElementEditor/RemoveElementById?id=" + _this.ui.SelectElem.Id).then(function (response) {
				_this.ui.SelectElem = null;
				_this.ElementsLoad();
		  });
	 }

	 public StartUploading(): void
	 {
		  let _this = this;
		  _this._HttpService.get("/ElementEditor/UploadModelFilesStart").then(function (response) {
				_this._FileUploader.uploadAll();
		  });
		  
	 }

	 public ElementsLoad(): void {
		  let _this = this;
		  if (_this._HttpService) {
				_this._HttpService.get("/ElementEditor/GetElementList").then(function (response: any) {
					 console.log(response.data);
					 _this.ui.ElementList = response.data;
				});
		  }

	 }

	 // If element = new elem id -> -1
	 // After save server return new id
	 public ElementSave()
	 {
		  let _this = this;
		  //{ 'data': JSON.stringify({ id: 0, sceneMap: "asdasd" }) }
		  //$httpParamSerializer({param:val,secondParam:secondVal})
		  this._HttpService.post("/ElementEditor/ElementSave?",
				JSON.stringify({
					 id: _this.id, name: _this.ui.nameElement,
					 description: _this.ui.descriptionElement,
					 sceneMap: _this._RenderPreview.GetSceneObjectMap()
		  }))
				.then((response: any) => {
					 if (response.data)
						  _this.id = parseInt( response.data );
				});
		  this.ElementsLoad();
	 }

	 private CompleteUploadFiles(isSuccess: boolean): void
	 {
		  let _this = this;
		  this._HttpService.get("/ElementEditor/UploadModelFilesFinish?isSuccess=" + isSuccess).then((response: any) => {
				let str: string = response.data;

				if (str != "") {
					 let strList: string[] = str.split('/');
					 _this.ui.MeshList.push(strList[strList.length - 1]);

					 _this._RenderPreview._RenderEngineService.appendMeshIn( str );
				}
		  });
	 }

	 constructor(renderPreview: RenderPreview) {

		  this._RenderPreview = renderPreview;
		  

		  let _this = this;
		  this._MeshFileLoaderModule = angular.module('ElementEditor', ['angularFileUpload']);

		  _this._MeshFileLoaderModule.controller("MeshLoaderController", ['$scope', '$http', '$httpParamSerializer', 'FileUploader',
				function ($scope: any, $http: ng.IHttpService, $httpParamSerializer: ng.IHttpParamSerializer, FileUploader: any) {

					 // set def value
					 $scope.RemoveElement = () => { _this.RemoveElement() };
					 $scope.SetActiveTool = (tool: number) => { _this._RenderPreview._RenderEngineService.ActiveTool = tool; };
					 $scope.SetActiveAxis = (axis: number) => { _this._RenderPreview.SetActiveAxis(axis) };
					 $scope.StartUploading = () => { _this.StartUploading() };
					 $scope.ElementSave = () => { _this.ElementSave(); };
					 $scope.ElementOpen = () => { _this.ElementOpen(); };
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
					 _this._FileUploader.onErrorItem = () => { _this.CompleteUploadFiles(false); };
					 _this._FileUploader.onCancelItem = () => { _this.CompleteUploadFiles(false); };
					 _this._FileUploader.onCompleteItem = function (fileItem, response, status, headers) { };

					 _this._FileUploader.onCompleteAll = () => { _this.CompleteUploadFiles(true); };
				}]);

		  

		  setTimeout(() => { _this.ElementsLoad() }, 200 );
	 }
}