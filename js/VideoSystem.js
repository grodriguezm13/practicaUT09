"use strict";

//Declaración objeto VideoSystem
var VideoSystem = (function () {
	//Objeto con la instancia única VideoSystem
	var instantiated; 

	function init() { //Inicialización del Singleton

		//Declaración de la función constructora de VideoSystem
		function VideoSystem(){
			//La función se invoca con el operador new
			if (!(this instanceof VideoSystem)) 
				throw new InvalidAccessConstructorException();

			//Definición de atributos privados del objeto
			var _name = name; //Nombre del sistema
			var _users = []; //usuarios que tienen acceso al sistema.
			var _productions = []; //Listado de producciones que tenemos en el sistema.
			var _categories = []; //Las categorías de las producciones.
			var _actors = []; //Actores y actrices que tenemos registrados.
			var _directors = []; //Directores que tenemos en el sistema.

			//Declaracion de getter y setter
			//Devuelve el nombre del sistema
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(value){
					value = typeof name !== 'undefined' ? value : "";
					if (value === "" || value === 'undefined'){
						throw new new EmptyValueException("name");
					}else{
						_name = value;
					}//Fin del if
				}		
			});

			/* LAS SIGUIENTES FUNCIONES HACEN USO DE LAS CATEGORIAS */
			//Devuelve un iterador que permite recorrer las categorías del sistema
			Object.defineProperty(this, 'categories', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
						   return nextIndex < _categories.length ?
						   //Mientras no acabe devuelve un objeto con el valor y la propiedad done
				               {value: _categories[nextIndex++].category, done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Dado un objeto, devuelve la posición de ese objeto.
			this.getCategoryPosition = function(category){
				function compareCategories(arrayCategory) {
				  return (arrayCategory.category.name === category.name);
				}
				return _categories.findIndex(compareCategories);		
			}

			//Añade una nueva categoría
			this.addCategory = function(category){
				if(!(category instanceof Category)){
					throw new InvalidParamException("Category");
				}
				if (category == null) {
					throw new NullParamException("category");
				}
				var position = this.getCategoryPosition(category); 
				//Si no existe la categoria se añade al array	
				if (position === -1){
					_categories.push(
						{
							category: category,
							productions: []
						}
					);
				} else{
					throw new CategoryExistsException();
				}
				return _categories.length;
			};//Fin de addCategory

			//Elimina una categoría.
			this.removeCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new InvalidParamException("Category");
				}
				if (category == null) {
					throw new NullParamException("category");
				}	
				var position = this.getCategoryPosition(category); 	
				if (position !== -1){
					_categories.splice(position, 1);			
				} else{
					throw new CategoryNotExistsException();
				}	
				return _categories.length;
			};//Fin de removeCategory
			
			/* LAS SIGUIENTES FUNCIONES HACEN USO DE LOS USUARIOS */
			//Devuelve un iterador que permite recorrer los usuarios del sistema
			Object.defineProperty(this, 'users', {
				get:function(){
					var nextIndex = 0;		    
					return {
					next: function(){
						return nextIndex < _users.length ?
						//Mientras no acabe devuelve un objeto con el valor y la propiedad done
							{value: _users[nextIndex++], done: false} :
							{done: true};
					}
					}
				}	
			});

			//Añade una nuevo usuario
			this.addUser = function(user){
				if(!(user instanceof User)){
					throw new InvalidParamException("User");
				}
				if (user == null) {
					throw new NullParamException("user");
				}
				//Buscamos la position del email y del username
				var existeNombre = this.getUserNamePosition(user); 
				var existeEmail = this.getUserEmailPosition(user);
				//Si la posicion de existeNombre es igual a -1, no
				//existe ningun usuario con el mismo nombre
				if (existeNombre === -1){
					//Comprobamos que no haya ningun email igual, si no existe se añade el usuario
					if (existeEmail === -1) {
						_users.push(user);
					}else{
						throw new UserExistsException("email");
					}
				} else{
					throw new UserExistsException("userName");
				}
				return _users.length;
			};//Fin de addUser

			//Dado un objeto User, devuelve la posición de ese objeto.
			this.getUserNamePosition = function(user){
				function compareUsers(arrayUser) {
				  return (arrayUser.userName === user.userName)
				}
				return _users.findIndex(compareUsers);		
			}

			//Dado un objeto User, devuelve la posición de ese objeto.
			this.getUserEmailPosition = function(user){
				function compareUsers(arrayUser) {
				return (arrayUser.email === user.email)
				}
				return _users.findIndex(compareUsers);		
			}

			//Elimina un usuario del sistema
			this.removeUser = function(user){
				if (!(user instanceof User)) { 
					throw new InvalidParamException("User");
				}
				if (user == null) {
					throw new NullParamException("User");
				}	
				//Para encontrar el usuario se utiliza su email
				var position = this.getUserEmailPosition(user);	
				if (position !== -1){
					_users.splice(position, 1);			
				} else{
					throw new UserNotExistsException();
				}	
				return _users.length;
			};//Fin de removeUser

			/* LAS SIGUIENTES FUNCIONES HACEN USO DE LAS PRODUCTION */
			//Devuelve un iterador que permite recorrer las producciones del sistema
			Object.defineProperty(this, 'productions', {
				get:function(){
					var nextIndex = 0;		    
					return {
					next: function(){
						return nextIndex < _productions.length ?
						//Mientras no acabe devuelve un objeto con el valor y la propiedad done
							{value: _productions[nextIndex++], done: false} :
							{done: true};
					}
					}
				}	
			});

			//Dado un objeto, devuelve la posición de ese objeto.
			this.getProductionPosition = function(production){
				function compareProduction(arrayProduction) {
				  return (arrayProduction.title === production.title)
				}
				return _productions.findIndex(compareProduction);		
			}

			//Añade una nueva produccion
			this.addProduction = function(production){
				if(!(production instanceof Production)){
					throw new InvalidParamException("Production");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				var position = this.getProductionPosition(production); 
				//Si no existe la produccion se añade al array	
				if (position === -1){
					_productions.push(production);
				} else{
					throw new ProductionExistsException();
				}
				return _productions.length;
			};//Fin de addProduction

			//Elimina una produccion.
			this.removeProduction = function(production){
				if(!(production instanceof Production)){
					throw new InvalidParamException("Production");
				}
				if (production == null) {
					throw new NullParamException("production");
				}	
				var position = this.getProductionPosition(production);
				if (position !== -1){
					_productions.splice(position, 1);			
				} else{
					throw new ProductionNotExistsException();
				}	
				return _productions.length;
			};//Fin de removeProduction

			/* LAS SIGUIENTES FUNCIONES HACEN USO DE LOS ACTORES */
			//Devuelve un iterador que permite recorrer los actores registrados en el sistema
			Object.defineProperty(this, 'actors', {
				get:function(){
					var nextIndex = 0;		    
					return {
					next: function(){
						return nextIndex < _actors.length ?
						//Mientras no acabe devuelve un objeto con el valor y la propiedad done
							{value: _actors[nextIndex++].actor, done: false} :
							{done: true};
					}
					}
				}	
			});

			//Añade una nuevo actor
			this.addActor = function(actor){
				if(!(actor instanceof Person)){
					throw new InvalidParamException("Person");
				}
				if (actor == null) {
					throw new NullParamException("actor");
				}
				var existeNombre = this.getActorPosition(actor); 
				//Si la posicion de existeNombre es igual a -1, no
				//existe ningun actor con el mismo nombre
				if (existeNombre === -1){
					_actors.push(
						{
							actor: actor,
							productions: []
						}
					);
				} else{
					throw new ActorExistsException("name");
				}
				return _actors.length;
			};//Fin de addActor

			//Dado un objeto Actor, devuelve la posición de ese objeto.
			this.getActorPosition = function(actor){
				function compareActors(arrayActor) {
				  return (arrayActor.actor.name === actor.name && arrayActor.actor.lastName1 === actor.lastName1)
				}
				return _actors.findIndex(compareActors);		
			}

			//Elimina un actor del sistema
			this.removeActor = function(actor){
				if(!(actor instanceof Person)){
					throw new InvalidParamException("Person");
				}
				if (actor == null) {
					throw new NullParamException("actor");
				}
				var position = this.getActorPosition(actor);
				if (position !== -1){
					_actors.splice(position, 1);			
				} else{
					throw new ActorNotExistsException();
				}
				return _actors.length;
			};//Fin de removeUser

			/* LAS SIGUIENTES FUNCIONES HACEN USO DE LOS DIRECTORES */
			//Devuelve un iterador que permite recorrer los directores registrados en el sistema
			Object.defineProperty(this, 'directors', {
				get:function(){
					var nextIndex = 0;		    
					return {
					next: function(){
						return nextIndex < _directors.length ?
						//Mientras no acabe devuelve un objeto con el valor y la propiedad done
							{value: _directors[nextIndex++].director, done: false} :
							{done: true};
					}
					}
				}	
			});

			//Añade una nuevo director
			this.addDirector = function(director){
				if(!(director instanceof Person)){
					throw new InvalidParamException("Person");
				}
				if (director == null) {
					throw new NullParamException("director");
				}
				var position = this.getDirectorPosition(director); 
				if (position === -1){
					_directors.push(
						{
							director: director,
							productions: []
						}
					);
				} else{
					throw new DirectorExistsException("name");
				}
				return _directors.length;
			};//Fin de addDirector

			//Dado un objeto Director, devuelve la posición de ese objeto.
			this.getDirectorPosition = function(director){
				function compareDirectors(arrayDirector) {
					return (arrayDirector.director.name === director.name && arrayDirector.director.lastName1 === director.lastName1)
				  }
				  return _directors.findIndex(compareDirectors);		
			}//Fin de getDirectorPosition

			//Elimina un director del sistema
			this.removeDirector = function(director){
				if(!(director instanceof Person)){
					throw new InvalidParamException("Person");
				}
				if (director == null) {
					throw new NullParamException("director");
				}
				var position = this.getDirectorPosition(director); 
				if (position !== -1){
					_directors.splice(position, 1);
				} else{
					throw new DirectorNotExistsException();
				}
				return _directors.length;
			};//Fin de removeDirector

			/* LAS SIGUIENTES FUNCIONES ASIGNAN Y DESAGINAN A CATEGORY */
			//Asigna uno más producciones a una categoría. Si el objeto Category o Production no existen se añaden al sistema.
			this.assignCategory = function(category, production){
				//Primero se comprueba que no sean nulos ningun parametro
				if (category == null) {
					throw new NullParamException("category");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				//Busca la posicion de esa categoria en el array _categories para ver si existe, de no existir debe añadirlo
				var positionCategory = this.getCategoryPosition(category); 
				//Busca la posicion de esa produccion en el array _production para ver si existe, de no existir debe añadirlo
				var positionProduction = this.getProductionPosition(production);
				if(positionCategory !== -1){
					//Si existe la categoria, busca la produccion
					if(positionProduction !== -1){
						//Si existe la produccion, la asigna al director
						//Buscamos en el array de productions si coincide alguna con la introducida
						var i = 0;
						var encontrado = false;
						while(i < _categories[positionCategory].productions.length && !encontrado){
							if (_categories[positionCategory].productions[i].title === production.title){
								encontrado = true;
							}
							i++;
						}//Fin del while
						if(!encontrado){
							//Coge la categoria que coincida con la position de la categoria encontrada.La propiedad production de ese elemento.Hace el push al array
							_categories[positionCategory].productions.push(production);
						}else{
							throw new AssignCategoryException();
						}
					}else{
						//Si no existe la añade
						this.addProduction(production);
						//Vuelve a llamar a la funcion
						this.assignCategory(category, production);
					}//Fin del if	
				}else{
					//Si no existe la añade
					this.addCategory(category);
					//Vuelve a llamar a la funcion
					this.assignCategory(category, production);
				}//Fin del if
				return _categories[positionCategory].productions.length;
			};//Fin de assignCategory

			//Dado una produccion y el array productions de las categories, devuelve la posición de esa produccion.
			this.getProductionCategoryPosition = function(production, categoryProduction){
				function compareElements(element) {
					return (element.title === production.title)
				}
				return categoryProduction.findIndex(compareElements);		
			}//Fin de getProductionCategoryPosition

			//Desasigna una o más producciones de una categoría.
			this.deassignCategory = function(category, production){
				//Primero se comprueba que no sean nulos ningun parametro
				if (category == null) {
					throw new NullParamException("category");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				//Busca la posicion de esa categoria en el array _categories para ver si existe
				var positionCategory = this.getCategoryPosition(category); 
				//Busca la posicion de esa produccion en el array _production que hay como propiedad dentro de _categories
				var positionProduction = this.getProductionCategoryPosition(production, _categories[positionCategory].productions);
				if(positionCategory !== -1){
					//Si existe la categoria, busca la produccion
					if(positionProduction !== -1){		
						//Si la produccion eciste dentro del array _production que hay como propiedad dentro de _categories			
						_categories[positionCategory].productions.splice(positionProduction,1);
					}else{
						//Si no existe la produccion
						throw new ProductionNotExistsException();
					}//Fin del if	
				}else{
					//Si no existe la categoria
					throw new CategoryNotExistsException();
				}//Fin del if
				return _categories[positionCategory].productions.length;
			};//Fin de deassignCategory

			/* LAS SIGUIENTES FUNCIONES ASIGNAN Y DESAGINAN A DIRECTOR */
			//Asigna uno más producciones a un director.Si el director o el objeto Production no existen se añaden al sistema.
			this.assignDirector = function(director, production){
				//Primero se comprueba que no sean nulos ningun parametro
				if (director == null) {
					throw new NullParamException("director");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				//Busca la posicion de esa categoria en el array _directors para ver si existe, de no existir debe añadirlo
				var positionDirector = this.getDirectorPosition(director); 
				//Busca la posicion de esa produccion en el array _production para ver si existe, de no existir debe añadirlo
				var positionProduction = this.getProductionPosition(production);
				if(positionDirector !== -1){
					//Si existe el director, busca la produccion
					if(positionProduction !== -1){
						//Si existe la produccion, la asigna al director
						//Buscamos en el array de productions si coincide alguna con la introducida
						var i = 0;
						var encontrado = false;
						while(i < _directors[positionDirector].productions.length && !encontrado){
							if (_directors[positionDirector].productions[i].title === production.title){
								encontrado = true;
							}
							i++;
						}//Fin del while
						if(!encontrado){
							//Coge el actor que coincida con la position del actor encontrado.La propiedad production de ese elemento.Hace el push al array con el objeto literal
							_directors[positionDirector].productions.push(production);
						}else{
							throw new AssignDirectorException();
						}
					}else{
						//Si no existe la añade
						this.addProduction(production);
						//Vuelve a llamar a la funcion
						this.assignDirector(director, production);
					}//Fin del if	
				}else{
					//Si no existe la añade
					this.addDirector(director);
					//Vuelve a llamar a la funcion
					this.assignDirector(director, production);
				}//Fin del if
				return _directors[positionDirector].productions.length;
			};//Fin de assignDirector

			//Dado una produccion y el array productions de los directores, devuelve la posición de esa produccion.
			this.getProductionDirectorPosition = function(production, directorProduction){
				function compareElements(element) {
					return (element.title === production.title)
				}
				return directorProduction.findIndex(compareElements);		
			}//Fin de getProductionDirectorPosition

			//Desasigna una o más producciones de un director.
			this.deassignDirector = function(director, production){
				//Primero se comprueba que no sean nulos ningun parametro
				if (director == null) {
					throw new NullParamException("director");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				//Busca la posicion de ese director en el array _directors para ver si existe
				var positionDirector = this.getDirectorPosition(director); 
				//Busca la posicion de esa produccion en el array _production para ver si existe
				var positionProduction = this.getProductionDirectorPosition(production, _directors[positionDirector].productions);
				if(positionDirector !== -1){
					//Si existe el director, busca la produccion
					if(positionProduction !== -1){
						//Si existe la produccion, la asigna al director
						//Coge el director que coincida con la position del director encontrado.La propiedad production de ese elemento.Hace el splice al array
						_directors[positionDirector].productions.splice(positionProduction,1);
					}else{
						//Si no existe la produccion
						throw new ProductionNotExistsException();
					}//Fin del if	
				}else{
					//Si no existe el director
					throw new DirectorNotExistsException();
				}//Fin del if
				return _directors[positionDirector].productions.length;
			};//Fin de deassignDirector

			/* LAS SIGUIENTES FUNCIONES ASIGNAN Y DESAGINAN A ACTOR */
			//Asigna uno más producciones a un actor. Si el actor o el objeto Production no existen se añaden al sistema.
			this.assignActor = function(actor, production, character, main){
				//Primero se comprueba que no sean nulos ningun parametro
				if (actor == null) {
					throw new NullParamException("actor");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				//Busca la posicion de esa categoria en el array _actors para ver si existe, de no existir debe añadirlo
				var positionActor = this.getActorPosition(actor); 
				//Busca la posicion de esa produccion en el array _production para ver si existe, de no existir debe añadirlo
				var positionProduction = this.getProductionPosition(production);
				if(positionActor !== -1){
					//Si existe el actor, busca la produccion
					if(positionProduction !== -1){
						//Si existe la produccion, la asigna al actor
						//Buscamos en el array de productions si coincide alguna con la introducida
						var i = 0;
						var encontrado = false;
						while(i < _actors[positionActor].productions.length && !encontrado){
							if (_actors[positionActor].productions[i].production.title === production.title){
								encontrado = true;
							}
							i++;
						}//Fin del while
						if(!encontrado){
							//Coge el actor que coincida con la position del actor encontrado.La propiedad production de ese elemento.Hace el push al array con el objeto literal
							_actors[positionActor].productions.push(
								{
									production: production,
									character: character,
									main: main
								}
							);
						}else{
							throw new AssignActorException();
						}
					}else{
						//Si no existe la añade
						this.addProduction(production);
						//Vuelve a llamar a la funcion
						this.assignActor(actor, production, character, main);
					}//Fin del if	
				}else{
					//Si no existe lo añade
					this.addActor(actor);
					//Vuelve a llamar a la funcion
					this.assignActor(actor, production, character, main);
				}//Fin del if
				return _actors[positionActor].productions.length;
			};//Fin de assignActor

			//Dado una produccion y el array productions de los actores, devuelve la posición de esa produccion.
			this.getProductionActorPosition = function(production, actorProduction){
				function compareElements(element) {
					return (element.production.title === production.title)
				}
				return actorProduction.findIndex(compareElements);		
			}//Fin de getProductionActorPosition

			//Desasigna una o más producciones de un actor.
			this.deassignActor = function(actor, production){
				//Primero se comprueba que no sean nulos ningun parametro
				if (actor == null) {
					throw new NullParamException("actor");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				//Busca la posicion de esa actor en el array _actors para ver si existe
				var positionActor = this.getActorPosition(actor); 
				//Busca la posicion de esa produccion en el array _production para ver si existe
				var positionProduction = this.getProductionActorPosition(production, _actors[positionActor].productions);
				if(positionActor !== -1){
					//Si existe el actor, busca la produccion
					if(positionProduction !== -1){
						_actors[positionActor].productions.splice(positionProduction,1);
					}else{
						//Si no existe la produccion
						throw new ProductionNotExistsException();
					}//Fin del if	
				}else{
					//Si no existe el actor
					throw new ActorNotExistsException();
				}//Fin del if
				return _actors[positionActor].productions.length;
			};//Fin de deassignActor

			/* LAS SIGUIENTES FUNCIONES SON LOS ITERADORES DE LAS FUNCIONES DE ASSIGN Y DESASSIGN ANTERIORES */
			//Obtiene un iterador con la relación de los actores del reparto una producción y sus personajes.
			this.getCast = function(production){
				if (production == null) {
					throw new NullParamException("production");
				}			
				var positionProduction = this.getProductionPosition(production); 	
				if (positionProduction === -1) {throw new ProductionNotExistsException();}
				var nextActor = 0;
				var nextProduction = 0;
			    return {
					next: function(){
						var actor = null;
						var papel = null;
						var principal = null;
						while (nextActor < _actors.length && actor === null){
							if (nextProduction < _actors[nextActor].productions.length && _actors[nextActor].productions[nextProduction].production.title === production.title){
								actor = _actors[nextActor].actor;
								papel = _actors[nextActor].productions[nextProduction].character;
								principal = _actors[nextActor].productions[nextProduction].main;
							}
							nextProduction++;
							if (nextProduction >= _actors[nextActor].productions.length){
								nextProduction = 0;
								nextActor++;
							}
						}
						if (actor !== null && papel !== null && principal !== null){
							return {value: actor, papel: papel, principal: principal, done: false}
						}
						if (nextActor >= _actors.length) return {done: true};
					}
				}
			};//Fin de getCast

			//Obtiene un iterador con las producciones de un director.
			this.getProductionsDirector = function(director){
				if (director == null) {
					throw new NullParamException("director");
				}			
				var positionDirector = this.getDirectorPosition(director); 	
				if (positionDirector === -1) {throw new DirectorNotExistsException();}
				var nextIndex = 0;
			    return {
			       next: function(){
			       		var directors = null;
			       		while (nextIndex < _directors[positionDirector].productions.length && directors === null){
			       			if (_directors[positionDirector].director.name === director.name){
								directors = _directors[positionDirector].productions[nextIndex];
			       			}
			       			nextIndex++;
			       		}
			       		if (directors !== null){
			       			return {value: directors, done: false}
			       		}
			       		if (nextIndex >= _directors[positionDirector].productions.length) return {done: true};
			       }
			    }
			};//Fin de getProductionsDirector

			//Obtiene un iterador con las producciones de un actor y su papel en la producción.
			this.getProductionsActor = function(actor){
				if (actor == null) {
					throw new NullParamException("actor");
				}			
				var positionActor = this.getActorPosition(actor); 	
				if (positionActor === -1) {throw new ActorNotExistsException();}
				var nextIndex = 0;
			    return {
			       next: function(){
						   var production = null;
						   var papel = null;
			       		while (nextIndex < _actors[positionActor].productions.length && production === null){
			       			if (_actors[positionActor].actor.name === actor.name){
								production = _actors[positionActor].productions[nextIndex].production;
								papel = _actors[positionActor].productions[nextIndex].character;
			       			}
			       			nextIndex++;
			       		}
			       		if (production !== null){
			       			return {value: production, papel: papel, done: false}
			       		}
			       		if (nextIndex >= _actors[positionActor].productions.length) return {done: true};
			       }
			    }
			};//Fin de getProductionsActor

			//Obtiene un iterador con las producciones de una categoría determinada.
			this.getProductionsCategory = function(category){
				if (category == null) {
					throw new NullParamException("category");
				}			
				var positionCategory = this.getCategoryPosition(category); 	
				if (positionCategory === -1) {throw new CategoryNotExistsException();}
				var nextIndex = 0;
			    return {
			       next: function(){
			       		var production = null;
			       		while (nextIndex < _categories[positionCategory].productions.length && production === null){
			       			if (_categories[positionCategory].category.name === category.name){
								production = _categories[positionCategory].productions[nextIndex];
			       			}
			       			nextIndex++;
			       		}
			       		if (production !== null){
			       			return {value: production, done: false}
			       		}
			       		if (nextIndex >= _categories[positionCategory].productions.length) return {done: true};
			       }
			    }
			};//Fin de getProductionsCategory



		}//Fin de la funcion constructora de VideoSystem
		VideoSystem.prototype = {}; 
		VideoSystem.prototype.constructor = VideoSystem;
	
		//Devolvemos el objeto para que sea una instancia única.
		var video = new VideoSystem();
		return video;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			//Si es la primera llamada sera undefined y ejecutara el init()
			if (!instantiated) { 
				instantiated = init();
			}
			return instantiated; 
		}
	};
})();//Fin de VideoSystem