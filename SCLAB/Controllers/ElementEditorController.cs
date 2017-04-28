using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace SCLAB.Controllers
{
	 public class ElementEditorController : Controller
    {
		  private Services.MeshFilesUploadService _MeshUploader;
		  private Services.ElementService _ElementService;

		  // GET: ElementEditor
		  public ActionResult Index()
        {
            return View();
        }

		  [HttpGet]
		  public ActionResult GetElementList()
		  {
				return Content( _ElementService.GetElementList());
		  }

		  [HttpGet]
		  public ActionResult GetElementById( int? id)
		  {
				if ( id != null )
					 return Content( _ElementService.GetElementById( ( int )id ) );
				else
					 return Content("");
		  }

		  [HttpPost]
		  public ActionResult UploadModelFile( HttpPostedFileBase file )
		  {
				_MeshUploader.FileSave( file );
				return Content("Ok");
		  }

		  [HttpPost]
		  public ActionResult ElementSave( int? id, string name, string description, string sceneMap )
		  {
				var element = new Models.ElementModel( id, name, description, sceneMap);


				return Content( _ElementService.SaveElement(element).ToString() );
		  }

		  [HttpGet]
		  public ActionResult UploadModelFilesStart()
		  {
				_MeshUploader.ServerDirectory = Server.MapPath( "/UsersData/Models3d/" );
				_MeshUploader.StartFileUpload( "username" );
				return Content( "Ok" );
		  }

		  public ActionResult UploadModelFilesFinish( bool isSuccess )
		  {
				string responceData = "";

				if ( isSuccess )
					 responceData = _MeshUploader.FinishFileUpload( "username" );
				else
					 _MeshUploader.CancelFileUpload( "username" );

				return Content( responceData );
		  }

		  public ElementEditorController()
		  {
				_MeshUploader = Services.MeshFilesUploadService.GetMeshFilesUploader();
				_ElementService = Services.ElementService.GetElementService();
		  }
	 }
}