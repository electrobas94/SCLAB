class MeshFileLoaderUI
{
	 public showMeshUploadPanel: boolean;
	 public MeshList: Array<string>;

	 constructor()
	 {
		  this.MeshList = [];
		  this.showMeshUploadPanel = false;
	 }
}


class MeshFileLoader {

	 private _RenderPreview: RenderPreview;

	 private _MeshFileLoaderModule: angular.IModule;
	 private _FileUploader: any;
	 private _HttpService: ng.IHttpService;

	 private _MeshFileLoaderUI: MeshFileLoaderUI;


	 public StartUploading(): void
	 {
		  let _this = this;
		  _this._HttpService.get("/ElementEditor/UploadModelFilesStart").then(function (response) {
				_this._FileUploader.uploadAll();
		  });
		  
	 }

	 private CompleteUploadFiles(isSuccess: boolean): void
	 {
		  let _this = this;
		  this._HttpService.get("/ElementEditor/UploadModelFilesFinish?isSuccess=" + isSuccess).then((response: any) => {
				let str: string = response.data;

				if (str != "") {
					 let strList: string[] = str.split('/');
					 _this._MeshFileLoaderUI.MeshList.push(strList[strList.length - 1]);

					 _this._RenderPreview._RenderEngineService.appendMeshIn( str );
				}
		  });
	 }

	 constructor( renderPreview:RenderPreview)
	 {
		  this._RenderPreview = renderPreview;

		  let _this = this;
		  this._MeshFileLoaderModule = angular.module('ElementEditor', ['angularFileUpload']);

		  _this._MeshFileLoaderModule.controller("MeshLoaderController", ['$scope', '$http', 'FileUploader', function ($scope: any, $http: ng.IHttpService, FileUploader: any) {

				// set def value
				$scope.StartUploading = () => { _this.StartUploading() };
				_this._HttpService = $http;

				_this._MeshFileLoaderUI = new MeshFileLoaderUI();
				$scope.ui = _this._MeshFileLoaderUI;

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
				_this._FileUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {};
				_this._FileUploader.onAfterAddingFile = function (fileItem) {};
				_this._FileUploader.onAfterAddingAll = function (addedFileItems) {};
				_this._FileUploader.onBeforeUploadItem = function (item) {};
				_this._FileUploader.onProgressItem = function (fileItem, progress) {};
				_this._FileUploader.onProgressAll = function (progress) {};
				_this._FileUploader.onSuccessItem = function (fileItem, response, status, headers) {};
				_this._FileUploader.onErrorItem =  () => { _this.CompleteUploadFiles(false); };
				_this._FileUploader.onCancelItem = () => { _this.CompleteUploadFiles(false); };
				_this._FileUploader.onCompleteItem = function (fileItem, response, status, headers) { };

				_this._FileUploader.onCompleteAll = () => { _this.CompleteUploadFiles( true); };
				}]);
	 }
}