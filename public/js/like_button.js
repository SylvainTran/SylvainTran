'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      ++tickleFrames;
      sessionStorage.setItem('tickleFramesCount', tickleFrames);
      let message;
      if(tickleFrames < 5)
      {
        message = 'You liked this. ';
      } else if(tickleFrames >= 5 && tickleFrames < 10)
      {
        message = 'You likeeeeed this a lot, didn\'t you? ';
      } else
      {
        message = 'Please go do something more productive with your life. ';
      }
      stickPositionX = parseInt(stickPositionX) + 50;
      sessionStorage.setItem('stickPositionXSum', parseInt(stickPositionX));
      this.restart();
      return message + tickleFrames + ' is the times I have been clicked.';
    }

    function restart()
    {
      setTimeout(this.setState({like: false}), 3000);
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
      ctx.translate(10 + stickPositionX + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}
