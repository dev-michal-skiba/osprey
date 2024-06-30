function isSingleListing(): boolean {
    return window.location.href.includes("https://www.otodom.pl/pl/oferta/");
}


function extractIdentifier(): string {
    const regex = /(?<= - )\d+(?= • www\.otodom\.pl)/;
    const match = document.title.match(regex);
    if (match === null) {
        return "";
    }
    return match[0];
}


function extractTitle(): string {
    const regex = /^(.*?)(?= - \d+ • www\.otodom\.pl)/;
    const match = document.title.match(regex);
    if (match === null) {
        return "";
    }
    return match[0];
}


function extractUrl(): string {
    return window.location.href;
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "extract") {
            if (!isSingleListing()) {
                sendResponse({success: false});
                return;
            }
            sendResponse({
                success: true,
                data: {
                    portal: "otodom",
                    identifier: extractIdentifier(),
                    title: extractTitle(),
                    url: extractUrl(),
                },
            });
        }
        sendResponse({success: false});
    }
);
