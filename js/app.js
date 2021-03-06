var app = angular.module('myapp', ['ngRoute', 'ngStorage','angularModalService']);
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

        .when('/certificate1', {
            cache: false,
            templateUrl: 'templates/certificate1.html',
            controller: 'Certi1Ctrl',
            controllerAs: 'Cert1'
        })

        .when('/certificate2', {
            cache: false,
            templateUrl: 'templates/certificate2.html',
            controller: 'Certi2Ctrl',
            controllerAs: 'Cert2'
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
    //$rootScope.name = $localStorage.name;
    //$rootScope.course = $localStorage.course;
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



app.controller('HomeCtrl', function($scope, $rootScope, $location, $localStorage,pepsiservice) {

    if ($localStorage.empid == '' || $localStorage.empid == undefined) {}
    else
        $location.path('/course');


    $scope.submitted=false;

    $scope.loginemp=function(user){

        $scope.submitted=true;
        if (user.loginForm) {

            $scope.logdata = {
                emp_name: user.name,
                emp_id: user.empid
            };

            pepsiservice.doLogin($scope.logdata).then(function (res) {

                $localStorage.name = user.name;
                $localStorage.empid = res.data.data.emp_id;
                $localStorage.c1_currentmodule = res.data.data.c1cm;
                $localStorage.c2_currentmodule = res.data.data.c2cm;
                $localStorage.c1status = res.data.data.c1_status;
                $rootScope.course1status = $localStorage.c1status;
                $localStorage.c2status = res.data.data.c2_status;
                $rootScope.course2status = $localStorage.c2status;
                $rootScope.name = $localStorage.name;
                $rootScope.idemp = $localStorage.empid;
                $location.path('/course');


                $localStorage.compelete_module1 = false;
                // $localStorage.compelete_module2 = false;


                $localStorage.compelete2_module1 = false;
                $localStorage.compelete2_module2 = false;
                $localStorage.compelete2_module3 = false;



                if ($localStorage.c1_currentmodule == 2) {
                    $localStorage.compelete_module1 = true;
                    // $localStorage.compelete_module2 = true;
                }
                else if ($localStorage.c1_currentmodule == 1) {
                    // $localStorage.compelete_module1 = true;
                }
                else {
                }


                if ($localStorage.c2_currentmodule == 4) {
                    $localStorage.compelete2_module1 = true;
                    $localStorage.compelete2_module2 = true;
                    $localStorage.compelete2_module3 = true;

                }
                else if ($localStorage.c2_currentmodule == 3) {
                    $localStorage.compelete2_module1 = true;
                    $localStorage.compelete2_module2 = true;
                }
                else if ($localStorage.c2_currentmodule == 2) {
                    $localStorage.compelete2_module1 = true;
                }
                else {
                }


            }, function (err) {
                console.log("error");

            });

        };




    };

    $scope.logout=function(){

        delete $localStorage.empid;
        delete $localStorage.name;
        delete $localStorage.course;
        delete $localStorage.course1;
        delete $localStorage.course2;
        $rootScope.idemp ="";

        $location.path('/');
    };

});


app.controller('CourseCtrl', function($scope, $location,$rootScope, $localStorage,ModalService) {

    $rootScope.name = $localStorage.name;
    $rootScope.idemp = $localStorage.empid;
    $rootScope.course1status= $localStorage.c1status;
    $rootScope.course2status= $localStorage.c2status;

    if ($localStorage.empid == '' || $localStorage.empid == undefined) {
        $location.path('/');
    }

    $scope.selectCourse = function(course) {
        $localStorage.course = course;

        if($localStorage.course1) {}
        else
            $localStorage.course1 = {};

        if($localStorage.course2) {}
        else
            $localStorage.course2 = {};

        $location.path('/' + course);
    }


    $scope.cert1page = function() {
        $location.path('/certificate1');
    }

        $scope.cert2page = function() {
            $location.path('/certificate2');
        }

$scope.generatecert =function(){

  console.log("generate");
  html2canvas(document.getElementById('exportthis'), {
             onrendered: function (canvas) {
                 var data = canvas.toDataURL();
                 var docDefinition = {
                     content: [{
                         image: data,
                         width: 500,
                     }]
                 };
                 pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
             }
         });

}


// $scope.show = function() {
//    ModalService.showModal({
//        templateUrl: 'modal.html',
//        controller: "ModalController"
//    }).then(function(modal) {
//
//        modal.element.modal();
//        modal.close.then(function(result) {
//            $scope.message = "You said " + result;
//        });
//    });
// };

// $scope.close = function(result) {
// close(result, 500);
// }


});

// app.controller('ModalController', function($scope,$rootScope, close) {
// $scope.close = function(result) {
//     close(result, 500);
// }
//
//
// });

app.controller('Certi1Ctrl', function($scope, $location, $localStorage,$rootScope) {

    $rootScope.name = $localStorage.name;
    $rootScope.idemp = $localStorage.empid;
    $rootScope.course1status= $localStorage.c1status;
    $rootScope.course2status= $localStorage.c2status;

    if (!$localStorage.c1status) {
        $location.path('/course');
    }


$scope.generatecert =function(){

  console.log("generate certificate 1");
  html2canvas(document.getElementById('exportthis'), {
             onrendered: function (canvas) {
                 var data = canvas.toDataURL();
                 var docDefinition = {
                     content: [{
                         image: data,
                         width: 750,
                     }],
                     pageOrientation: 'landscape'
                 };
                 pdfMake.createPdf(docDefinition).download("certificate1.pdf");
             }
         });

}

});


app.controller('Certi2Ctrl', function($scope, $location, $localStorage,$rootScope) {

    $rootScope.name = $localStorage.name;
    $rootScope.idemp = $localStorage.empid;
    $rootScope.course1status= $localStorage.c1status;
    $rootScope.course2status= $localStorage.c2status;

    if (!$localStorage.c2status) {
        $location.path('/course');
    }


$scope.generatecert =function(){
  console.log("generate certificate 2");
  html2canvas(document.getElementById('exportthis'), {
             onrendered: function (canvas) {
                 var data = canvas.toDataURL();

                 var docDefinition = {
                     content: [{
                         image: data,
                         width: 750,
                     }],
                     pageOrientation: 'landscape'
                 };
                 pdfMake.createPdf(docDefinition).download("certificate2.pdf");
             }
         });

}

});

app.controller('Course1Ctrl', function($scope,$sce, $route, $location, $localStorage,$rootScope,pepsiservice) {

    $rootScope.idemp = $localStorage.empid;
    $rootScope.name = $localStorage.name;
    $rootScope.course1status= $localStorage.c1status;

    if ($localStorage.empid == '' || $localStorage.empid == undefined) {
        $location.path('/');
    }
    else
        $location.path('/course1');

    // $scope.videourls="";
    // $scope.videoloaded=false;
    //
    // $scope.getvideourl=function(videoid){
    //    $scope.getvideodata={
    //        course_id: "1",
    //        video_id: videoid+""
    //    };
    //    pepsiservice.getVideo($scope.getvideodata).then(function (res) {
    //
    //        $scope.videourls=res.data.video_url;
    //       //  $scope.videoloaded=true;
    //       //  $scope.video_status2();
    //
    //    },function(err){
    //        console.log("error");
    //    });
    // };
    // $scope.getvideourl(1);

    // $scope.videourls="http://pepsico.scaledesk.com/gitvid/Board%20Room.mp4";
    // $scope.verifiedUrl = function(url){
    //   console.log('url '+url);
    //   return $sce.trustAsResourceUrl(url);
    // }

    // $scope.submit_answer = {};
    $scope.submit_answer_a = {};
    $scope.submit_answer_b = {};
    $scope.submit_answer_c= {};
    $scope.submit_answer_d = {};

    for (i=1;i<=5;i++)
    {
     $scope.submit_answer_a[i]=false;
     $scope.submit_answer_b[i]=false;
     $scope.submit_answer_c[i]=false;
     $scope.submit_answer_d[i]=false;
    }

    $scope.submitted=false;
    $scope.questionformValid=false;
    $scope.valid=false;
    $scope.showdesc=true;


$scope.toggleview=function(){
  $scope.showdesc=!$scope.showdesc
}




    $scope.getquestions=function(course,video){
        console.log(video);
        $scope.getquesdata = {
            course_id: course+"",
            video_id: video+""
        };

        $rootScope.video_id=video+"";
        pepsiservice.getQuestions($scope.getquesdata).then(function (res) {

            $scope.questions=res.data.data;

        },function(err){
            console.log("error");

        });

    };


    $scope.submitanswer = function(submit_answer_a,submit_answer_b,submit_answer_c,submit_answer_d,questionformValid,video){


       $scope.givenanswer=[]

       for (i=1;i<=5;i++)
           $scope.givenanswer[i]=[]

       for(i=1;i<=5;i++){
       if(submit_answer_a[i])
          $scope.givenanswer[i].push("a")
       if(submit_answer_b[i])
          $scope.givenanswer[i].push("b")
       if(submit_answer_c[i])
          $scope.givenanswer[i].push("c")
       if(submit_answer_d[i])
          $scope.givenanswer[i].push("d")
       }

    $scope.ansformated=[]
    for(i=1;i<=5;i++) {
      $scope.ansformated[i]=""
        for(j=0;j<$scope.givenanswer[i].length;j++)
            $scope.ansformated[i]=$scope.ansformated[i]+$scope.givenanswer[i][j]+","
    }
    // console.log($scope.ansformated[1])
    // console.log($scope.ansformated[2])
    // console.log($scope.ansformated[3])
    // console.log($scope.ansformated[4])
    // console.log($scope.ansformated[5])


    $scope.submitted=true;

    if(questionformValid)
    {
        $scope.valid=true;
        $scope.answerdata = {

            emp_id:$localStorage.empid,
            course_id:"1",
            video_id: video,
            q:{
                "1":$scope.ansformated[1],
                "2":$scope.ansformated[2],
                "3":$scope.ansformated[3],
                "4":$scope.ansformated[4],
                "5":$scope.ansformated[5]

            }
        };

        $scope.q1_response=true;
        $scope.q2_response=true;
        $scope.q3_response=true;
        $scope.q4_response=true;
        $scope.q5_response=true;

        pepsiservice.checkAnswers($scope.answerdata).then(function (res) {

            $scope.check_response=res.data;

            $scope.check_ans=res.data.data;
            $scope.q1_response=$scope.check_ans[0].is_correct;
            $scope.q2_response=$scope.check_ans[1].is_correct;
            $scope.q3_response=$scope.check_ans[2].is_correct;
            $scope.q4_response=$scope.check_ans[3].is_correct;
            $scope.q5_response=$scope.check_ans[4].is_correct;

           if($scope.check_response.test_clear)
           {
             $scope.showdesc=true;
               if(video==1){

                   $scope.compelete_module1 = true;
                   $localStorage.compelete_module1 = true;
                   $localStorage.course1.module1 = true;
                   $localStorage.course1.module1_current = 0;

                   $('#tab2').addClass("active");
                   $('#tab1').removeClass("active");
                   $scope.tab = 'second';



                   $scope.vid = document.getElementById('module2');
                   $scope.id = 'module2';

                   $scope.video_status2();

                   alert('Congrats you have cleared this test module . Now you can explore next module');


               }

              //  else if(video==2){
               //
              //      $scope.compelete_module2 = true;
              //      $localStorage.compelete_module2 = true;
              //      $localStorage.course1.module2 = true;
              //      $localStorage.course1.module2_current = 0;
               //
              //      $('#tab3').addClass("active");
              //      $('#tab2').removeClass("active");
              //      $scope.tab = 'third';
               //
               //
              //      $scope.vid = document.getElementById('module3');
               //
              //      $scope.id = 'module3';
              //      $scope.video_status2();
              //      alert('Congrats you have cleared this test module . Now you can explore next module');
               //
               //
               //
              //  }

               else if(video==2){

                 if($localStorage.c1status)
                 {
                     alert('You have already cleared Course1 ,Please generate your certificate');
                     $location.path('/course');

                 }


                 else{
                     $scope.compelete_module2 = true;
                     $localStorage.compelete_module2 = true;
                     $localStorage.course1.module2 = true;
                     $localStorage.course1.module2_current = 0;
                     $localStorage.c1status=true;
                     $rootScope.course1status= $localStorage.c1status;
                    //  $scope.video_status2();

                     alert('Congrats you have cleared Course 1 .Please generate your certificate');
                     $location.path('/course');

                 }



               }

           }

            else{

               alert("Please give all correct answers to clear this test module");

           }



        },function(err){
            console.log("error");

        });


    }


     else{
        console.log("Please attempt all the questions");
    }



    }






    //
    // $scope.submitanswer=function(submit_answer,questionformValid,video){
    //
    //     $scope.submitted=true;
    //
    //     if(questionformValid)
    //     {
    //         $scope.valid=true;
    //         $scope.answerdata = {
    //
    //             emp_id:$localStorage.empid,
    //             course_id:"1",
    //             video_id: video,
    //             q:{
    //                 "1":submit_answer[1],
    //                 "2":submit_answer[2],
    //                 "3":submit_answer[3],
    //                 "4":submit_answer[4],
    //                 "5":submit_answer[5]
    //
    //             }
    //         };
    //
    //         $scope.q1_response=true;
    //         $scope.q2_response=true;
    //         $scope.q3_response=true;
    //         $scope.q4_response=true;
    //         $scope.q5_response=true;
    //
    //         pepsiservice.checkAnswers($scope.answerdata).then(function (res) {
    //
    //             $scope.check_response=res.data;
    //
    //             $scope.check_ans=res.data.data;
    //             $scope.q1_response=$scope.check_ans[0].is_correct;
    //             $scope.q2_response=$scope.check_ans[1].is_correct;
    //             $scope.q3_response=$scope.check_ans[2].is_correct;
    //             $scope.q4_response=$scope.check_ans[3].is_correct;
    //             $scope.q5_response=$scope.check_ans[4].is_correct;
    //
    //            if($scope.check_response.test_clear)
    //            {
    //              $scope.showdesc=true;
    //                if(video==1){
    //
    //                    $scope.compelete_module1 = true;
    //                    $localStorage.compelete_module1 = true;
    //                    $localStorage.course1.module1 = true;
    //                    $localStorage.course1.module1_current = 0;
    //
    //                    $('#tab2').addClass("active");
    //                    $('#tab1').removeClass("active");
    //                    $scope.tab = 'second';
    //
    //
    //
    //                    $scope.vid = document.getElementById('module2');
    //                    $scope.id = 'module2';
    //
    //                    $scope.video_status2();
    //
    //                    alert('Congrats you have cleared this test module . Now you can explore next module');
    //
    //
    //                }else if(video==2){
    //
    //                    $scope.compelete_module2 = true;
    //                    $localStorage.compelete_module2 = true;
    //                    $localStorage.course1.module2 = true;
    //                    $localStorage.course1.module2_current = 0;
    //
    //                    $('#tab3').addClass("active");
    //                    $('#tab2').removeClass("active");
    //                    $scope.tab = 'third';
    //
    //
    //                    $scope.vid = document.getElementById('module3');
    //
    //                    $scope.id = 'module3';
    //                    $scope.video_status2();
    //                    alert('Congrats you have cleared this test module . Now you can explore next module');
    //
    //
    //
    //                }else if(video==3){
    //
    //                  if($localStorage.c1status)
    //                  {
    //                      alert('You have already cleared Course1 ,Please generate your certificate');
    //                      $location.path('/course');
    //
    //                  }
    //
    //
    //                  else{
    //                      $scope.compelete_module3 = true;
    //                      $localStorage.compelete_module3 = true;
    //                      $localStorage.course1.module3 = true;
    //                      $localStorage.course1.module3_current = 0;
    //                      $localStorage.c1status=true;
    //                      $rootScope.course1status= $localStorage.c1status;
    //                      alert('Congrats you have cleared Course 1 .Please generate your certificate');
    //                      $location.path('/course');
    //
    //                  }
    //
    //
    //
    //                }
    //
    //            }
    //
    //             else{
    //
    //                alert("Please give all correct answers to clear this test module");
    //
    //            }
    //
    //
    //
    //         },function(err){
    //             console.log("error");
    //
    //         });
    //
    //
    //     }
    //
    //
    //      else{
    //         console.log("Please attempt all the questions");
    //     }
    //
    //
    // };






    $scope.chkstatus=function(video){

      $scope.showdesc=true;

        $scope.getquestions(1,video);

        if($localStorage.c1status){

            $scope.m5ques_active=true;
        }

    };

    $scope.compelete_module1=$localStorage.compelete_module1;
    $scope.compelete_module2=$localStorage.compelete_module2;
    // $scope.compelete_module3=$localStorage.compelete_module3;
    // $scope.compelete_module4=$localStorage.compelete_module4;

    if ($localStorage.compelete_module1 == true) {
        if ($localStorage.compelete_module2 == true) {

            //  $scope.tab = 'third';
            //  $('#tab3').addClass("active");
            //  $('#tab2').removeClass("active");
            //  $('#tab1').removeClass("active");
            //  $scope.vid = document.getElementById('module3');
            //  $scope.id = 'module3';
            //  $scope.currentTime = $localStorage.course1.module3_current;




            $scope.tab = 'first';
            $scope.vid = document.getElementById('module1');
            $scope.id = 'module1';
            $scope.currentTime = $localStorage.course1.module1_current;
            $scope.getquestions(1,1);




        } else {

          $scope.tab = 'second';
          $('#tab2').addClass("active");
          $('#tab1').removeClass("active");
          //$scope.getvideourl(2);
          $scope.vid = document.getElementById('module2');
          $scope.id = 'module2';
          $scope.currentTime = $localStorage.course1.module2_current;

        }
    } else {
        $scope.tab = 'first';
        $scope.vid = document.getElementById('module1');
        $scope.id = 'module1';
        $scope.currentTime = $localStorage.course1.module1_current;
    }




    $scope.video_status2=function(){


        $scope.vid.addEventListener('timeupdate', function() {
            var percent = Math.floor((100 / $scope.vid.duration) * $scope.vid.currentTime);
            console.log(percent + ' percent');
            $scope.$emit('percentage', $scope.vid, $scope.id);
        }, false);
        $scope.vid.addEventListener('loadedmetadata', function() {
            $scope.vid.currentTime = $scope.currentTime;
        });

    }  ;

    $scope.video_status2();

    $scope.m1ques_active=false;
    $scope.m2ques_active=false;
    // $scope.m3ques_active=false;
    // $scope.m4ques_active=false;

    // if($localStorage.c1status){
    //     $scope.getquestions(1,3);
    //     $scope.m3ques_active=true;
    // }
    // else{
    //     $scope.m3ques_active=false;
    // }

    // if($localStorage.c1status){
    //     $scope.getquestions(1,5);
    //     $scope.m5ques_active=true;
    // }
    // else{
    //     $scope.m5ques_active=false;
    // }


    $scope.$on('percentage', function(evt, value, id) {
        console.log($localStorage.name);
        $scope.current = value.currentTime;
        $scope.duration = value.duration;
        console.log($scope.current + ' current time');
        console.log($scope.duration + ' Duration');
        console.log('attr ' + id);
        if (id == 'module1') {
            if ($scope.current == $scope.duration) {
                $scope.getquestions(1,1);
                $scope.$apply(function () {
                    $scope.m1ques_active=true;
                    console.log($scope.m1ques_active);
                });

                //$scope.compelete_module1 = true;
                //$localStorage.course1.module1 = true;
                //$localStorage.course1.module1_current = 0;
            }
            $localStorage.course1.module1_current = value.currentTime;
        } else if (id == 'module2') {
            if ($scope.current == $scope.duration) {

                $scope.getquestions(1,2);
                $scope.$apply(function () {
                    $scope.m2ques_active=true;
                    // $scope.submit_answer = {};

                    $scope.submit_answer_a = {};
                    $scope.submit_answer_b = {};
                    $scope.submit_answer_c= {};
                    $scope.submit_answer_d = {};

                    for (i=1;i<=5;i++)
                    {
                     $scope.submit_answer_a[i]=false;
                     $scope.submit_answer_b[i]=false;
                     $scope.submit_answer_c[i]=false;
                     $scope.submit_answer_d[i]=false;
                    }

                    $scope.submitted=false;
                    $scope.questionformValid=false;
                    $scope.valid=false;

                    console.log($scope.m2ques_active);
                });

            }
            $localStorage.course1.module2_current = value.currentTime;

        }

//          else if (id == 'module3') {
//
//
//
//             if ($scope.current == $scope.duration) {
//
//                 $scope.getquestions(1,3);
//                 $scope.$apply(function () {
//                     $scope.m3ques_active=true;
//                     $scope.submit_answer = {};
//                     $scope.submitted=false;
//                     $scope.questionformValid=false;
//                     $scope.valid=false;
//                     console.log($scope.m3ques_active);
//                 });
//
//             }
//             $localStorage.course1.module3_current = value.currentTime;
//
//
// }

        //  else if (id == 'module4') {
        //     if ($scope.current == $scope.duration) {
        //
        //         $scope.getquestions(1,4);
        //         $scope.$apply(function () {
        //             $scope.m4ques_active=true;
        //             $scope.submit_answer = {};
        //             $scope.submitted=false;
        //             $scope.questionformValid=false;
        //             $scope.valid=false;
        //
        //             console.log($scope.m4ques_active);
        //         });
        //
        //     }
        //     $localStorage.course1.module4_current = value.currentTime;
        // } else if (id == 'module5') {
        //     if (value.currentTime == value.duration) {
        //
        //         $scope.getquestions(1,5);
        //         $scope.$apply(function () {
        //             $scope.m5ques_active=true;
        //             $scope.submit_answer = {};
        //             $scope.submitted=false;
        //             $scope.questionformValid=false;
        //             $scope.valid=false;
        //             console.log($scope.m5ques_active);
        //         });
        //
        //     }
        //     $localStorage.course1.module5_current = value.currentTime;
        // }
    });

});


app.controller('Course2Ctrl', function($scope, $location, $localStorage,pepsiservice,$rootScope) {

    $rootScope.name = $localStorage.name;
    $rootScope.idemp = $localStorage.empid;
    $rootScope.course2status= $localStorage.c2status;

    $scope.tab = 'first';
    if ($localStorage.name == '' || $localStorage.name == undefined) {
        $location.path('/');
    }

    $scope.compelete2_module1=$localStorage.compelete2_module1;
    $scope.compelete2_module2=$localStorage.compelete2_module2;
    $scope.compelete2_module3=$localStorage.compelete2_module3;

    // $scope.submit_answer = {};

    $scope.submit_answer_a = {};
    $scope.submit_answer_b = {};
    $scope.submit_answer_c= {};
    $scope.submit_answer_d = {};

    for (i=1;i<=10;i++)
    {
     $scope.submit_answer_a[i]=false;
     $scope.submit_answer_b[i]=false;
     $scope.submit_answer_c[i]=false;
     $scope.submit_answer_d[i]=false;
    }

    $scope.submitted=false;
    $scope.questionformValid=false;
    $scope.valid=false;
    $scope.showdesc=true;

    $scope.toggleview=function(){
      $scope.showdesc=!$scope.showdesc
    }

    $scope.getquestions=function(){

        $scope.getquesdata = {
            course_id:"2"
        };
        pepsiservice.getQuestions($scope.getquesdata).then(function (res) {
            $scope.questions=res.data.data;
        },function(err){
            console.log("error");

        });

    };

    $scope.submitanswer = function(submit_answer_a,submit_answer_b,submit_answer_c,submit_answer_d,questionformValid){

       $scope.givenanswer=[]

       for (i=1;i<=10;i++)
           $scope.givenanswer[i]=[]

       for(i=1;i<=10;i++){
       if(submit_answer_a[i])
          $scope.givenanswer[i].push("a")
       if(submit_answer_b[i])
          $scope.givenanswer[i].push("b")
       if(submit_answer_c[i])
          $scope.givenanswer[i].push("c")
       if(submit_answer_d[i])
          $scope.givenanswer[i].push("d")
       }

    $scope.ansformated=[]
    for(i=1;i<=10;i++) {
      $scope.ansformated[i]=""
        for(j=0;j<$scope.givenanswer[i].length;j++)
            $scope.ansformated[i]=$scope.ansformated[i]+$scope.givenanswer[i][j]+","
    }


    $scope.submitted=true;

    if(questionformValid)
    {
        $scope.valid=true;
        $scope.answerdata = {

            emp_id:$localStorage.empid,
            course_id:"2",
            q:{
                "1":$scope.ansformated[1],
                "2":$scope.ansformated[2],
                "3":$scope.ansformated[3],
                "4":$scope.ansformated[4],
                "5":$scope.ansformated[5],
                "6":$scope.ansformated[6],
                "7":$scope.ansformated[7],
                "8":$scope.ansformated[8],
                "9":$scope.ansformated[9],
                "10":$scope.ansformated[10]
            }
        };


        $scope.q1_response=true;
        $scope.q2_response=true;
        $scope.q3_response=true;
        $scope.q4_response=true;
        $scope.q5_response=true;
        $scope.q6_response=true;
        $scope.q7_response=true;
        $scope.q8_response=true;
        $scope.q9_response=true;
        $scope.q10_response=true;

        pepsiservice.checkAnswers($scope.answerdata).then(function (res) {

            $scope.check_response=res.data;

            $scope.check_ans=res.data.data;
            $scope.q1_response=$scope.check_ans[0].is_correct;
            $scope.q2_response=$scope.check_ans[1].is_correct;
            $scope.q3_response=$scope.check_ans[2].is_correct;
            $scope.q4_response=$scope.check_ans[3].is_correct;
            $scope.q5_response=$scope.check_ans[4].is_correct;
            $scope.q6_response=$scope.check_ans[5].is_correct;
            $scope.q7_response=$scope.check_ans[6].is_correct;
            $scope.q8_response=$scope.check_ans[7].is_correct;
            $scope.q9_response=$scope.check_ans[8].is_correct;
            $scope.q10_response=$scope.check_ans[9].is_correct;

            if($scope.check_response.test_clear)
            {

                if($localStorage.c2status)
                {
                    alert('You have already cleared Course2 ,Please generate your certificate');
                    $location.path('/course');
                }

                else{
                    alert('Congrats you have cleared Course 2 . Now you can generate your certificate');
                    $localStorage.c2status=true;
                    $rootScope.course2status= $localStorage.c2status;
                    $location.path('/course');
                }

            }

            else{
                alert("Please give all correct answers to clear Course 2");
            }


        },function(err){
            console.log("error");

        });


    }


    else{

        console.log("Please attempt all the questions");

    }

}


    //
    // $scope.submitanswer=function(submit_answer,questionformValid){
    //
    //     $scope.submitted=true;
    //
    //     if(questionformValid)
    //     {
    //         $scope.valid=true;
    //         $scope.answerdata = {
    //
    //             emp_id:$localStorage.empid,
    //             course_id:"2",
    //             q:{
    //                 "1":submit_answer[1],
    //                 "2":submit_answer[2],
    //                 "3":submit_answer[3],
    //                 "4":submit_answer[4],
    //                 "5":submit_answer[5],
    //                 "6":submit_answer[6],
    //                 "7":submit_answer[7],
    //                 "8":submit_answer[8],
    //                 "9":submit_answer[9],
    //                 "10":submit_answer[10]
    //
    //             }
    //         };
    //
    //
    //         $scope.q1_response=true;
    //         $scope.q2_response=true;
    //         $scope.q3_response=true;
    //         $scope.q4_response=true;
    //         $scope.q5_response=true;
    //         $scope.q6_response=true;
    //         $scope.q7_response=true;
    //         $scope.q8_response=true;
    //         $scope.q9_response=true;
    //         $scope.q10_response=true;
    //
    //         pepsiservice.checkAnswers($scope.answerdata).then(function (res) {
    //
    //             $scope.check_response=res.data;
    //
    //             $scope.check_ans=res.data.data;
    //             $scope.q1_response=$scope.check_ans[0].is_correct;
    //             $scope.q2_response=$scope.check_ans[1].is_correct;
    //             $scope.q3_response=$scope.check_ans[2].is_correct;
    //             $scope.q4_response=$scope.check_ans[3].is_correct;
    //             $scope.q5_response=$scope.check_ans[4].is_correct;
    //             $scope.q6_response=$scope.check_ans[5].is_correct;
    //             $scope.q7_response=$scope.check_ans[6].is_correct;
    //             $scope.q8_response=$scope.check_ans[7].is_correct;
    //             $scope.q9_response=$scope.check_ans[8].is_correct;
    //             $scope.q10_response=$scope.check_ans[9].is_correct;
    //
    //             if($scope.check_response.test_clear)
    //             {
    //
    //                 if($localStorage.c2status)
    //                 {
    //                     alert('You have already cleared Course2 ,Please generate your certificate');
    //                     $location.path('/course');
    //                 }
    //
    //                 else{
    //                     alert('Congrats you have cleared Course 2 . Now you can generate your certificate');
    //                     $localStorage.c2status=true;
    //                     $rootScope.course2status= $localStorage.c2status;
    //                     $location.path('/course');
    //                 }
    //
    //             }
    //
    //             else{
    //                 alert("Please give all correct answers to clear Course 2");
    //             }
    //
    //
    //         },function(err){
    //             console.log("error");
    //
    //         });
    //
    //
    //     }
    //
    //
    //     else{
    //
    //         console.log("Please attempt all the questions");
    //
    //     }
    //
    //
    // };


    if ($localStorage.compelete2_module1 == true) {
            if ($localStorage.compelete2_module2 == true) {
                if ($localStorage.compelete2_module3 == true) {
                    $scope.tab = 'fourth';
                    $('#tab4').addClass("active");
                    $('#tab1').removeClass("active");
                    $('#tab2').removeClass("active");
                    $('#tab3').removeClass("active");
                    //$scope.getvideourl(5);
                    $scope.vid = document.getElementById('module4');
                    $scope.id = 'module4';
                    $scope.currentTime = $localStorage.course2.module3_current;
                } else {
                    $scope.tab = 'third';

                    $('#tab3').addClass("active");
                    $('#tab4').removeClass("active");
                    $('#tab2').removeClass("active");
                    $('#tab1').removeClass("active");
                    //$scope.getvideourl(4);
                    $scope.vid = document.getElementById('module3');
                    $scope.id = 'module3';
                    $scope.currentTime = $localStorage.course2.module3_current;
                }
            } else {
                $scope.tab = 'second';
                $('#tab2').addClass("active");
                $('#tab1').removeClass("active");
                //$scope.getvideourl(3);
                $scope.vid = document.getElementById('module2');
                $scope.id = 'module2';
                $scope.currentTime = $localStorage.course2.module2_current;
            }
        } else {
            $scope.tab = 'first';
            //$scope.getvideourl(2);
            $scope.vid = document.getElementById('module1');
            $scope.id = 'module1';
            $scope.currentTime = $localStorage.course2.module1_current;
        }




$scope.video_status1=function(){


    $scope.vid.addEventListener('timeupdate', function() {
        var percent = Math.floor((100 / $scope.vid.duration) * $scope.vid.currentTime);
        console.log(percent + ' percent');
        $scope.$emit('percentage', $scope.vid, $scope.id);
    }, false);
    $scope.vid.addEventListener('loadedmetadata', function() {
        $scope.vid.currentTime = $scope.currentTime;
    });


};

    $scope.video_status1();







    $scope.videoiddata=function(video){

        $scope.videoiddatas = {
            emp_id:$localStorage.empid+"",
            course_id: "2",
            video_id: video+""
        };

    pepsiservice.saveVideoStatus($scope.videoiddatas).then(function (res) {

        console.log(res);

    },function(err){
        console.log("error");

    });


    };


    if($localStorage.c2status){
        $scope.getquestions();
        $scope.c2ques_active=true;
    }
    else{
        $scope.c2ques_active=false;
    }






    $scope.$on('percentage', function(evt, value, id) {
        console.log($localStorage.name);
        $scope.current = value.currentTime;
        $scope.duration = value.duration;
        console.log($scope.current + ' current time');
        console.log($scope.duration + ' Duration');
        console.log('attr ' + id);
        if (id == 'module1') {
            if ($scope.current == $scope.duration) {

                $scope.$apply(function () {

                    $scope.compelete2_module1 = true;


                });

                $scope.videoiddata(1);
                $scope.vid = document.getElementById('module2');
                $scope.id = 'module2';
                $scope.video_status1();

                $localStorage.compelete2_module1 = true;
                $localStorage.course2.module1 = true;
                $localStorage.course2.module1_current = 0;

                $('#tab2').addClass("active");
                $('#tab1').removeClass("active");
                $scope.tab = 'second';


            }
            $localStorage.course2.module1_current = value.currentTime;
        } else if (id == 'module2') {
            if ($scope.current == $scope.duration) {


                $scope.$apply(function () {

                    $scope.compelete2_module2 = true;

                });
                $scope.videoiddata(2);

                $scope.vid = document.getElementById('module3');
                $scope.id = 'module3';
                $scope.video_status1();

                $localStorage.compelete2_module2 = true;
                $localStorage.course2.module2 = true;
                $localStorage.course2.module2_current = 0;
                $('#tab3').addClass("active");
                $('#tab2').removeClass("active");
                $scope.tab = 'third';


            }
            $localStorage.course2.module2_current = value.currentTime;
        } else if (id == 'module3') {
            if ($scope.current == $scope.duration) {

                $scope.$apply(function () {

                    $scope.compelete2_module3 = true;

                });
                $scope.videoiddata(3);
                $scope.vid = document.getElementById('module4');
                $scope.id = 'module4';
                $scope.video_status1();
                $localStorage.compelete2_module3 = true;
                $localStorage.course2.module3 = true;
                $localStorage.course2.module3_current = 0;
                $('#tab4').addClass("active");
                $('#tab3').removeClass("active");
                $scope.tab = 'fourth';


            }
            $localStorage.course2.module3_current = value.currentTime;
        } else if (id == 'module4') {
            if ($scope.current == $scope.duration) {

                $scope.$apply(function () {

                    $scope.compelete2_module4 = true;

                });
                $scope.getquestions();
                $scope.c2ques_active=true;
                $scope.videoiddata(4);
                $localStorage.compelete2_module4 = true;
                $localStorage.course2.module4 = true;
                $localStorage.course2.module4_current = 0;



            }
            $localStorage.course2.module4_current = value.currentTime;
        }
    });

});



app.factory('pepsiservice', function($http,$localStorage,$q){

  //  var baseUrl= 'http://localhost:8000';
   var baseUrl= 'http://52.66.139.3:8024';


    var services = {
        doLogin:doLogin,
        getQuestions:getQuestions,
        checkAnswers:checkAnswers,
        getVideo:getVideo,
        saveVideoStatus:saveVideoStatus
    };
    return services;


    function doLogin(data){
        var deffer = $q.defer();
        return $http({
            method: 'POST',
            url: baseUrl+'/login-register/',
            data:data
        });
        return deffer.promise;
    }

    function getQuestions(data){
        var deffer = $q.defer();
        return $http({
            method: 'POST',
            url: baseUrl+'/question/',
            data:data
        });
        return deffer.promise;
    }


    function checkAnswers(data){
        var deffer = $q.defer();
        return $http({
            method: 'POST',
            url: baseUrl+'/check-answers/',
            data:data
        });
        return deffer.promise;
    }

    function getVideo(data){
        var deffer = $q.defer();
        return $http({
            method: 'POST',
            url: baseUrl+'/video/',
            data:data
        });
        return deffer.promise;
    }


    function saveVideoStatus(data){
        var deffer = $q.defer();
        return $http({
            method: 'POST',
            url: baseUrl+'/save-video-status/',
            data:data
        });
        return deffer.promise;
    }


});

app.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);
