var React = require('react');
const ReactDOM = require('react-dom');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
var Select = require('react-select');


var MapzenSearchAddress = React.createClass({

  getInitialState() {
    return { };
  },

  onChange(value) {
    if (window.console) console.log("MapzenSearchAddress.onChange() ", this.state.options[value]);
    this.setState({value: value});
    this.props.onSelectAddress(this.state.options[value].lat, this.state.options[value].lng);
  },

  getOptions(input, selectCallback) {
    if (window.console) console.log("MapzenSearchAddress.getOptions() ", input);
    if (input === "") {
      selectCallback(null, {
        options: [],
        complete: false
      });
      return;
    }

    var theurl = this.props.url+input;
    if (window.console) console.log('GET', theurl);
    $.ajax({
      type: "GET",
      url: theurl,
      contentType: 'text/xml',
      success: function(data) {
        if (window.console) console.log('success()', data);
        var options = data.features.map(function(entry, index){
          return {value:index, label:entry.properties.layer+': '+entry.properties.label, lat:entry.geometry.coordinates[1], lng:entry.geometry.coordinates[0]};
        });
        this.setState({options: options});
        selectCallback(null, {
          options: options,
          complete: false
        });
      },
      error: function(xhr, desc, err) {
        if (window.console) console.log('error()', xhr, desc, err);
      },
      context: this
    });

  },

  render() {
    if (window.console) console.log("MapzenSearchAddress.render() ");
    return (
        <Select.Async
        name="selected-address"
        ref="addressSelect"
        placeholder="Search your peak or mountain place..."
        value={this.state.value}
        //autofocus
        //options={options}
        loadOptions={this.getOptions}
        simpleValue
        clearable={true}
        disabled={false}
        //value={this.state.selectValue}
        onChange={this.onChange}
        searchable={true} />
    );
  }
});

module.exports = MapzenSearchAddress;
