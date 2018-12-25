requirejs(['Main'], function(MyApp) {
    console.log('starting application...');

    var main = new MyApp.Main();
    main.startApplication();
});