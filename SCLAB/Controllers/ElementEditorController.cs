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

        // GET: ElementEditor
        public ActionResult Index()
        {
            return View();
        }

		  [HttpPost]
		  public ActionResult UploadModelFile( HttpPostedFileBase file )
		  {
				_MeshUploader.FileSave( file );
				return Content("Ok");
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
				if ( isSuccess )
					 _MeshUploader.FinishFileUpload( "username" );
				else
					 _MeshUploader.CancelFileUpload( "username" );

				return Content( "Ok" );
		  }

		  public ElementEditorController()
		  {
				_MeshUploader = Services.MeshFilesUploadService.GetMeshFilesUploader();
		  }
	 }
}