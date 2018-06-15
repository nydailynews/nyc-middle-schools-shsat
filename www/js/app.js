// UTILS
var utils = {
    ap_numerals: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    get_ap_numeral: function(i) {
        if ( +i < 11 ) return this.ap_numerals[+i];
        return i;
    },
    months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    ap_months: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
    ap_date: function(date) {
        // Given a date such as "2018-02-03" return an AP style date.
        var this_year = new Date().getFullYear();
        var parts = date.split('-')
        var day = +parts[2];
        var month = this.ap_months[+parts[1] - 1];
        if ( this_year == +parts[0] ) return month + ' ' + day;
        return month + ' ' + day + ', ' + parts[0];
    },
    rando: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for ( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    rando_by_day: function(max) {
        // Generate a semi-random integer from zero to the max argument,
        // based on what the date is.
        var d = new Date().getDate();
        return d % +max;
    },
    get_rando_by_day: function(arr) {
        // Given an array, return a random item from it based on today's date.
        var l = arr.length;
        var index = this.rando_by_day(l);
        return arr[index];
    },
    add_zero: function(i) {
        // For values less than 10, return a zero-prefixed version of that value.
        if ( +i < 10 ) return "0" + i;
        return i;
    },
    add_zeros: function(i, digits) {
        // Fill decimals with zeros to the number of digits. Returns a string.
        var str = '' + +i;
        var len = str.length - 2;   // The "2" is the "0." in the string.

        while ( len <= digits ) {
            str = str + '0';
            len = str.length - 2;
        }
        // Axe the leading zero, if there is one
        str = str.replace('0.', '.');
        return str;
    },
    parse_date_str: function(date) {
        // date is a datetime-looking string such as "2017-07-25"
        // Returns a date object.
        if ( typeof date !== 'string' ) return Date.now();

        var date_bits = date.split(' ')[0].split('-');

        // We do that "+date_bits[1] - 1" because months are zero-indexed.
        var d = new Date(date_bits[0], +date_bits[1] - 1, date_bits[2], 0, 0, 0);
        return d;
    },
    parse_date: function(date) {
        // date is a datetime-looking string such as "2017-07-25"
        // Returns a unixtime integer.
        var d = this.parse_date_str(date);
        return d.getTime();
    },
    days_between: function(from, to) {
        // Get the number of days between two dates. Returns an integer. If to is left blank, defaults to today.
        // Both from and to should be strings 'YYYY-MM-DD'.
        // Cribbed from https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
        if ( to == null ) to = new Date();
        else to = this.parse_date_str(to);
        from = this.parse_date_str(from);
        var days_diff = Math.floor((from-to)/(1000*60*60*24));
        return days_diff;
    },
    get_json: function(path, obj, callback) {
        // Downloads local json and returns it.
        // Cribbed from http://youmightnotneedjquery.com/
        var request = new XMLHttpRequest();
        request.open('GET', path, true);

        request.onload = function() {
            if ( request.status >= 200 && request.status < 400 ) {
                obj.data = JSON.parse(request.responseText);
                callback();
            }
            else {
                console.error('DID NOT LOAD ' + path + request);
                return false;
            }
        };
        request.onerror = function() {};
        request.send();
    },
    add_class: function(el, class_name) {
        // From http://youmightnotneedjquery.com/#add_class
        if ( el.classlist ) el.classList.add(class_name);
        else el.className += ' ' + class_name;
        return el;
    },
    add_js: function(src, callback) {
        var s = document.createElement('script');
        if ( typeof callback === 'function' ) s.onload = function() { callback(); }
        //else console.log("Callback function", callback, " is not a function");
        s.setAttribute('src', src);
        document.getElementsByTagName('head')[0].appendChild(s);
    },
    slugify: function(str) {
		// Cribbed from https://gist.github.com/codeguy/6684588
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();
	  
		// remove accents, swap ñ for n, etc
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		for (var i=0, l=from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

		return str;
	}
}

