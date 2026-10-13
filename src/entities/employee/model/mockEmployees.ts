import type { Employee } from './types'

// Fake data until a real API exists.
export const mockEmployees: Employee[] = [
  { id: '1', fullName: 'Dilnoza Karimova', position: 'Principal', department: 'Administration', email: 'd.karimova@example.com', phone: '+998 90 000 00 01', role: 'administrator', status: 'active' },
  { id: '2', fullName: 'Jasur Rahimov', position: 'Vice Principal', department: 'Administration', email: 'j.rahimov@example.com', phone: '+998 90 000 00 02', role: 'administrator', status: 'active' },
  { id: '3', fullName: 'Madina Yusupova', position: 'Mathematics Teacher', department: 'Mathematics', email: 'm.yusupova@example.com', phone: '+998 90 000 00 03', role: 'teacher', status: 'active' },
  { id: '4', fullName: 'Sardor Aliyev', position: 'Physics Teacher', department: 'Sciences', email: 's.aliyev@example.com', phone: '+998 90 000 00 04', role: 'teacher', status: 'on-leave' },
  { id: '5', fullName: 'Nigora Tosheva', position: 'English Teacher', department: 'Languages', email: 'n.tosheva@example.com', phone: '+998 90 000 00 05', role: 'teacher', status: 'active' },
  { id: '6', fullName: 'Bekzod Ismoilov', position: 'IT Specialist', department: 'IT', email: 'b.ismoilov@example.com', phone: '+998 90 000 00 06', role: 'staff', status: 'active' },
  { id: '7', fullName: 'Shahlo Nazarova', position: 'Primary Teacher', department: 'Primary School', email: 's.nazarova@example.com', phone: '+998 90 000 00 07', role: 'teacher', status: 'active' },
  { id: '8', fullName: 'Otabek Xolmatov', position: 'Accountant', department: 'Finance', email: 'o.xolmatov@example.com', phone: '+998 90 000 00 08', role: 'staff', status: 'inactive' },
  { id: '9', fullName: 'Gulnora Saidova', position: 'Russian Teacher', department: 'Languages', email: 'g.saidova@example.com', phone: '+998 90 000 00 09', role: 'teacher', status: 'active' },
  { id: '10', fullName: 'Timur Abdullayev', position: 'Chemistry Teacher', department: 'Sciences', email: 't.abdullayev@example.com', phone: '+998 90 000 00 10', role: 'teacher', status: 'on-leave' },
  { id: '11', fullName: 'Zarina Mirzayeva', position: 'School Psychologist', department: 'Student Support', email: 'z.mirzayeva@example.com', phone: '+998 90 000 00 11', role: 'staff', status: 'active' },
  { id: '12', fullName: 'Farrux Qodirov', position: 'Facilities Manager', department: 'Operations', email: 'f.qodirov@example.com', phone: '+998 90 000 00 12', role: 'staff', status: 'active' },
]
