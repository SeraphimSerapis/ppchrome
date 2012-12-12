/**
   Copyright 2012 PayPal.
  
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
  
        http://www.apache.org/licenses/LICENSE-2.0
  
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/ 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method === "getHTML") {
		var emailsArray = findEmailAddresses($('body').html());
    	sendResponse({data: emailsArray});
    } else {
	    sendResponse({});
	}
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method === "getHTML") {
		var html = escape(document.body.innerHTML);
		var emailsArray = findEmailAddresses(html);
		if(emailsArray) {
			sendResponse({data: emailsArray});
		} else {
			sendResponse({data: ''});
		}
    } else {
	    sendResponse({data: ''});
	}
});

function findEmailAddresses(html) {
	if(html) {
		var emailsArray = html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		if (emailsArray) {
			return cleanArray(emailsArray);
		}
	}
	return '';
}

function cleanArray(array) {
	var index = 0;
	var cleanedUp = new Array();
	for(var i=0; i<array.length; i++) {
		var value = array[i].toLowerCase();
		if(!contains(value, cleanedUp)) {
			cleanedUp[index] = value;
			index++;
		}
	}
	return cleanedUp;
}

function contains(value, array) {
	if(array) {
		for(var i=0; i<array.length; i++) {
			if(array[i] == value) {
				return true;
			}
		}
	}
	return false;
}
