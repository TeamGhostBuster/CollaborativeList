import React from 'react';
import IconButton from 'material-ui/IconButton'
import InfoDialog from './InfoDialog'
import Icon from 'material-ui/svg-icons/action/info-outline'
import GetGroupInfoRequest from '../../../Requests/GetGroupInfoRequest'

export default class GroupInfo extends React.Component{
  constructor(props){
    super(props);

    this.state = {dialog: false};
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog(){
    const cb = (response)=>{
      this.setState({dialog: <InfoDialog info={response} open={true} close={this.closeDialog}/>})
    };
    GetGroupInfoRequest.get(this.props.groupId, cb)
  }

  closeDialog(){
    this.setState({dialog:false})
  }

  render(){
    return(
      <IconButton name="groupInfoButton" onTouchTap={this.openDialog}>
        <Icon color={'#ffffff'}/>
        {this.state.dialog}
      </IconButton>
    );
  }
};

GroupInfo.propTypes = {
  groupId: React.PropTypes.string.isRequired,
};
