var ElementEditor = (function () {
    function ElementEditor() {
        this._ElementEditor = angular.module('ElementEditor', []);
        var scope = this;
        this._ElementEditor.controller("ElementEditorController", function () {
            var sc = this;
            sc.AddMesh = function () { scope.AddNewMesh(); };
        });
    }
    ElementEditor.prototype.AddNewMesh = function () {
        console.log('bebebe');
    };
    return ElementEditor;
}());
var _elementEditor = new ElementEditor();
