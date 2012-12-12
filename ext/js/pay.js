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

var isSet = false;

if (typeof jQuery == 'undefined') {
	// handle no jQuery
} else {
	$(document).ready(getReceivers());
}

function getReceivers() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, { method: "getHTML"}, function(response) {
			if(response) {
				insertReceivers(response.data);
			} else {
				fail();
			}
		});
		/*
		This way seems to be suitable for Chrome 20+
		chrome.tabs.sendMessage(tab.id, { method: "getHTML"}, function(response) {
			insertReceivers(insertReceivers(response.data));
		});
		*/
	});
}

function insertReceivers(emails) {
	var receivers = $('#receivers');
	if(emails && emails != '' && emails.length > 0) {
		for(var i=0; i<emails.length; i++) {
			receivers.append('<option value="'+emails[i]+'">'+emails[i]+'</option>');
		}
		isSet = true;
	} else {
		if(isSet == false) {
			fail();
		}
	}
};

function fail() {
	var receivers = $('#receivers');
	receivers.replaceWith('<input type="email" placeholder="receiver@address.com" id="receivers" />');
}