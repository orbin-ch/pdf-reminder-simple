(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("roboto-base64"), require("pdfmake/build/pdfmake"));
	else if(typeof define === 'function' && define.amd)
		define(["roboto-base64", "pdfmake/build/pdfmake"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("roboto-base64"), require("pdfmake/build/pdfmake")) : factory(root["roboto-base64"], root["pdfmake/build/pdfmake"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _robotoBase = __webpack_require__(1);

	var _robotoBase2 = _interopRequireDefault(_robotoBase);

	var _pdfmake = __webpack_require__(2);

	var _pdfmake2 = _interopRequireDefault(_pdfmake);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.pdfMake = {
	  vfs: _robotoBase2.default
	};

	var defaultStyle = {
	  fontSize: 10
	};

	var tableLayout = {
	  hLineWidth: function hLineWidth(i) {
	    return i === 1 ? 1 : 0;
	  },
	  vLineWidth: function vLineWidth() {
	    return 0;
	  },
	  paddingLeft: function paddingLeft() {
	    return 0;
	  },
	  paddingRight: function paddingRight() {
	    return 0;
	  },
	  paddingTop: function paddingTop(i) {
	    return i === 1 ? 15 : 5;
	  },
	  paddingBottom: function paddingBottom() {
	    return 5;
	  }
	};

	var footerLayout = {
	  hLineWidth: function hLineWidth(i, node) {
	    return i === 0 || i === node.table.body.length || i === node.table.body.length - 1 ? 1 : 0;
	  },
	  vLineWidth: function vLineWidth() {
	    return 0;
	  },
	  paddingLeft: function paddingLeft() {
	    return 0;
	  },
	  paddingRight: function paddingRight() {
	    return 0;
	  },
	  paddingTop: function paddingTop(i, node) {
	    return i === 0 || i === node.table.body.length - 1 ? 10 : 5;
	  },
	  paddingBottom: function paddingBottom(i, node) {
	    return i === node.table.body.length - 1 || i === node.table.body.length - 2 ? 10 : 5;
	  }
	};

	exports.default = function (invoice, reminder, profile) {
	  return _pdfmake2.default.createPdf(getDoc(invoice, reminder, profile));
	};

	function getDoc(invoice, reminder, profile) {
	  var organizationSettings = profile.organizationSettings;
	  var address = organizationSettings.address;
	  var billingAddress = invoice.billingAddress;
	  var totalAmount = invoice.total + reminder.feeAmount;

	  var doc = {
	    defaultStyle: defaultStyle,
	    content: [{
	      text: returnAddressText({
	        name: organizationSettings.name,
	        street: address.street,
	        postCode: address.postCode,
	        city: address.city
	      }),
	      margin: [0, 120, 0, 0],
	      fontSize: 8,
	      color: "gray"
	    }, {
	      margin: [0, 10, 0, 0],
	      layout: "noBorders",
	      table: {
	        widths: ["auto", "*", "auto", "auto"],
	        body: [[invoice.contactName || "", "", "Datum:", {
	          text: reminder.creationDate.format("DD.MM.YYYY"),
	          alignment: "right"
	        }], [billingAddress.street || "", "", "", ""], [(billingAddress.postCode || "") + " " + (billingAddress.city || ""), "", "", ""]]
	      }
	    }, {
	      fontSize: 18,
	      text: reminder.typeName,
	      margin: [0, 50, 0, 0]
	    }, {
	      margin: [0, 25, 0, 0],
	      text: reminder.note || ""
	    }, {
	      margin: [0, 25, 0, 0],
	      layout: tableLayout,
	      table: {
	        headerRows: 1,
	        widths: ["*", "auto"],
	        body: [["Beschreibung", {
	          text: "Betrag",
	          alignment: "right"
	        }]]
	      }
	    }]
	  };

	  doc.content[4].table.body.push([{
	    stack: ["Rechnung", {
	      margin: [0, 2, 0, 0],
	      text: invoice.date.format("DD.MM.YYYY"),
	      color: "gray"
	    }]
	  }, {
	    text: invoice.total.toFixed(2),
	    alignment: "right"
	  }]);

	  if (reminder.feeAmount) {
	    doc.content[4].table.body.push(["Gebühr", {
	      text: reminder.feeAmount.toFixed(2),
	      alignment: "right"
	    }]);
	  }

	  doc.content.push({
	    margin: [0, 25, 0, 0],
	    layout: footerLayout,
	    table: {
	      headerRows: 1,
	      widths: ["*", "auto"],
	      body: [["Gesamtsumme " + (invoice.currencyId || "CHF"), {
	        text: totalAmount.toFixed(2),
	        alignment: "right"
	      }]]
	    }
	  });

	  doc.content.push({
	    text: profile.invoiceSettings.note || "",
	    margin: [0, 20, 0, 0],
	    color: "gray",
	    fontSize: 8
	  });

	  return doc;
	}

	function returnAddressText(address) {
	  var location = [address.postCode, address.city].join(" ").trim();

	  return [address.name, address.street, location].filter(function (value) {
	    return value;
	  }).join(", ");
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;