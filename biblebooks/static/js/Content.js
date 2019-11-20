/*
 * In this script are grouped the classes and functions that select, organize and format the biblical content that will be displayed according to the options chosen by the user.
 */

/**
 * Class through which the content that is displayed is updated as a result 
 * of the options chosen by the user. It has several static methods, 
 * which will be called depending on the element or elements through which 
 * the user made the request.
 */
class ContentUpdater {
	static updateContentNavBarCustomSearch() {
		var contentManagementNavBarCustomSearch = new ContentManagementNavBarCustomSearch();
		contentManagementNavBarCustomSearch.updateContent();
	}
	static updateContentSidebarSearch(text) {
		var contentManagementSideBarNav = new ContentManagementSideBarNav();
		contentManagementSideBarNav.updateContent(text);
	}
}

/**
 * Content that is displayed according to the options chosen by the user in 
 * the element navBarCustomSearch
 */
class ContentManagementNavBarCustomSearch {
	/**
	 * Through this method the requested content is updated.
	 */
	updateContent() {
		var content = new ContentManagementNavBarCustomSearch();
		var verses;
		var testamentSelectText = document.getElementById('testamentSelect').options[document.getElementById('testamentSelect').selectedIndex].text;
		var bookSelectText = document.getElementById('bookSelect').options[document.getElementById('bookSelect').selectedIndex].text;
		var chapterSelectText = document.getElementById('chapterSelect').options[document.getElementById('chapterSelect').selectedIndex].text;
		for (var testament in bibleBooks) {
			if (testament == testamentSelectText) {
				for (var book in bibleBooks[testament]) {
					if (book == bookSelectText) {
						for (var chapter in bibleBooks[testament][book]) {
							if (chapter == chapterSelectText) {
								var wholeContent = bibleBooks[testament][book][chapter][0];
								verses = bibleBooks[testament][book][chapter][1];
								var verseInitialText = document.getElementById('verseInitialText').value;
								var verseFinalText = document.getElementById('verseFinalText').value;
								var headerNotacion = false; //This variable 
								var verseInitial = createVerseObject(verses, verseInitialText);
								var verseFinal = createVerseObject(verses, verseFinalText);
								content = content.setContentSomeVerses(chapter, wholeContent, verses, verseInitial, verseFinal);
								if (chaptersWithTextsPositions.length != 0) {
									content[2] = this.setColorFoundTextFromSideBar(content[2], chapter);
								}
								content[2] = this.setColorToNumber(content[2], verses);
								break;
							}
						};
						break;
					};
				};
				break;
			}
		}
		document.getElementById("otherHeader").innerHTML = content[0];
		document.getElementById("chapterHeader").innerHTML = content[1];
		document.getElementById("content-paragraph").innerHTML = content[2];
	}

	/**
	 * customizeVersesSomeVerses Set the appearance of the content, when only
	 * some verses are displayed
	 */
	setContentSomeVerses(chapter, wholeContent, verses, verseInitial, verseFinal) {
		var content = [];
		if (verseInitial['numberVerse'] == '') {
			content = this.setContentVerseIfVerseInitialTextISEmpty(chapter, wholeContent);
		} else if (verseInitial['numberVerse'] == (function (z) { var x = ""; for (var verse in z) { x = verse; } return x; })(verses)) {
			content = this.setContentVerseIfVerseInitialTextLastVerse(chapter, wholeContent, verseInitial, verseFinal);
		} else {
			if (verseFinal['numberVerse'] != "") {
				if (verseFinal['numberVerse'] == (function (z) { var x = ""; for (var verse in z) { x = verse; } return x; })(verses)) {
					content = this.setContentVerse(chapter, wholeContent, verseInitial, verseFinal, true);
				} else {
					content = this.setContentVerse(chapter, wholeContent, verseInitial, verseFinal, false);
				}

			} else {
				content = this.setContentVerse(chapter, wholeContent, verseInitial, verseFinal);
			}
		}

		return content;
	}

	/**
	 * This is called when the VerseInitialText element is empty. Returns an array where the
	 * first 2 elements, will lead the content to be displayed and a third
	 * element with the selected content: content = [otherHeader, chapterHeader,
	 * contentToConfigure]
	 */
	setContentVerseIfVerseInitialTextISEmpty(chapter, wholeContent) {
		var content = [];
		content[0] = "";
		var contentToConfigure = wholeContent['desarrollo'];
		content[0] = wholeContent['otherHeader'];
		var regExpBegChapter = new RegExp("([0-9]+ [a-zA-ZÁÉÍÓÚáéíóúñ])|([a-zA-ZÁÉÍÓÚáéíóúñ])");
		var ini = chapter.match(regExpBegChapter);
		content[1] = ini[0] + chapter.slice(ini[0].length).toLowerCase();
		content[2] = contentToConfigure;
		return content
	}

	/**
	 * This is called when the element VerseInitialText has an appropriate 
	 * value and is the last verse of the chapter. Returns an array where the
	 * first 2 elements, will lead the content to be displayed and a third
	 * element with the selected content: content = [otherHeader, chapterHeader,
	 * contentToConfigure]
	 */
	setContentVerseIfVerseInitialTextLastVerse(chapter, wholeContent, verseInitial, verseFinal) {
		var content = [];
		content[0] = "";
		var contentToConfigure = wholeContent['desarrollo'];
		contentToConfigure = contentToConfigure.substring(verseInitial['startPosition'], verseInitial['endPosition']);
		/* for (var verse in verses) {
			if (verse == verseInitial['numberVerse']) {
				contentToConfigure = contentToConfigure.substring(verses[verse][0], verses[verse][1]);
			}
		} */
		content[1] = this.notationContentHeader(chapter, verseInitial, verseFinal, true);
		//contentToConfigure = this.setColorToNumber(contentToConfigure, verses);
		content[2] = contentToConfigure;
		return content;
	}

	/**
	 * This is called when the elements VerseInitialText and verseFinalText have appropriate values. Returns an array where the
	 * first 2 elements, will lead the content to be displayed and a third
	 * element with the selected content: content = [otherHeader, chapterHeader,
	 * contentToConfigure]
	 */
	setContentVerse(chapter, wholeContent, verseInitial, verseFinal, lastVerseInVerseFinalText) {
		var content = [];
		var oneVerse = false;
		content[0] = "";
		var contentToConfigure = wholeContent['desarrollo'];

		if (verseFinal['numberVerse'] == "") {
			contentToConfigure = contentToConfigure.substring(verseInitial['startPosition'], verseInitial['endPosition']);
			oneVerse = true;
		} else if (lastVerseInVerseFinalText) {
			contentToConfigure = contentToConfigure.substring(verseInitial['startPosition']);
		} else {
			contentToConfigure = contentToConfigure.substring(verseInitial['startPosition'], verseFinal['endPosition']);
		}
		content[1] = this.notationContentHeader(chapter, verseInitial, verseFinal, oneVerse)

		//contentToConfigure = this.setColorToNumber(contentToConfigure, verses)
		content[2] = contentToConfigure
		return content
	}

	/**
	 * Set the content header in the form of notation
	 */
	notationContentHeader(chapter, initialVerse, finalVerse, oneVerse) {
		var regExpBegChapter = new RegExp("([0-9]+ [a-zA-ZÁÉÍÓÚáéíóúñ])|([a-zA-ZÁÉÍÓÚáéíóúñ])");
		var ini = chapter.match(regExpBegChapter);
		var notation = ini[0] + chapter.slice(ini[0].length).toLowerCase()+ ': ';
		//var notation = chapter[0] + chapter.slice(1).toLowerCase() + ': ';
		if (oneVerse) {
			notation += initialVerse['numberVerse']
		} else {
			notation += initialVerse['numberVerse'] + '-' + finalVerse['numberVerse']
		}
		return notation;
	}


	setColorFoundTextFromSideBar(content2, chapter) {
		chaptersWithTextsPositions.forEach(element => {
			if (element[0] == chapter) {
				var strings = [];
				element[2].forEach(element2 => {
					var string = content2.substring(element2['start'], element2['end']);
					strings.push(string);
				});
				if (strings.length != 0) {
					strings.forEach(element => {
						var regExpIni = new RegExp("[:,;.ÁÉÍÓÚáéíóúñ]{1,2}");
						var textIni = element.search(regExpIni);
						var a = '<span style="background: orange;">'.concat(element, '</span>');
						if (textIni == -1) {
							var regExp = new RegExp("(\\b" + element + "\\b(?![ÁÉÍÓÚáéíóúñ]))", "g");/* (?<![ÁÉÍÓÚáéíóúñ]) */
							content2 = content2.replace(regExp, a);
						} else {
							var regExp = new RegExp(element, "g");
							content2 = content2.replace(regExp, a);
						}
					});
				}
				//document.getElementById("content-paragraph").innerHTML = content2;

			}
		});
		chaptersWithTextsPositions = [];
		return content2;
	}

	/**
	 * Set the color of the numbers that represent the verses
	 */
	setColorToNumber(contentToConfigure, verses) {
		for (var verse in verses) {
			var regExp = new RegExp("\\b" + verse + "(?!\\d)", "g");
			var a = '<span style="color: green; font-weight: bold;">'.concat(verse, '</span>');
			contentToConfigure = contentToConfigure.replace(regExp, a);
		}
		return contentToConfigure
	}

}

/**
 * Content that is displayed according to the options chosen by the user in the element sidebar-search
 */
class ContentManagementSideBarNav {
	/**
	 * Through this method the requested content is updated.
	*/
	updateContent(text) {
		var content = [];
		var results = new ResultsSearchInBibleBooks();
		var searcher = new SearchTextBibleBooks(text, bibleBooks);
		document.getElementById("otherHeader").innerHTML = 'Resultados de la búsqueda';
		document.getElementById("chapterHeader").innerHTML = '';
		results = searcher.searchInBibleBooks().resultNoRepeat;
		//resultsFinal = results.resultNoRepeat;
		if (results.length != 0) {
			(this.setContentFromSearchInTitleChaptersBooks(results)).forEach(element => {
				content.push(element);
			});
			/* for (var result in results) {
				if (results[result].nameSearch == 'SearchInTitlesChapters') {
					(this.setContentFromSearchInTitleChaptersBooks(results[result].chapters)).forEach(element => {
						content.push(element);
					});
					//document.getElementById("content-paragraph").innerHTML = content;
				} else if (results[result].nameSearch == 'SearchInContentChapters') {
					(this.setContentFromSearchInTitleChaptersBooks(results[result].chapters)).forEach(element => {
						content.push(element);
					});
					//document.getElementById("content-paragraph").innerHTML = content;
				}
			} */
			document.getElementById("content-paragraph").innerHTML = content;
		} else {
			//document.getElementById("content-paragraph").innerHTML = 'La búsqueda no arrojó ningún resultado, quizás deba ser más específico(a)';
		}

	}

	setContentFromSearchInTitleChaptersBooks(chapters) {
		var content = [];
		chapters.forEach(element => {
			for (var testament in bibleBooks) {
				for (var book in bibleBooks[testament]) {
					for (var chapter in bibleBooks[testament][book]) {
						if (element == chapter) {
							//var summary = bibleBooks[testament][book][chapter][0].split(chapter.toUpperCase());
							var summaryWithoutLn = bibleBooks[testament][book][chapter][0]['otherHeader'].split('</br>');
							var summaryContent = '';
							if (summaryWithoutLn.length == 0 || (summaryWithoutLn.length == 1 && summaryWithoutLn[0].length == 0)) {
								summaryContent = bibleBooks[testament][book][chapter][0]['desarrollo'].substring(0, 100).replace('</br>', '').trim() + '...</br>';
							} else {
								for (var j = 0; j < summaryWithoutLn.length; j++) {
									if (summaryWithoutLn[j].trim() != '') {
										summaryContent = summaryContent + summaryWithoutLn[j].trim() + '...</br>';
									}
								}

							}
							var settingNavBarCustomSearch = [testament, book, chapter, '', ''];
							var chapterTransf = this.setFunctionalityLookChapter(settingNavBarCustomSearch);
							content.push(chapterTransf + summaryContent);
						}
					}
				}
			}
		});
		return content;
	}

	/**
	 * Set the functionality and appearance of the chapter
	 */
	setFunctionalityLookChapter(s) {
		var setting = '';
		for (var i = 0; i < s.length; i++) {
			setting = setting.concat('\'', s[i], '\'');
			if (i < s.length - 1) {
				setting += ',';
			}
		}
		//setting = setting.concat('\'', s[0], '\'', ',', '\'', s[1], '\'', ',', '\'', s[2], '\'', ',', '\'', s[3], '\'', ',', '\'', s[4], '\'', ',', '\'', s[5], '\'');
		var chapterTransf = '<a style="color: blue;" href="#" onclick="onclickSearchLink('.concat(setting, ')">', s[2], '</a></br>');
		return chapterTransf;
	}
}

/**
 * This class allows you to search for a text in another text. For the search
 * several methods are implemented. Each method will execute a search according
 * to certain criteria. These are called in a certain order, so that if at least
 * one yields some result, the others will not be executed.
 */
class SearchText {
	/**
	 * This is the main method. From here on, the following methods will be
	 * called according to the results that are obtained.
	 */
	Search(str, text) {

	}
	/**
	 * This transforms the text that will be used in a search taking into account any possible 
	 * lack of spelling of the user, and that the search is not case-sensitive.
	 */
	setTextForLackSpelling(text) {
		var transformedText;
		transformedText = text.toLowerCase();
		transformedText = transformedText.replace(/á/g, 'a');
		transformedText = transformedText.replace(/é/g, 'e');
		transformedText = transformedText.replace(/í/g, 'i');
		transformedText = transformedText.replace(/ó/g, 'o');
		transformedText = transformedText.replace(/ú/g, 'u');
		transformedText = transformedText.replace(/z/g, 's');
		transformedText = transformedText.replace(/c/g, 's');
		transformedText = transformedText.replace(/x/g, 's');
		transformedText = transformedText.replace(/v/g, 'b');
		//transformedText = transformedText.replace(/\bh/g, '');
		return transformedText;
	}
}


/**
 * This class allows you to search for a text in another text. For the search
 * several methods are implemented. Each method will execute a search according
 * to certain criteria. These are called in a certain order, according to the text entered by the user
 * . This class inherits from SearchText. It is more specialized to work with the bibleBooks object of
 * the application.
 */
class SearchTextBibleBooks extends SearchText {
	constructor(text, bibleBooks) {
		super();
		this.text = text.trim();
		this.bibleBooks = bibleBooks;
	}

	/**
	 * This is the main method. From here on, the following methods will be
	 * called according to the results that are obtained.
	 */
	searchInBibleBooks() {
		var results;
		var resultSearchInTitlesChapters;
		var resultsSearchInContentChapters;
		if (this.text == '') {
			return results;
		}
		var textArray = this.text.split(' ');
		resultSearchInTitlesChapters = this.searchInTitlesChapters();
		resultsSearchInContentChapters = this.searchInContentChapters(resultSearchInTitlesChapters);
		results = new ResultsSearchInBibleBooks(resultsSearchInContentChapters, resultSearchInTitlesChapters);
		//document.getElementById("content-paragraph").innerHTML = resultsSearchInContentChapters.chapters;
		return results;
	}


	/**
	 * This method searches if the text entered by the user matches some titles of chapters
	 * of the biblical books. 
	 * Returns an array with all the chapters that match the text entered by the user
	 */
	searchInTitlesChapters() {
		var results = new ContainerResultsSearch();
		var chapters = [];
		var transformedText = super.setTextForLackSpelling(this.text);
		var chaptersFromWords = [];
		var chaptersFromNumbers = [];

		for (var testament in this.bibleBooks) {
			for (var book in this.bibleBooks[testament]) {
				for (var chapter in this.bibleBooks[testament][book]) {
					var transformedTitleChapter = super.setTextForLackSpelling(chapter);
					if (transformedText == transformedTitleChapter) {
						chapters[0] = chapter;
						results.nameSearch = 'SearchInTitlesChapters';
						results.chapters = chapters;
						return results;
					}
					var transformedTextArray = transformedText.split(' ');
					for (var j = 0; j < transformedTextArray.length; j++) {
						if (isNaN(transformedTextArray[j])) {
							var regExpWord = new RegExp("\\b" + transformedTextArray[j] + "\\b");
							if (transformedTitleChapter.search(regExpWord) != -1) {
								chaptersFromWords.push(chapter);
							}
						} else {
							var regExpNumber = new RegExp("\\b" + transformedTextArray[j] + "(?!\\d)");
							if (transformedTitleChapter.search(regExpNumber) != -1) {
								chaptersFromNumbers.push(chapter)
							}
						}
					}
				}
			}
		}
		if (chaptersFromWords.length != 0) {
			chapters = chaptersFromWords;
		} else {
			chapters = chaptersFromNumbers;
		}
		if (chapters.length != 0) {
			results.chapters = chapters;
			results.nameSearch = 'SearchInTitlesChapters';
		}
		return results;
	}

	/**
	 * This method searches the content of each chapter in the biblical books. The search is made taking into account any possible 
	 * lack of spelling introduced by the user. The method has several search filters, where each filtering has a different level of precision 
	 * so that the results fit more accurately to the text entered by the user, in one filtering more than in another. The most 
	 * accurate filtrations will be the first to be applied, and if an amount of 1000 results is reached, no other type of filtering 
	 * of less precision is applied.
	 */
	searchInContentChapters(resultSearchInTitlesChapters) {
		var results = new ContainerResultsSearch();
		var chapters = '';
		var numVersesTitlesChapter = [];
		var numVersesNoTitlesChapter = [];
		var transformedText = super.setTextForLackSpelling(this.text);
		if (resultSearchInTitlesChapters.countResults != 0) {
			numVersesTitlesChapter = this.searchWholeTextInContentConsideringTitlesChapters(resultSearchInTitlesChapters, transformedText, true);
			numVersesNoTitlesChapter = this.searchWholeTextInContentConsideringTitlesChapters(resultSearchInTitlesChapters, transformedText, false);
		} else {
			numVersesNoTitlesChapter = this.searchWholeTextInContentWithoutConsideringTitlesChapters(transformedText);
		}
		results.nameSearch = 'SearchInContentChapters';
		for (var i = 1; i <= 3; i++) {
			numVersesTitlesChapter.forEach(element => {
				if (element[1] == i) {
					var repeatChapter = results.chapters.includes(element[0]);
					/* results.chapters.forEach(element2 => {
						if (element2 == element[0]) {
							repeatChapter = false;
						}
					}); */
					if (!repeatChapter) {
						results.chapters.push(element[0]);
						chaptersWithTextsPositions.push(element);
					}
				}
			});
		}

		for (var i = 1; i <= 3; i++) {
			numVersesNoTitlesChapter.forEach(element => {
				if (element[1] == i) {
					var repeatChapter = results.chapters.includes(element[0]);
					if (!repeatChapter) {
						results.chapters.push(element[0]);
						chaptersWithTextsPositions.push(element);
					}
				}
			});
		}
		/* 
		transformedText = transformedText.replace(/\d/g, '');
		var transformedTextArray = transformedText.split(' ');
		numbersVerses = this.searchInContentConsideringTitlesChapters(numbersVerses, resultSearchInTitlesChapters, transformedTextArray, true, countDesiredResults);
		if (numbersVerses.length < countDesiredResults) {
			numbersVersesNoCoincident = this.searchInContentConsideringTitlesChapters(numbersVersesNoCoincident, resultSearchInTitlesChapters, transformedTextArray, false, countDesiredResults - numbersVerses.length);
		} */
		//document.getElementById("content-paragraph").innerHTML = results.chapters;
		return results;
	}

	searchWholeTextInContentConsideringTitlesChapters(resultSearchInTitlesChapters, transformedText, findMatchBool) {
		var results = [];
		for (var testament in this.bibleBooks) {
			for (var book in this.bibleBooks[testament]) {
				for (var chapter in this.bibleBooks[testament][book]) {
					var searchBool;
					if (findMatchBool) {
						searchBool = resultSearchInTitlesChapters.chapters.includes(chapter);
						/* for (var i = 0; i < resultSearchInTitlesChapters.countResults; i++) {
							if (resultSearchInTitlesChapters.chapters[i] == chapter) {
								searchBool = true;
								break;
							}
						} */
					} else {
						searchBool = !(resultSearchInTitlesChapters.chapters.includes(chapter));
						/* searchBool = true;
						for (var i = 0; i < resultSearchInTitlesChapters.countResults; i++) {
							if (resultSearchInTitlesChapters.chapters[i] == chapter) {
								searchBool = false;
								break;
							}
						} */
					}

					if (searchBool) {
						var transformedContentWithoutHeader = bibleBooks[testament][book][chapter][0]['desarrollo'];
						var transformedContent = super.setTextForLackSpelling(transformedContentWithoutHeader);
						var stringsObjectsArray = this.createStringPositionsObjects(transformedContent, transformedText, book, chapter);
						if (stringsObjectsArray.length != 0) {
							for (var i = 1; i <= 3; i++) {
								var stringsObjectsArrayPerPriority = [];
								stringsObjectsArray.forEach(element => {
									if (i == element[0]) {
										stringsObjectsArrayPerPriority.push(element[1]);
									}
								});
								if (stringsObjectsArrayPerPriority.length != 0) {
									results.push([chapter, i, stringsObjectsArrayPerPriority]);
								}
							}
						}
					}
				}
			}
		}
		//document.getElementById("content-paragraph").innerHTML = chapterTest + ' ' + results.length + ' ' + chapters;
		return results;
	}



	searchWholeTextInContentWithoutConsideringTitlesChapters(transformedText) {
		var results = [];
		var chapters = '';
		for (var testament in this.bibleBooks) {
			for (var book in this.bibleBooks[testament]) {
				for (var chapter in this.bibleBooks[testament][book]) {
					var transformedContentWithoutHeader = bibleBooks[testament][book][chapter][0]['desarrollo'];
					var transformedContent = super.setTextForLackSpelling(transformedContentWithoutHeader);
					var stringsObjectsArray = this.createStringPositionsObjects(transformedContent, transformedText, book, chapter);
					if (stringsObjectsArray.length != 0) {
						for (var i = 1; i <= 3; i++) {
							var stringsObjectsArrayPerPriority = [];
							stringsObjectsArray.forEach(element => {
								if (i == element[0]) {
									stringsObjectsArrayPerPriority.push(element[1]);
								}
							});
							if (stringsObjectsArrayPerPriority.length != 0) {
								results.push([chapter, i, stringsObjectsArrayPerPriority]);
							}
						}
					}
				}
			}
		}
		//document.getElementById("content-paragraph").innerHTML = chapterTest + ' ' + results.length + ' ' + chapters;
		return results;
	}

	createStringPositionsObjects(transformedContent, transformedText, book, chapter) {
		var stringsWhole = [1, StringsCob.substringPositions(transformedContent, transformedText)];
		var stringsTitleChapters = [];
		var bookTransformed = this.setTextForLackSpelling(book);
		var whithoutTitle = transformedText.replace(bookTransformed, '').trim();
		if (whithoutTitle != '' && whithoutTitle != transformedText) {
			stringsTitleChapters = [2, StringsCob.substringPositions(transformedContent, whithoutTitle)];
		}
		var stringsKeysObjectsArray = [];
		var stringsKeysArray = transformedText.split(' ');
		if (stringsKeysArray.length != 0) {
			stringsKeysArray.forEach(element => {
				if ((element != '') && (isNaN(element))) {
					var stringsObject = [3, StringsCob.substringPositions(transformedContent, element)];
					if (stringsObject.length != 0) {
						stringsKeysObjectsArray.push(stringsObject);
					}
				}
			});
		}

		var stringsObjectsArray = [];
		stringsObjectsArray = this.solaparPosicionamientosdeDosSubStringsPositionsArray(stringsObjectsArray, stringsWhole);
		if (stringsTitleChapters.length != 0) {
			stringsObjectsArray = this.solaparPosicionamientosdeDosSubStringsPositionsArray(stringsObjectsArray, stringsTitleChapters);
		}
		if (stringsKeysObjectsArray != 0) {
			stringsKeysObjectsArray.forEach(element => {
				stringsObjectsArray = this.solaparPosicionamientosdeDosSubStringsPositionsArray(stringsObjectsArray, element);
			});
		}

		if (chapter == 'JEREMÍAS 20') {
			var texto = '';
			stringsKeysObjectsArray.forEach(element => {

			});
			//document.getElementById("content-paragraph").innerHTML = stringsObjectsArray;
		}
		return stringsObjectsArray;
	}

	solaparPosicionamientosdeDosSubStringsPositionsArray(stringPositionsArray, stringPositionsArray2) {
		var positionsSubstringSolapadoArray = [];
		if (stringPositionsArray2[1].length != 0) {
			if (stringPositionsArray.length == 0) {
				var stringObject = { start: '', end: '' };
				stringPositionsArray2[1].forEach(element => {
					stringObject = { start: element.start, end: element.end };
					positionsSubstringSolapadoArray.push([stringPositionsArray2[0], stringObject]);
				});
			} else {
				var newElements = [];
				stringPositionsArray2[1].forEach(elementString2 => {
					var otherNew = true;
					stringPositionsArray.forEach(elementString1 => {
						if ((elementString1[1]['start'] <= elementString2.end) && (elementString1[1]['end'] >= elementString2.end)) {
							otherNew = false;
						} else if ((elementString1[1]['start'] < elementString2.start) && (elementString1[1]['end'] > elementString2.start) && (elementString1[1]['end'] < elementString2.end)) {
							elementString1[1]['end'] = elementString2.end;
							otherNew = false;
						} else if ((elementString1[1]['start'] > elementString2.start) && (elementString1[1]['start'] < elementString2.end) && (elementString1[1]['end'] > elementString2.end)) {
							elementString1[1]['start'] = elementString2.start;
							otherNew = false;
						}
					});
					if (otherNew) {
						newElements.push([stringPositionsArray2[0], { start: elementString2.start, end: elementString2.end }]);
					}
				});
				stringPositionsArray.forEach(element => {
					positionsSubstringSolapadoArray.push(element);
				});
				newElements.forEach(element => {
					positionsSubstringSolapadoArray.push(element);
				});
			}
		} else {
			positionsSubstringSolapadoArray = stringPositionsArray;
		}
		return positionsSubstringSolapadoArray;
	}


}

class ContainerResultsSearch {
	constructor() {
		this.nameSearch = '';
		this.chapters = [];
	}
	get countResults() {
		return (this.chapters.length);
	}
}

/* class ResultsSearchInTitlesChapters {
	constructor() {
		this.nameSearch = 'SearchInTitlesChapters';
		this.chapters = [];
		this.countResults = 0;
	}
}
class ResultsSearchInContentChapters {
	constructor() {
		this.nameSearch = 'SearchInContentChapters';
		this.chapters = [];
		this.countResults = 0;
	}
} */

class ResultsSearchInBibleBooks {
	constructor(results_SearchInContentChapters, results_SearchInTitlesChapters) {
		this.resultsSearchInContentChapters = results_SearchInContentChapters;
		this.resultsSearchInTitlesChapters = results_SearchInTitlesChapters;
	}
	get resultNoRepeat() {
		var result = [];
		var resultNoRe = [];
		this.resultsSearchInTitlesChapters.chapters.forEach(element => {
			var repeat = this.resultsSearchInContentChapters.chapters.includes(element);
			/* this.resultsSearchInContentChapters.chapters.forEach(element2 => {
				if (element == element2) {
					repeat = true;
				}
			}); */
			if (!repeat) {
				resultNoRe.push(element);
			}
		});
		this.resultsSearchInContentChapters.chapters.forEach(element => {
			result.push(element);
		});
		resultNoRe.forEach(element => {
			result.push(element);
		});
		return result;
	}
	get countResults() {
		return (this.resultsSearchInTitlesChapters.countResults + this.resultsSearchInContentChapters.countResults);
	}
}

//Functions
function createVerseObject(verses, verseText) {
	var verseObject = { numberVerse: '', startPosition: '', endPosition: '' };
	for (var verse in verses) {
		if (verse == verseText) {
			verseObject = { numberVerse: verse, startPosition: verses[verse][0], endPosition: verses[verse][1] };
		}
	}
	return verseObject;
}