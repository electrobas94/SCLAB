using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCLAB.Repositories
{
	 public interface IRepository<T> where T:class
	 {
		  int AddNewElement( T element );
		  T GetElementById( int id );
		  void DeleteElement( T element );
	 }
}
