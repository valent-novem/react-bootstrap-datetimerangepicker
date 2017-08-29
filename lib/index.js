var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import getOptions from './getOptions';

var events = ['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'];

var DatetimeRangePicker = function (_React$Component) {
  _inherits(DatetimeRangePicker, _React$Component);

  function DatetimeRangePicker(props) {
    _classCallCheck(this, DatetimeRangePicker);

    var _this = _possibleConstructorReturn(this, (DatetimeRangePicker.__proto__ || Object.getPrototypeOf(DatetimeRangePicker)).call(this, props));

    _this.state = {};

    _this.$picker = undefined;
    _this.picker = undefined;
    _this.options = getOptions();

    _this.handleCallback = _this.handleCallback.bind(_this);
    return _this;
  }

  _createClass(DatetimeRangePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.$picker = $(this.refs.picker);
      // initialize
      this.$picker.daterangepicker(this.getOptionsFromProps(), this.handleCallback);
      // attach event listeners
      events.forEach(function (event) {
        var lcase = event.toLowerCase();
        _this2.$picker.on(lcase + '.daterangepicker', _this2.makeEventHandler('on' + event));
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.getPicker().remove();
    }
  }, {
    key: 'setOptionsFromProps',
    value: function setOptionsFromProps() {
      var _this3 = this;

      var currentOptions = this.getOptionsFromProps();
      var keys = Object.keys(currentOptions);
      if (this.$picker) {
        if (currentOptions) {
          keys.forEach(function (key) {
            _this3.applyOptionToPicker(key, currentOptions[key]);
          });
        }
      }
    }
  }, {
    key: 'getPicker',
    value: function getPicker() {
      return this.$picker && this.$picker.data('daterangepicker');
    }
  }, {
    key: 'getOptionsFromProps',
    value: function getOptionsFromProps() {
      var _this4 = this;

      var options = {};
      var props = this.props;
      var value = void 0;
      this.options.forEach(function (name) {
        if (props.hasOwnProperty(name)) {
          value = props[name];

          switch (name) {
            case 'startDate':
            case 'endDate':
              if (value) {
                options[name] = value;
              }
              break;

            case 'locale':
              if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                var picker = _this4.getPicker();
                if (picker) {
                  value = $.extend({}, value, picker.locale);
                }
              }
              options[name] = value;
              break;

            default:
              options[name] = value;
          }
        }
      });
      return options;
    }
  }, {
    key: 'applyOptionToPicker',
    value: function applyOptionToPicker(key, value) {
      if (this.$picker) {
        this.$picker.data('daterangepicker')[key] = value;
      }
    }
  }, {
    key: 'handleCallback',
    value: function handleCallback(start, end) {
      if (typeof this.props.callback === 'function') {
        this.props.callback(start, end);
      }
    }
  }, {
    key: 'makeEventHandler',
    value: function makeEventHandler(eventType) {
      var _this5 = this;

      return function (event, picker) {
        if (_this5.props.onEvent) {
          _this5.props.onEvent(event, picker);
        }
        if (typeof _this5.props[eventType] === 'function') {
          _this5.props[eventType](event, picker);
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      this.setOptionsFromProps();

      return React.createElement(
        'div',
        { ref: 'picker', style: this.props.style, className: this.props.className },
        this.props.children
      );
    }
  }]);

  return DatetimeRangePicker;
}(React.Component);

DatetimeRangePicker.propTypes = {

  startDate: PropTypes.any,
  endDate: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,

  callback: PropTypes.func,
  onEvent: PropTypes.func,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  onShowCalendar: PropTypes.func,
  onHideCalendar: PropTypes.func,
  onApply: PropTypes.func,
  onCancel: PropTypes.func
};
DatetimeRangePicker.defaultProps = {};


export default DatetimeRangePicker;