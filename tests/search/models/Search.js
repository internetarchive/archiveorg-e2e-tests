import { Selector } from 'testcafe';

/** Model defining Search base elements */
export default class Search {
  constructor () {
    this.pageSearch = Selector('app-root').shadowRoot().find('search-page');
    this.inputSearch = this.pageSearch
      .shadowRoot().find('collection-search-input')
      .shadowRoot().find('ia-clearable-text-input')
      .shadowRoot().find('#text-input');
    
    this.btnGo = this.pageSearch
      .shadowRoot().find('collection-search-input')
      .shadowRoot().find('#go-button');

    this.collectionBrowser = this.pageSearch.shadowRoot().find('collection-browser');
    this.collBrowserLeftColumn = this.collectionBrowser.shadowRoot().find('#left-column');
    this.collBrowserRightColumn = this.collectionBrowser.shadowRoot().find('#right-column');
  }
}
