import React from 'react';
import { Header } from 'semantic-ui-react';

/**
 * Render a Not Found page if the user enters a URL that doesn't match any route.
 * @memberOf ui/pages
 */
class TeamFinder extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center">
        <p>Display teams ranked on some criteria that user can change</p>
      </Header>
    );
  }
}

export default TeamFinder;
