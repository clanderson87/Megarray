window.Set = function() {
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
      while(this.includes(value)){
        this.splice(this.indexOf(value), 1);
      } 
      return this;
    },

    delAll: function(){
      for (var index = 0; index < arguments.length; index++) {
        var element = arguments[index];
        if(this.includes(element) == true){
          this.splice(this.indexOf(element), 1)
        }
      }
      return this;
    },

    delTypes: function(){
      var deleteThis = new Set();
      for (var index = 0; index < arguments.length; index++) {
        var arg = arguments[index];
        for (var j = 0; j < this.length; j++) {
          var element = this[j];
          if(typeof(element) == arg){
            deleteThis.push(element)
          }
        }
      }
      for (var i = 0; i < deleteThis.length; i++) {
        var elm = deleteThis[i];
        this.splice(this.indexOf(elm), 1);
      }
      return this;
    },

    getObjByPropValue: function(prop, value){
      var result = new Set();
      for (var index = 0; index < this.length; index++) {
        var element = this[index];
        if(typeof(element) == "object"){
          if(element.hasOwnProperty(prop)){
            if (element[prop] == value){
              result.push(element);
            }
          }
        }
      }
      return result;
    },

    limit: function(num){
      while(this.length > num){
        this.pop();
      }
      return this;
    },

    limitToType: function(type){
      var result = new Set();
      for (var i = 0; i < this.length; i++) {
        var element = this[i];
        if(typeof(element) == type){
          result.push(element);
        }
      }
      this.nuke();
      this.addAll(result);
      return this;
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
        while (left.length){
          result.push(left.shift());
        }
        while (right.length){
          result.push(right.shift());
        }
        return result;
      }
      if (this.length < 2){
        return this;
      }
      var middle = parseInt(this.length / 2);
      var left   = this.slice(0, middle);
      var right  = this.slice(middle, this.length);
      this.nuke();
      result = merge(left, right);
      for (var i = 0; i < result.length; i++) {
        var element = result[i];
        this.push(element);
      }
      return this;
    },

    nuke: function(){
      this.splice(0, this.length);
      return this;
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

    omitTypes: function(typesArray, callback){
      if(callback == null){
        callback = function(e){
          console.log(e)
        }
      }
      for (var i = 0; i < this.length; i++) {
        var element = this[i];
        if(typesArray.includes(typeof(element))){
          continue;
        }
        else {
          callback(element);
        }
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

    randSubset: function(num){
      if (num == null){
        num = 3;
      }
      else if (num > this.length) {
        num = this.length;
      }
      var index = Math.floor(Math.random() * this.length);
      console.log(index);
      var returned = new Set();
      var split = Math.ceil(num/2);
      while(returned.length < num){
        if(!((index - split) < 0) && !((index - split) > this.length - 1)){
          returned.push(this[index - split]);
        }
        else if((index - split) > this.length){
          console.log(this.indexOf(returned[0]));
          returned.unshift(this[this.indexOf(returned[0]) - 1]);
        }
        split--;
      }
      return returned;
    },

    types: function(){
      var result = new Set();
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
    }

  } //end Set.prototype

  return(Set);

}();

