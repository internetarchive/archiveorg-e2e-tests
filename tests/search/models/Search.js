import { Selector } from 'testcafe';

/** Model defining Search base elements */
export default class Search {
  constructor () {
    this.appRoot = Selector('app-root');

    this.pageSearch = this.appRoot.shadowRoot().find('search-page');
    this.inputSearch = this.pageSearch
      .shadowRoot().find('collection-search-input')
      .shadowRoot().find('ia-clearable-text-input')
      .shadowRoot().find('#text-input');
    
    this.btnGo = this.pageSearch
      .shadowRoot().find('collection-search-input')
      .shadowRoot().find('#go-button');

    this.actionBar = this.pageSearch.shadowRoot()
      .find('#action-bar-spacing')
      .find('action-bar');

    this.collectionBrowser = this.pageSearch.shadowRoot().find('collection-browser');

    this.collBrowserLeftColumn = this.collectionBrowser.shadowRoot().find('#left-column');
    this.collFacets = this.collBrowserLeftColumn.find('collection-facets');

    this.collBrowserRightColumn = this.collectionBrowser.shadowRoot().find('#right-column');
    this.sortFilterBar = this.collBrowserRightColumn.find('sort-filter-bar');
    this.infiniteScroller = this.collBrowserRightColumn.find('infinite-scroller');
  }
}
