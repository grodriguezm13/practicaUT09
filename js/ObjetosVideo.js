"use strict";

//Objeto para identificar los datos de una persona.
function Person(name, lastName1, born, lastName2 = null, picture = null) {
	//La función se invoca con el operador new
	if (!(this instanceof Person)) {
		throw new InvalidAccessConstructorException();}

	//Validación de parámetros obligatorios
	name = typeof name !== 'undefined' ? name : "";
	if (name === ""){ throw new EmptyValueException("name");}
    lastName1 = typeof lastName1 !== 'undefined' ? lastName1 : "";
	if (lastName1 === ""){ throw new EmptyValueException("lastName1");}
	born = typeof Date !== 'undefined' ? born : "";
	if (born === ""){ throw new InvalidValueException("born", born);}
	lastName2 = typeof lastName2 !== 'undefined' ? lastName2 : "";
	if (lastName2 === ""){ throw new EmptyValueException("lastName2");}
	if (lastName2 === null){ lastName2 = " ";}
	picture = typeof picture !== 'undefined' ? picture : "";
	if (picture === ""){ throw new EmptyValueException("picture");}
	
    //Declaracion de atributos
    var _name = name;
    var _lastName1 = lastName1;
    var _lastName2 = lastName2;
    var _born = born;
    var _picture = picture;
	var _completo = "";

    //Declaracion de getter y setters
	Object.defineProperty(this, 'name', {
		get:function(){
			return _name;
		},
		set:function(value){
			value = typeof name !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("name");
            }else{
                _name = value;
            }//Fin del if
        }		
    });
	
	Object.defineProperty(this, 'lastName1', {
		get:function(){
			return _lastName1;
		},
		set:function(value){
			value = typeof lastName1 !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("lastName1");
            }else{
                _lastName1 = value;
            }//Fin del if
        }		
    });

	Object.defineProperty(this, 'lastName2', {
		get:function(){
			return _lastName2;
		},
		set:function(value){
			value = typeof lastName2 !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("lastName2");
            }else{
                _lastName2 = value;
            }//Fin del if
        }		
	});
	
	Object.defineProperty(this, 'born', {
		get:function(){
			return _born;
		},
		set:function(value){
			value = typeof Date !== 'undefined' ? value : "";
		    if (value === ""){
                throw new InvalidValueException("born", born);
            }else{
                _born = value;
            }//Fin del if
        }		
    });

	Object.defineProperty(this, 'picture', {
		get:function(){
			return _picture;
		},
		set:function(value){
			value = typeof picture !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("picture");
            }else{
                _picture = value;
            }//Fin del if
        }		
	});
	
	Object.defineProperty(this, 'completo', {
		get:function(){
			return _name+" "+_lastName1+ " "+_lastName2;
		},
		set:function(value){
			value = typeof completo !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("picture");
            }else{
                _completo = value;
            }//Fin del if
        }	
    });
}//Fin de Person
Person.prototype = {};
Person.prototype.constructor = Person;
Person.prototype.toString = function(){
	return "Nombre completo: " + this.name + ", " + this.lastName1 + " " + this.lastName2 + ". Fecha de nacimiento: "+ this.born + ". Imagen: "+ this.picture;
};
Person.prototype.getObject = function(){
	return {
		name: this.name,
		lastName1: this.lastName1,
		lastName2: this.lastName2,
		born: this.born,
		image: this.image,
		completo: this.completo
	};
};

//Con este objeto podemos crear la estructura de categorías.
function Category(name, description = "Sin descripcion") {
	//La función se invoca con el operador new
	if (!(this instanceof Category)) {
		throw new InvalidAccessConstructorException();}
	
		//Validación de parámetros obligatorios
	name = typeof name !== 'undefined' ? name : "";
	if (name === ""){ throw new EmptyValueException("name");}
	description = typeof description !== 'undefined' ? description : "";
	if (description === ""){ throw new EmptyValueException("description");}

	//Declaracion de atributos
    var _name = name;
	var _description = description;
	
	//Declaracion de getter y setters
	Object.defineProperty(this, 'name', {
		get:function(){
			return _name;
		},
		set:function(value){
			value = typeof name !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("name");
            }else{
                _name = value;
            }//Fin del if
        }		
    });
	
	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			value = typeof description !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("description");
            }else{
                _description = value;
            }//Fin del if
        }		
    });
}//Fin de Category
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function(){
	return "Nombre: " + this.name + ". Descripcion: "+ this.description + ".";
};
Category.prototype.getObject = function(){
	return {
		name: this.name,
		description: this.description
	};
};

//Representa un recurso audiovisual.
function Resource(duration, link, audios = null, subtitles = null){
	//La función se invoca con el operador new
	if (!(this instanceof Resource)) {
		throw new InvalidAccessConstructorException();}

	//Validación de parámetros obligatorios
	duration = typeof duration !== 'undefined' ? duration : "";
	if (duration === ""){ throw new EmptyValueException("duration");}
	link = typeof link !== 'undefined' ? link : "";
	if (link === ""){ throw new EmptyValueException("link");}
	if (link === 'undefined' || link === '') throw new EmptyValueException("link");
	if (/^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/.test (link) !== true){		
		throw new InvalidValueException("link", link);}

	//Declaracion de atributos
    var _duration = duration;
	var _link = link;
	var _audios = audios || []; //Array de string
	var _subtitles = subtitles || []; //Array de string

	//Declaracion de getter y setters
	Object.defineProperty(this, 'duration', {
		get:function(){
			return _duration;
		},
		set:function(value){
			value = typeof duration !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("duration");
            }else{
                _duration = value;
            }//Fin del if
        }		
	});
	
	Object.defineProperty(this, 'link', {
		get:function(){
			return _link;
		},
		set:function(value){
			value = typeof link !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("link");
            }else{
                _link = value;
            }//Fin del if
        }		
	});

	Object.defineProperty(this, 'audios', {
		get:function(){
			return _audios;
		},
		set:function(value){
			value = typeof audios !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("audios");
            }else{
                _audios = value;
            }//Fin del if
        }		
	});

	Object.defineProperty(this, 'subtitles', {
		get:function(){
			return _subtitles;
		},
		set:function(value){
			value = typeof subtitles !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("subtitles");
            }else{
                _subtitles = value;
            }//Fin del if
        }		
	});
}//Fin de Resource
Resource.prototype = {};
Resource.prototype.constructor = Resource;
Resource.prototype.toString = function(){
	return "Duracion: " + this.duration + " minutos. Enlace del recurso: " + this.link + ". Audio: [" + this.audios + "]. Subtitulos: [" + this.subtitles + "]";
};
Resource.prototype.getObject = function(){
	return {
		duration: this.duration,
		link: this.link,
		audios: this.audios,
		subtitles: this.subtitles
	};
};

//Funcion para crear Production que tiene herencia con Movie y Serie
(function(){ 
    //Seguro para no instanciar objetos tipo Production
	var abstractCreateLock = false; 

	//Constructor de production.
	function Production(title, publication, nationality = null, synopsis = null, image = null){
		//Validación clase abstracta
		if(abstractCreateLock){throw new AbstractClassException("Production");}		

		//Validación de parámetros obligatorios
		title = typeof title !== 'undefined' ? title : "";
		if (title === ""){ throw new EmptyValueException("title");}
        publication = typeof Date !== 'undefined' ? publication : "";
        if (publication === ""){ throw new InvalidValueException("publication", publication);}
        nationality = typeof nationality !== 'undefined' ? nationality : "";
		if (nationality === ""){ throw new InvalidValueException("nationality", nationality);}
		synopsis = typeof synopsis !== 'undefined' ? synopsis : "";
		if (synopsis === ""){ throw new InvalidValueException("synopsis", synopsis);}
		image = typeof image !== 'undefined' ? image : "";
		if (image === ""){ throw new InvalidValueException("image", image);}
		
        //Declaracion de atributos
        var _title = title; 
        var _nationality = nationality;
        var _publication = publication;
        var _synopsis = synopsis;
        var _image = image;

		//Declaracion de getter y setters
		Object.defineProperty(this, 'title', {
			get:function(){
				return _title;
			},
			set:function(value){
				value = typeof title !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new EmptyValueException("title");
                }else{
                    _title = value;
                }//Fin del if
			}		
		});

		Object.defineProperty(this, 'nationality', {
			get:function(){
				return _nationality;
			},
			set:function(value){
				value = typeof nationality !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new EmptyValueException("nationality");
                }else{
                    _nationality = value;
                }//Fin del if
			}		
		});

		Object.defineProperty(this, 'publication', {
			get:function(){
				return _publication;
			},
			set:function(value){
				value = typeof Date !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new InvalidValueException("publication", publication);
                }else{
                    _publication = value;
                }//Fin del if
			}		
		});

		Object.defineProperty(this, 'synopsis', {
			get:function(){
				return _synopsis;
			},
			set:function(value){
				value = typeof synopsis !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new EmptyValueException("sypnosis");
                }else{
                    _synopsis = value;
                }//Fin del if
			}		
		});

		Object.defineProperty(this, 'image', {
			get:function(){
				return _image;
			},
			set:function(value){
				value = typeof image !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new EmptyValueException("image");
                }else{
                    _image = value;
                }//Fin del if
			}		
		});
	}//Fin de  la funcion Production
	Production.prototype = {}; 
	Production.prototype.constructor = Production;
	//Se define toString con los datos
	Production.prototype.toString = function(){
		return "Titulo: " + this.title + ". Nacionalidad: " + this.nationality + ". Fecha publicacion: " + this.publication + ". Sipnosis: " + this.synopsis + ". Imagen: " + this.image + ".";
	}
	Production.prototype.getObject = function(){
		return {
			title: this.title,
			nationality: this.nationality,
			publication: this.publication,
			synopsis: this.synopsis,
			image: this.image
		};
	};

	//Definimos la subclase MOvie que hereda de Production y Representa un recurso película que podremos reproducir en el sistema
	function Movie(title, nationality, publication, synopsis, image, resource = null, locations = null){
		//Llamada al superconstructor. Debemos desactivar el seguro para realizarla.
		abstractCreateLock = false;
		Production.call(this,title, nationality, publication, synopsis, image, resource, locations);
		abstractCreateLock = true;

		//La función se invoca con el operador new
		if (!(this instanceof Movie)) {
			throw new InvalidAccessConstructorException();}

		//Declaracion de atributos
		var _resource = resource;
		var _locations = locations;
		//Se ha creado en la practica 8
		var tipo = "Movie";

		//Declaracion de getter y setters
		Object.defineProperty(this, 'resource', {
			get:function(){
				return _resource;
			},
			set:function(value){
				value = typeof Resource !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new InvalidValueException("resource", resource);
                }else{
                    _resource = value;
                }//Fin del if
			}		
        });		
        
        Object.defineProperty(this, 'locations', {
			get:function(){
				return _locations;
			},
			set:function(value){
				value = typeof Coordinate !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new InvalidValueException("locations", locations);
                }else{
                    _locations = value;
                }//Fin del if
			}		
		});	
		//Añadido en la practica 8
		Object.defineProperty(this, 'tipo', {
			get:function(){
				return tipo;
			}		
        });
    }//Fin de la funcion Movie
    //Definimos la herencia
	Movie.prototype = Object.create(Production.prototype); 
	Movie.prototype.constructor = Movie;
	Movie.prototype.toString = function(){
		return Production.prototype.toString.call(this) + " Recurso: [" + this.resource + "]. Coordenadas: [" + this.locations + "]";
	}
	Movie.prototype.getObject = function(){
		return {
			tipo: this.tipo,
			title: this.title,
			nationality: this.nationality,
			publication: this.publication,
			synopsis: this.synopsis,
			image: this.image,
			resource: this.resource,
			locations: this.locations
		};
	};

	//Definimos la subclase serie que hereda de Production y representa un recurso serie que podremos reproducir
	function Serie(title, nationality, publication, synopsis, image, seasons = null){
		//Llamada al superconstructor. Debemos desactivar el seguro para realizarla.
		abstractCreateLock = false;
		Production.call(this, title, nationality, publication, synopsis, image, seasons);	
		abstractCreateLock = true;

		//La función se invoca con el operador new
		if (!(this instanceof Serie)) {
			throw new InvalidAccessConstructorException();}

		//Declaracion de atributos
		var _seasons = seasons || [];
		//Se ha añadido en la practica 8
		var tipo = "Serie";

		//Declaracion de getter y setters
		Object.defineProperty(this, 'season', {
			get:function(){
				return _seasons;
			},
			set:function(value){
				value = typeof Season !== 'undefined' ? value : "";
		        if (value === ""){
                    throw new InvalidValueException("season", season);
                }else{
                    _seasons = value;
                }//Fin del if
			}		
		});		
		//Añadido en la practica 8
		Object.defineProperty(this, 'tipo', {
			get:function(){
				return tipo;
			}		
        });	
    }//Fin de la funcion Serie
    //Definimos la herencia
	Serie.prototype = Object.create(Production.prototype); 
	Serie.prototype.constructor = Serie;
	Serie.prototype.toString = function(){
		return Production.prototype.toString.call(this) + " Temporadas: [" + this.season + "]";
	}
	Serie.prototype.getObject = function(){
		return {
			tipo: this.tipo,
			title: this.title,
			nationality: this.nationality,
			publication: this.publication,
			synopsis: this.synopsis,
			image: this.image,
			season: this.season,
		};
	};

	abstractCreateLock = true; //Activamos el seguro

	//Devolvemos constructores
	window.Production = Production; 
	window.Movie = Movie; 
	window.Serie = Serie;  
})();//Fin de la clase abstracta y las subclases

//Definimos la clase season que representa una temporada de una serie.
function Season(title, episodes = null){
		//La función se invoca con el operador new
		if (!(this instanceof Season)) {
			throw new InvalidAccessConstructorException();}
		
			//Validación de parámetros obligatorios
		title = typeof title !== 'undefined' ? title : "";
		if (title === ""){ throw new EmptyValueException("title");}
	
		//Declaracion de atributos
		var _title = title;
		var _episodes = episodes || [];
	
		//Declaracion de getter y setters
		Object.defineProperty(this, 'title', {
			get:function(){
				return _title;
			},
			set:function(value){
				value = typeof title !== 'undefined' ? value : "";
				if (value === ""){
					throw new EmptyValueException("title");
				}else{
					_title = value;
				}//Fin del if
			}		
		});		
	
		Object.defineProperty(this, 'episodes', {
			get:function(){
				return _episodes;
			},
			set:function(value){
				value = typeof episodes !== 'undefined' ? value : "";
				if (value === ""){
					throw new EmptyValueException("episodes");
				}else{
					_episodes = { 
						title: String, 
						episode: Resource, 
						scenarios: [Location] 
					};
				}//Fin del if
			}		
		});

}//Fin de la funcion Serie
Season.prototype = {};
Season.prototype.constructor = Season;
Season.prototype.toString = function(){
	return this.title + ". Episodios: ["+ this.episodes.title + "]";
};
Season.prototype.getObject = function(){
	return {
		title: this.title,
		episodes: this.episodes.title
	};
};

//Objeto para identificar los datos de una persona.
function User(userName, email, password) {
	//La función se invoca con el operador new
	if (!(this instanceof User)) {
		throw new InvalidAccessConstructorException();}
	
		//Validación de parámetros obligatorios
	userName = typeof userName !== 'undefined' ? userName : "";
	if (userName === ""){ throw new EmptyValueException("userName");}
    if (email === 'undefined' || email === '') throw new EmptyValueException("email");	
	if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]\@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test (email) !== true)
		throw new InvalidValueException("email", email);
    password = typeof password !== 'undefined' ? password : "";
    if (password === ""){ throw new EmptyValueException("password");}

    //Declaracion de atributos
    var _userName = userName;
    var _email = email;
    var _password = password;


    //Declaracion de getter y setters
	Object.defineProperty(this, 'userName', {
		get:function(){
			return _userName;
		},
		set:function(value){
			value = typeof userName !== 'undefined' ? value : "";
		    if (uvalue === ""){
                throw new Error("No puedes dejar el nombre vacio");
            }else{
                _userName = value;
            }//Fin del if
        }		
    });
	
	Object.defineProperty(this, 'email', {
		get:function(){
			return _email;
		},
		set:function(value){
			value = typeof email !== 'undefined' ? value : "";
		    if (value === ""){
                throw new Error("No puedes dejar el mail vacio");
            }else{
                _email = value;
            }//Fin del if
        }		
    });

	Object.defineProperty(this, 'password', {
		get:function(){
			return _password;
		},
		set:function(value){
			value = typeof password !== 'undefined' ? value : "";
		    if (value === ""){
                throw new Error("No puedes dejar la contraseña vacia");
            }else{
                _password = value;
            }//Fin del if
        }		
	});
}//Fin de User
User.prototype = {};
User.prototype.constructor = User;
User.prototype.toString = function(){
	return "Nombre Usuario: " + this.userName + ". Email: "+ this.email + ". Pass: " + this.password;
};
User.prototype.getObject = function(){
	return {
		userName: this.userName,
		email: this.email,
		password: this.password
	};
};

//Objeto para identificar los datos de una persona.
function Coordinate(latitude, longitude) {
	//La función se invoca con el operador new
	if (!(this instanceof Coordinate)) {
		throw new InvalidAccessConstructorException();}

    //Validación de parámetros obligatorios
	latitude = typeof latitude !== 'undefined' ? latitude : "";
	if (latitude === ""){ throw new EmptyValueException("latitude");}
    longitude = typeof longitude !== 'undefined' ? longitude : "";
    if (longitude === ""){ throw new EmptyValueException("longitude");}
    
    //Declaracion de atributos
    var _latitude = latitude;
    var _longitude = longitude;

    //Declaracion de getter y setters
	Object.defineProperty(this, 'latitude', {
		get:function(){
			return _latitude;
		},
		set:function(value){
			value = typeof latitude !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("latitude");
            }else{
                _latitude = value;
            }//Fin del if
        }		
    });
	
	Object.defineProperty(this, 'longitude', {
		get:function(){
			return _longitude;
		},
		set:function(value){
			value = typeof longitude !== 'undefined' ? value : "";
		    if (value === ""){
                throw new EmptyValueException("longitude");
            }else{
                _longitude = value;
            }//Fin del if
        }		
    });
}//Fin de Coordinate
Coordinate.prototype = {};
Coordinate.prototype.constructor = Coordinate;
Coordinate.prototype.toString = function(){
	return "Latitude: " + this.latitude + ". Longitud: "+ this.longitude;
};
Coordinate.prototype.getObject = function(){
	return {
		latitude: this.latitude,
		longitude: this.longitude
	};
};