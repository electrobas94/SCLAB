using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCLAB.Models
{
	 public class MeshModel
	 {
		  public int Id { get; set; }
		  public string FolderName { get; set; }
		  public string JsonMeshName { get; set; }

		  public MeshModel( string folderName, string jsonMeshName )
		  {
				FolderName = folderName;
				JsonMeshName = jsonMeshName;
		  }
	 }
}