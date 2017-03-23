import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { spy, stub } from 'sinon';
import { expect } from 'chai';
import AppBarInvitationMenu from './index';
import InvitationMenuCard from '../../../common/InvitationMenuCard';
import TestUtils from '../../../utils/TestUtils';
import PendingInviation from '../../../mocks/PendingInvitation';

describe('<ArchivedListItem />', () => {
  it('Render AppBarInvitationmenu', () => {
    const mockCallback = stub();
    const mockCloseCallback = stub();

    injectTapEventPlugin();
    spy(AppBarInvitationMenu.prototype, 'componentWillMount');

    const wrapper = TestUtils.shallowWithContext(
      <AppBarInvitationMenu reloadCallback={mockCallback}>
        <InvitationMenuCard close={mockCloseCallback} />
      </AppBarInvitationMenu>
    );
    // Expect the method to be call
    expect(AppBarInvitationMenu.prototype.componentWillMount).to.have.property('callCount', 1);

    // Expect those component exists
    expect(wrapper.find('IconButton').exists()).to.be.true;
    expect(wrapper.find('Popover').exists()).to.be.true;

    // Set fate data
    wrapper.setState({ invitationCards: PendingInviation.invitation });

    // Expect the invitation card is rendered
    expect(wrapper.find('FlatButton').first().exists()).to.be.true;
    expect(wrapper.find('InvitationMenuCard').exists()).to.be.true;
    const groupNames = wrapper.find('InvitationMenuCard').map(node => node.props().groupId);
    // Expect the data is being filled in properly
    expect(groupNames).to.be.eql(PendingInviation.invitation.map((each) => each.group.id));
  });
});
