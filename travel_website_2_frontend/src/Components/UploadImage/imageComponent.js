// import React from "react";
// import {ApiConnector} from "../Other/ApiConnector";
// import {useAuth} from "../Auth/contex";
// import ReactDOM from "react-dom";
//
// class ImageComponent extends React.Component
// {
//
//
//     uploadFile = event => {
//
//         const formData = new FormData();
//         const Auth = useAuth()
//         formData.append('user', Auth.user.user)
//         formData.append('file', event.target.files[0])
//         formData.append('name', "Image")
//         ApiConnector.uploadImage(formData)
//         .then(data => {
//             console.log('file uploaded')
//             console.log(data)
//         })
//         .catch(e => {
//             console.log('error')
//             console.log(e)
//         })
//     }
//
//     render() {
//         console.log("rendered");
//         return (
//             <div>
//                 <input type="file" id="file" name="filename" onChange={this.uploadFile} />
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(
//     <ImageComponent />,
//     document.getElementById("react")
// );