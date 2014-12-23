// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;

    console.info('Shape called', this);

    // private function
    function test( a ) {
        console.info( 'in Shape = a', a );
    }
}

// superclass method
Shape.prototype.move = function( x, y ) {
    this.x += x;
    this.y += y;
    console.info( 'Shape moved.' );
};

// Rectangle - subclass
function Rectangle( a ) {
    console.info( 'nu zijn we hier', a );
    Shape.call( this ); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create( Shape.prototype );
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle( 'aapjes' );

rect instanceof Rectangle; // true
rect instanceof Shape; // true

rect.move( 1, 1 ); // Outputs, 'Shape moved.'

Rectangle.prototype.doit = function( t ) {
    console.info( 't =', t );
}

rect.doit( 'nu gaan' );
// rect.test( 'nu gaan' );
