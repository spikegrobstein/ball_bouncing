(function( globals ){

  var
    Ball = function() {
      // this determins which direction the ball is moving for bounce
      this.dx = (Math.random() > .5);
      this.dy = (Math.random() > .5);

      // what the speed the ball moves on the given axis
      this.vx = (Math.random() * 5) + 1;
      this.vy = (Math.random() * 5) + 1;

      // create the ball element
      this.ball = document.createElement('span'),
      this.ball.setAttribute('class', 'ball');

      var field = document.getElementById('field');
      field.appendChild( this.ball );

      // place the ball somewhere random.
      this.ball.style.left = (Math.random() * 500) + 'px';
      this.ball.style.top = (Math.random() * 500) + 'px';

      // store what the current x and y values are
      this.x = this.ball.offsetLeft;
      this.y = this.ball.offsetTop;

      return this;
    };

  // animate one step.
  Ball.prototype.step = function() {
    if ( this.dx ) {
      this.move_x( this.vx );
    } else {
      this.move_x( -this.vx );
    }

    if ( this.dy ) {
      this.move_y( this.vy );
    } else {
      this.move_y( -this.vy );
    }

    // handle the bounce
    if (this.x <= 0) {
      this.dx = true;
    } else if (this.x >= 500) {
      this.dx = false;
    }

    if (this.y <= 0) {
      this.dy = true;
    } else if (this.y >= 500) {
      this.dy = false;
    }
  };

  Ball.prototype.move_x = function( distance ) {
    this.x = this.x + distance;
    this.ball.style.left = this.x + 'px';
  };

  Ball.prototype.move_y = function( distance ) {
    this.y = this.y + distance;
    this.ball.style.top = this.y + 'px';
  };

  globals.balls = []

  var ballcount = location.search.match(/balls=(\d+)/);
  if ( ballcount ) {
    ballcount = parseInt(ballcount[1]);
  } else {
    ballcount = 100;
  }

  var ballcount_field = document.getElementById('ballcount');
  ballcount_field.value = ballcount;

  var i = 0;
  for (i = 0; i < ballcount; i++) {
    globals.balls.push(new Ball());
  }

  var animator = setInterval(function() {
    var ball = null;
    for ( ball in this ) {
      this[ball].step();
    }
  }.bind( globals.balls ), 10);

}(window));
