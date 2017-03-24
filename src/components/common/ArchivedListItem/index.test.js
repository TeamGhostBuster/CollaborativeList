import React from 'react';
import ArchivedListItem from './index';
import TestUtils from '../../utils/TestUtils';

describe('<ArchivedListItem />', () => {
  it('Render ArchivedListItem', () => {
    const wrapper = TestUtils.mountWithContext(
      <ArchivedListItem name="Test Archived List" list_id="whatever" selectedAction={console.log} />
    );
    expect(wrapper.props().name).toEqual('Test Archived List');
    expect(wrapper.props().list_id).toEqual('whatever');
  });
});
