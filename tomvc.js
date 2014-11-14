// Todo, keep away from global space

var ToMvc = function() {

    var base = this;

    base.views  = [];
    base.models = [];
    base.events = [];

    this.listen = function( event, fn ) {
        base.events.push( {
            view     : this.name,
            event    : event,
            callback : fn.bind( this )
        });
    }

    this.broadcastTo = function ( event, data ) {
        base.events.forEach( function( item ) {
            if ( item.event === event ) {
                item.callback( data );
            }
        });
        // DEBUG
        console.info('Event "' + event + '" broadcasted with data: ', data );
    }

};

ToMvc.prototype.registerView = function( name, el ) {
    var view = new this.View( this, name, el );
    this.views.push( view );
    return view;
};

ToMvc.prototype.registerModel = function( name ) {
    var model = new this.Model( this, name );
    this.models.push( model );
    return model;
};


ToMvc.prototype.View = function( base, name, el ) {
    this.base = base;
    this.name = name ? name : 'view';
    this.el   = el;
    this.listenTo = function( event ) {
        base.listen.call( this, event, function( data ) {
            console.info('view ' + this.name + ' called listener with data: ' + data );
        } );
    };
    this.broadcast = function( event, data ) {
        base.broadcastTo.call( this, event, data );
    };
};

ToMvc.prototype.Model = function( base, name ) {
    this.base = base;
    this.name = name ? name : 'model';
    this.broadcast = function( event ) {
        base.broadcastTo.call( this, event, 'apples' );
    };
    this.listenTo = function( event, callback ) {
        base.listen.call( this, event, callback );
    };

};


// TESTS

// var myTomvc  = new ToMvc();
// var viewA = myTomvc.registerView( 'A', 'element' );
// viewA.listenTo( 'eventA' );
// viewA.listenTo( 'eventB' );

// var viewB = myTomvc.registerView( 'B', 'element' );
// viewB.listenTo( 'eventB' );

// var modelA = myTomvc.registerModel( 'C' );
// modelA.broadcast ( 'eventB');
