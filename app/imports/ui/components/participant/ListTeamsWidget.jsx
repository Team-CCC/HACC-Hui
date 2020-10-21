import React from 'react';
import PropTypes from 'prop-types';
import ListTeamExampleWidget from './ListTeamExampleWidget';
import { TeamChallenges } from '../../../api/team/TeamChallengeCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import { TeamSkills } from '../../../api/team/TeamSkillCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { TeamTools } from '../../../api/team/TeamToolCollection';
import { Tools } from '../../../api/tool/ToolCollection';
import { TeamParticipants } from '../../../api/team/TeamParticipantCollection';
import { Participants } from '../../../api/user/ParticipantCollection';
import { Teams } from '../../../api/team/TeamCollection';

const getTeam = teamID => Teams.findDoc(teamID);

const getTeamChallenges = team => {
  const teamID = team._id;
  const teamChallengeDocs = TeamChallenges.find({ teamID }).fetch();
  const challengeTitles = teamChallengeDocs.map(
    tc => Challenges.findDoc(tc.challengeID).title,
  );
  return challengeTitles;
};

const getTeamSkills = team => {
  const teamID = team._id;
  const teamSkills = TeamSkills.find({ teamID }).fetch();
  const skillNames = teamSkills.map(ts => Skills.findDoc(ts.skillID).name);
  return skillNames;
};

const getTeamTools = team => {
  const teamID = team._id;
  const teamTools = TeamTools.find({ teamID }).fetch();
  const toolNames = teamTools.map(tt => Tools.findDoc(tt.toolID).name);
  return toolNames;
};

const getTeamMembers = team => {
  const teamID = team._id;
  const teamParticipants = TeamParticipants.find({ teamID }).fetch();
  const memberNames = teamParticipants.map(tp => Participants.getFullName(tp.participantID)); return memberNames;
};

class ListTeamsWidget extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.teams.map(team => (
          <ListTeamExampleWidget
            key={team._id}
            team={getTeam(team._id)}
            teamChallenges={getTeamChallenges(team)}
            teamSkills={getTeamSkills(team)}
            teamTools={getTeamTools(team)}
            teamMembers={getTeamMembers(team)}
          />
        ))}
      </React.Fragment>
    );
  }
}

ListTeamsWidget.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object),
};

export default ListTeamsWidget;
