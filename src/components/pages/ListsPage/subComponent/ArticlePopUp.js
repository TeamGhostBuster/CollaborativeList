import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import deepOrangeA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Axios from 'axios'
import cookie from 'react-cookie'

export default class CreateList extends React.Component {
  constructor(props){
    // props { lisdTd, callback, group, groupId}
    super(props);
    this.state = {open:false, addTag:false, title:'', description:'', url:'', tag:'', tags:[], tagsData:[], requireTitle:"required", requireDescription:"required"};

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };

    //binding
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.tagChange = this.tagChange.bind(this);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.TagOpen = this.TagOpen.bind(this);
    this.TagClose = this.TagClose.bind(this);
    this.TagFinish = this.TagFinish.bind(this);

    this.submitToServer = this.submitToServer.bind(this);
    this.tagDelete = this.tagDelete.bind(this);
    this.rendeTag = this.rendeTag.bind(this);
  }
  /*=====================handling text field==================================*/
  titleChange(event) {
    this.setState({title :event.target.value});
    if (event.target.value !== ""){
      this.setState({requireTitle:""});
    } else {
      this.setState({requireTitle:"required"});
    }
  }

  descriptionChange(event){
    this.setState({description :event.target.value});
    if (event.target.value !==""){
      this.setState({requireDescription:""});
    } else {
      this.setState({requireDescription:"required"});
    }
  }

  urlChange(event){
    this.setState({url :event.target.value});
  }

  tagChange(event){
    this.setState({tag :event.target.value});
  }

  /*=======================================================*/
  handleOpen() {
    this.setState({open:true});
  }

  handleClose() {
    this.setState({title:''});
    this.setState({description:''});
    this.setState({url:''});
    this.setState({tags:[]});
    this.setState({requireTitle:"required"});
    this.setState({requireDescription:"required"});
    this.setState({open:false});
  }

  submitToServer(callback){
    //todo: remove the hardcoded part
    const path = this.props.group === "true"?
      "/group/"+this.props.groupId+"/list/"+this.props.listId+"/article" :
      "/user/list/"+this.props.listId+"/article";

    const token = cookie.load('Access-Token');

    var http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {
        "Access-Token":token,
        "Content-Type":"application/json",
      }
    });

    http.post(path, {
        title:this.state.title,
        description:this.state.description,
        url:this.state.url,
        tags:this.state.tags,
      })
      .then((respond) =>{
        if (respond.status===200){
          this.props.callback();
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status===401){
          console.log("invalid token");
        } else {
          console.log("invalid request of lists info1111");
        }
      })
  }

  handleSubmit() {
    if (this.state.title!=='' && this.state.description!==''){
      const cb = () => {
        this.setState({title:''});
        this.setState({description:''});
        this.setState({url:''});
        this.setState({tags:[]});
        this.setState({requireTitle:"required"});
        this.setState({requireDescription:"required"});
        this.setState({open:false});
      };
      this.submitToServer(cb)
    }
  }

  /*=======================================================*/
  TagOpen(){
    this.setState({addTag:true});
  }

  TagClose(){
    this.setState({tag:''});
    this.setState({addTag:false});
  }

  TagFinish() {
    if (this.state.tag !== ''){
      this.newTags = this.state.tags;
      this.newTagsData = this.state.tagsData;
      this.newTags[this.state.tags.length] = this.state.tag;
      this.newTagsData[this.state.tags.length] = {key:this.state.tags.length,label:this.state.tag};
      this.setState({tags:this.newTags});
      this.setState({tagsData:this.newTagsData});
      this.setState({tag:''});
      this.setState({addTag:false});
    }
  }

  tagDelete(key) {
    this.tagsData = this.state.tagsData;
    this.tags = this.state.tags;
    const chipToDelete = this.tagsData.map((chip) => chip.key).indexOf(key);
    this.tagsData.splice(chipToDelete, 1);
    this.tags.splice(chipToDelete, 1);
    this.setState({tagsData: this.tagsData});
    this.setState({tags:this.tags});
  };

  rendeTag(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.tagDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }
  /*=======================================================*/

  render() {
    const formActions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.handleClose} />,
      <FlatButton label='Submit' primary={true} onTouchTap={this.handleSubmit} />
    ];

    const tagActions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={this.TagClose} />,
      <FlatButton label='Finish' primary={true} onTouchTap={this.TagFinish} />
    ];

    const form = [
      <div key="form">
        <TextField fullWidth={true} multiLine={true} hintText="Required" hintStyle={{color: deepOrangeA400}} floatingLabelText="Title" errorText={this.state.requireTitle} onChange={this.titleChange}/>
        <br/>
        <TextField fullWidth={true} multiLine={true} hintText="Required" hintStyle={{color: deepOrangeA400}} floatingLabelText="Description" errorText={this.state.requireDescription} onChange={this.descriptionChange}/>
        <br/>
        <TextField fullWidth={true} multiLine={true} hintText="Optional" floatingLabelText="URL" onChange={this.urlChange}/>
        <br/><br/>

        <div style={this.styles.wrapper}>
        {this.state.tagsData.map(this.rendeTag, this)}
        </div>

        <Dialog open={this.state.addTag} actions={tagActions} modal={true} contentStyle={{width:'50%'}} title="Add Tag">
          <TextField hintText="Optional" floatingLabelText="Enter Tag Here" onChange={this.tagChange}/>
        </Dialog>

        <RaisedButton label="Add Tag" icon={<ContentAdd/>} secondary={true} onTouchTap={this.TagOpen} />
      </div>
    ];

    /*-----------------------------------------------*/
    return (
      <div>
        <RaisedButton label="Add Article" fullWidth={true} primary={true} icon={<ContentAdd/>}  onTouchTap={this.handleOpen}/>
        <Dialog open={this.state.open} actions={formActions} modal={true} title="Create Article" autoScrollBodyContent={true}>
          {form}
        </Dialog>
      </div>
    );
  }
}
