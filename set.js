window.Set = function() {

  //constructing sets

  function Set() {
    //building off base JS Array class
    var set = Object.create(Array.prototype);
    set = (Array.apply(set, arguments) || set);
    Set.InjectMethods(set);
    return (set);
  }

  Set.InjectMethods = function(set){
    for (var method in Set.prototype){
      if(Set.prototype.hasOwnProperty(method)){
        set[method] = Set.prototype[method];
      }
    }
    return(set);
  }
  
  Set.fromArray = function(array){
    var set = Set.apply( null, array );
    return(set);
  };

  console.log("Set construction occurred!");

  Set.isArray = function( value ){
    var stringValue = Object.prototype.toString.call( value );
    return( stringValue.toLowerCase() === "[object array]" );
  };

  Set.prototype = {
    add: function(value){
      if(Set.isArray(value)){
        for (var index = 0; index < value.length; index++) {
          var element = value[index];
          Array.prototype.push.call(this, element);
        }
      }
      else
      {
        Array.prototype.push.call(this, value);
      }

      return(this);
    },

    addAll: function(){
      for (var i = 0 ; i < arguments.length ; i++){
          this.add(arguments[ i ]);
      }
      return( this );
    },

    del: function(value){
      if(this.includes(value) == true){
        this.splice(this.indexOf(value), 1);
      }
    },

    delAll: function(){
      for (var index = 0; index < arguments.length; index++) {
        var element = arguments[index];
        if(this.includes(element) == true){
          this.splice(this.indexOf(element), 1)
        }
      }
    },

    omit: function(value, callback){
      if(callback == null){
        callback = function(elm){
          console.log(elm);
        }
      }
      for (var index = 0; index < this.length; index++) {
        var element = this[index];
        if(value == element){
          continue;
        }
        else
        {
          callback(element);
        }
      }
    }
  } //end Set.prototype

  return(Set);

}();

