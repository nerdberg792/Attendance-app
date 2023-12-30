import React , {useState} from 'react';
import Card from './Card';
import Button from './Button';
import Cookies from 'js-cookie';
import Coursecard from './Coursecard';


const Coursepage = (props) =>{
    const initialCourseObjarr = JSON.parse(Cookies.get('courseObjarrcook')) ; 
    const [courseObjarr , setCourseObjarr] = useState(initialCourseObjarr); 
    const delstate=()=>{
        
          setCourseObjarr(JSON.parse(Cookies.get('courseObjarrcook'))) ; 

    }
    const [newCourse , setNewCourse] = useState('');
    const addHandler = () => {
        let courseObjarrcook = JSON.parse(Cookies.get('courseObjarrcook'));
       
        courseObjarrcook = [...courseObjarr , {courseName : newCourse , attended : 0 , missed : 0}] ;
        
        setCourseObjarr(courseObjarrcook);
        Cookies.set('courseObjarrcook', JSON.stringify(courseObjarrcook), { expires: 7 }) ; 
    };
       
    const handleLogout = async() => {
        const userData = {
            token : Cookies.get('token') , 
            courses : courseObjarr
        }
        const requestOptions = {
            method: 'POST',  
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify(userData)
          };
        const response = await fetch('http://localhost:3001/course', requestOptions);
       
        props.setStatus(false);
    } ;
    
    return(
        <div className = 'grid grid-rows-7'>
            <div className='row-span-2 justify-center mb-10'>
                <Card>
                    <input type='text' placeholder='Course Name' className='rounded-md' onChange={(e)=>setNewCourse(e.target.value)} /> 
                    <Button classname='ml-20' onClick={addHandler}>ADD</Button>
                    <Button classname='ml-100' onClick={handleLogout}>Logout</Button>
                    
                </Card>
            </div>
            <div className='row-span-5'>
            <ul>
        {courseObjarr.map((element, index) => (
          <li key={index} className="mb-5"><Coursecard delfunc={delstate} courseObj={element}></Coursecard></li>
        ))}
      </ul> 
            </div>
        </div>
    )
}
export default Coursepage;