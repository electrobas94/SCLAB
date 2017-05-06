class ToolEditorUI
{
	 public selectedElement: any;
	 public ElementList: Array<any>;
}

class ToolEditor
{
	 public SceneElements: Array<any> =[];
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

	 public AddElementId(elemId: number)
	 {
		  let objectList: Array<any> = this._RenderPreview._RenderEngineService.EngineModules.ScenesModule.get_all_objects("MESH");
		  let parentObject: any = null;

		  for (let i = 0; i < objectList.length; i++)
		  {
				//console.log("elemid", objectList[i].elementId);
				if (typeof objectList[i].elementId == "undefined" && this._RenderPreview._RenderEngineService.EngineModules.ObjectsModule.is_dynamic(objectList[i]))
				{
					 //console.log(objectList[i]);
					 objectList[i].elementId = elemId;

					if (parentObject == null)
						  parentObject = objectList[i];
					 else
						 objectList[i].parent = objectList[i];
				}
		  }
	 }

	 public AddElementInScene(): void
	 {
		  let _this = this;
		  _this._HttpService.get("/ElementEditor/GetElementById?id=" + _this.ui.selectedElement.Id).then(function (response) {
				_this.ui.selectedElement = response.data;

				if (_this.ui.selectedElement.JsonMapScene != undefined)
				{
					 _this.SceneElements.push(_this.ui.selectedElement);
					 let tmp = JSON.parse(_this.ui.selectedElement.JsonMapScene);//.objects;

					 _this._RenderPreview.AppendElement(tmp.objects, tmp.meshFiles, "elementId", _this.SceneElements.length);

					 //setTimeout(() => { _this.AddElementId(_this.SceneElements.length)}, 1000);
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
					 $scope.SetActiveTool = (tool: number) => { _this._RenderPreview._RenderEngineService.ActiveTool = tool; };
					 $scope.SetActiveAxis = (axis: number) => { _this._RenderPreview.SetActiveAxis(axis) };

					 $scope.AddElementInScene = () => { _this.AddElementInScene(); };

					 setTimeout(() => { _this.ElementsLoad();   }, 600 );

				}]);

		  //setTimeout(() => { document.getElementsByTagName('canvas')[0].addEventListener('drop', (event: any) => { alert('asdasd'); }) }, 700);

	 }
}

var toolEditor = new ToolEditor();