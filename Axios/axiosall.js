import http from "./axios";


export const Register = async (fullName, email, password, role, phoneNum,profilePic='/',cv='/',userName) => {
    var userID ;
    await http.post("/users/signup",{
        fullName, email, password, role, phoneNum, profilePic
        })
      .then( async  (response)=>{
        console.log(response);//response data
        console.log(response.data);//response data
        userID = response.data._id
        console.log( userID )

        console.log(response.status);//Status code
        console.log(response.statusText);//OK for 200
        console.log(response.headers);//Header
          if(role === 'Student'){
            await http.post("/users/signupStudent",{
              userID,userName
              })
            .then((response)=>{
              console.log(response.data);//response data
            }).catch( (error) => {
              console.log(error.response.data);
            });
          }
          else{
            await http.post("/users/signupTeacher",{
              userID,cv
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

export const login = async (email, password) => {
  var userid;
  var role;
  try {
  const response = await http.post("/users/signin", {email,password})
  console.log(response.data.teacher)
      if (response.data.success === false) {
        return false
      } else {
        localStorage.setItem("User", JSON.stringify(response.data.teacher));
        return true
      }
    } catch(e) {
      console.log(e)
      return false
    }
};
