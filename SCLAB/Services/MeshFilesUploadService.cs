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
		  private IRepository<MeshModel> _MeshRepository;
		  
		  /// <summary>
		  /// Saving file in loacal chaash and add note in data base
		  /// </summary>
		  /// <param name="mesh"></param>
		  /// <param name="serverDirectory"></param>
		  /// <returns>Return id</returns>
		  public int SaveUploadedMeshFiles(MeshUploadFilesModel mesh, string serverDirectory)
		  {
				if ( mesh.ModelFileJSON == null || mesh.ModelFileBIN == null )
				{
					 new Exception( "Empty main files of mesh" );
					 return -1;
				}

				string newModelDirectory = Guid.NewGuid().ToString();

				Directory.CreateDirectory( serverDirectory + newModelDirectory );


				mesh.ModelFileJSON.SaveFileInDirectory( serverDirectory + newModelDirectory );
				mesh.ModelFileBIN.SaveFileInDirectory ( serverDirectory + newModelDirectory );


				foreach ( var textureFile in mesh.ModelTextureFiles )
				{
					 if ( textureFile != null )
						  textureFile.SaveFileInDirectory( serverDirectory + newModelDirectory );
				}

				return _MeshRepository.AddNewElement( new MeshModel( serverDirectory + newModelDirectory ) );
		  }

		  public MeshFilesUploadService()
		  {
				_MeshRepository = new MeshRepository();
		  }

	 }//class end
}