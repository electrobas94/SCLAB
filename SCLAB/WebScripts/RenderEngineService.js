var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
var MathModule = (function () {
    function MathModule() {
    }
    return MathModule;
}());
var PreloadModule = (function () {
    function PreloadModule() {
    }
    return PreloadModule;
}());
var ContainerModule = (function () {
    function ContainerModule() {
    }
    return ContainerModule;
}());
var DataModule = (function () {
    function DataModule() {
    }
    return DataModule;
}());
var CameraModule = (function () {
    function CameraModule() {
    }
    return CameraModule;
}());
var ScenesModule = (function () {
    function ScenesModule() {
    }
    return ScenesModule;
}());
var TransformModule = (function () {
    function TransformModule() {
    }
    return TransformModule;
}());
var MouseModule = (function () {
    function MouseModule() {
    }
    return MouseModule;
}());
var ObjectsModule = (function () {
    function ObjectsModule() {
    }
    return ObjectsModule;
}());
var ControlsModule = (function () {
    function ControlsModule() {
    }
    return ControlsModule;
}());
var PhysicsModule = (function () {
    function PhysicsModule() {
    }
    return PhysicsModule;
}());
var UtilitesModule = (function () {
    function UtilitesModule() {
    }
    return UtilitesModule;
}());
var QuaternionModule = (function () {
    function QuaternionModule() {
    }
    return QuaternionModule;
}());
var B4WModule = (function () {
    function B4WModule() {
    }
    return B4WModule;
}());
var RenderEngineService = (function () {
    function RenderEngineService() {
        this.MeshFileList = [];
        this.canvasId = "CanvasElementEditor";
        var _this = this;
        _this.EngineModules = new B4WModule();
        b4w.register("EngineB4W", function (exports, require) {
            _this.EngineModules.AppModule = require("app");
            _this.EngineModules.CameraModule = require("camera");
            _this.EngineModules.ContainerModule = require("container");
            _this.EngineModules.ControlsModule = require("controls");
            _this.EngineModules.DataModule = require("data");
            _this.EngineModules.MouseModule = require("mouse");
            _this.EngineModules.MathModule = require("math");
            _this.EngineModules.ObjectsModule = require("objects");
            _this.EngineModules.PhysicsModule = require("physics");
            _this.EngineModules.PreloadModule = require("preloader");
            _this.EngineModules.ScenesModule = require("scenes");
            _this.EngineModules.TransformModule = require("transform");
            _this.EngineModules.UtilitesModule = require("util");
            _this.EngineModules.QuaternionModule = require("quat");
            console.log(_this.EngineModules.AppModule);
            console.log(require("app"));
            console.log(b4w.require("app"));
            var OUTLINE_COLOR_VALID = [0, 1, 0];
            var OUTLINE_COLOR_ERROR = [1, 0, 0];
            var FLOOR_PLANE_NORMAL = [0, 1, 0];
            var ROT_ANGLE = Math.PI / 4;
            var WALL_X_MAX = 4;
            var WALL_X_MIN = -3.8;
            var WALL_Z_MAX = 4.2;
            var WALL_Z_MIN = -3.5;
            var _obj_delta_xy = new Float32Array(2);
            var spawner_pos = new Float32Array(3);
            var _vec3_tmp = new Float32Array(3);
            var _vec3_tmp2 = new Float32Array(3);
            var _vec3_tmp3 = new Float32Array(3);
            var _vec4_tmp = new Float32Array(4);
            var _pline_tmp = _this.EngineModules.MathModule.create_pline();
            var _drag_mode = false;
            var _enable_camera_controls = true;
            var _selected_obj = null;
            exports.init = function () {
                _this.EngineModules.AppModule.init({
                    canvas_container_id: _this.canvasId,
                    callback: init_cb,
                    physics_enabled: true,
                    alpha: false,
                    background_color: [0.5, 0.5, 0.5, 0.0]
                });
            };
            function init_cb(canvas_elem, success) {
                if (!success) {
                    console.log("b4w init failure");
                    return;
                }
                _this.EngineModules.PreloadModule.create_preloader();
                canvas_elem.addEventListener("mousedown", main_canvas_down);
                canvas_elem.addEventListener("touchstart", main_canvas_down);
                canvas_elem.addEventListener("mouseup", main_canvas_up);
                canvas_elem.addEventListener("touchend", main_canvas_up);
                canvas_elem.addEventListener("mousemove", main_canvas_move);
                canvas_elem.addEventListener("touchmove", main_canvas_move);
                window.onresize = _this.EngineModules.ContainerModule.resize_to_container;
                _this.EngineModules.ContainerModule.resize_to_container();
                load();
            }
            function preloader_cb(percentage) {
                _this.EngineModules.PreloadModule.update_preloader(percentage);
            }
            function load() {
                _this.EngineModules.DataModule.load("/UsersData/Models3d/SystemFiles/defaultScene.json", load_cb, preloader_cb);
            }
            function load_cb(data_id) {
                _this.EngineModules.AppModule.enable_camera_controls(false, false, false, _this.EngineModules.ContainerModule.get_canvas());
                init_controls();
                //var spawner = _this.EngineModules.ScenesModule.get_object_by_name("spawner");
                //_this.EngineModules.TransformModule.get_translation(spawner, spawner_pos);
            }
            function init_controls() {
                _this.getCanvasPosition();
            }
            function loaded_cb(data_id) {
            }
            function logic_func(s) {
                return s[1];
            }
            function main_canvas_down(e) {
                _drag_mode = true;
                if (e.preventDefault)
                    e.preventDefault();
                var x = _this.EngineModules.MouseModule.get_coords_x(e) - _this.canvasPositionX;
                var y = _this.EngineModules.MouseModule.get_coords_y(e) - (_this.canvasPositionY - window.pageYOffset);
                var obj = _this.EngineModules.ScenesModule.pick_object(x, y);
                // handling outline effect
                if (_selected_obj != obj) {
                    if (_selected_obj)
                        _this.EngineModules.ScenesModule.clear_outline_anim(_selected_obj);
                    if (obj)
                        _this.EngineModules.ScenesModule.apply_outline_anim(obj, 1, 1, 0);
                    _selected_obj = obj;
                }
                // calculate delta in viewport coordinates
                if (_selected_obj) {
                    var cam = _this.EngineModules.ScenesModule.get_active_camera();
                    var obj_parent = _this.EngineModules.ObjectsModule.get_parent(_selected_obj);
                    if (obj_parent)
                        // get translation from the parent (armature) of the animated object
                        _this.EngineModules.TransformModule.get_translation(obj_parent, _vec3_tmp);
                    else
                        _this.EngineModules.TransformModule.get_translation(_selected_obj, _vec3_tmp);
                    _this.EngineModules.CameraModule.project_point(cam, _vec3_tmp, _obj_delta_xy);
                    _obj_delta_xy[0] = x - _obj_delta_xy[0];
                    _obj_delta_xy[1] = y - _obj_delta_xy[1];
                }
            }
            function main_canvas_up(e) {
                _drag_mode = false;
                // enable camera controls after releasing the object
                if (!_enable_camera_controls) {
                    _this.EngineModules.AppModule.enable_camera_controls();
                    _enable_camera_controls = true;
                }
            }
            function main_canvas_move(e) {
                if (_drag_mode)
                    if (_selected_obj) {
                        // disable camera controls while moving the object
                        if (_enable_camera_controls) {
                            _this.EngineModules.AppModule.disable_camera_controls();
                            _enable_camera_controls = false;
                        }
                        // calculate viewport coordinates
                        var cam = _this.EngineModules.ScenesModule.get_active_camera();
                        var x = _this.EngineModules.MouseModule.get_coords_x(e) - _this.canvasPositionX;
                        var y = _this.EngineModules.MouseModule.get_coords_y(e) - (_this.canvasPositionY - window.pageYOffset);
                        if (x >= 0 && y >= 0) {
                            x -= _obj_delta_xy[0];
                            y -= _obj_delta_xy[1];
                            // emit ray from the camera
                            var pline = _this.EngineModules.CameraModule.calc_ray(cam, x, y, _pline_tmp);
                            var camera_ray = _this.EngineModules.MathModule.get_pline_directional_vec(pline, _vec3_tmp);
                            // calculate ray/floor_plane intersection point
                            var cam_trans = _this.EngineModules.TransformModule.get_translation(cam, _vec3_tmp2);
                            _this.EngineModules.MathModule.set_pline_initial_point(_pline_tmp, cam_trans);
                            _this.EngineModules.MathModule.set_pline_directional_vec(_pline_tmp, camera_ray);
                            var point = _this.EngineModules.MathModule.line_plane_intersect(FLOOR_PLANE_NORMAL, 0, _pline_tmp, _vec3_tmp3);
                            // do not process the parallel case and intersections behind the camera
                            //if (point && camera_ray[1] < 0) {
                            var obj_parent = _this.EngineModules.ObjectsModule.get_parent(_selected_obj);
                            if (obj_parent && _this.EngineModules.ObjectsModule.is_armature(obj_parent))
                                // translate the parent (armature) of the animated object
                                _this.EngineModules.TransformModule.set_translation_v(obj_parent, point);
                            else
                                _this.EngineModules.TransformModule.set_translation_v(_selected_obj, point);
                            limit_object_position(_selected_obj);
                        }
                    }
            }
            function limit_object_position(obj) {
            }
        });
        b4w.require("EngineB4W").init();
    }
    RenderEngineService.prototype.getCanvasPosition = function () {
        this.canvasPositionX = $("canvas").offset().left;
        this.canvasPositionY = $("canvas").offset().top;
    };
    RenderEngineService.prototype.appendMeshIn = function (fileName) {
        this.EngineModules.DataModule.load(fileName, null, null, null, false);
        this.MeshFileList.push(fileName);
    };
    RenderEngineService.prototype.LoadSceneList = function (fileNames, updateTransform) {
        var i = 0;
        var _this = this;
        function loadcb() {
            if (i < fileNames.length) {
                _this.EngineModules.DataModule.load(fileNames[i], loadcb, null, null, false);
                i++;
            }
            else
                updateTransform();
        }
        _this.EngineModules.DataModule.load("/UsersData/Models3d/SystemFiles/defaultScene.json", loadcb, null, null, false);
    };
    return RenderEngineService;
}());
//# sourceMappingURL=RenderEngineService.js.map