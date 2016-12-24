var app = angular.module('myapp', ['ngRoute', 'ngStorage']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            cache: false,
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'H'
        })
        .when('/course', {
            cache: false,
            templateUrl: 'templates/course.html',
            controller: 'CourseCtrl',
            controllerAs: 'C'
        })
        .when('/course', {
            cache: false,
            templateUrl: 'templates/course.html',
            controller: 'CourseCtrl',
            controllerAs: 'C'
        })
        .when('/course1', {
            cache: false,
            templateUrl: 'templates/course1.html',
            controller: 'Course1Ctrl',
            controllerAs: 'C1'
        })
        .when('/course2', {
            cache: false,
            templateUrl: 'templates/course2.html',
            controller: 'Course2Ctrl',
            controllerAs: 'C2'
        }).otherwise({
            redirectTo: '/'
        });
    // enable html5Mode for pushstate ('#'-less URLs)
    // $locationProvider.html5Mode({enabled:true,requireBase:true});
});

app.run(function($rootScope, $localStorage) {
    $rootScope.name = $localStorage.name;
    $rootScope.course = $localStorage.course;
});


// app.directive('videoEvents', function() {
//     return function($scope, $element, attr) {
//         $element[0].addEventListener('timeupdate', function() {
//             var percent = Math.floor((100 / $element[0].duration) * $element[0].currentTime);
//             console.log(percent + ' percent')
//             $scope.$emit('percentage', $element[0], attr);
//         }, false);
//         $element[0].addEventListener('loadedmetadata', function() {
//             $element[0].currentTime = 50;
//         });
//     }
// });



app.controller('HomeCtrl', function($scope, $rootScope, $location, $localStorage) {
    if ($localStorage.name == '' || $localStorage.name == undefined) {} else {
        if ($localStorage.name == 'course1') {
            $location.path('/course1');
        } else {
            $location.path('/course2');
        }
    }
    $scope.redirect = function(n) {
        $localStorage.name = n;
        $rootScope.name = n;
        $location.path('/course');
    }
});

app.controller('CourseCtrl', function($scope, $location, $localStorage) {
    if ($localStorage.name == '' || $localStorage.name == undefined) {
        $location.path('/');
    }
    $scope.selectCourse = function(course) {
        $localStorage.course = course;
        $localStorage.course1 = {};
        $localStorage.course2 = {};
        $location.path('/' + course);
    }
});

app.controller('Course1Ctrl', function($scope, $route, $location, $localStorage) {
    if ($localStorage.name == '' || $localStorage.name == undefined) {
        $location.path('/');
    } else {
        if ($localStorage.course != 'course1') {
            $location.path('/course2');
        }
    }
    $scope.compelete_module1 = $localStorage.course1.module1;
    $scope.compelete_module2 = $localStorage.course1.module2;
    $scope.compelete_module3 = $localStorage.course1.module3;
    $scope.compelete_module4 = $localStorage.course1.module4;

    if ($scope.compelete_module1 == true) {
        if ($scope.compelete_module2 == true) {
            if ($scope.compelete_module3 == true) {
                if ($scope.compelete_module4 == true) {
                    $scope.tab = 'fifth';
                    $('#tab5').addClass("active");
                    $('#tab1').removeClass("active");
                    $('#tab2').removeClass("active");
                    $('#tab3').removeClass("active");
                    $('#tab4').removeClass("active");
                    var vid = document.getElementById('module5');
                    $scope.id = 'module5';
                    $scope.currentTime = $localStorage.course1.module5_current;
                } else {
                    $scope.tab = 'fourth';
                    $('#tab4').addClass("active");
                    $('#tab3').removeClass("active");
                    $('#tab2').removeClass("active");
                    $('#tab1').removeClass("active");
                    var vid = document.getElementById('module4');
                    $scope.id = 'module4';
                    $scope.currentTime = $localStorage.course1.module4_current;
                }
            } else {
                $scope.tab = 'third';
                $('#tab3').addClass("active");
                $('#tab2').removeClass("active");
                $('#tab1').removeClass("active");
                var vid = document.getElementById('module3');
                $scope.id = 'module3';
                $scope.currentTime = $localStorage.course1.module3_current;
            }
        } else {
            $scope.tab = 'second';
            $('#tab2').addClass("active");
            $('#tab1').removeClass("active");
            var vid = document.getElementById('module2');
            $scope.id = 'module2';
            $scope.currentTime = $localStorage.course1.module2_current;
        }
    } else {
        $scope.tab = 'first';
        var vid = document.getElementById('module1');
        $scope.id = 'module1';
        $scope.currentTime = $localStorage.course1.module1_current;
    }


    vid.addEventListener('timeupdate', function() {
        var percent = Math.floor((100 / vid.duration) * vid.currentTime);
        console.log(percent + ' percent')
        $scope.$emit('percentage', vid, $scope.id);
    }, false);
    vid.addEventListener('loadedmetadata', function() {
        vid.currentTime = $scope.currentTime;
    });








    $scope.$on('percentage', function(evt, value, id) {
        console.log($localStorage.name)
        $scope.current = value.currentTime;
        $scope.duration = value.duration;
        console.log($scope.current + ' current time');
        console.log($scope.duration + ' Duration');
        console.log('attr ' + id);
        if (id == 'module1') {
            if (value.currentTime == value.duration) {
                $scope.compelete_module1 = true;
                $localStorage.course1.module1 = true;
                $localStorage.course1.module1_current = 0;
            }
            $localStorage.course1.module1_current = value.currentTime;
        } else if (id == 'module2') {
            if (value.currentTime == value.duration) {
                $scope.compelete_module2 = true;
                $localStorage.course1.module2 = true;
                $localStorage.course1.module2_current = 0;
            }
            $localStorage.course1.module2_current = value.currentTime;
        } else if (id == 'module3') {
            if (value.currentTime == value.duration) {
                $scope.compelete_module3 = true;
                $localStorage.course1.module3 = true;
                $localStorage.course1.module3_current = 0;
            }
            $localStorage.course1.module3_current = value.currentTime;
        } else if (id == 'module4') {
            if (value.currentTime == value.duration) {
                $scope.compelete_module4 = true;
                $localStorage.course1.module4 = true;
                $localStorage.course1.module4_current = 0;
            }
            $localStorage.course1.module4_current = value.currentTime;
        } else if (id == 'module5') {
            if (value.currentTime == value.duration) {
                $scope.compelete_module5 = true;
                $localStorage.course1.module5 = true;
                $localStorage.course1.module5_current = 0;
            }
            $localStorage.course1.module5_current = value.currentTime;
        }
    });

});


app.controller('Course2Ctrl', function($scope, $location, $localStorage) {
    $scope.tab = 'first';
    if ($localStorage.name == '' || $localStorage.name == undefined) {
        $location.path('/');
    } else {
        if ($localStorage.course != 'course2') {
            $location.path('/course1');
        }
    }
    $scope.compelete_module1 = $localStorage.course2.module1;
    $scope.compelete_module2 = $localStorage.course2.module2;
    $scope.compelete_module3 = $localStorage.course2.module3;
    $scope.compelete_module4 = $localStorage.course2.module4;
});