
class RenderPreview
{
	 public _RenderEngineService: RenderEngineService;

	 public SetActiveAxis(axis: number): void
	 {
		  if (axis == 0) {
				this._RenderEngineService.ActiveAxis[0] = false;
				this._RenderEngineService.ActiveAxis[1] = false;
				this._RenderEngineService.ActiveAxis[2] = false;
		  }
		  else
				this._RenderEngineService.ActiveAxis[axis - 1] = true;// this._RenderEngineService.ActiveAxis[axis - 1] ? false : true;
	 }

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
		  this._RenderEngineService.MeshFileList.length = 0;

		  this.AppendElement(sceneMap, meshList);
	 }

	 public AppendElement(sceneMap: Array<any>, meshList: Array<any>, field: string="emptyField", fieldValue: number=0)
	 {
		  this._RenderEngineService.LoadSceneList(meshList, UpdateTransform);

		  let _this = this;

		  function UpdateTransform() {
				var objList = _this._RenderEngineService.EngineModules.ScenesModule.get_all_objects("MESH");
				//console.log(objList);

				for (let i = 0; i < sceneMap.length; i++) {
					 for (let j = 0; j < objList.length; j++)
						  if (typeof objList[j] != "undefined"){
									
									 if (objList[j].vj == sceneMap[i].id && objList[j].name != "Camera" && typeof objList[j].elementId == "undefined" &&
										  _this._RenderEngineService.EngineModules.ObjectsModule.is_dynamic(objList[j]))
									 {
										  //console.log(objList[j]);
										  _this._RenderEngineService.EngineModules.TransformModule.set_tsr(objList[j], sceneMap[i].tsr);
										  objList[j][field] = fieldValue;
										  break;
									 }
								}
				}
		  }
	 }

	 constructor() {
		  this._RenderEngineService = new RenderEngineService();
	 }
}