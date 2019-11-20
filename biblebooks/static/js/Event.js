/**
 * In this script, all the functions associated with the events of the different html elements are grouped
 */


/**
		 * This function will be called when the user changes the selected option of the
		 * select element (id = "testamentSelect"), through the onChange event.
		 */
function onChangeTestamentSelect() {
    manipulator.populateBookSelect();
}

/**
 * This function will be called when the user changes the selected option of the
 * select element (id = "bookSelect"), through the onChange event.
 */
function onChangeBookSelect() {
    manipulator.populateChapterSelect();
}

/**
 * This function will be called when the user changes the selected option of the
 * select element (id = "chapterSelect"), through the onChange event.
 */
function onChangeChapterSelect() {
    manipulator.resetVersesInputText()
}

/**
 *This function will be called when the user clicks on the button (id = "goButton"), through the onclick event.
 */
function onclickgoButton() {
    ContentUpdater.updateContentNavBarCustomSearch();
}

/**
*It will be called through the onclick event of the button (id = "previousChapterButton").
*/
function onclickPreviousChapterButton() {
    manipulator.previousChapter();
    ContentUpdater.updateContentNavBarCustomSearch();
}

/**
*It will be called through the onclick event of the button (id = "nextChapterButton").
*/
function onclickNextChapterButton() {
    manipulator.nextChapter();
    ContentUpdater.updateContentNavBarCustomSearch();
}

function onClikSideBarButton() {
    chaptersWithTextsPositions = [];
    var textToSearch = document.getElementById("searchInputText").value;
    if (textToSearch.trim() != '') {
        ContentUpdater.updateContentSidebarSearch(textToSearch.trim());
    }

}

function onclickSearchLink(testament, book, chapter, verseIni, verseFin) {
    manipulator.setNavBarCustomSearch(testament, book, chapter, verseIni, verseFin);
    ContentUpdater.updateContentNavBarCustomSearch();
}

function onClikSideBarPruebasButton() {
    var content = [];
    var position;
    var chaptersDefectuosos = '';
    for (var testament in bibleBooks) {
        for (var book in bibleBooks[testament]) {
            for (var chapter in bibleBooks[testament][book]) {
                if (chapter == 'FILEMÓN 1') {
                    var string = '24 Marcos, ';
                    position = bibleBooks[testament][book][chapter][0]['desarrollo'].search(string);
                    var verses = bibleBooks[testament][book][chapter][1];
                    for (var verse in verses) {
                        var array = [, []];
                        array[0] = verse;
                        array[1] = verses[verse];
                        content.push(array);
                    }
                }
                if (bibleBooks[testament][book][chapter][0]['desarrollo'].search('\\((([0-9]+ )|())([a-zA-Z]+)\\.') != -1) {
                    chaptersDefectuosos += chapter + ' ';
                }
            }
        }
    }
    var text = 'REYES 1';
    var regExpBegChapter = new RegExp("([0-9]+ [a-zA-Z])|([a-zA-Z])");
    var ini = text.match(regExpBegChapter,);
    var content2 = ini[0] + text.slice(ini[0].length).toLowerCase();
    document.getElementById("content-paragraph").innerHTML = content2;
}
//var regParenthesis = new RegExp("\\((([0-9]+ )|())([a-zA-Z]+)\\. [0-9]+\\.[0-9]+((-[0-9]+)|())(((; [0-9]+\\.[0-9]+((-[0-9]+)|()))+)|())(((; (([0-9]+ )|())([a-zA-Z]+)\\. [0-9]+\\.[0-9]+((-[0-9]+)|())(((; [0-9]+\\.[0-9]+((-[0-9]+)|()))+)|()))+)|())\\)", "g");
