import { Selector } from 'testcafe';

/** Model defining Search base elements */
export default class Search {
  constructor () {
    this.searchPage = Selector('app-root').shadowRoot().find('search-page');
    this.searchInput = this.searchPage.shadowRoot().find('collection-search-input');
  }
}
