import { NotImplementedException, throwIfInstantiateAbstract } from "@locustjs/exception";
import { isSomeString } from "@locustjs/base";
import DebuggerBase from "./DebuggerBase";

class DebuggerBase {
  constructor() {
    throwIfInstantiateAbstract(DebuggerBase, this);
  }
  get debugMode() {
    throw NotImplementedException(`DebuggerBase.debugMode getter`)
  }
  set debugMode(value) {
    throw NotImplementedException(`DebuggerBase.debugMode setter`)
  }

  get logFilter() {
    throw NotImplementedException(`DebuggerBase.logFilter getter`)
  }
  set logFilter(value) {
    throw NotImplementedException(`DebuggerBase.logFilter setter`)
  }
  get logScopeFilter() {
    throw NotImplementedException(`DebuggerBase.logScopeFilter getter`)
  }
  set logScopeFilter(value) {
    throw NotImplementedException(`DebuggerBase.logScopeFilter setter`)
  }
}

// -------------------------------- DebuggerDefault ---------------------------

let _debugMode = false;
let _logFilter = false;
let _logScopeFilter = false;

class DebuggerDefault extends DebuggerBase {
  constructor(options) {
    super();

    this.options = Object.assign({
      debugModeKey: '',
      logFilterKey: '',
      logScopeFilterKey: '',
    }, options)

    if (!isSomeString(this.options.debugModeKey)) {
      this.options.debugModeKey = '_dbg.dm'
    }
    if (!isSomeString(this.options.logFilterKey)) {
      this.options.debugModeKey = '_dbg.lf'
    }
    if (!isSomeString(this.options.logScopeFilterKey)) {
      this.options.debugModeKey = '_dbg.lsf'
    }
  }
  get debugMode() {
    const value = typeof window == 'undefined' ? _debugMode : window.sessionStorage.getItem(this.options.debugModeKey);

    return value == "true" || value == "1";
  }
  set debugMode(value) {
    if (typeof window == 'undefined') {
      _debugMode = value;
    } else {
      window.sessionStorage.setItem(this.options.debugModeKey, value);
    }
  }
  get logFilter() {
    const value = typeof window == 'undefined' ? _debugMode : window.sessionStorage.getItem(this.options.logFilterKey);

    return value == "true" || value == "1";
  }
  set logFilter(value) {
    if (typeof window == 'undefined') {
      _logFilter = value;
    } else {
      window.sessionStorage.setItem(this.options.logFilterKey, value);
    }
  }
  get logScopeFilter() {
    const value = typeof window == 'undefined' ? _debugMode : window.sessionStorage.getItem(this.options.logScopeFilterKey);

    return value == "true" || value == "1";
  }
  set logScopeFilter(value) {
    if (typeof window == 'undefined') {
      _logScopeFilter = value;
    } else {
      window.sessionStorage.setItem(this.options.logScopeFilterKey, value);
    }
  }
}

export { DebuggerBase, DebuggerDefault }
