// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

const fs = require('fs').promises;

// Node class
class Node {
  data                
  next                
  constructor(data, next = null) {  // This constructor method automatically called to create a new node 
    this.data = data;               // with a value and a pointer to the next node
    this.next = next
  }
}

//LinkedList class
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {    // TODO(1)   When new LinkedList is called, this constructor creates an empty linked  
    this.head = null;   // list and initializes its head and tail with null and length of 0
    this.tail = null;    
    this.length = 0; 
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {  //TODO(2)
     const studentNode = new Node(newStudent);  
      console.log(studentNode);
     if (!this.head) {            // This method calls the Node class to create aan actual new node. Check 
        this.head = studentNode;  // if the node is empty. Then it initiliazes the head and tail to the 1st  
        this.tail = studentNode;   // node, since we only have 1 node so head and tail would set to the node
     }
     else {
      this.tail.next = studentNode;  // If the list is not empty(theres already a node), the new node is
      this.tail = studentNode;       // added to the end of the current node by updating its tail next 
     }                               // pointer then set the tail to the new node
  this.length++;     // length increases by one node after adding            
   
  }
   
  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO (3)                 // Check if list is empty, then nothing to remove
    if (!this.head) {
        return;
    }
    let current = this.head;
    if (current.data.getEmail() === email) {  // This part handles if the email to be remove is the 1st
        this.head = current.next;             // node. If yes then move current head to next node, removing
    if (!this.head) {                         // the current head. Now list is empty, set this tail to null
         this.tail = null;
      }  
    this.length--;    // decrease length after removal
    return;
    }

    while(current.next) {                               // If email does not match the head then loop thru  
      if (current.next.data.getEmail() === email) {     // the list the while current.next exists
          current.next = current.next.next;   // remove current.next by setting it to current.next.next
        if (!current.next) {      // If current.next is empty then set the tail to current
        this.tail = current;   
      }
    this.length--;    // decrease the length
    console.log(`Student with email ${email} removed successfully.`);
    return;
    }
    current = current.next;  // move to next node
  }
  console.log(`Remove unsuccessful. Student with the ${email} email is not found!`)
}      // display the not found message if nothing found after the loop

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO(4)
    if (!this.head) {     // If list empty, student not found!
      return; 
      }
    
    let current = this.head;      
    while (current) {
      if (current.data.getEmail() === email) {   // If email found then return the student object, consolelog
          console.log(`Student with email ${email} found: ${current.data.getString()}`);
         return current.data;
      }
      current = current.next;
    } 
    console.log(`Student with email ${email} not found.`);
      return -1   // If not found then return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO(5)
  this.head = null;   // Clear the list by setting the head and tail to null, reduce the length to 0
  this.length = 0;  
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO(6)
    if (!this.head) {
      console.log("List is empty!");
  }
    let current = this.head;
    let dpStudents = [];
                                                
  while (current) {    
    console.log(current.data.getName());                        // Starts from 1st node to the last 
    dpStudents.push(current.data.getName());   // pushing the student's name to the dpStudents array
      current = current.next;
        }
  return dpStudents.join(', ');   // Join the dpStudents array to display the required output
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO(7)
    let studentArray = [];               // This method collects the student objects into an array and 
    let current = this.head;             // sort the array alphabetically by name and return the array

    while (current) {                             
      studentArray.push(current.data);
      current = current.next;
    } 
    studentArray.sort((a, b) => {
      if (a.getName() < b.getName()) return -1;
      if (a.getName() > b.getName()) return 1;
      return 0;
      });
    return studentArray;
   }
  
  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()   Correction: Dont use it
   */
  filterBySpecialization(specialization) {
    // TODO(8)
    let filterBySpec = [];          // This method find student matches by specialization and sort
    let current = this.head;       // students alphabetically by name
    
    while(current) {
      if (current.data.getSpecialization() === specialization) {
        filterBySpec.push(current.data);
      }
      current = current.next;
    }

    filterBySpec.sort((a, b) => {
      if (a.getName() < b.getName()) return -1;
      if (a.getName() > b.getName()) return 1;
      return 0;
      });
    return filterBySpec;
    
  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minYear, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  //TODO(9)
  filterByMinYear(minYear) {
    let filterByYear = [];   
    let current = this.head;  
  
    while (current) {
      if (current.data.getYear() >= minYear) {
        filterByYear.push(current.data);
      }
  
      current = current.next;   
    }
    
    filterByYear.sort((a, b) => {
      if (a.getName() < b.getName()) return -1;
      if (a.getName() > b.getName()) return 1;
      return 0;
      });
    return filterByYear;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */

  async saveToJson(fileName) {
    // TODO(10)
    if (!this.head) {
      console.log("Linked list is empty. Nothing to save.");
      return;
    }
  
    const studentsArray = [];
    let current = this.head;
  
    while (current) {
      const student = current.data;
      studentsArray.push({
        name: student.getName(),
        year: student.getYear(),
        email: student.getEmail(),
        specialization: student.getSpecialization()
      });
      current = current.next;
    }
  
    try {
      await fs.writeFile(fileName, JSON.stringify(studentsArray, null, 2), 'utf8');
      console.log(`Linked list saved to ${fileName}`);
    } catch (error) {
      console.error("Error saving to file:", error);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  
  async loadFromJSON(fileName) {
    // TODO(11)
    try {
      const data = await fs.readFile(fileName, 'utf-8');
      const studentsArray = JSON.parse(data);
        
      this.clearStudents();
  
        for (const studentData of studentsArray) {
          const { name, year, email, specialization } = studentData;
          const student = new Student(name, year, email, specialization);
          this.addStudent(student);
      }
  
      console.log(`Loaded ${studentsArray.length} student(s) from ${fileName}`);
    } catch (err) {
      console.error(`Error loading file "${fileName}":`, err.message);
    }
  }

}

/* Testing purpose
const newStudent = new LinkedList();
newStudent.addStudent(new Student("Martin", 4, "martinl@mymail.ca", "applied science"));
newStudent.addStudent(new Student("May", 4, "may24@mymail.ca", "Music"));
newStudent.addStudent(new Student("Emily", 2, "emaily@mymail.ca", "Math"));
newStudent.addStudent(new Student("Peter", 1, "peter2@mymail.ca", "business"));
newStudent.addStudent(new Student("Amy", 3, "amy24@mymail.ca", "Music"));
newStudent.addStudent(new Student("John", 4, "john14@mymail.ca", "Technology"));
newStudent.addStudent(new Student("Faye", 1, "fayed@mymail.ca", "Arts"));
newStudent.addStudent(new Student("Robert", 2, "robert23@mymail.ca", "Music"));
newStudent.addStudent(new Student(""));
newStudent.displayStudents();
console.log(newStudent.findStudent("john14@mymail.ca"));
newStudent.filterBySpecialization("Math").forEach(student => console.log(student.getString()));
newStudent.filterByMinYear(4).forEach(student => console.log(student.getString()));
newStudent.removeStudent("robert23@mymail.ca");*/

module.exports = { LinkedList }
