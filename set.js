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

    delTypes: function(){
      var deleteThis = [];
      for (var index = 0; index < arguments.length; index++) {
        var arg = arguments[index];
        for (var j = 0; j < this.length; j++) {
          var element = this[j];
          if(typeof(element) == arg){
            deleteThis.push(element)
          }
        }
        console.log(this)
      }
      console.log(deleteThis);

      for (var i = 0; i < deleteThis.length; i++) {
        var elm = deleteThis[i];
        this.splice(this.indexOf(elm), 1);
      }
    },

    rand: function(num){
      if(num != null){
        if(num > this.length){
          num = this.length;
        }
        var index = Math.floor(Math.random() * num);
        return this[index];
      } else {
        var index = Math.floor(Math.random() * this.length);
        return this[index];
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
    },

    types: function(){
      var result = [];

      //counts instances of types
      for (var index = 0; index < this.length; index++) {
        var element = this[index];
        if(!result.includes((typeof(element)))){
          result.push(typeof(element));
          result.push(1);
        } else {
          var indexToChange = result.indexOf(typeof(element));
          indexToChange += 1;
          var toChangeTo = ((result[indexToChange]) + 1);
          result[indexToChange] = toChangeTo;
        }
      };

      //concatanates strings
      for (var index = 0; index < result.length; index++) {
        var element = result[index];
        var next = result[index+1];
        if (typeof(element) ==  "string"){
          element += ": " + next;
          result[index] = element;
        }
      };

      //deletes numbers
      for (var index = 0; index < result.length; index++) {
        var element = result[index];
        if(typeof(element) == "number"){
          result.splice(result.indexOf(element), 1);
        }
      };
      return result;
    },

    mergeSort: function()
    {
      function merge(left, right)
      {
        var result = [];
    
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
    
        while (left.length)
            result.push(left.shift());
    
        while (right.length)
            result.push(right.shift());
    
        return result
      }
      if (this.length < 2)
          return this;
  
      var middle = parseInt(this.length / 2);
      var left   = this.slice(0, middle);
      var right  = this.slice(middle, this.length);
  
      return merge(left, right);
    }
  } //end Set.prototype

  return(Set);

}();

