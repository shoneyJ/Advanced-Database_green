var emp=function() {

    var name= "Mayank";
    var age = 30;
    var designation = "Developer";
    var salary = 10000;
  
    var calculateBonus = function(amount) {
      salary = salary + amount;
    }
  
    return {
      name: name,
      age: age,
      designation: designation,
      calculateBonus: calculateBonus
    }
  }

  exports.emp = emp;
  


