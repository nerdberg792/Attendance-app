import React,{useState} from 'react' 
import Card from './Card';
import Button from './Button';
import Cookies from 'js-cookie';

const Coursecard = (props) => {
      const courseObjarr = JSON.parse(Cookies.get('courseObjarrcook')) ;
      const [courseObj , setCourseObj] = useState(props.courseObj);
      const courseName = courseObj.courseName;
      let attended = courseObj.attended;
      let missed = courseObj.missed;
      const attendHandler = () => {
       
        const newAttended = attended + 1;
      
      
        
        const index = courseObjarr.findIndex(course => course.courseName === courseName);
        
      
    
        setCourseObj({ courseName: courseName, attended: newAttended, missed: missed });
        
      
        
        courseObjarr[index] = { courseName: courseName, attended: newAttended, missed: missed };
      
      
        Cookies.set('courseObjarrcook', JSON.stringify(courseObjarr), { expires: 7 });
        
      };
      
      const missedHandler = () => {
          
        const newMissed= missed + 1;
      
       
        
        const index = courseObjarr.findIndex(course => course.courseName === courseName);
        
      
    
        setCourseObj({ courseName: courseName, attended: attended , missed: newMissed});
       
      
        
        courseObjarr[index] = { courseName: courseName, attended: attended, missed: newMissed };
      
      
        Cookies.set('courseObjarrcook', JSON.stringify(courseObjarr), { expires: 7 });
       
        } ;
        const deleteHandler = () => {
            
            const index = courseObjarr.findIndex(course => course.courseName === courseName);
          
            
            if (index !== -1) {
              
                const updatedCourseObjarr = [...courseObjarr.slice(0, index), ...courseObjarr.slice(index + 1)];

          
              console.log(updatedCourseObjarr);
              setCourseObj(updatedCourseObjarr);
              Cookies.set('courseObjarrcook', JSON.stringify(updatedCourseObjarr), { expires: 7 });
              props.delfunc();
            }
          };          
          
      return(
        <Card>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                <div className='text-2xl font-bold'>{courseName}</div>
                <div className='text-xl'> Attended : {attended}/{missed+attended}</div>
                </div>
                <div className='text-2xl font-bold'>{((attended/(attended+missed))*100).toFixed(2)}%</div>
            </div>
            <Button onClick={attendHandler}>Attended </Button>
            <Button onClick={missedHandler}>Missed</Button>
            <Button onClick={deleteHandler}>Delete</Button>

        </Card>
      )

}
export default Coursecard;