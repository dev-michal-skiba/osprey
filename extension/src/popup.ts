function renderHeader(): void {
    const headerContainer: HTMLElement | null = document.getElementById("headerContainer");
    if (headerContainer === null) return;
    headerContainer.innerHTML = `
        <img class="logo" src="static/logo.png" alt="logo.png">
        <h1>Osprey</h1>
    `;
    const img = document.createElement("img");
    img.className = "refresh";
    img.src = "static/refresh.png";
    img.alt = "Refresh";
    img.addEventListener("click", loadListing);
    headerContainer.appendChild(img);
}

function createSubmitForm(portal: string, identifier: string, title: string, url: string) {
    return function submitForm(): void {
        const rating = (<HTMLInputElement>document.getElementById('raiting')).value;
        const redFlag = (<HTMLInputElement>document.getElementById('redFlag')).checked;
        const greenFlag = (<HTMLInputElement>document.getElementById('greenFlag')).checked;
        const data = {
            portal: portal,
            identifier: identifier,
            title: title,
            url: url,
            rating: rating,
            red_flag: redFlag,
            green_flag: greenFlag
        };
        fetch('http://localhost:5000/listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    }
}


function renderForm(portal: string, identifier: string, title: string, url: string): void {
    const formContainer: HTMLElement | null = document.getElementById("formContainer");
    if (formContainer === null) return;
    fetch(`http://localhost:5000/listing?identifier=${identifier}`, {
        method: "GET"
    }).then(response => response.json()).then(data => {
        console.log("data.other_listings", data.other_listings);
        const otherRatings = data.other_listings.map(listing => {
            const flagImg = listing.red_flag ? 'static/red_flag.png' : listing.green_flag ? 'static/green_flag.png' : '';
            const flagAlt = listing.red_flag ? 'Red Flag' : listing.green_flag ? 'Green Flag' : '';
            return `
                <span class="other-rating inline-container">
                    <p><b>${listing.added_by}: </b> ${listing.rating}/5</p>
                    ${flagImg ? `<p><img class="flag" src="${flagImg}" alt="${flagAlt}"></p>` : ''}
                </span>
            `;
        }).join('');
        formContainer.innerHTML = `
            <p><b>Portal:</b> ${portal}</p>
            <p><b>Identifier:</b> ${identifier}</p>
            <p><b>Title:</b> ${title}</p>
            <p><b>Url:</b> ${url}</p>
            <div class="flex-container">
                <p><b>Rating:</b> <input type="number" min="1" max="5" value=${data.user_listing?.rating} id="raiting"></p>
                <p><img class="flag" src="static/red_flag.png" alt="Red Flag"> <input type="checkbox" id="redFlag" ${data.user_listing?.red_flag ? 'checked' : ''}></p>
                <p><img class="flag" src="static/green_flag.png" alt="Green Flag"> <input type="checkbox" id="greenFlag" ${data.user_listing?.green_flag ? 'checked' : ''}></p>
                <button id="submitListing" class="submit">Submit</button>
            </div>
            <div class="inline-container">
                ${otherRatings}
            </div>
        `;
        document.getElementById('submitListing')?.addEventListener('click', createSubmitForm(portal, identifier, title, url));
        document.getElementById('redFlag')?.addEventListener('change', function() {
            if ((<HTMLInputElement>this).checked) {
                (<HTMLInputElement>document.getElementById('greenFlag')).checked = false;
            }
        });
        document.getElementById('greenFlag')?.addEventListener('change', function() {
            if ((<HTMLInputElement>this).checked) {
                (<HTMLInputElement>document.getElementById('redFlag')).checked = false;
            }
        });
    }).catch(error => {
        console.error('Error:', error);
    });
}



function loadListing(): void {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs: chrome.tabs.Tab[]) {
        chrome.tabs.sendMessage(<number>tabs[0].id, {type:"extract"}, function(response){
            if (chrome.runtime.lastError) {
                return;
            }
            if (response.success === true) {
                renderForm(response.data.portal, response.data.identifier, response.data.title, response.data.url);
            }
        });
    });
}


renderHeader();
loadListing();
