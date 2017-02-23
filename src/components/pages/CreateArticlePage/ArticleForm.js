import React from 'react'

export default class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description:'', url:'', tags:[]};

    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  titleChange(event) {
    this.setState({title: event.target.value});
  }

  descriptionChange(event){
    this.setState({description:event.target.value});
  }

  urlChange(event) {
    this.setState({url:event.target.value});
  }


  handleSubmit(event) {
    alert('A name was submitted: ' + this);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title(required):
          <input type="text" value={this.state.title} onChange={this.titleChange} required/><br/>
        </label>
        <label>
          Description(required):
          <input type="text" value={this.state.description} onChange={this.descriptionChange} required/><br/>
        </label>
        <label>
          URL:
          <input type="text" value={this.state.url} onChange={this.urlChange} /><br/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
