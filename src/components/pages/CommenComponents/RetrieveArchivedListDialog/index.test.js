import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { expect } from 'chai';
import RetrieveArchivedListDialog from './index';
import { ArchivedListItem } from 'components';
import TestUtils from '../../../utils/TestUtils';
import PersonalList from '../../../mocks/PersonalList';

describe('<RetrieveArchivedListDialog />', () => {
  it('Render RetrieveArchivedListDialog', () => {
    injectTapEventPlugin();
    // mock out the componentWillMount
    sinon.spy(RetrieveArchivedListDialog.prototype, 'componentWillMount');
    // render component
    const wrapper = TestUtils.shallowWithContext(
      <RetrieveArchivedListDialog
        close={console.log}
        open
        pageType="personal"
        reloadCallback={console.log}
      >
        <ArchivedListItem />
      </RetrieveArchivedListDialog>
    );

    // Expect the componentWillMount will be called
    expect(RetrieveArchivedListDialog.prototype.componentWillMount).to.have.property('callCount', 1);

    // Set state with mock data
    wrapper.setState({ listItems: PersonalList.lists });

    // Expect data to be properly render
    expect(wrapper.find('Dialog').exists()).to.be.true;
    expect(wrapper.find('ArchivedListItem').exists()).to.be.true;
    expect(wrapper.find('ArchivedListItem').first().props().name).to.equal('Test List 1');
    const listName = wrapper.find('ArchivedListItem').map(node => node.props().name);
    expect(listName).to.eql(PersonalList.lists.map((list) => list.name));
  });
});
