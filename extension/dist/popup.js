/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/

function renderHeader() {
    const headerContainer = document.getElementById("headerContainer");
    if (headerContainer === null)
        return;
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
function createSubmitForm(portal, identifier, title, url) {
    return function submitForm() {
        const rating = document.getElementById('raiting').value;
        const redFlag = document.getElementById('redFlag').checked;
        const greenFlag = document.getElementById('greenFlag').checked;
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
    };
}
function renderForm(portal, identifier, title, url) {
    const formContainer = document.getElementById("formContainer");
    if (formContainer === null)
        return;
    fetch(`http://localhost:5000/listing?identifier=${identifier}`, {
        method: "GET"
    }).then(response => response.json()).then(data => {
        var _a, _b, _c, _d, _e, _f;
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
                <p><b>Rating:</b> <input type="number" min="1" max="5" value=${(_a = data.user_listing) === null || _a === void 0 ? void 0 : _a.rating} id="raiting"></p>
                <p><img class="flag" src="static/red_flag.png" alt="Red Flag"> <input type="checkbox" id="redFlag" ${((_b = data.user_listing) === null || _b === void 0 ? void 0 : _b.red_flag) ? 'checked' : ''}></p>
                <p><img class="flag" src="static/green_flag.png" alt="Green Flag"> <input type="checkbox" id="greenFlag" ${((_c = data.user_listing) === null || _c === void 0 ? void 0 : _c.green_flag) ? 'checked' : ''}></p>
                <button id="submitListing" class="submit">Submit</button>
            </div>
            <div class="inline-container">
                ${otherRatings}
            </div>
        `;
        (_d = document.getElementById('submitListing')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', createSubmitForm(portal, identifier, title, url));
        (_e = document.getElementById('redFlag')) === null || _e === void 0 ? void 0 : _e.addEventListener('change', function () {
            if (this.checked) {
                document.getElementById('greenFlag').checked = false;
            }
        });
        (_f = document.getElementById('greenFlag')) === null || _f === void 0 ? void 0 : _f.addEventListener('change', function () {
            if (this.checked) {
                document.getElementById('redFlag').checked = false;
            }
        });
    }).catch(error => {
        console.error('Error:', error);
    });
}
function loadListing() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "extract" }, function (response) {
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFdBQVc7QUFDakU7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCLFNBQVMsZUFBZTtBQUNyRSxzQkFBc0IsdUNBQXVDLFFBQVEsU0FBUyxRQUFRO0FBQ3RGO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QyxvQ0FBb0MsV0FBVztBQUMvQywrQkFBK0IsTUFBTTtBQUNyQyw2QkFBNkIsSUFBSTtBQUNqQztBQUNBLCtFQUErRSx5RUFBeUU7QUFDeEoscUhBQXFILDZGQUE2RjtBQUNsTiwySEFBMkgsK0ZBQStGO0FBQzFOO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QixtQ0FBbUM7QUFDM0QsOENBQThDLGlCQUFpQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29zcHJleS8uL3NyYy9wb3B1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIHJlbmRlckhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlckNvbnRhaW5lclwiKTtcbiAgICBpZiAoaGVhZGVyQ29udGFpbmVyID09PSBudWxsKVxuICAgICAgICByZXR1cm47XG4gICAgaGVhZGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGltZyBjbGFzcz1cImxvZ29cIiBzcmM9XCJzdGF0aWMvbG9nby5wbmdcIiBhbHQ9XCJsb2dvLnBuZ1wiPlxuICAgICAgICA8aDE+T3NwcmV5PC9oMT5cbiAgICBgO1xuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaW1nLmNsYXNzTmFtZSA9IFwicmVmcmVzaFwiO1xuICAgIGltZy5zcmMgPSBcInN0YXRpYy9yZWZyZXNoLnBuZ1wiO1xuICAgIGltZy5hbHQgPSBcIlJlZnJlc2hcIjtcbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxvYWRMaXN0aW5nKTtcbiAgICBoZWFkZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN1Ym1pdEZvcm0ocG9ydGFsLCBpZGVudGlmaWVyLCB0aXRsZSwgdXJsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN1Ym1pdEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IHJhdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWl0aW5nJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHJlZEZsYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVkRmxhZycpLmNoZWNrZWQ7XG4gICAgICAgIGNvbnN0IGdyZWVuRmxhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmVlbkZsYWcnKS5jaGVja2VkO1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgcG9ydGFsOiBwb3J0YWwsXG4gICAgICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICByYXRpbmc6IHJhdGluZyxcbiAgICAgICAgICAgIHJlZF9mbGFnOiByZWRGbGFnLFxuICAgICAgICAgICAgZ3JlZW5fZmxhZzogZ3JlZW5GbGFnXG4gICAgICAgIH07XG4gICAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjUwMDAvbGlzdGluZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5mdW5jdGlvbiByZW5kZXJGb3JtKHBvcnRhbCwgaWRlbnRpZmllciwgdGl0bGUsIHVybCkge1xuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1Db250YWluZXJcIik7XG4gICAgaWYgKGZvcm1Db250YWluZXIgPT09IG51bGwpXG4gICAgICAgIHJldHVybjtcbiAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL2xpc3Rpbmc/aWRlbnRpZmllcj0ke2lkZW50aWZpZXJ9YCwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YS5vdGhlcl9saXN0aW5nc1wiLCBkYXRhLm90aGVyX2xpc3RpbmdzKTtcbiAgICAgICAgY29uc3Qgb3RoZXJSYXRpbmdzID0gZGF0YS5vdGhlcl9saXN0aW5ncy5tYXAobGlzdGluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGFnSW1nID0gbGlzdGluZy5yZWRfZmxhZyA/ICdzdGF0aWMvcmVkX2ZsYWcucG5nJyA6IGxpc3RpbmcuZ3JlZW5fZmxhZyA/ICdzdGF0aWMvZ3JlZW5fZmxhZy5wbmcnIDogJyc7XG4gICAgICAgICAgICBjb25zdCBmbGFnQWx0ID0gbGlzdGluZy5yZWRfZmxhZyA/ICdSZWQgRmxhZycgOiBsaXN0aW5nLmdyZWVuX2ZsYWcgPyAnR3JlZW4gRmxhZycgOiAnJztcbiAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvdGhlci1yYXRpbmcgaW5saW5lLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8cD48Yj4ke2xpc3RpbmcuYWRkZWRfYnl9OiA8L2I+ICR7bGlzdGluZy5yYXRpbmd9LzU8L3A+XG4gICAgICAgICAgICAgICAgICAgICR7ZmxhZ0ltZyA/IGA8cD48aW1nIGNsYXNzPVwiZmxhZ1wiIHNyYz1cIiR7ZmxhZ0ltZ31cIiBhbHQ9XCIke2ZsYWdBbHR9XCI+PC9wPmAgOiAnJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KS5qb2luKCcnKTtcbiAgICAgICAgZm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8cD48Yj5Qb3J0YWw6PC9iPiAke3BvcnRhbH08L3A+XG4gICAgICAgICAgICA8cD48Yj5JZGVudGlmaWVyOjwvYj4gJHtpZGVudGlmaWVyfTwvcD5cbiAgICAgICAgICAgIDxwPjxiPlRpdGxlOjwvYj4gJHt0aXRsZX08L3A+XG4gICAgICAgICAgICA8cD48Yj5Vcmw6PC9iPiAke3VybH08L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8cD48Yj5SYXRpbmc6PC9iPiA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCI1XCIgdmFsdWU9JHsoX2EgPSBkYXRhLnVzZXJfbGlzdGluZykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJhdGluZ30gaWQ9XCJyYWl0aW5nXCI+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxpbWcgY2xhc3M9XCJmbGFnXCIgc3JjPVwic3RhdGljL3JlZF9mbGFnLnBuZ1wiIGFsdD1cIlJlZCBGbGFnXCI+IDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInJlZEZsYWdcIiAkeygoX2IgPSBkYXRhLnVzZXJfbGlzdGluZykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlZF9mbGFnKSA/ICdjaGVja2VkJyA6ICcnfT48L3A+XG4gICAgICAgICAgICAgICAgPHA+PGltZyBjbGFzcz1cImZsYWdcIiBzcmM9XCJzdGF0aWMvZ3JlZW5fZmxhZy5wbmdcIiBhbHQ9XCJHcmVlbiBGbGFnXCI+IDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImdyZWVuRmxhZ1wiICR7KChfYyA9IGRhdGEudXNlcl9saXN0aW5nKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ3JlZW5fZmxhZykgPyAnY2hlY2tlZCcgOiAnJ30+PC9wPlxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJzdWJtaXRMaXN0aW5nXCIgY2xhc3M9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubGluZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAke290aGVyUmF0aW5nc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgICAoX2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0TGlzdGluZycpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVTdWJtaXRGb3JtKHBvcnRhbCwgaWRlbnRpZmllciwgdGl0bGUsIHVybCkpO1xuICAgICAgICAoX2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVkRmxhZycpKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmVlbkZsYWcnKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAoX2YgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JlZW5GbGFnJykpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZEZsYWcnKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbG9hZExpc3RpbmcoKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgeyB0eXBlOiBcImV4dHJhY3RcIiB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlbmRlckZvcm0ocmVzcG9uc2UuZGF0YS5wb3J0YWwsIHJlc3BvbnNlLmRhdGEuaWRlbnRpZmllciwgcmVzcG9uc2UuZGF0YS50aXRsZSwgcmVzcG9uc2UuZGF0YS51cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbnJlbmRlckhlYWRlcigpO1xubG9hZExpc3RpbmcoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==