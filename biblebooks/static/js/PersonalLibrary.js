class StringsCob {
    static substringPositions(stringTarget, subst) {
        var foundSubstrings = [];
        var subStringTarget = '';
        var startSubstringTarget = 0;
        var endSubstringTarget = stringTarget.length;
        var position = 0;
        do {
            subStringTarget = stringTarget.substring(startSubstringTarget);
            var regExpIni = new RegExp("[:,;.ÁÉÍÓÚáéíóú]{1,2}");
            var textIni = subst.search(regExpIni);
            if (textIni == -1) {
                var regExpWord = new RegExp("\\b" + subst + "\\b");
                position = subStringTarget.search(regExpWord);
            } else {
                var regExpWord = new RegExp(subst);
                position = subStringTarget.search(regExpWord);
            }

            if (position != -1) {
                var start = startSubstringTarget + position;
                var end = startSubstringTarget + position + subst.length;
                var subStringObject = new SubStringObject(subst, start, end);
                foundSubstrings.push(subStringObject);
                startSubstringTarget = end;
            }
        } while (position != -1)
        return foundSubstrings;
    }
}


class SubStringObject {
    constructor(foundSubstr, startSubstring, endSubstring) {
        this.foundSubstr = foundSubstr;
        this.startSubstring = startSubstring;
        this.endSubstring = endSubstring;
    }
    get text() {
        return (this.foundSubstr);
    }
    get start() {
        return (this.startSubstring);
    }
    get end() {
        return (this.endSubstring);
    }
}