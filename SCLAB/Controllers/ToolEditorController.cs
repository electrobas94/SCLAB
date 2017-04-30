using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SCLAB.Controllers
{
    public class ToolEditorController : Controller
    {
		  private Services.ElementService _ElementService;
		  // GET: ToolEditor
		  public ActionResult Index()
        {
            return View();
        }

		  public ToolEditorController()
		  {
				_ElementService = Services.ElementService.GetElementService();
		  }

		  [HttpGet]
		  public ActionResult GetElementList()
		  {
				return Content( _ElementService.GetElementList() );
		  }

		  [HttpGet]
		  public ActionResult GetElementById( int? id )
		  {
				if ( id != null )
					 return Content( _ElementService.GetElementById( ( int )id ) );
				else
					 return Content( "" );
		  }
	 }
}