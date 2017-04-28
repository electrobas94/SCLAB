using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SCLAB.Models;
using System.Data.Entity;

namespace SCLAB.Repositories
{
	 public class ElementContext :DbContext
	 {
		  public ElementContext() : base( "DefaultConnection" )
		  {
		  }

		  public DbSet<ElementModel> Elements { get; set; }
	 }



	 public class ElementRepository :IRepository<ElementModel>, IDisposable
	 {
		  private ElementContext db;

		  public List<ElementModelShort> GetElementsInShortModel()
		  {
				List<ElementModelShort> tmp = new List<ElementModelShort>();
				foreach ( var obj in db.Elements.ToList() )
					 tmp.Add( new ElementModelShort( obj.Id, obj.Name ) );
				//db.Elements.Select( p => p.Id);
				return tmp;
		  }

		  public ElementRepository()
		  {
				db = new ElementContext();
		  }

		  public void Dispose()
		  {
				db.Dispose();
				db = null;
		  }

		  public int AddNewElement( ElementModel element )
		  {
				ElementModel elem;

					 elem = db.Elements.Add( element );
					 db.Entry( element ).State = EntityState.Added;
					 db.SaveChanges();

				return elem.Id;
		  }


		  public void DeleteElement( ElementModel element )
		  {
				throw new NotImplementedException();
		  }

		  public ElementModel GetElementById( int id )
		  {
				return db.Elements.Find(id);
		  }

		  public int UpdatElement( ElementModel element )
		  {
				int retID;

				if ( element.Id == -1 )
				{
					 retID = AddNewElement( element );
					 return retID;
				}


					 var originElement = db.Elements.Find( element.Id );

					 if ( originElement == null )
					 {
						  retID = AddNewElement( element );
						  return retID;
					 }
					 else
					 {
						  originElement.Name = element.Name;
						  originElement.Description = element.Description;
						  originElement.JsonMapScene = element.JsonMapScene;

						  db.Entry( originElement ).State = EntityState.Modified;

						  db.SaveChanges();

						  retID = element.Id;
					 }
			

				return retID;

		  }
	 }
}
