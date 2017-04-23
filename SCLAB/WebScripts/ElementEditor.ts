
class ElementEditor
{
	 private _ElementEditor: ng.IModule;

	 private AddNewMesh(): void
	 {
		  console.log('bebebe');
	 }

	 constructor()
	 {
		  this._ElementEditor = angular.module('ElementEditor', []);

		  let scope = this;

		  this._ElementEditor.controller("ElementEditorController", function ()
		  {
				let sc = this;
				sc.AddMesh = () => { scope.AddNewMesh() };
		  });
	 }
}

var _elementEditor = new ElementEditor();