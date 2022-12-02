import { Selector } from 'testcafe';
import { runBaseTests } from '../../br-e2e-tests/helpers/base.js';
import { runRightToLeftTests } from '../../br-e2e-tests/helpers/rightToLeft.js';
import BookReader from '../../br-e2e-tests/models/BookReader.js';
import { DesktopNav } from '../../br-e2e-tests/models/Navigation.js';
import { runSearchTests } from './helpers/search-inside.js';

const localURL = 'https://archive.org/details/';
const books = [
  'birdbookillustra00reedrich', // publicDomain
  // 'pianoservicingtu00rebl_0', // borrowable,
  // 'adventuresoftoms00twaiiala', // has chapter markers
  // 'gendaitankashu00meijuoft', // Right to Left book
  // 'gov.uspto.patents.application.10074026', // multiple files,
  // 'theworksofplato01platiala', //bookreader demo
];

const successfulSearchQueries = {
  'birdbookillustra00reedrich': 'observation',
  'pianoservicingtu00rebl_0': 'piano',
};


class iaBookNavigation {
  constructor() {
    this.topNavShell = new Selector('.BRtoolbar');
    this.bottomNavShell = new Selector('.BRfooter');
    this.mobileMenu = new Selector('.BRmobileMenu');
    this.iaBookTheater = new Selector('ia-book-theater');
    this.iaBookReader = this.iaBookTheater.shadowRoot().find('ia-bookreader');
    this.itemNav = this.iaBookReader.shadowRoot().find('ia-item-navigator').shadowRoot();
    this.desktop = new DesktopNav(this.bottomNavShell, this.itemNav);
  }
}

/* ***** TESTS ***** */
books.forEach(function(page) {
  const url = `${localURL}${page}`;
  const brForBaseTest = new BookReader();
  brForBaseTest.nav = new iaBookNavigation();
  fixture `Archive.org BR Base Tests for: ${page}`.page `${url}`;
  runBaseTests(brForBaseTest);

  const query = successfulSearchQueries[page];
  const brForSearchTest = new BookReader();
  brForSearchTest.nav = new iaBookNavigation();
  fixture `Archive.org BR Search Inside Tests for: ${page}, q: ${query}`.page `${url}`;
  runSearchTests(brForSearchTest, query);
});

// Right-to-Left tests
['gendaitankashu00meijuoft'].forEach(function(page) {
  const url = `${localURL}${page}`;

  const rtlBr = new BookReader();
  rtlBr.nav = new iaBookNavigation();
  fixture `Archive.org BR Right-to-Left tests for: ${page}`.page `${url}`;
  runRightToLeftTests(rtlBr);
});
