Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='./src/controls/textInput/textInput.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var FormTextInput=function(_Component){_inherits(FormTextInput,_Component);function FormTextInput(props){_classCallCheck(this,FormTextInput);var _this=_possibleConstructorReturn(this,(FormTextInput.__proto__||Object.getPrototypeOf(FormTextInput)).call(this,props));_this.teste='';return _this;}_createClass(FormTextInput,[{key:'methodAntes',value:function methodAntes(){}},{key:'componentDidMount',value:function componentDidMount(){}},{key:'render',value:function render(){console.log('teste');var text=this.props.text;return _react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:28}},_react2.default.createElement(_reactNative.Text,{style:{color:'blue'},__source:{fileName:_jsxFileName,lineNumber:29}},this.props.text,'Form text input'));}}]);return FormTextInput;}(_react.Component);FormTextInput.propTypes={};var styles=_reactNative.StyleSheet.create({});exports.default=FormTextInput;