function showFirstTable() {
    var x = document.getElementById("firstTable");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("button").innerHTML = "Hide Table";
    } else {
        x.style.display = "none";
        document.getElementById("button").innerHTML = "Show Table";
    }
}

function showSecondTable() {
    var x = document.getElementById("secondTable");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("button").innerHTML = "Hide Table";
    } else {
        x.style.display = "none";
        document.getElementById("button").innerHTML = "Show Table";
    }
}