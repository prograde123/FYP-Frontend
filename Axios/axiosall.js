import http from "./axios";


export const Register = async (fullName, email, password, role, phoneNum,profilePic='/',cv='/',userName) => {
    var userid ;
    await http.post("/users/signup",{
        fullName, email, password, role, phoneNum, profilePic
        })
      .then( async  (response)=>{
        console.log(response);//response data
        console.log(response.data);//response data
        userid = response.data._id
        console.log(response.data._id)
        console.log(response.status);//Status code
        console.log(response.statusText);//OK for 200
        console.log(response.headers);//Header
          if(role === 'Student'){
            await http.post("/users/signupStudent",{
              userid,userName
              })
            .then((response)=>{
              console.log(response.data);//response data
            }).catch( (error) => {
              console.log(error.response.data);
            });
          }
          else{
            await http.post("/users/signupTeacher",{
              userid,cv
            })
            .then((response)=>{
              console.log(response.data);
            }).catch((error)=>{
              console.log(error.response.data);
            });
          }

        })
      .catch( (error) => {
          console.log(error.response.data);
        });
        
}

export const login = async(email,password)=>{
  var userid ;
  var role;
  await http.post("/users/signin",{
      email, password
      })
    .then( async  (response)=>{
      console.log(response.data);//response data
      console.log(response.data.role);//response data
      console.log(response.data.token);
      const userData = {
        userid : response.data._id,
        role: response.data.role,
        email:response.data.email ,
        token:response.data.token,
        fullName:response.data.fullName,
        //jo fields required hain user ki or woh yahan likh lena
      }
      
      localStorage.setItem('User', JSON.stringify(userData));
      
        if(role === 'Student'){
          //as a student login
        }
        else{
          //as a teacher login
        }

      })
    .catch( (error) => {
        console.log(error.response.data);
      });
      
}
