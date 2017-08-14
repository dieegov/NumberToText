/*
 NumberToText v0.0.1
 (c) Diego Vieira, diegovieira@wstudios.net
 https://github.com/dieegov/NumberToText.git
 License: MIT
*/

'use strict';

var NTT = (function(){
  var vm = {};

  vm.numerals = [
    {value: 0, name: ''},
      {value: 1, name: "um"},
      {value: 2, name: "dois"},
      {value: 3, name: "três"},
      {value: 4, name: "quatro"},
      {value: 5, name: "cinco"},
      {value: 6, name: "seis"},
      {value: 7, name: "sete"},
      {value: 8, name: "oito"},
      {value: 9, name: "nove"},
      {value: 10, name: "dez"},
      {value: 11, name: "onze"},
      {value: 12, name: "doze"},
      {value: 13, name: "treze"},
      {value: 14, name: "quatorze"},
      {value: 15, name: "quinze"},
      {value: 16, name: "dezesseis"},
      {value: 17, name: "dezessete"},
      {value: 18, name: "dezoito"},
      {value: 19, name: "dezenove"},
      {value: 20, name: "vinte"},
      {value: 30, name: "trinta"},
      {value: 40, name: "quarenta"},
      {value: 50, name: "cinquenta"},
      {value: 60, name: "sessenta"},
      {value: 70, name: "setenta"},
      {value: 80, name: "oitenta"},
      {value: 90, name: "noventa"},
      {value: 100, name: "cem", secondaryName: "cento"},
      {value: 200, name: "duzentos"},
      {value: 300, name: "trezentos"},
      {value: 400, name: "quatrocentos"},
      {value: 500, name: "quinhentos"},
      {value: 600, name: "seiscentos"},
      {value: 700, name: "setecentos"},
      {value: 800, name: "oitocentos"},
      {value: 900, name: "novecentos"},
      {value: 1000, name: "mil"},
      {value: 10000000, name: "milhão", secondaryName: "milhões"},
      {value: 1000000000, name: "bilhão", secondaryName: "bilhões"},
      {value: 100000000000, name: "trilhão", secondaryName: "trilhões"},
      {value: 10000000000000, name: "quadrilhão", secondaryName: "quadrilhões"},
  ];

  vm.toText = function(value) {
    var currentValue = parseFloat(value),
    returnString = ""
    ;

    if(isNaN(currentValue)) {
      console.error("Not a number");
      return "Not a number";
    }

    var extenso = ""; 
    
    var n = findText(currentValue);
    var div = Math.floor(currentValue / n.value);
    var mod = currentValue % n.value;

    var a = findText(div);
    extenso = `${div > 1 ? a.name : ''} ${mod > 0 & n.secondaryName != undefined ? n.secondaryName : n.name}`;

    while(mod > 0) {
      var g = findText(mod);
      mod = mod % g.value;
      extenso = `${extenso} ${mod == 0 || mod < 10 ? 'e' : ''} ${mod > 0 & g.secondaryName != undefined ? g.secondaryName : g.name}`;
    }

    function findText(value) {
      for(let i = 0; i < vm.numerals.length; i++) {
        var currentElement = vm.numerals[i];
        var nextIndex = i + 1;
        var nextElement = i > 0 && nextIndex < vm.numerals.length ? vm.numerals[nextIndex] : undefined;
        
        if (value === currentElement.value) {
          return currentElement;
        }
        else {
          if(nextElement !== undefined) {
            if (value === nextElement.value) {
              return nextElement;
            } else {
              if (value > currentElement.value && value < nextElement.value) {
                return currentElement;
              }
            }
          }
        }
      }
    }
    return extenso.replace(/^\s+|\s+$/g, '');
  };

  return vm;
})(NTT);
