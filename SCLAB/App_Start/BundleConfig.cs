﻿using System.Web;
using System.Web.Optimization;

namespace SCLAB
{
	 public class BundleConfig
	 {
		  // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		  public static void RegisterBundles( BundleCollection bundles )
		  {
				bundles.Add( new ScriptBundle( "~/bundles/jquery" ).Include(
								"~/Scripts/jquery-{version}.js" ) );

				bundles.Add( new ScriptBundle( "~/bundles/jqueryval" ).Include(
								"~/Scripts/jquery.validate*" ) );

				bundles.Add( new ScriptBundle( "~/bundles/angular" ).Include(
				"~/Scripts/angular.min.js",
				"~/Scripts/angular-file-upload.min.js" ) );

				bundles.Add( new ScriptBundle( "~/bundles/ElementEditor" ).Include(
					 "~/WebScripts/RenderEngineService.js",
					 "~/WebScripts/RenderPreview.js",
					"~/WebScripts/MeshFileLoader.js",
					"~/WebScripts/ElementEditor.js",
                    "~/WebScripts/ViewScripts.js") );

				bundles.Add( new ScriptBundle( "~/bundles/ToolEditor" ).Include(
					 "~/WebScripts/RenderEngineService.js",
					 "~/WebScripts/RenderPreview.js",
					"~/WebScripts/ToolEditor.js",
                    "~/WebScripts/ViewScripts.js") );

				bundles.Add( new ScriptBundle( "~/bundles/blender" ).Include(
					 "~/Scripts/blender/b4w.min.js" ) );

				// Use the development version of Modernizr to develop with and learn from. Then, when you're
				// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
				bundles.Add( new ScriptBundle( "~/bundles/modernizr" ).Include(
								"~/Scripts/modernizr-*" ) );

				bundles.Add( new ScriptBundle( "~/bundles/bootstrap" ).Include(
							 "~/Scripts/bootstrap.js",
							 "~/Scripts/respond.js" ) );

				bundles.Add( new StyleBundle( "~/Content/css" ).Include(
							 "~/Content/bootstrap.css",
							"~/Content/ElementEditor.css",
							"~/Content/LogicToolEditor.css",
							"~/Content/ToolEditor.css",
							 "~/Content/site.css" ) );	
		  }
	 }
}
