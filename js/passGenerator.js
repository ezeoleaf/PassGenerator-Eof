cantOfNumbers = 0;
cantOfUpper = 0;
cantOfLower = 0;
cantOfSymbol = 0;
maxLong = 0;
var vDigitsPass = [];
var check;
var dictionary = {};
var excludedSymbols = [];

function newDigits()
{
	newDigit = "";
	for(var i = 1; i <= 8; i++)
	{
		newDigit = (i == 1) ? (newDigit + "0") : (newDigit + Math.floor(Math.random() * 2));
	}
	return newDigit;
}

function setDictionary()
{

	numberDictionary = {
		"00110000": "0",
		"00110001": "1",
		"00110010": "2",
		"00110011": "3",
		"00110100": "4",
		"00110101": "5",
		"00110110": "6",
		"00110111": "7",
		"00111000": "8",
		"00111001": "9",
	}

	symbolDictionary = {
		"00100001": "!",
		"00100011": "#",
		"00100100": "$",
		"00100101": "%",
		"00100110": "&",
		"00101010": "*",
		"00101011": "+",
		"00101101": "-",
		"00101110": ".",
		"00101111": "/",
		"00111010": ":",
		"00111011": ";",
		"00111101": "=",
		"00111111": "?",
		"01000000": "@",
		"01011011": "[",
		"01011101": "]",
		"01011111": "_",
		"01111110": "~",
	}
	
	letterUDictionary = {
		"01000001": "A",
		"01000010": "B",
		"01000011": "C",
		"01000100": "D",
		"01000101": "E",
		"01000110": "F",
		"01000111": "G",
		"01001000": "H",
		"01001001": "I",
		"01001010": "J",
		"01001011": "K",
		"01001100": "L",
		"01001101": "M",
		"01001110": "N",
		"01001111": "O",
		"01010000": "P",
		"01010001": "Q",
		"01010010": "R",
		"01010011": "S",
		"01010100": "T",
		"01010101": "U",
		"01010110": "V",
		"01010111": "W",
		"01011000": "X",
		"01011001": "Y",
		"01011010": "Z",
	}
	
	letterLDictionary =	{
		"01100001": "a",
		"01100010": "b",
		"01100011": "c",
		"01100100": "d",
		"01100101": "e",
		"01100110": "f",
		"01100111": "g",
		"01101000": "h",
		"01101001": "i",
		"01101010": "j",
		"01101011": "k",
		"01101100": "l",
		"01101101": "m",
		"01101110": "n",
		"01101111": "o",
		"01110000": "p",
		"01110001": "q",
		"01110010": "r",
		"01110011": "s",
		"01110100": "t",
		"01110101": "u",
		"01110110": "v",
		"01110111": "w",
		"01111000": "x",
		"01111001": "y",
		"01111010": "z",
	}
}

function getValue(binaryCode)
{
	digitToReturn = "";
	
	digitToReturn = dictionary[binaryCode];
	if(digitToReturn == null)
	{
		getValue(newDigits());
	}
	else
	{
		if($.inObject(digitToReturn, symbolDictionary) != null)
		{
			cantOfSymbol = 1;
		}
		if($.inObject(digitToReturn, numberDictionary) != null)
		{
			cantOfNumbers = 1;
		}
		if($.inObject(digitToReturn, letterUDictionary) != null)
		{
			cantOfUpper = 1;
		}
		if($.inObject(digitToReturn, letterLDictionary) != null)
		{
			cantOfLower = 1;
		}
	}
	
	return digitToReturn;
}

$.inObject = function(value, obj) {
	var foundKey;
	$.each(obj, function(key, val) {
		if (value === val) {
			foundKey = key;
			return;
		}
	});
	return foundKey;
};


function getPass(longPass)
{
	cantOfLower = 0;
	cantOfNumbers = 0;
	cantOfSymbol = (check == 0) ? 1 : 0;
	cantOfUpper = 0;
	countOfDigits = 0;
	digitsToAdd = "";
	finalPass = "";
	vDigitsPass.length = 0;
	cantOfDigitsPass = longPass * 8;
	for(var i = 1; i <= cantOfDigitsPass; i++)
	{
		countOfDigits++;
		digit = (countOfDigits == 1) ? 0 : (Math.floor(Math.random() * 2));
		digitsToAdd += digit;

		if(countOfDigits == 8)
		{
			vDigitsPass.push(digitsToAdd);
			countOfDigits = 0;
			digitsToAdd = "";
			finalPass += getValue(vDigitsPass[i]);
		}
	}
	
	if(cantOfLower == 1 && cantOfNumbers == 1 && cantOfSymbol == 1 && cantOfUpper == 1)
	{
		$('#resultContainer').html(finalPass);
	}
	else
	{
		getPass(longPass);
	}
}

function loadDictionaries()
{
	dictionary = {};

	if(check == 1)
	{
		$.each( symbolDictionary, function( key, value ) {
			if($.inArray(key, excludedSymbols) == -1)
			{
				dictionary[key] = value;
			}
		});
		cantOfSymbol = 0;
	}
	else
	{
		cantOfSymbol = 1;
	}

	cantOfNumbers = 0;
	cantOfUpper = 0;
	cantOfLower = 0;

	$.each( numberDictionary, function( key, value ) {
		if($.inArray(key, excludedSymbols) == -1)
		{
			dictionary[key] = value;
		}
	});
	$.each( letterUDictionary, function( key, value ) {
		if($.inArray(key, excludedSymbols) == -1)
		{
			dictionary[key] = value;
		}
	});
	$.each( letterLDictionary, function( key, value ) {
		if($.inArray(key, excludedSymbols) == -1)
		{
			dictionary[key] = value;
		}
	});
}

function loadSimbols()
{
	check = $('#fullOrNumberAndChar:checked').val();
	if(check == 0)
	{
		$('#symbolsPanel').hide();
	}
	else
	{
		$('#symbolsPanel').show();	
	}
}

function getNumberValue(val)
{
	if($.inObject(val, symbolDictionary) != null)
		{
			return 1; //Symbol
		}
		if($.inObject(val, numberDictionary) != null)
		{
			return 2; //Number
		}
		if($.inObject(val, letterUDictionary) != null)
		{
			return 3; //Character
		}
		if($.inObject(val, letterLDictionary) != null)
		{
			return 3; //Character
		}
}

function popSimbol(nameSimbol,simbolKey, simbolValue)
{
	simbolCheck = $('#'+nameSimbol).is(':checked');
	if(simbolCheck == false)
	{
		delete dictionary[simbolKey];
		excludedSymbols.push(simbolKey);
	}
	else
	{
		dictionary[simbolKey] = simbolValue;
		excludedSymbols.splice($.inArray(simbolKey,excludedSymbols), 1);
	}
}

function controlCantOfSimbols()
{
	loadDictionaries();
	$.each(dictionary, function(key,value){
		if($.inObject(value, symbolDictionary) != null)
		{
			cantOfSymbol = 1;
		}
		if($.inObject(value, numberDictionary) != null)
		{
			cantOfNumbers = 1;
		}
		if($.inObject(value, letterUDictionary) != null)
		{
			cantOfUpper = 1;
		}
		if($.inObject(value, letterLDictionary) != null)
		{
			cantOfLower = 1;
		}
	});
	if(cantOfLower == 1 && cantOfNumbers == 1 && cantOfSymbol == 1 && cantOfUpper == 1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function loadAccordion()
{
	var htmlToAdd = '';
	var thisDictionary = {};
	var limit,title;
	for(var i = 1; i <= 4; i++)
	{

		var countCant = 0;
		switch(i)
		{
			case 1:
				thisDictionary = letterUDictionary;
				limit = 7;
				title = 'Uppercase Letters';
				idToAdd = 'uCPanel';
				hrefToAdd = 'collapseUL';
				break;
			case 2:
				thisDictionary = letterLDictionary;
				limit = 7;
				title = 'Lowercase Letters';
				idToAdd = 'uLPanel';
				hrefToAdd = 'collapseLL';
				break;
			case 3:
				thisDictionary = numberDictionary;
				limit = 5;
				title = 'Numbers';
				idToAdd = 'numbersPanel';
				hrefToAdd = 'collapseNumbers';
				break;
			case 4:
				thisDictionary = symbolDictionary;
				limit = 7;
				title = 'Symbols';
				idToAdd = 'symbolsPanel';
				hrefToAdd = 'collapseSymbol';
				break;
		}

		htmlToAdd += '<div class="panel panel-default" id="'+idToAdd+'"><div class="panel-heading"><a data-toggle="collapse" href="#'+hrefToAdd+'"><h4 class="panel-title text-center">'+title+'</h4></a></div><div id="'+hrefToAdd+'" class="panel-collapse collapse"><div class="panel-body"><div class="row col-xs-12 col-md-8 col-md-offset-2" align="center"><table class="table"><tr>';

		$.each(thisDictionary, function(key,value){
			if(countCant == limit)
			{
				countCant = 0;
				htmlToAdd += '</tr>';
				htmlToAdd += '<tr>';
			}

			countCant++;
			nameCheck = "checkSimbol"+key;
			htmlToAdd += '<td><label class="checkbox-inline"><input type="checkbox"  id="'+nameCheck+'" name="'+nameCheck+'" onchange="popSimbol('+"'"+nameCheck+"'"+','+"'"+key+"'"+','+"'"+value+"'"+')" checked > '+value+'</label></td>';
		});
		htmlToAdd += '</table></div></div></div></div>';
	}

	$('#accordionPanel').html(htmlToAdd);
}

function generate()
{
	var longValue = $('#longPassValue').val();
	var check = $('#fullOrNumberAndChar:checked').val();
	
	if(longValue == 0 || longValue == "" || longValue < 6 || longValue > 60)
	{
		$('#longPassValue').focus();
		showNoty('The password length has to be greater than 5!');
	}
	else
	{
		if(controlCantOfSimbols())
		{
			loadDictionaries();
			getPass(longValue);
		}
		else
		{
			$('#resultContainer').html('');

			var text = (check==0) ? 'Check at least one number and one character!' : 'Check at least one number, one character and one symbol!';

			showNoty(text);
		}
	}
}

function showNoty(text)
{
	var n = noty({
		text: text,
		type: 'danger',
		theme: 'defaultTheme', // or 'relax'
		template: '<div class="noty_message bg-danger"><span class="glyphicon glyphicon-warning-sign" style="color: white" aria-hidden="true"></span><b><span class="noty_text"></span><div class="noty_close"></b></div></div>',
		animation: {
			open: 'animated pulse', // Animate.css class names
			close: 'animated bounceOutLeft', // Animate.css class names
			easing: 'swing', // easing
			speed: 500 // opening & closing animation speed
		},
		timeout: 3000,
	});
}