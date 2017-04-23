using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SCLAB.Models;
using System.Data.Entity;

namespace SCLAB.Repositories
{
	 public class MeshContext :DbContext
	 {
		  public MeshContext() : base( "DefaultConnection" )
		  { }

		  public DbSet<MeshModel> Meshes { get; set; }
	 }

	 public class MeshRepository: IRepository<MeshModel>
	 {
		  int IRepository<MeshModel>.AddNewElement( MeshModel element )
		  {
				MeshModel mesh;

				using ( MeshContext db = new MeshContext() )
				{
					 mesh = db.Meshes.Add(element);
					 db.SaveChanges();
				}

				return mesh.Id;
		  }

		  MeshModel IRepository<MeshModel>.GetElementById( int id )
		  {
				MeshModel mesh = null;

				using ( MeshContext db = new MeshContext() )
				{
					// mesh = db.Meshes.fi
					 //db.SaveChanges();
				}

				return mesh;
		  }

		  void IRepository<MeshModel>.DeleteElement( MeshModel element )
		  {
				throw new NotImplementedException();
		  }
	 }
}