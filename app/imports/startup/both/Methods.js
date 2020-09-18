import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { demographicLevels } from '../../api/level/Levels';
import { Developers } from '../../api/user/DeveloperCollection';
import { makeSampleSkillSlugArray } from '../../api/skill/SampleSkills';
import { DeveloperSkills } from '../../api/user/DeveloperSkillCollection';

const accountDeleteMethod = 'Account.delete';

Meteor.methods({
    'Account.delete'() {
    if (!Meteor.isServer) return;

    try {
    Meteor.users.remove(this.userId);
    } catch (e) {
        // handle this however you want
        throw new Meteor.Error('self-delete', 'Failed to remove yourself');
    }
    },
  });
export { accountDeleteMethod };

const developerDeleteMethod = 'Developer.delete';

Meteor.methods({
  'Developer.delete'() {
  const owner = Meteor.user().username;
  if (!Meteor.isServer) return;

  try {
  // Meteor.users.remove(this.userId);
  console.log(Developers.hasProfile(owner));
  // Developers.removeIt(this.userId);
  } catch (e) {
      // handle this however you want
      throw new Meteor.Error(owner, 'Failed to remove yourself');
  }
  },
});

export { developerDeleteMethod };

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */
const dummyDeveloperMethod = 'Developer.add';

Meteor.methods({
  'Developer.add'() {
  const owner = Meteor.user().username;
if (Meteor.isServer) {
  describe('DeveloperCollection', function testSuite() {
    it('Define', function test() {
      const username = owner;
      const firstName = 'dev1';
      const lastName = 'dev1Surname';
      const demographicLevel = demographicLevels[0];
      const lookingForTeam = true;
      const skills = makeSampleSkillSlugArray(2);
      const { profileID } = Developers.define({ username, firstName, lastName, demographicLevel,
        lookingForTeam, skills });
      expect(Developers.isDefined(profileID)).to.be.true;
      expect(DeveloperSkills.find({ developerID: profileID }).fetch()).to.have.lengthOf(2);
    });
  });
}
},
});

export { dummyDeveloperMethod };
