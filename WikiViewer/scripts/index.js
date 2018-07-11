/**
 * Created By Amol
 */

var search = true; // Boolean variable, Usage: Check & Uncheck search button

/**Callback function: returns the response of API as object OBJ */
function foo(obj){
  /**
   * Condition Usage: 
   * If search button is triggered and API response has query pages 
   * 
   */
  if(search && obj.hasOwnProperty('query')){
    
    /**Change Search Icon to Cross Icon  */
    document.getElementById("icon").setAttribute('class',"fa fa-times");

    /**Shift Search Elements to top of the page  */
    var div = document.getElementById("div2");
    div.setAttribute('style',"text-align:center; padding:0%;");
    
    /** Adding un-ordered list element HTML*/
    var p = document.getElementById("div");
    var newElement = document.createElement("ul");
    newElement.setAttribute('id', "myList");
    p.appendChild(newElement);
   
    /**Storing keys of Wiki pages */
    var keyArray = Object.keys(obj['query']['pages']);
    
    /**Building & Adding List items to HTML */
    var myListHTML = "";
    for(var i=0; i<keyArray.length; i++){
      myListHTML=myListHTML+"<a href="+"https://en.wikipedia.org/?curid="+keyArray[i]+" target="+"_blank"+"><li class=w3-animate-bottom><strong>"+
      obj['query']['pages'][keyArray[i]]['title']+"</strong><br><br>"+obj['query']['pages'][keyArray[i]]['extract']+"</li></a><br>";  
    }
    document.getElementById("myList").innerHTML = myListHTML;

    /**Setting Search as false */
    search = false;  
  }
  /**
   * Usage: If Clear(Cross) button is triggered.
   */
  else{
    console.log("no response");
    /**Clearing the List-items from DOM element */
    var elem = document.getElementById('myList');
    elem.parentNode.removeChild(elem);

    /**Clearing textBox */
    document.getElementById("myText").value = "";

    /**Changing Clear icon to Search icon */
    document.getElementById("icon").setAttribute('class',"fa fa-search");
    
    /**Setting Search as true */
    search = true;
  }
}
/**----------------------------------------------------- */
/*jQuery to handle Enter key press inside of TextBox */
$( document ).ready(function() {
    console.log( "ready!" );
    $( "#myText" ).keypress(function() {
  
      if (event.keyCode === 13) {
        console.log( "Handler for .keypress() called." );
        search = true;
        searchWikipedia();
    }
});
});
/**----------------------------------------------------- */
/** Method to call API */
function searchWikipedia(){
/**
 * Parsing and Storing input
 */
  var textInput = document.getElementById("myText").value;
  textInput=textInput.replace(/\&/g," ");

  /**
 * Creating a dummy script DOM element for API call
 * (Not using http request to handle CORS issue)
 */
  var script = document.createElement("script");
  script.src="https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+textInput+"&callback=foo";
  document.body.appendChild(script);
   
}
/**----------------------------------------------------- */