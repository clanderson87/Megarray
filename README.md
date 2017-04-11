# Megarray

So we've all been there: using javascript arrays and just wished they were a little easier to work with.

## Enter Megarray

Megarray is a small object built on top of the Array Prototype - NOT EXTENDED - that gives common array functionality via simple dot notation. Megarray methods actually alter the Megarray instead of returning a new filtered Array. This cleans code and keeps variables to a minimum. 

## Things Megarray can do:

1. Megarray.add(object, "string", number, boolean);
  * wrapper for Array.push. One less letter, a little more clear.

2. Megarray.del(thingToDelete);
  * easy methodology for deleting elements from an array. No more .slice.

3. Megarray.delTypes(dataType);
  * deletes all occurances of specified dataTypes within the Megarray.

4. Megarray.getObjByPropValue(property, value)
  * returns a Megarray of objects with the specified property AND value.

5. Megarray.limit(number)
  * limits the Megarray to the specified length. Defaults to 3.

6. Megarray.limitToTypes(dataTypes)
  * limits the Megarray to the specified dataTypes.

7. Megarray.mergeSort()
  * sorts the Megarray.

8. Megarray.nuke()
  * deletes everything within the Megarray, without deleting the Megarray.

9. Megarray.omit(value, callbackFunction)
  * omits the specified value(s) from the callback function, which is enacted upon every element within the Megarray not specified.

10. Megarray.omitTypes(dataTypes, callbackFunction)
  * omits all instances of the specified dataTypes from the callbackFunction.

11. Megarray.rand()
  * returns a random index from the Megarray.

12. Megarray.randSubset(subsetLength)
  * returns a random subset from within the Megarray. If a number is specified, then the returned subset is that length. If not, default is 3.

13. Megarray.revert()
  * reverts the Megarray back to the saved state made with Megarray.safety().

14. Megarray.safety();
  * saves a copy of the contents of the Megarray at that current point. Since Megarray methods actually modify the Megarray (instead of returning a seperate array), Megarray.safety() creates a 'safe state' accessable by Megarray.revert().

15. Megarray.shuffle();
  * shuffles the elements within the Megarray.

16. Megarray.types()
  * console.logs a string denoting the types and number of those types.

17. Megarray.unique()
  * returns a filtered Megarray with no duplicates.
