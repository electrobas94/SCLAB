class ToolEditorUI
{
	 public selectedElement: any;
	 public ElementList: Array<any>;
}

class ToolEditor
{
	 
	 public ng: ng.IModule;
	 public ui: ToolEditorUI; 
	 public _RenderPreview: RenderPreview;

	 private _HttpService: ng.IHttpService;
	 private _HttpParamSerializer: ng.IHttpParamSerializer;

	 public ElementsLoad(): void {
		  let _this = this;
		  if (_this._HttpService) {
				_this._HttpService.get("/ToolEditor/GetElementList").then(function (response: any) {
					 console.log(response.data);
					 _this.ui.ElementList = response.data;
				});
		  }

	 }

	 public AddElementInScene(): void
	 {
		  let _this = this;
		  _this._HttpService.get("/ElementEditor/GetElementById?id=" + _this.ui.selectedElement.Id).then(function (response) {
				_this.ui.selectedElement = response.data;

				if ( _this.ui.selectedElement.JsonMapScene != undefined) {
					 let tmp = JSON.parse(_this.ui.selectedElement.JsonMapScene);//.objects;
					 _this._RenderPreview.AppendElement(tmp.objects, tmp.meshFiles);
				}
		  });
	 }

	 constructor() {
		  this._RenderPreview = new RenderPreview();
		  this.ui = new ToolEditorUI();

		  let _this = this;
		  this.ng = angular.module('ToolEditor', ['angularFileUpload']);

		  _this.ng.controller("ToolEditorController", ['$scope', '$http', '$httpParamSerializer',
				function ($scope: any, $http: ng.IHttpService, $httpParamSerializer: ng.IHttpParamSerializer) {

					 // set def value
					 _this._HttpService = $http;
					 _this._HttpParamSerializer = $httpParamSerializer;

					 $scope.ui = _this.ui;

					 $scope.AddElementInScene = () => { _this.AddElementInScene(); };

					 setTimeout(() => { _this.ElementsLoad();   }, 600 );

				}]);

		  setTimeout(() => { document.getElementsByTagName('canvas')[0].addEventListener('drop', (event: any) => { alert('asdasd'); }) }, 700);

	 }
}

var toolEditor = new ToolEditor();