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
		  public ActionResult UploadModelFiles( HttpPostedFileBase modelFileJSON, HttpPostedFileBase modelFileBIN, IEnumerable<HttpPostedFileBase> textureFiles )
		  {
				var mesh4Upload = new Models.MeshUploadFilesModel( modelFileJSON, modelFileBIN, textureFiles);

				_MeshUploader.SaveUploadedMeshFiles( mesh4Upload, Server.MapPath( "~/UsersData/Models3d/") );
				 
				return RedirectToAction( "Index" );
		  }

		  public ElementEditorController()
		  {
				_MeshUploader = new Services.MeshFilesUploadService();
		  }
	 }
}