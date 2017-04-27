using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCLAB.Models
{
	 public class ElementModel
	 {
		  public int Id { get; set; }
		  public string Name { get; set; }
		  public string Description { get; set; }
		  public string JsonMapScene { get; set; }

		  public ElementModel( int? id, string name, string description, string sceneMap )
		  {
				if ( id != null )
					 Id = ( int )id;
				else
					 Id = -1;

				Name = name;
				Description = description;
				JsonMapScene = sceneMap;
		  }
	 }

	 public class ElementModelShort
	 {
		  public int Id { get; set; }
		  public string Name { get; set; }

		  public ElementModelShort( int id, string name)
		  {
				Id = id;
				Name = name;
		  }
	 }
}