/*
 * In this script are grouped the classes and functions related to the operation of the navbar component (id = "navBarCustomSearch")
 */

 //Para pruebas
 //document.getElementById("content-paragraph").innerHTML = optionsChapterSelect[3].text;
 //document.getElementById("p2").innerHTML = chapter;


class ManipulatorNavBarCustomSearch {
	/**
	 * Configure the testamentSelect element
	 */
	setNavBarCustomSearch(testament, book, chapter, verseIni, verseFin) {
		var optionsTestamentSelect = document.getElementById('testamentSelect').options
		for (var i = 0; i < optionsTestamentSelect.length; i++) {
			if (testament == optionsTestamentSelect[i].text) {
				document.getElementById('testamentSelect').options[i].selected = true;
				this.populateBookSelect();
				var optionsBookSelect = document.getElementById('bookSelect').options
				for (var j = 0; j < optionsBookSelect.length; j++) {
					if (book == optionsBookSelect[j].text) {
						document.getElementById('bookSelect').options[j].selected = true;
						this.populateChapterSelect();
						var optionsChapterSelect = document.getElementById('chapterSelect').options
						for (var k = 0; k < optionsChapterSelect.length; k++) {
							if (chapter == optionsChapterSelect[k].text) {
								document.getElementById('chapterSelect').options[k].selected = true;
								document.getElementById('verseInitialText').value=verseIni;
								document.getElementById('verseFinalText').value=verseFin;
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
	}

	/**
	 * Add the option elements of the Select element (id = "bookSelect"), according
	 * to the testament chosen by the user
	 */
	populateBookSelect() {
		var testamentSelectText = document.getElementById('testamentSelect').options[document
			.getElementById('testamentSelect').selectedIndex].text;
		var bookSelect = document.getElementById('bookSelect');
		bookSelect.options.length = 0;
		for (var testament in bibleBooks) {
			if (testament == testamentSelectText) {
				for (var book in bibleBooks[testament]) {
					bookSelect.options[bookSelect.options.length] = new Option(
						book, book);
				}
				break;
			}
		}
		this.populateChapterSelect();
	}

	/**
	 * Add the option elements of the Select element (id = "chapterSelect"),
	 * according to the testament and the book chosen by the user
	 */
	populateChapterSelect() {
		var testamentSelectText = document.getElementById('testamentSelect').options[document
			.getElementById('testamentSelect').selectedIndex].text;
		var bookSelectText = document.getElementById('bookSelect').options[document
			.getElementById('bookSelect').selectedIndex].text;
		var chapterSelect = document.getElementById('chapterSelect');
		chapterSelect.options.length = 0;
		for (var testament in bibleBooks) {
			if (testament == testamentSelectText) {
				for (var book in bibleBooks[testament]) {
					if (book == bookSelectText) {
						for (var chapter in bibleBooks[testament][book]) {
							chapterSelect.options[chapterSelect.options.length] = new Option(
								chapter, chapter);
						}
						break;
					}
				}
				break;
			}
		}
		this.resetVersesInputText()
	}

	/**
	 * Go to the previous chapter.
	 */
	previousChapter() {
		var testamentSelectText = document.getElementById('testamentSelect').options[document
			.getElementById('testamentSelect').selectedIndex].text;
		var bookSelectText = document.getElementById('bookSelect').options[document
			.getElementById('bookSelect').selectedIndex].text;
		var chapterSelectText = document.getElementById('chapterSelect').options[document
			.getElementById('chapterSelect').selectedIndex].text;
		var ind = 0;
		for (var chapter in bibleBooks[testamentSelectText][bookSelectText]) {
			if (chapter == chapterSelectText) {
				if (ind == 0) {
					for (var i = 0; i < Object.keys(bibleBooks[testamentSelectText]).length; i++) {
						if (bookSelectText == Object
							.keys(bibleBooks[testamentSelectText])[i]) {
							if (i == 0) {
								if (testamentSelectText == 'NT') {
									document.getElementById('testamentSelect').options[0].selected = true;
									this.populateBookSelect();
									var bookSelectlength = document
										.getElementById('bookSelect').options.length;
									document.getElementById('bookSelect').options[bookSelectlength - 1].selected = true;
									this.populateChapterSelect();
									var ChapterSelectlength = document
										.getElementById('chapterSelect').options.length;
									document.getElementById('chapterSelect').options[ChapterSelectlength - 1].selected = true;
								}

							} else {
								document.getElementById('bookSelect').options[i - 1].selected = true;
								this.populateChapterSelect();
								var ChapterSelectlength = document
									.getElementById('chapterSelect').options.length;
								document.getElementById('chapterSelect').options[ChapterSelectlength - 1].selected = true;
							}
							break;
						}
					}
				} else {
					ind--;
					document.getElementById('chapterSelect').options[ind].selected = true;
				}

				break;
			}
			ind++;
		}
		this.resetVersesInputText();
	}

	/**
	 * Go to the next chapter.
	 */
	nextChapter() {
		var testamentSelectText = document.getElementById('testamentSelect').options[document
			.getElementById('testamentSelect').selectedIndex].text;
		var bookSelectText = document.getElementById('bookSelect').options[document
			.getElementById('bookSelect').selectedIndex].text;
		var chapterSelectText = document.getElementById('chapterSelect').options[document
			.getElementById('chapterSelect').selectedIndex].text;
		var ind = 0;
		for (var chapter in bibleBooks[testamentSelectText][bookSelectText]) {
			if (chapter == chapterSelectText) {
				if (ind == Object
					.keys(bibleBooks[testamentSelectText][bookSelectText]).length - 1) {
					for (var i = 0; i < Object.keys(bibleBooks[testamentSelectText]).length; i++) {
						if (bookSelectText == Object
							.keys(bibleBooks[testamentSelectText])[i]) {
							if (i == Object.keys(bibleBooks[testamentSelectText]).length - 1) {
								if (testamentSelectText == 'AT') {
									document.getElementById('testamentSelect').options[1].selected = true;
									this.populateBookSelect();
									document.getElementById('bookSelect').options[0].selected = true;
									this.populateChapterSelect();
									document.getElementById('chapterSelect').options[0].selected = true;
								}

							} else {
								document.getElementById('bookSelect').options[i + 1].selected = true;
								this.populateChapterSelect();
								document.getElementById('chapterSelect').options[0].selected = true;
							}
							break;
						}
					}
				} else {
					ind++;
					document.getElementById('chapterSelect').options[ind].selected = true;
				}

				break;
			}
			ind++;
		}
		this.resetVersesInputText();
	}

	/**
	 * Put an empty value in the input elements of type text (verseInitialText and
	 * verseFinalText)
	 */
	resetVersesInputText() {
		document.getElementById('verseInitialText').value = "";
		document.getElementById('verseFinalText').value = "";

	}
}
