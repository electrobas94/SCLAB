
class RenderPreview
{
	 public _RenderEngineService: RenderEngineService;

	 public GetSceneObjectMap(): string
	 {
		  let mapFile = { objects: [], meshFiles:[]};
		  let objectString = this._RenderEngineService.EngineModules.ScenesModule.get_all_objects();

		  for (let i = 0; i < objectString.length; i++)
		  {
				mapFile.objects.push({ name: objectString[i].name, id: objectString[i].vj, tsr: this._RenderEngineService.EngineModules.TransformModule.get_tsr(objectString[i]) });
		  }

		  mapFile.meshFiles = this._RenderEngineService.MeshFileList;

		  console.log(mapFile);

		  return JSON.stringify(mapFile);
	 }

	 public UpdatePositionInScene(sceneMap: Array<any>, meshList: Array<any>)
	 {

		  this._RenderEngineService.EngineModules.DataModule.cleanup();

		  this.AppendElement(sceneMap, meshList);
	 }

	 public AppendElement(sceneMap: Array<any>, meshList: Array<any>)
	 {
		  this._RenderEngineService.LoadSceneList(meshList, UpdateTransform);

		  let _this = this;

		  function UpdateTransform() {
				var objList = _this._RenderEngineService.EngineModules.ScenesModule.get_all_objects();

				for (let i = 0; i < sceneMap.length; i++) {
					 for (let j = 0; j < sceneMap.length; j++)
						  if (objList[j].vj == sceneMap[i].id && objList[j].name != "Camera" ) {
								_this._RenderEngineService.EngineModules.TransformModule.set_tsr(objList[j], sceneMap[i].tsr);
								break;
						  }
				}
		  }
	 }

	 constructor() {
		  this._RenderEngineService = new RenderEngineService();
	 }
}