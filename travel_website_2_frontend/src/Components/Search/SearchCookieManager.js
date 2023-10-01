// NOT USED
// import React, {createContext, useContext, useState} from 'react';
// import Cookies from "universal-cookie";
//
// const RoomsContext = createContext();
//
// function SearchCookieManager({ children }) {
//     const [rooms, setRooms] = useState(null);
//     const cookies = new Cookies();
//
//     const roomsExists = () => {
//         // console.log(cookies.getAll().user.user)
//         return cookies.get('rooms') !== undefined;
//     };
//
//
//     const roomsSetter = (rooms) => {
//         // sessionStorage.setItem("rooms", JSON.stringify(rooms));
//         // let d = new Date();
//         // d.setTime(d.getTime() + (10*60*1000));
//         cookies.set('rooms', JSON.stringify(rooms), {
//             expires: new Date(Date.now() + 1000000)
//         })
//         setRooms({rooms});
//     };
//
//
//     const roomsGetter = () => {
//         // console.log(cookies.get('rooms'))
//         return JSON.parse(cookies.get('rooms'))
//     };
//
//     const contextValue = {
//         rooms,
//         roomsSetter,
//         roomsGetter,
//         roomsExists
//     };
//
//     return (
//         <RoomsContext.Provider value={contextValue}>
//             {children}
//         </RoomsContext.Provider>
//     );
// }
//
// export default RoomsContext;
//
// export function useRoomsCookies() {
//     return useContext(RoomsContext);
// }
//
// export { SearchCookieManager };