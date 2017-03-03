import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
//import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
//import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Up from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton'
import ArticleDialog from './ArticleDialog'

export default class ArticleCard extends React.Component {
  constructor(props){
    // props: { id: string, title: string, group: bool, list_id, refresh: function}
    super(props);
    this.state = {open:false};

    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  closeDialog(){
    this.props.refresh();
    this.setState({open:false});
  }

  openDialog(){
    this.setState({open:true});
  }
  render() {
    this.styles={
      smallIcon: {
        padding:'0', width:'20px',height:'20px'
      }
    };
    const cardActions = ()=>
      this.props.group!=='true' ? <CardActions><RaisedButton buttonStyle={{height:'100%'}} label="Details" onTouchTap={this.openDialog}/></CardActions> :
         <CardActions style={{display:'inline-flex', flexWrap:'nowrap', width:'100%'}}>
           <RaisedButton buttonStyle={{height:'100%'}} label="Details" onTouchTap={this.openDialog}/>
           <IconButton iconStyle={this.styles.smallIcon}>
             <Up/>
           </IconButton>
           <Chip labelStyle={{paddingTop: '6px', height:'20px'}} backgroundColor={'#ffffff'}>0</Chip>
           <IconButton iconStyle={this.styles.smallIcon}>
             <Down/>
           </IconButton>
         </CardActions>;

    return(
      <li style={{listStyle:'none', padding:'2%'}}>
        <Card>
          <CardHeader title={this.props.title}/>
          <CardText/>
          {cardActions()}
        </Card>
        <ArticleDialog isOpen={this.state.open} close={this.closeDialog} list_id={this.props.list_id} id={this.props.id}/>
      </li>
    );
  }
}
