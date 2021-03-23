
//var myApp= angular.module('myApp',[])
myApp.service('blogService',['$http',function($http){
  //$scope.baseURL="http://myshop.cloudjiffy.net/MyShop/";

  this.addblogs = function addblogs(blog) 
  { 
    
    if(blog.blogId == 0 || blog.blogId == null )
    {
    return    $http({
        method : 'POST',
        url : 'http://postsarticles233.herokuapp.com/v1/post/create',
        data : JSON.stringify(blog)
      })
    }else{
      return    $http({
        method : 'PUT',
        url : 'http://postsarticles233.herokuapp.com/v1/post/update/'+blog.blogId,
        data : JSON.stringify(blog)
      })

    }
  }

  //Update blog Service
  
  //get All blogs

  this.getAllblogs = function()
  {
    return $http({
      method : 'GET',
      url : 'http://postsarticles233.herokuapp.com/v1/posts/'
    });
  }

  //Delete item

  this.deleteblog = function(x)
  {
    return $http({
      method : 'DELETE',
      url : 'http://postsarticles233.herokuapp.com/v1/post/delete/'+x.blogId
    })
    
  }
}])