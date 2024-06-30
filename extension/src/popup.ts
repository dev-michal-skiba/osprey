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


async function getWorkspaceName(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("workspaceName", (result) => {
            if (result.workspaceName) {
                resolve(result.workspaceName);
            } else {
                resolve(null);
            }
        });
    });
}


async function setWorkspaceName(workspaceName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ "workspaceName": workspaceName }, () => {
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
    button.className = "idButton";
    button.addEventListener("click", async (event) => {
        await submitIdentifier(input.value);
    });
    idContainer.appendChild(input);
    idContainer.appendChild(button);
}


function renderIdentifierContainerDisplayView(idContainer: HTMLElement, identifier: string | null): void {
    idContainer.innerHTML = "";
    let paragraph = document.createElement("p");
    paragraph.innerHTML = "<b>Identifier:</b> " + identifier;
    idContainer.appendChild(paragraph);
    let button = document.createElement("button");
    button.textContent = "Edit";
    button.className = "idButton";
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
        renderWorkspaceContainer();
    } else {
        renderIdentifierContainerEditView(idContainer, identifier);
    }
}


async function renderWorkspaceContainerCreateNewView(workspaceContainer: HTMLElement): Promise<void> {
    workspaceContainer.innerHTML = "";
    let title = document.createElement("h2");
    title.textContent = "Create new workspace";
    workspaceContainer.append(title);
    try {
        const directoryHandle = await ;
        // const fileName = "myWorkspaceDB.sqlite";
        const fileName = "test.txt";   
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write("Hello World");
        await writable.close();
    } catch (error) {
        const e = error as DOMException;
        if (e.name === 'AbortError') {
            console.log('Directory selection was aborted by the user.');
            console.log(e);
        } else {
            console.error('An unexpected error occurred:', e);
        }
    }
    // alert(`Workspace created\n${fileHandle.path}`);
}


function renderWorkspaceContainerOpenExistingView(workspaceContainer: HTMLElement): void {}


async function renderWorkspaceContainer(): Promise<void> {
    let workspaceContainer: HTMLElement | null = document.getElementById("workspaceContainer");
    if (workspaceContainer == null) return;
    workspaceContainer.innerHTML = "";
    const workspaceName = await getWorkspaceName();
    let paragraph = document.createElement("p");
    if (workspaceName === null) paragraph.innerHTML = "<b>Workspace:</b> <span class=\"error\">No workspace opened</span>";
    else paragraph.innerHTML = "<b>Workspace:</b> " + workspaceName;
    workspaceContainer.appendChild(paragraph);
    let createNewButton = document.createElement("button");
    createNewButton.textContent = "Create new workspace";
    createNewButton.className = "workspaceButton";
    createNewButton.addEventListener("click", async (event) => {
        await renderWorkspaceContainerCreateNewView(workspaceContainer);
    });
    workspaceContainer.appendChild(createNewButton);
    let openExistingButton = document.createElement("button");
    openExistingButton.textContent = "Open existing workspace";
    openExistingButton.className = "workspaceButton";
    openExistingButton.addEventListener("click", async (event) => {
        await renderWorkspaceContainerOpenExistingView(workspaceContainer);
    });
    workspaceContainer.appendChild(openExistingButton);
}


renderIdentifierContainer();
