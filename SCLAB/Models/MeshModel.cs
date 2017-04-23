using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCLAB.Models
{
	 public class MeshModel
	 {
		  public int Id { get; set; }
		  public string URLFileModel { get; set; }

		  public MeshModel( string urlFileOfModel )
		  {
				URLFileModel = urlFileOfModel;
		  }
	 }
}