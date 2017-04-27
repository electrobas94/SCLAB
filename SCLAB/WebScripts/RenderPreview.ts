
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

	 constructor() {
		  this._RenderEngineService = new RenderEngineService();
	 }
}