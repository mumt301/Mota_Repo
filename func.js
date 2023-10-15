function openCat(evt, tab) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}

function openMiles() {
    document.location="https://en.wikipedia.org/wiki/Tutu_(album)";
}

function openLuther() {
    document.location="https://en.wikipedia.org/wiki/Never_Too_Much_(album)";
}

function openWine() {
    document.location="https://en.wikipedia.org/wiki/Winelight";
}

function openSuddenly() {
    document.location="https://en.wikipedia.org/wiki/Suddenly_(Marcus_Miller_album)";
}

function openDavid() {
    document.location="https://en.wikipedia.org/wiki/Straight_to_the_Heart_(David_Sanborn_album)";
}

function openAretha() {
    document.location="https://en.wikipedia.org/wiki/Get_It_Right_(Aretha_Franklin_song)";
}

function openDonald() {
    document.location="https://en.wikipedia.org/wiki/The_Nightfly";
}

function openNard() {
    document.location="https://en.wikipedia.org/wiki/%27Nard";
}