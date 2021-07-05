// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/registration.js":[function(require,module,exports) {
//Opening and closing of modal
var modal = document.getElementById("regModal");
var registerBtn = document.getElementById("registerBtn");
var closeBtn = document.getElementById("regCloseBtn");
var submitBtn = document.getElementById("submitBtn");
var tabs = document.querySelectorAll(".tab");
var noticeModal = document.querySelector("regNoticeModal");
var currentTab = 0;
registerBtn.addEventListener("click", function () {
  console.log(noticeModal);
  noticeModal.style.display = "block";
  console.log("click");
});
registerBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", closeModal); // submitBtn.addEventListener("click", closeModal);
//styles select fields

var selectArray = document.querySelectorAll(".form-control.select");
selectArray.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.value != "") {
      item.style.color = "rgb(255,255,255)";
    }
  });
}); //Other option functionality.

var genderGroup = document.querySelector("#Gender");
var GenderOptions = genderGroup.querySelectorAll(".form-check-label");
var otherOptionText = genderGroup.querySelector("#other-text-input");
GenderOptions.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.id == "other-label") {
      otherOptionText.style.display = "inline";
      otherOptionText.focus();
    } else {
      otherOptionText.style.display = "none";
    }
  });
});

function resetSelectFields() {
  selectArray.forEach(function (item) {
    item.style.color = "rgba(255,255,255,0.5)";
  });
} //show resume name


var resume = document.getElementById("resume");
resume.addEventListener("change", function (e) {
  document.getElementById("resumeName").innerHTML = e.target.files[0].name;
}); //open modal

function openModal() {
  modal.style.display = "block";
  showTab(currentTab);
}

function closeModal(e) {
  if (e.target == modal || e.target == closeBtn) {
    modal.style.display = "none";
    document.getElementById("regForm").reset();
    resetSelectFields(); //reset Tabs

    currentTab = 0;
    tabs.forEach(function (tab) {
      tab.style.display = "none";
    }); //reset Resume Selection

    document.getElementById("resumeName").innerHTML = "";
  }
}

var nextBtn = document.querySelector("#nextBtn");
var prevBtn = document.querySelector("#prevBtn");
nextBtn.addEventListener("click", nextTab);
prevBtn.addEventListener("click", prevTab);

function showTab(n) {
  tabs[n].style.display = "block"; //show or hide previous button

  if (n == 0) {
    //first tab
    prevBtn.style.display = "none";
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }

  if (n > 0 && n < tabs.length) {
    //anything in between
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }

  if (n >= tabs.length - 1) {
    //last tab
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  }
}

function nextTab() {
  //validate input
  if (currentTab == 0) {
    var passedNameTest = validateName();
    var passedPhoneNumberTest = validatePhoneNumber();
    var passedEmailTest = validateEmail();
    var nameErrorMessage = document.getElementById("nameErrorMessage");
    var emailErrorMessage = document.getElementById("emailErrorMessage");
    var phoneNumberErrorMessage = document.getElementById("phoneNumberErrorMessage");

    if (!passedNameTest) {
      nameErrorMessage.style.display = "block";
    } else {
      nameErrorMessage.style.display = "none";
    }

    if (!passedEmailTest) {
      emailErrorMessage.style.display = "block";
    } else {
      emailErrorMessage.style.display = "none";
    }

    if (!passedPhoneNumberTest) {
      phoneNumberErrorMessage.style.display = "block";
    } else {
      phoneNumberErrorMessage.style.display = "block";
    }

    if (passedNameTest && passedEmailTest && passedPhoneNumberTest) {
      nameErrorMessage.style.display = "none";
      emailErrorMessage.style.display = "none";
      phoneNumberErrorMessage.style.display = "none";
      tabs[currentTab].style.display = "none";
      currentTab = currentTab + 1;
      showTab(currentTab);
    }
  } //checks if correct age is entered.
  else if (currentTab == 1) {
      var passedAgeTest = validateAge();

      var _phoneNumberErrorMessage = document.getElementById("ageErrorMessage");

      if (!passedAgeTest) {
        ageErrorMessage.style.display = "block";
      } else {
        ageErrorMessage.style.display = "none";
        tabs[currentTab].style.display = "none";
        currentTab = currentTab + 1;
        showTab(currentTab);
      }
    } else {
      tabs[currentTab].style.display = "none";
      currentTab = currentTab + 1;
      showTab(currentTab);
    }
}

function prevTab() {
  tabs[currentTab].style.display = "none";
  currentTab = currentTab - 1;
  showTab(currentTab);
} //Form validation
//validate email field.


function validateEmail() {
  var emailValue = document.getElementById("email").value;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailValue).toLowerCase());
} //validate Name field.


function validateName() {
  var nameValue = document.getElementById("name").value;

  if (nameValue == "") {
    return false;
  }

  return true;
} //validate Phone Number field.


function validatePhoneNumber() {
  var phoneNumberValue = document.getElementById("phoneNumber").value;
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phoneNumberValue));
}

function validateAge() {
  var ageValue = document.getElementById("age").value;
  var re = /^[1-9]?[0-9]{1}$|^100$/;
  return re.test(String(ageValue));
} //send post request to the server.


registrationForm = document.getElementById("regForm");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var formData = new FormData(registrationForm);
  fetch("https://radiant-tundra-50768.herokuapp.com/", {
    method: "POST",
    body: formData,
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log("Success:", data);
  }).catch(function (error) {
    console.log("Error:", error);
  });
  modal.style.display = "none";
  document.getElementById("confirm").style.display = "block";
  setTimeout(function () {
    document.getElementById("confirm").style.display = "none";
  }, 2900);
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58242" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/registration.js"], null)
//# sourceMappingURL=/registration.9382a251.js.map