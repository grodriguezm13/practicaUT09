//Excepción base para ir creando el resto de excepciones.
function BaseException() {
}

BaseException.prototype = new Error(); //Herencia del objeto Error.
BaseException.prototype.constructor = BaseException; //Definimos el constructor
//Sobrescribimos el método toString para personalizarlos
BaseException.prototype.toString = function(){
	// note that name and message are properties of Error
	return this.name + ": " + this.message;
};

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
	this.name = "InvalidAccessConstructorException";
	this.message = "El constructor no puede ser llamado con una funcion.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepciones de validación de parámetros. Reutilizables en todas las clases
function ParameterValidationException() {
	this.name = "ParameterValidationException";
	this.message = "Error: Parametro invalido.";
}
ParameterValidationException.prototype = new BaseException(); 
ParameterValidationException.prototype.constructor = ParameterValidationException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
	this.name = "EmptyValueException";
	this.message = "Error: El parametro " + param + " no puede estar vacio.";
}
EmptyValueException.prototype = new ParameterValidationException(); //Heredamos de ParameterValidationException
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepción de valor inválido
function InvalidValueException(param, value) {
	this.name = "InvalidValueException";
	this.message = "Error: El parametro " + param + " tiene un valor invalido. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = new ParameterValidationException(); //Heredamos de ParameterValidationException
InvalidValueException.prototype.constructor = InvalidValueException;

//Excepción acceso inválido a constructor
function UninstantiatedObjectException(param) {
	this.name = "UninstantiatedObjectException";
	this.message = "No puede instanciar " + param + " objeto.";
}
UninstantiatedObjectException.prototype = new BaseException(); 
UninstantiatedObjectException.prototype.constructor = UninstantiatedObjectException;

//Excepción intento de instacia clase abstracta
function AbstractClassException(classValue) {
	this.name = "AbstractClassException";
	this.message = classValue + " es una clase abstracta.";
}
AbstractClassException.prototype = new BaseException(); 
AbstractClassException.prototype.constructor = AbstractClassException;

/* A PARTIR DE AQUI SE USAN EN VIDEOSYSTEM.JS */
function CategoryExistsException() {
	this.name = "CategoryExistsException";
	this.message = "Error: La categoria ya existe.";
}
CategoryExistsException.prototype = new BaseException();
CategoryExistsException.prototype.constructor = CategoryExistsException;

function CategoryNotExistsException() {
	this.name = "CategoryNotExistsException";
	this.message = "Error: La categoria no existe.";
}
CategoryNotExistsException.prototype = new BaseException();
CategoryNotExistsException.prototype.constructor = CategoryNotExistsException;

function InvalidParamException(param) {
	this.name = "InvalidParamException";
	this.message = "Error: El parametro debe ser de tipo "+param+".";
}
InvalidParamException.prototype = new BaseException();
InvalidParamException.prototype.constructor = InvalidParamException;

function NullParamException(param) {
	this.name = "NullParamException";
	this.message = "Error: El parametro "+param+" no puede ser nulo";
}
NullParamException.prototype = new BaseException();
NullParamException.prototype.constructor = NullParamException;

function UserExistsException(param) {
	this.name = "UserExistsException";
	this.message = "Error: Ya existe un usuario con ese "+ param +".";
}
UserExistsException.prototype = new BaseException();
UserExistsException.prototype.constructor = UserExistsException;

function UserNotExistsException() {
	this.name = "UserNotExistsException";
	this.message = "Error: El usuario no existe.";
}
UserNotExistsException.prototype = new BaseException();
UserNotExistsException.prototype.constructor = UserNotExistsException;

function ProductionExistsException() {
	this.name = "ProductionExistsException";
	this.message = "Error: La produccion ya existe.";
}
ProductionExistsException.prototype = new BaseException();
ProductionExistsException.prototype.constructor = ProductionExistsException;

function ProductionNotExistsException() {
	this.name = "ProductionNotExistsException";
	this.message = "Error: La produccion no existe.";
}
ProductionNotExistsException.prototype = new BaseException();
ProductionNotExistsException.prototype.constructor = ProductionNotExistsException;

function ActorExistsException(param) {
	this.name = "ActorExistsException";
	this.message = "Error: Ya existe un actor con ese "+ param +".";
}
ActorExistsException.prototype = new BaseException();
ActorExistsException.prototype.constructor = ActorExistsException;

function ActorNotExistsException() {
	this.name = "ActorNotExistsException";
	this.message = "Error: El actor no existe.";
}
ActorNotExistsException.prototype = new BaseException();
ActorNotExistsException.prototype.constructor = ActorNotExistsException;

function DirectorExistsException(param) {
	this.name = "DirectorExistsException";
	this.message = "Error: Ya existe un director con ese "+ param +".";
}
DirectorExistsException.prototype = new BaseException();
DirectorExistsException.prototype.constructor = DirectorExistsException;

function DirectorNotExistsException() {
	this.name = "DirectorNotExistsException";
	this.message = "Error: El director no existe.";
}
DirectorNotExistsException.prototype = new BaseException();
DirectorNotExistsException.prototype.constructor = DirectorNotExistsException;

function AssignActorException() {
	this.name = "AssignActorException";
	this.message = "Error: El actor ya tiene asignada esa produccion.";
}
AssignActorException.prototype = new BaseException();
AssignActorException.prototype.constructor = AssignActorException;

function AssignDirectorException() {
	this.name = "AssignDirectorException";
	this.message = "Error: El director ya tiene asignada esa produccion.";
}
AssignDirectorException.prototype = new BaseException();
AssignDirectorException.prototype.constructor = AssignDirectorException;

function AssignCategoryException() {
	this.name = "AssignCategoryException";
	this.message = "Error: La categoria ya tiene asignada esa produccion.";
}
AssignCategoryException.prototype = new BaseException();
AssignCategoryException.prototype.constructor = AssignCategoryException;