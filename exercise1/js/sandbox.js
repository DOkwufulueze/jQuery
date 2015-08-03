'use strict'

class Selector {

  //Selector copnstructor
  constructor() {
    this._module = $('div.module');
    this._thirdChild = $('#myList > li:eq(2)');
    this._label = $('label[for = "q"]');
    this._howManyHidden = $('body')
                        .find(':hidden')
                        .not('script')
                        .length;
    this._howManyAlts = $('img[alt]')
                        .length;
    this._howManyOddRows = $('tr:even')
                        .length;
    this._init();
  }

  _init() {
    this._runSelector1();
    this._runSelector2();
    this._runSelector3();
    this._runSelector4();
    this._runSelector5();
    this._runSelector6();
  }

  _runSelector1() {
    $(() => {

      //ALl div elements that have a class of 'module'
      console.log(`1. ALl div elements that have a class of 'module': ${this._module}. They are ${this._module.length} in number.`);
    });
  }

  _runSelector2() {
    $(() => {

      /*  getting third item in the #myList unordered list
      *   The three methods to do this are:
      *     $('#myList > li:nth-child(3)'), $('#myList > li:eq(2)'), $('#myList > li:nth-of-type(3)')
      *   I choose $(myList > li:eq(2)) because of its simplicity of expression (shorter code)
      *   and the fact that only the required selector is visited for the search. 
      *   For nth-child, ALL the children are visited no matter the selector given 
      *   and the one matching the selector in the nth position is selected. 
      *   For nth-of-type, selections are made with siblings taken under consideration. This extra
      *   job of considering siblings is not needed here.
      */
      console.log(`2. The third item in the #myList unordered list is ${this._thirdChild} and it says: ${this._thirdChild.html()}`);
    });
  }

  _runSelector3() {
    $(() => {

      //The label for the search input using an attribute selector
      console.log(`3. The label for the search input is ${this._label} and it says: ${this._label.html()}`);
    });
  }

  _runSelector4() {
    $(() => {

      //How many elements on the page are hidden
      console.log(`4. There are ${this._howManyHidden} hidden elements on this page`);
    });
  }

  _runSelector5() {
    $(() => {

      //How many image elements on the page have an alt attribute
      console.log(`5. There are ${this._howManyAlts} Image elements with the 'alt' attribute on this page`);
    });
  }

  _runSelector6() {
    $(() => {

      /*  All of the odd table rows in the table body. Since jQuery starts from 0, 
      *   tr:odd starts from the second(even) row while tr:even starts from the first(odd) row.
      *   So, I'll use tr:even
      */
      console.log(`6. There are ${this._howManyOddRows} odd table rows on this page`);
    });
  }
}

new Selector();

