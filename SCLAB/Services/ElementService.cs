using Newtonsoft.Json;
using SCLAB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCLAB.Services
{
	 public class ElementService
	 {
		  private static ElementService instance;

		  private ElementRepository _ElementRepository;

		  private ElementService()
		  {
				_ElementRepository = new ElementRepository();
		  }

		  public static ElementService GetElementService()
		  {
				if ( instance == null )
					 instance = new ElementService();
				return instance;
		  }

		  internal string GetElementList()
		  {
				var elements = _ElementRepository.GetElementsInShortModel();

				return JsonConvert.SerializeObject( elements );
		  }

		  internal string GetElementById( int id )
		  {
				return JsonConvert.SerializeObject( _ElementRepository.GetElementById( id) );
		  }

		  public int SaveElement( Models.ElementModel element )
		  {
				return _ElementRepository.UpdatElement( element );
		  }
	 }
}