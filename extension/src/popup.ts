function renderHeader(): void {
    const headerContainer: HTMLElement | null = document.getElementById("headerContainer");
    if (headerContainer === null) return;
    headerContainer.innerHTML = `
        <img class="logo" src="static/logo.png" alt="logo.png">
        <h1>Osprey</h1>
    `;
    const button = document.createElement("button");
    const img = document.createElement("img");
    img.className = "refresh";
    img.src = "static/refresh.png";
    img.alt = "Refresh";
    img.addEventListener("click", loadListing);
    headerContainer.appendChild(img);
}


function renderForm(portal: string, identifier: string, title: string, url: string): void {
    const formContainer: HTMLElement | null = document.getElementById("formContainer");
    if (formContainer === null) return;
    formContainer.innerHTML = `
        <p><b>Portal:</b> ${portal}</p>
        <p><b>Identifier:</b> ${identifier}</p>
        <p><b>Title:</b> ${title}</p>
        <p><b>Url:</b> ${url}</p>
    `;
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
