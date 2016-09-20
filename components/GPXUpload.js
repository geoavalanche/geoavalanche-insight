var React = require('react');
var Button = require('react-bootstrap').Button;

var GPXUpload = React.createClass({
    getInitialState() {
      return { };
    },

    onClick: function(e) {
      document.getElementById('theInputFile').click();
    },

    onChange: function(e) {
      if (window.console) console.log("GPXUpload.onChange()", e.target.files);
      for (var i = 0; i < e.target.files.length; i++) {
        var theFile = e.target.files[i];
        var this_ = this;
        var reader  = new FileReader();
        reader.addEventListener("loadend", function () {
          this_.props.onSelectFile(reader.result);
        }, false);
        reader.readAsText(theFile);
      }
    },
    
    render: function () {
      if (window.console) console.log("GPXUpload.render()");
      var inline={display: 'inline'};
      var none={display: 'none'};
      return (
        <div style={inline}>
          <Button onClick={this.onClick}>Upload a GPX route</Button>
          <input type="file" id="theInputFile"
            style={none}
            onChange={this.onChange} />
        </div>
      );
    }
});

module.exports = GPXUpload;