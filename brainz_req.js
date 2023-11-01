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

        // 1. Making the query using fetch
        fetch(queryURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                // 2. Data parsing
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, "application/xml");

                let artistNode = xmlDoc.querySelector("artist");
                if (artistNode) {
                    let id = artistNode.getAttribute("id");
                    console.log(id);
                    let releaseUrl = `https://musicbrainz.org/ws/2/artist/${id}?inc=release-groups`;

                    // Fetch the release data
                    return fetch(releaseUrl);
                } else {
                    throw new Error("Artist not found.");
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                // 3. Data parsing for release data
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, "application/xml");

                let releaseList = xmlDoc.querySelectorAll("release-group");
                let table = createResultTable(releaseList);
                placeholder.appendChild(table);
            })
            .catch(error => {
                console.error(error);
                // Display an error message to the user
                placeholder.innerHTML = "An error occurred while fetching artist information.";
            });
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
    cell.innerHTML = "<b>Release Date</b";

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