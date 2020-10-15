import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header, List } from 'semantic-ui-react';
import _ from 'lodash';
import { WantsToJoin } from '../../../api/team/WantToJoinCollection';
import { Participants } from '../../../api/user/ParticipantCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Teams } from '../../../api/team/TeamCollection';
import { Slugs } from '../../../api/slug/SlugCollection';
import { TeamDevelopers } from '../../../api/team/TeamDeveloperCollection';

class ListTeamExampleWidget extends React.Component {
  handleClick(e, inst) {
    console.log(e, inst);
    const collectionName = WantsToJoin.getCollectionName();
    const teamDoc = Teams.findDoc(inst.id);
    const team = Slugs.getNameFromID(teamDoc.slugID);
    const participant = Participants.findDoc({ userID: Meteor.userId() }).username;
    const definitionData = {
      team,
      participant,
    };
    console.log(collectionName, definitionData);
    defineMethod.call({ collectionName, definitionData }, (error) => {
      if (error) {
        console.error('Failed to define', error);
      }
    });
  }

  handleClick2 = () => {
    const id = this.props.team._id;
    removeItMethod.call({ collectionName: Teams.getCollectionName(), instance: id });
  }
 
  render() {
    const participant = Participants.findDoc({ userID: Meteor.userId() });
    const participantName = Participants.getFullName(participant._id);
    const isAMember = _.includes(this.props.teamMembers, participantName);
    return (
        <Grid.Row columns={6}>
          <Grid.Column>
            <Header as="h3">{this.props.team.name}</Header>
            {this.props.team.owner === Developers.findDoc({ userID: Meteor.userId() })._id ?
            <Link className='edit' to={`/update-team/${this.props.team._id}`}>Edit</Link>
            : '' }
            <br></br>
                        { (this.props.team.owner === developer._id) ? <Button
                color="red"
                id={this.props.team._id}
                content='Delete Team'
                onClick={this.handleClick2}>
            </Button> : '' }
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamChallenges.map((c) => <List.Item key={c}>{c}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamSkills.map((s) => <List.Item key={s}>{s}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamTools.map((t) => <List.Item key={t}>{t}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamMembers.map((t) => <List.Item key={t}>{t}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Button id={this.props.team._id} color="green"
                    onClick={this.handleClick} disabled={isAMember}>Request to Join</Button>
          </Grid.Column>
        </Grid.Row>
    );
  }
}

ListTeamExampleWidget.propTypes = {
  team: PropTypes.object.isRequired,
  teamChallenges: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
  teamSkills: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
  teamTools: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
  teamMembers: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
};

export default ListTeamExampleWidget;
