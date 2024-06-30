/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/content/otodom.ts ***!
  \*******************************/

function isSingleListing() {
    return window.location.href.includes("https://www.otodom.pl/pl/oferta/");
}
function extractIdentifier() {
    const regex = /(?<= - )\d+(?= • www\.otodom\.pl)/;
    const match = document.title.match(regex);
    if (match === null) {
        return "";
    }
    return match[0];
}
function extractTitle() {
    const regex = /^(.*?)(?= - \d+ • www\.otodom\.pl)/;
    const match = document.title.match(regex);
    if (match === null) {
        return "";
    }
    return match[0];
}
function extractUrl() {
    return window.location.href;
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "extract") {
        if (!isSingleListing()) {
            sendResponse({ success: false });
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
    sendResponse({ success: false });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC9vdG9kb20uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29zcHJleS8uL3NyYy9jb250ZW50L290b2RvbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzU2luZ2xlTGlzdGluZygpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJodHRwczovL3d3dy5vdG9kb20ucGwvcGwvb2ZlcnRhL1wiKTtcbn1cbmZ1bmN0aW9uIGV4dHJhY3RJZGVudGlmaWVyKCkge1xuICAgIGNvbnN0IHJlZ2V4ID0gLyg/PD0gLSApXFxkKyg/PSDigKIgd3d3XFwub3RvZG9tXFwucGwpLztcbiAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LnRpdGxlLm1hdGNoKHJlZ2V4KTtcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaFswXTtcbn1cbmZ1bmN0aW9uIGV4dHJhY3RUaXRsZSgpIHtcbiAgICBjb25zdCByZWdleCA9IC9eKC4qPykoPz0gLSBcXGQrIOKAoiB3d3dcXC5vdG9kb21cXC5wbCkvO1xuICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQudGl0bGUubWF0Y2gocmVnZXgpO1xuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoWzBdO1xufVxuZnVuY3Rpb24gZXh0cmFjdFVybCgpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWY7XG59XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PT0gXCJleHRyYWN0XCIpIHtcbiAgICAgICAgaWYgKCFpc1NpbmdsZUxpc3RpbmcoKSkge1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcG9ydGFsOiBcIm90b2RvbVwiLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGV4dHJhY3RJZGVudGlmaWVyKCksXG4gICAgICAgICAgICAgICAgdGl0bGU6IGV4dHJhY3RUaXRsZSgpLFxuICAgICAgICAgICAgICAgIHVybDogZXh0cmFjdFVybCgpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=