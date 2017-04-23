using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCLAB.Models
{
	 public class HttpUploadedFile
	 { 
		  private HttpPostedFileBase _UploadedFile;
		  public void SaveFileInDirectory( string directoryName )
		  {
				string fileName = GetOnlyFileName();

				_UploadedFile.SaveAs( directoryName + "/" + fileName);
		  }

		  public string GetOnlyFileName()
		  {
				return System.IO.Path.GetFileName( _UploadedFile.FileName );
		  }

		  public HttpUploadedFile( HttpPostedFileBase baseFile)
		  {
				_UploadedFile = baseFile;
		  }
	 }


	 public class MeshUploadFilesModel
	 {
		  public HttpUploadedFile ModelFileJSON { get; set; }
		  public HttpUploadedFile ModelFileBIN { get; set; }
		  public List<HttpUploadedFile> ModelTextureFiles { get; set; }

		  public MeshUploadFilesModel( HttpPostedFileBase jsonFile, HttpPostedFileBase binFile, IEnumerable<HttpPostedFileBase> textureFiles )
		  {
				ModelFileJSON     = new HttpUploadedFile(jsonFile);
				ModelFileBIN      = new HttpUploadedFile(binFile );

				ModelTextureFiles = new List<HttpUploadedFile>();

				if ( textureFiles != null )
				{
					 foreach ( var textureFile in textureFiles )
						  ModelTextureFiles.Add( new HttpUploadedFile( textureFile ) );
				}
		  }
	 }
}