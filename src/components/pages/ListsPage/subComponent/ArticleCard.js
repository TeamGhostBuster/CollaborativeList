import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton'
import ArticleDialog from './ArticleDialog'
import VoteButton from './VoteButton'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'

export default class ArticleCard extends React.Component {
  constructor(props){
    // props: { id: string, title: string, group: bool, list_id, refresh: function}
    super(props);
    this.state = {open:false};

    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  closeDialog(){
    this.setState({open:false});
    this.props.refresh();

  }

  openDialog(){
    this.setState({open:true});
  }
  render() {

    const cardActions = ()=>
      this.props.group!=='true' ?
        <Toolbar  style={{backgroundColor:"white"}}>
          <ToolbarGroup firstChild={true}>
            <RaisedButton buttonStyle={{height:'100%'}} label="Details" onTouchTap={this.openDialog}/>
          </ToolbarGroup>
        </Toolbar>
        :
        <Toolbar style={{backgroundColor:"white"}}>
         <ToolbarGroup firstChild={true}>
           <RaisedButton buttonStyle={{height:'100%'}} label="Details" onTouchTap={this.openDialog}/>
         </ToolbarGroup>
         <ToolbarGroup>
          <VoteButton id={this.props.id} action="up"/>
          <Chip backgroundColor={'#ffffff'}>{this.props.vote}</Chip>
           <VoteButton id={this.props.id} action="down"/>
         </ToolbarGroup>
        </Toolbar>;

    return(
      <li style={{listStyle:'none', padding:'2%'}}>
        <Card>
          <CardHeader title={this.props.title}/>
          <CardText/>
          {cardActions()}
        </Card>
        <ArticleDialog isOpen={this.state.open} close={this.closeDialog} list_id={this.props.list_id} id={this.props.id} />
      </li>
    );
  }
}
