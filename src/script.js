var NameInput = React.createClass({displayName: "NameInput",
    handleTextChange: function(){
        var x = this.refs.nameField.getDOMNode().value;
        
        if(x != ''){
            this.refs.nameField.getDOMNode().className = 'active';
        } else {
            this.refs.nameField.getDOMNode().className = '';
        }

        this.props.onUserInput(x);
    },
    render: function(){
        return (
            React.createElement("div", {className: "control"},
                React.createElement("input", {type: "text", name: "from_name", id: "name", ref: "nameField", placeholder: "Name", autoFocus: true, required: true, onChange: this.handleTextChange}),
                React.createElement("label", {for: "name"}, "Name")
            )
        )
    }
});

var EmailInput = React.createClass({displayName: "EmailInput",
    handleTextChange: function(){
        var x = this.refs.emailField.getDOMNode().value;
        
        if(x != ''){
            this.refs.emailField.getDOMNode().className = 'active';
        } else {
            this.refs.emailField.getDOMNode().className = '';
        }

        this.props.onUserInput('', x);
    },
    render: function(){
        return (
            React.createElement("div", {className: "control"},
                React.createElement("input", {type: "email", name: "from_email", id: "email", ref: "emailField", placeholder: "E-mail", required: true, onChange: this.handleTextChange}),
                React.createElement("label", {for: "email"}, "e-mail")
            )
        )
    }
});

var MessageArea = React.createClass({displayName: "MessageArea",
    handleTextChange: function(){
        var x = this.refs.messageBox.getDOMNode().value;
        
        if(x != ''){
            this.refs.messageBox.getDOMNode().className = 'active';
        } else {
            this.refs.messageBox.getDOMNode().className = '';
        }

        this.props.onUserInput('', '', x);
    },
    render: function(){
        return (
            React.createElement("div", {className: "control"},
                React.createElement("textarea", {id: "message", name: "message_html", ref: "messageBox", placeholder: "Message", required: true, onChange: this.handleTextChange}),
                React.createElement("label", {for: "message"}, "Message")
            )
        )
    }
});

var ContactForm = React.createClass({displayName: "ContactForm",
    getInitialState: function() {
        return {
            nameText: '',
            emailText: '',
            messageText: ''
        };
    },
    handleUserInput: function(nameText, emailText, messageText) {
        this.setState({
            nameText: nameText,
            emailText: emailText,
            messageText: messageText
        });
    },
    onSubmit: function(e) {
        e.preventDefault();

        var service_id = "default_service";
      
        var template_id = "template_MN1guTW0";

        var templateParams = {
            from_email: e.target.elements.from_email.value,
            from_name: e.target.elements.from_name.value,
            message_html: e.target.elements.message_html.value
        };
           // Функцию свыше мне помог написать товарищ, так как мой скилл не позволяет... Функция производит сбор значений(templateParams), введенных в форму и передает их для отправки email
        emailjs.send(service_id, template_id, templateParams)
            .then((result) => {
             alert("Sent!");
           }, error => {
             alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
          });
      },
  render: function(){
    return (
         React.createElement("form", {onSubmit: this.onSubmit, id: "myform"},
        
            React.createElement("fieldset", null,
                React.createElement("legend", null, "Get in touch"),
                
                React.createElement(NameInput, {onUserInput: this.handleUserInput}),
                React.createElement(EmailInput, {onUserInput: this.handleUserInput}),
                React.createElement(MessageArea, {onUserInput: this.handleUserInput}),
                
                React.createElement("input", {type: "submit", value: "send"})
            )

        )
        );
  }
});

React.render(React.createElement(ContactForm, null), document.getElementById('stage'));