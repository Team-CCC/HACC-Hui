import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
/**
 * The Footer appears at the bottom of every page. Rendered by the App Layout component.
 * @memberOf ui/components
 */
class TeamCard extends React.Component {
  render() {
    return (
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='http://HACC-Hui.github.io'
                />
                <Card.Header>Team Name</Card.Header>
                <Card.Meta>Top Skills</Card.Meta>
                <Card.Description>
                    <Card.Meta>
                        <Button.Group size='small' compact>
                            <Button>member 1</Button>
                            <Button>member 2</Button>
                            <Button>member 3</Button>
                        </Button.Group>
                    </Card.Meta>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Ask To Join
                    </Button>
                    <Button basic color='red'>
                        Withdraw
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
  }
}

export default TeamCard;
