using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SCLAB.Models;
using SCLAB.Repositories;
using System.IO;

namespace SCLAB.Services
{
	 public class MeshFilesUploadService
	 {
		  private static MeshFilesUploadService instance;

		  private IRepository<MeshModel> _MeshRepository;

		  private string _JsonFile { get; set; }

		  public static MeshFilesUploadService GetMeshFilesUploader()
		  {
				if ( instance == null )
					 instance = new MeshFilesUploadService();
				return instance;
		  }

		  public string ServerDirectory { set; get; }

		  private string _ActiveDirectory { get; set; }
		  private string _currentState;

		  public void StartFileUpload( string userName )
		  {
				if ( _currentState != "wait" )
					 CancelFileUpload(null);

				_JsonFile = "";

				string folderName = Guid.NewGuid().ToString();
				_ActiveDirectory = folderName;

				Directory.CreateDirectory( ServerDirectory + _ActiveDirectory );
		  }

		  public void CancelFileUpload( string userName )
		  {
				_currentState = "wait";
		  }

		  public void FileSave( HttpPostedFileBase file )
		  {
				if ( _ActiveDirectory != "" )
				{
					 string fileName = System.IO.Path.GetFileName( file.FileName );

					 file.SaveAs(ServerDirectory + _ActiveDirectory + "/" + fileName );

					 if ( fileName.Split( '.' )[ 1 ].ToLower() == "json" )
						  _JsonFile = fileName;
				}
		  }

		  public string FinishFileUpload( string userName )
		  {
				_currentState = "wait";

				if ( _JsonFile != "" )
				{
					 _MeshRepository.AddNewElement( new MeshModel( ServerDirectory + _ActiveDirectory ) );
					 return "/UsersData/Models3d/" + _ActiveDirectory + '/'+ _JsonFile;
				}

				return "";
		  }

		  private MeshFilesUploadService( )
		  {
				_MeshRepository = new MeshRepository();
		  }


	 }//class end
}