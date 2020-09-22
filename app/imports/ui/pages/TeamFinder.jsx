import React from 'react';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Segment, Card, Loader, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
} from 'uniforms-semantic';
import { Teams } from '../../api/team/TeamCollection';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import TeamCard from '../components/TeamCard';

const Selectschema = new SimpleSchema({
  Sortby: {
    type: Array,
    allowedValues: ['Teams', 'Tools', 'Skills', 'Challenges'],
    defaultValue: 'Teams',
    required: true,
  },
  'Sortby.$': { type: String },
});

/**
 * Render a Not Found page if the user enters a URL that doesn't match any route.
 * @memberOf ui/pages
 */
class TeamFinder extends React.Component {

  constructor(props) {
    super(props);
    this.state = { sort_by: [] };
  }

  submit(data, fRef) {
    const { sort_by } = data;
    this.setState(sort_by, sort_by);
    fRef.reset();
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    return (
        <Container style={{ padding: '0.5em 0em', minHeight: '100%' }}>
          <Header as='h1'>Find A Team</Header>
          <AutoForm size='small' schema={Selectschema}
          ref={ref => { fRef = ref; }} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
                <MultiSelectField name='Sortby' placeholder='Teams'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
            </Segment>
          </AutoForm>
          <Segment raised secondary style = {{ padding: '0em 0em', minHeight: '100%' }}>
            <Card.Group stackable doubling itemsPerRow={4}>
                {this.props.teams.map((team) => <TeamCard key={team._id} team={team} />)}
            </Card.Group>
          </Segment>
        </Container>
    );
  }
}

TeamFinder.propTypes = {
  teams: PropTypes.array.isRequired,
  Sortby: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Team
  // const subscription = Meteor.subscribe(Teams.getCollectionName());
  const subscription = Teams.subscribe();
  return {
    teams: Teams.find({}).fetch(),
    ready: subscription.ready(),
  };
})(TeamFinder);
