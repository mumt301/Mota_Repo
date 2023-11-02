function generate_results() {
    // Extracting the data from the form
    let params = new URL(document.location).searchParams;
    if (params.has("artist")) {
        let artist = params.get("artist");
        console.log(artist);

        // Filling-in the placeholder element (finished later - see step 3)
        let placeholder = document.getElementById("theresult");

        // Exercise # 2 - Beginning
        let queryURL = `https://musicbrainz.org/ws/2/artist?query=${artist}&limit=1`;
        console.log(queryURL);

        // 1. Making the query using AJAX
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", queryURL, true);
        xmlHttp.send();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    // 2. Data parsing
                    let data = xmlHttp.responseXML;
                    let id = data.querySelector("artist").getAttribute("id");
                    console.log(id);
                    let releaseUrl = `https://musicbrainz.org/ws/2/artist/${id}?inc=release-groups`;

                    // Making a second AJAX request for release data
                    let releaseRequest = new XMLHttpRequest();
                    releaseRequest.open("GET", releaseUrl, true);
                    releaseRequest.send();

                    releaseRequest.onreadystatechange = function () {
                        if (releaseRequest.readyState == 4) {
                            if (releaseRequest.status == 200) {
                                // 3. Data parsing for release data
                                let releaseData = releaseRequest.responseXML;
                                let releaseList = releaseData.querySelectorAll("release-group");
                                let table = createResultTable(releaseList);
                                document.body.appendChild(table);
                            } else {
                                console.error("Failed to fetch release data");
                                // Handle error here
                            }
                        }
                    };
                } else {
                    console.error("Failed to fetch artist data");
                    // Handle error here
                }
            }
        };
    }
}

function createResultTable(releaseList) {
    // Generate an HTML table with the results
    let table = document.createElement("table");
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell = row.insertCell(0);
    cell.innerHTML = "<b>Release</b>";
    cell = row.insertCell(1);
    cell.innerHTML = "<b>Release Date</b>";

    for (let release of releaseList) {
        let releaseTitle = release.querySelector("title").textContent;
        let releaseDate = release.querySelector("first-release-date").textContent;

        row = table.insertRow(table.rows.length);
        cell = row.insertCell(0);
        cell.textContent = releaseTitle;
        cell = row.insertCell(1);
        cell.textContent = releaseDate;
    }

    return table;
}

window.onload = generate_results();