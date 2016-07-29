window.Megarray = function() {
  function Megarray() {
    //building off base JS Array class
    var megarray = Object.create(Array.prototype);
    //calls the Array constructor. Megarray becomes this, arguments are passed to this.
    megarray = (Array.apply(megarray, arguments) || megarray);
    Megarray.InjectMethods(megarray);
    return (megarray);
  }

  Megarray.InjectMethods = function(megarray){
    for (var method in Megarray.prototype){
      //if method is local
      if(Megarray.prototype.hasOwnProperty(method)){
        //adds method to Megarray
        megarray[method] = Megarray.prototype[method];
      }
    }
    //returns the megarray with methods injected
    return(megarray);
  }
  
  Megarray.fromArray = function(array){
    //creates new Megarray from the array
    var megarray = Megarray.apply( null, array );
    //returns the Megarray
    return(megarray);
  };

  console.log("Megarray construction occurred!");

  Megarray.isArray = function( value ){
    var stringValue = Object.prototype.toString.call( value );
    return( stringValue.toLowerCase() === "[object array]" );
  };

  Megarray.prototype = {

    add: function(){
      for (var i = 0 ; i < arguments.length ; i++){
        this.push(arguments[ i ]);
      }
      return( this );
    },

    del: function(){
      for (var index = 0; index < arguments.length; index++) {
        var element = arguments[index];
        while(this.includes(element)){
          this.splice(this.indexOf(element), 1)
        }
      }
      return this;
    },

    delTypes: function(){
      var deleteThis = new Megarray();
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
      var result = new Megarray();
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

    limitToTypes: function(){
      var result = new Megarray();
      if(arguments.length == 0){
        console.log("please specify a data type");
        return this;
      }
      for (var a = 0; a < arguments.length; a++) {
        var arg = arguments[a];
        for (var i = 0; i < this.length; i++) {
          var element = this[i];
          if(typeof(element) == arg){
            result.push(element);
          }
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

    randSubMegarray: function(num){
      if (num == null){
        num = 3;
      }
      else if (num > this.length) {
        num = this.length;
      }
      var index = Math.floor(Math.random() * this.length);
      var returned = new Megarray();
      var split = Math.ceil(num/2);
      while(returned.length < num){
        if(!((index - split) < 0) && !((index - split) > this.length - 1)){
          returned.push(this[index - split]);
        }
        else if((index - split) > this.length){
          returned.unshift(this[this.indexOf(returned[0]) - 1]);
        }
        split--;
      }
      return returned;
    },

    revert: function(){
      this.nuke();
      for (var index = 0; index < this.safe.length; index++) {
        var element = this.safe[index];
        this.push(element);
      }
      return this;
    },

    safe: new Megarray(),

    safety: function(){
      if(this.safe.length != 0){
        this.safe.splice(0, this.safe.length);
      }
      for (var index = 0; index < this.length; index++) {
        var element = this[index];
        this.safe.push(element);
      }
      console.log(this.safe);
      return this;
    },

    types: function(){
      var result = new Megarray();
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
      console.log(result.join(', '));
      return this;
    },

    unique: function(){
      for (var index = 0; index < this.length; index++) {
        var element = this[index];
        while(this.indexOf(element) != this.lastIndexOf(element)){
          this.splice(this.lastIndexOf(element), 1);
        }
      }
      return this;
    }

  } //end Megarray.prototype

  return(Megarray);

}();

