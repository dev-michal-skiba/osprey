async function getIdentifier(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("identifier", (result) => {
            if (result.identifier) {
                resolve(result.identifier);
            } else {
                resolve(null);
            }
        });
    });
}


async function setIdentifier(identifier: string): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ "identifier": identifier }, () => {
            resolve();
        });
    });
}


async function submitIdentifier(identifier: string): Promise<void> {
    await setIdentifier(identifier);
    await renderIdentifierContainer();
}


function renderIdentifierContainerEditView(idContainer: HTMLElement, identifier: string | null): void {
    idContainer.innerHTML = "";
    let input = document.createElement("input");
    input.type = "text";
    if (identifier) {
        input.value = identifier;
    } else {
        input.placeholder = "Enter your identifier";
    }
    input.addEventListener("keydown", async (event) => {
        if (event.key === 'Enter') await submitIdentifier(input.value);
    });
    let button = document.createElement("button");
    button.textContent = "Submit";
    button.addEventListener("click", async (event) => {
        await submitIdentifier(input.value);
    });
    idContainer.appendChild(input);
    idContainer.appendChild(button);
}


function renderIdentifierContainerDisplayView(idContainer: HTMLElement, identifier: string | null): void {
    idContainer.innerHTML = "";
    let paragraph = document.createElement("p");
        paragraph.textContent = "Hello " + identifier;
        idContainer.appendChild(paragraph);
        let button = document.createElement("button");
        button.textContent = "Edit";
        button.addEventListener("click", async (event) => {
            renderIdentifierContainerEditView(idContainer, identifier);
        });
        idContainer.appendChild(button);
}


async function renderIdentifierContainer(): Promise<void> {
    let idContainer: HTMLElement | null = document.getElementById("identifierContainer");
    if (idContainer == null) return;
    const identifier = await getIdentifier();
    if (identifier) {
        renderIdentifierContainerDisplayView(idContainer, identifier);
    } else {
        renderIdentifierContainerEditView(idContainer, identifier);
    }
}


renderIdentifierContainer();
